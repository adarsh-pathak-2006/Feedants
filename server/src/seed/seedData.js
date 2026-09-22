require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Competition = require('../models/Competition');
const User = require('../models/User');
const Registration = require('../models/Registration');
const crypto = require('crypto');

/**
 * Seed script to populate the database with sample data
 * matching the Feedants Classical Dance competition design
 */

const seedData = async () => {
  try {
    await connectDB();

    console.log('🌱 Starting database seed...\n');

    // Clear existing data
    await Promise.all([
      Competition.deleteMany({}),
      User.deleteMany({}),
      Registration.deleteMany({}),
    ]);
    console.log('✅ Cleared existing data');

    // Create demo users
    const users = await User.insertMany([
      {
        name: 'Demo User',
        email: 'demo@feedants.com',
        passwordHash: crypto.createHash('sha256').update('demo123').digest('hex'),
        phone: '+91 9876543210',
        referralCode: 'REFDEMO123',
        preferredLanguage: 'en',
      },
      {
        name: 'Riya Shah',
        email: 'riya@example.com',
        passwordHash: crypto.createHash('sha256').update('password123').digest('hex'),
        phone: '+91 9876543211',
        referralCode: 'REFRIYA456',
        preferredLanguage: 'en',
      },
      {
        name: 'Aarav Mehta',
        email: 'aarav@example.com',
        passwordHash: crypto.createHash('sha256').update('password123').digest('hex'),
        phone: '+91 9876543212',
        referralCode: 'REFAARAV789',
        preferredLanguage: 'hi',
      },
      {
        name: 'Neha Verma',
        email: 'neha@example.com',
        passwordHash: crypto.createHash('sha256').update('password123').digest('hex'),
        phone: '+91 9876543213',
        referralCode: 'REFNEHA101',
        preferredLanguage: 'en',
      },
      {
        name: 'Ishita Chopra',
        email: 'ishita@example.com',
        passwordHash: crypto.createHash('sha256').update('password123').digest('hex'),
        phone: '+91 9876543214',
        referralCode: 'REFISHI202',
        preferredLanguage: 'hi',
      },
    ]);
    console.log(`✅ Created ${users.length} demo users`);

    // Create the main competition matching the design reference
    const now = new Date();
    const regEnd = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000 + 28 * 60 * 1000);
    const subStart = new Date(now.getTime() - 16 * 24 * 60 * 60 * 1000); // Started 16 days ago
    const subEnd = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);
    const resultDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);

    const competition = await Competition.create({
      title: 'Feedants Classical Dance',
      category: 'Dance',
      tags: ['Dance', 'Multi-Win'],
      prizePool: 1500,
      entryFee: 99,
      totalSpots: 20,
      bookedSpots: 1,
      judge: {
        name: 'Manju Dubey',
        title: 'Professional Kathak Dancer',
        experience: '12+ Years of Experience',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        introVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      dates: {
        registrationStart: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        registrationEnd: regEnd,
        submissionStart: subStart,
        submissionEnd: subEnd,
        resultDate: resultDate,
      },
      about: 'This is an online classical dance competition open for all age groups.\nParticipate from anywhere and showcase your talent.\nExpress your passion through traditional dance.\n\nThe competition celebrates the rich heritage of Indian classical dance forms including Bharatanatyam, Kathak, Odissi, Kuchipudi, Mohiniyattam, Manipuri, Sattriya, and Kathakali.\n\nParticipants will be judged on their technique, expression (abhinaya), rhythm (taal), costume and presentation, and overall artistic merit.\n\nThis is a unique opportunity to receive feedback from renowned professional dancers and showcase your talent to a wider audience.',
      judgingParameters: '• Technique & Precision (30%): Accuracy of mudras, footwork, and body movements specific to the dance form.\n\n• Expression & Abhinaya (25%): Emotional expression, storytelling ability, and facial expressions.\n\n• Rhythm & Timing (20%): Synchronization with music, adherence to taal, and tempo control.\n\n• Costume & Presentation (15%): Appropriate attire, makeup, and overall stage presence.\n\n• Creativity & Originality (10%): Innovative choreography while maintaining classical authenticity.',
      rulesAndEligibility: '• Open to all age groups — no restrictions on age or gender.\n\n• Participants must perform a classical Indian dance form (Bharatanatyam, Kathak, Odissi, Kuchipudi, etc.).\n\n• Video submission must be between 2-5 minutes in duration.\n\n• The video must be recorded in landscape orientation with clear audio.\n\n• No copyrighted background music allowed — use royalty-free tracks or live instrumental.\n\n• Each participant can submit only one entry.\n\n• Re-submission is allowed until the submission deadline.\n\n• Only contributions from paid participants will be considered for judging.\n\n• Feedants reserves the right to disqualify any entry that violates community guidelines.\n\n• Winners will be announced on the result date and notified via email.\n\n• Prize money will be disbursed within 7 working days of result announcement.',
      rewards: [
        { position: 1, label: '1st Winner', amount: 550, icon: 'trophy' },
        { position: 2, label: '2nd Winner', amount: 300, icon: 'medal-silver' },
        { position: 3, label: '3rd Winner', amount: 240, icon: 'medal-bronze' },
        { position: 4, label: '4th Winner', amount: 200, icon: 'star' },
        { position: 5, label: '5th Winner', amount: 130, icon: 'star' },
        { position: 6, label: '6th Winner', amount: 80, icon: 'star' },
      ],
      previousWinners: [
        {
          name: 'Riya Shah',
          position: '1st Winner',
          photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          name: 'Aarav Mehta',
          position: '1st Winner',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          name: 'Neha Verma',
          position: '2nd Winner',
          photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          name: 'Ishita Chopra',
          position: '3rd Winner',
          photoUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
      referralLink: 'https://feedants.com/r/referral123',
      referralBonus: 10,
      certificateEnabled: true,
      status: 'active',
      disclaimer: 'Only contributions from paid participants will be considered for judging.',
      refundPolicy: true,
      paymentGateway: 'Razorpay',
    });
    console.log(`✅ Created competition: ${competition.title}`);

    // Create a registration for demo user (to show "Registered" state)
    const registration = await Registration.create({
      userId: users[0]._id,
      competitionId: competition._id,
      status: 'registered',
      paymentStatus: 'completed',
      paymentAmount: 99,
      paymentId: `PAY_DEMO_${Date.now()}`,
      registeredAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    });
    console.log(`✅ Created demo registration for ${users[0].name}`);

    console.log('\n📊 Seed Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Competitions: 1`);
    console.log(`   Registrations: 1`);
    console.log(`\n🎯 Demo Login Credentials:`);
    console.log(`   Email: demo@feedants.com`);
    console.log(`   Password: demo123`);
    console.log(`\n🆔 Competition ID: ${competition._id}`);
    console.log(`🆔 Demo User ID: ${users[0]._id}`);
    console.log('\n✨ Database seeded successfully!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedData();
