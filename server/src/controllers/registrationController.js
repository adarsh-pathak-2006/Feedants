const mongoose = require('mongoose');
const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const User = require('../models/User');

/**
 * @desc    Register a user for a competition (atomic spot reservation)
 * @route   POST /api/registrations/competitions/:competitionId/register
 * @access  Private
 */
const registerForCompetition = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { competitionId } = req.params;
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // Validate user exists
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if user is already registered (idempotency check)
    const existingRegistration = await Registration.findOne({
      userId,
      competitionId,
    }).session(session);

    if (existingRegistration) {
      await session.abortTransaction();
      return res.status(409).json({
        success: false,
        message: 'You are already registered for this competition',
        data: existingRegistration,
      });
    }

    // Atomic spot reservation: only increment if spots available
    // This prevents race conditions when multiple users register concurrently
    const competition = await Competition.findOneAndUpdate(
      {
        _id: competitionId,
        status: 'active',
        bookedSpots: { $lt: mongoose.connection.db ? Infinity : Infinity }, // Will use actual totalSpots check below
      },
      {},
      { new: true, session }
    );

    if (!competition) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Competition not found or not active',
      });
    }

    // Validate registration window
    const now = new Date();
    if (now < competition.dates.registrationStart) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Registration has not started yet',
      });
    }

    if (now > competition.dates.registrationEnd) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Registration period has ended',
      });
    }

    // Atomic spot reservation with condition check
    const updatedCompetition = await Competition.findOneAndUpdate(
      {
        _id: competitionId,
        bookedSpots: { $lt: competition.totalSpots },
      },
      {
        $inc: { bookedSpots: 1 },
      },
      { new: true, session }
    );

    if (!updatedCompetition) {
      await session.abortTransaction();
      return res.status(409).json({
        success: false,
        message: 'No spots available. Competition is fully booked.',
      });
    }

    // Create registration record
    const registration = new Registration({
      userId,
      competitionId,
      status: 'registered',
      paymentStatus: 'completed', // Simplified for demo; in production, integrate with Razorpay
      paymentAmount: competition.entryFee,
      paymentId: `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      registeredAt: now,
      referredBy: req.body.referralCode || '',
    });

    await registration.save({ session });

    // If referred by someone, credit the referrer
    if (req.body.referralCode) {
      await User.findOneAndUpdate(
        { referralCode: req.body.referralCode },
        { $inc: { referralEarnings: competition.referralBonus || 10 } },
        { session }
      );
    }

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: 'Successfully registered for the competition',
      data: {
        registration,
        availableSpots: updatedCompetition.totalSpots - updatedCompetition.bookedSpots,
        bookedSpots: updatedCompetition.bookedSpots,
        totalSpots: updatedCompetition.totalSpots,
      },
    });
  } catch (error) {
    await session.abortTransaction();

    // Handle duplicate key error (concurrent duplicate registration)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You are already registered for this competition',
      });
    }

    next(error);
  } finally {
    session.endSession();
  }
};

/**
 * @desc    Upload submission for a registered competition
 * @route   POST /api/registrations/competitions/:competitionId/submit
 * @access  Private
 */
const uploadSubmission = async (req, res, next) => {
  try {
    const { competitionId } = req.params;
    const userId = req.user?.id || req.body.userId;
    const { submissionUrl, submissionNotes } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    if (!submissionUrl) {
      return res.status(400).json({
        success: false,
        message: 'Submission URL is required',
      });
    }

    // Check competition exists and submission window is open
    const competition = await Competition.findById(competitionId);
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found',
      });
    }

    const now = new Date();
    if (now < competition.dates.submissionStart) {
      return res.status(400).json({
        success: false,
        message: 'Submission window has not opened yet',
        data: { submissionStart: competition.dates.submissionStart },
      });
    }

    if (now > competition.dates.submissionEnd) {
      return res.status(400).json({
        success: false,
        message: 'Submission window has closed',
        data: { submissionEnd: competition.dates.submissionEnd },
      });
    }

    // Find and update registration
    const registration = await Registration.findOneAndUpdate(
      {
        userId,
        competitionId,
        status: { $in: ['registered', 'submitted'] }, // Allow re-submission
      },
      {
        submissionUrl,
        submissionNotes: submissionNotes || '',
        status: 'submitted',
        submittedAt: now,
      },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found. You must register before submitting.',
      });
    }

    res.json({
      success: true,
      message: 'Submission uploaded successfully',
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's registration status for a competition
 * @route   GET /api/registrations/competitions/:competitionId/status
 * @access  Private
 */
const getRegistrationStatus = async (req, res, next) => {
  try {
    const { competitionId } = req.params;
    const userId = req.query.userId || req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const registration = await Registration.findOne({
      userId,
      competitionId,
    }).lean();

    if (!registration) {
      return res.json({
        success: true,
        data: {
          isRegistered: false,
          registration: null,
        },
      });
    }

    res.json({
      success: true,
      data: {
        isRegistered: true,
        registration,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all registrations for a user
 * @route   GET /api/registrations/user/:userId
 * @access  Private
 */
const getUserRegistrations = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const registrations = await Registration.find({ userId })
      .populate('competitionId', 'title category status dates prizePool')
      .sort({ registeredAt: -1 })
      .lean();

    res.json({
      success: true,
      data: registrations,
      count: registrations.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerForCompetition,
  uploadSubmission,
  getRegistrationStatus,
  getUserRegistrations,
};
