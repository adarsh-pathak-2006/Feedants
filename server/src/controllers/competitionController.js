const Competition = require('../models/Competition');

/**
 * @desc    Get all competitions with pagination and filters
 * @route   GET /api/competitions
 * @access  Public
 */
const getCompetitions = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      search,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));

    // Build filter query
    const filter = {};

    if (status) {
      filter.status = status;
    } else {
      // By default, don't show draft competitions
      filter.status = { $ne: 'draft' };
    }

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const [competitions, total] = await Promise.all([
      Competition.find(filter)
        .sort({ 'dates.registrationEnd': -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
      Competition.countDocuments(filter),
    ]);

    // Add computed fields to each competition
    const enrichedCompetitions = competitions.map((comp) => ({
      ...comp,
      availableSpots: Math.max(0, comp.totalSpots - comp.bookedSpots),
      isRegistrationOpen: isRegistrationCurrentlyOpen(comp),
    }));

    res.json({
      success: true,
      data: enrichedCompetitions,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single competition details by ID
 * @route   GET /api/competitions/:id
 * @access  Public
 */
const getCompetitionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const competition = await Competition.findById(id);

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found',
      });
    }

    // Build enhanced response with computed fields
    const response = competition.toJSON();
    response.currentPhase = competition.currentPhase;
    response.availableSpots = competition.availableSpots;
    response.isRegistrationOpen = competition.isRegistrationOpen;
    response.isSubmissionOpen = competition.isSubmissionOpen;
    response.serverTime = new Date().toISOString();

    // Add time-remaining calculations
    const now = new Date();
    if (now < competition.dates.registrationEnd) {
      response.registrationTimeRemaining = competition.dates.registrationEnd.getTime() - now.getTime();
    } else {
      response.registrationTimeRemaining = 0;
    }

    if (now < competition.dates.submissionEnd) {
      response.submissionTimeRemaining = competition.dates.submissionEnd.getTime() - now.getTime();
    } else {
      response.submissionTimeRemaining = 0;
    }

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Helper: Check if registration is currently open for a lean document
 */
function isRegistrationCurrentlyOpen(comp) {
  const now = new Date();
  return (
    comp.status === 'active' &&
    now >= new Date(comp.dates.registrationStart) &&
    now <= new Date(comp.dates.registrationEnd) &&
    comp.bookedSpots < comp.totalSpots
  );
}

module.exports = {
  getCompetitions,
  getCompetitionById,
};
