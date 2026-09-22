const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true,
  },
  competitionId: {
    type: Schema.Types.ObjectId,
    ref: 'Competition',
    required: [true, 'Competition ID is required'],
    index: true,
  },
  status: {
    type: String,
    enum: ['registered', 'submitted', 'under_review', 'disqualified', 'winner'],
    default: 'registered',
    index: true,
  },
  paymentId: {
    type: String,
    default: '',
    trim: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  submissionUrl: {
    type: String,
    default: '',
    trim: true,
  },
  submissionNotes: {
    type: String,
    default: '',
    trim: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  submittedAt: {
    type: Date,
    default: null,
  },
  referredBy: {
    type: String,
    default: '',
    trim: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Compound unique index: a user can only register once for a competition
registrationSchema.index({ userId: 1, competitionId: 1 }, { unique: true });

// Index for querying registrations by competition
registrationSchema.index({ competitionId: 1, status: 1 });

// Virtual: check if submission has been uploaded
registrationSchema.virtual('hasSubmitted').get(function () {
  return this.status === 'submitted' && this.submissionUrl !== '';
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
