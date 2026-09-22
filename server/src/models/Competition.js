const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  position: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  icon: {
    type: String,
    default: 'star',
  },
}, { _id: false });

const previousWinnerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  photoUrl: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    default: '',
  },
}, { _id: false });

const judgeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: String,
    required: true,
    trim: true,
  },
  photoUrl: {
    type: String,
    default: '',
  },
  introVideoUrl: {
    type: String,
    default: '',
  },
}, { _id: false });

const competitionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Competition title is required'],
    trim: true,
    index: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  prizePool: {
    type: Number,
    required: [true, 'Prize pool is required'],
    min: [0, 'Prize pool cannot be negative'],
  },
  entryFee: {
    type: Number,
    required: [true, 'Entry fee is required'],
    min: [0, 'Entry fee cannot be negative'],
  },
  totalSpots: {
    type: Number,
    required: [true, 'Total spots is required'],
    min: [1, 'Must have at least 1 spot'],
  },
  bookedSpots: {
    type: Number,
    default: 0,
    min: 0,
  },
  judge: {
    type: judgeSchema,
    required: [true, 'Judge information is required'],
  },
  dates: {
    registrationStart: {
      type: Date,
      required: [true, 'Registration start date is required'],
    },
    registrationEnd: {
      type: Date,
      required: [true, 'Registration end date is required'],
    },
    submissionStart: {
      type: Date,
      required: [true, 'Submission start date is required'],
    },
    submissionEnd: {
      type: Date,
      required: [true, 'Submission end date is required'],
    },
    resultDate: {
      type: Date,
      required: [true, 'Result date is required'],
    },
  },
  about: {
    type: String,
    required: [true, 'About section is required'],
    trim: true,
  },
  judgingParameters: {
    type: String,
    default: '',
    trim: true,
  },
  rulesAndEligibility: {
    type: String,
    default: '',
    trim: true,
  },
  rewards: [rewardSchema],
  previousWinners: [previousWinnerSchema],
  referralLink: {
    type: String,
    default: '',
  },
  referralBonus: {
    type: Number,
    default: 0,
  },
  certificateEnabled: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'registration_closed', 'submission_open', 'submission_closed', 'judging', 'completed'],
    default: 'draft',
    index: true,
  },
  disclaimer: {
    type: String,
    default: '',
    trim: true,
  },
  refundPolicy: {
    type: Boolean,
    default: false,
  },
  paymentGateway: {
    type: String,
    default: 'Razorpay',
    trim: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual: available spots
competitionSchema.virtual('availableSpots').get(function () {
  return Math.max(0, this.totalSpots - this.bookedSpots);
});

// Virtual: check if registration is currently open
competitionSchema.virtual('isRegistrationOpen').get(function () {
  const now = new Date();
  return (
    this.status === 'active' &&
    now >= this.dates.registrationStart &&
    now <= this.dates.registrationEnd &&
    this.bookedSpots < this.totalSpots
  );
});

// Virtual: check if submission window is open
competitionSchema.virtual('isSubmissionOpen').get(function () {
  const now = new Date();
  return (
    (this.status === 'submission_open' || this.status === 'active') &&
    now >= this.dates.submissionStart &&
    now <= this.dates.submissionEnd
  );
});

// Virtual: compute current lifecycle phase
competitionSchema.virtual('currentPhase').get(function () {
  const now = new Date();

  if (this.status === 'completed') return 'completed';
  if (this.status === 'judging') return 'judging';
  if (this.status === 'draft') return 'draft';

  if (now < this.dates.registrationStart) return 'upcoming';
  if (now <= this.dates.registrationEnd && this.bookedSpots < this.totalSpots) return 'registration_open';
  if (now > this.dates.registrationEnd && now < this.dates.submissionStart) return 'registration_closed';
  if (now >= this.dates.submissionStart && now <= this.dates.submissionEnd) return 'submission_open';
  if (now > this.dates.submissionEnd && now < this.dates.resultDate) return 'judging';
  if (now >= this.dates.resultDate) return 'completed';

  return 'registration_closed';
});

// Index for efficient queries
competitionSchema.index({ 'dates.registrationEnd': 1 });
competitionSchema.index({ status: 1, 'dates.registrationEnd': 1 });

const Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition;
