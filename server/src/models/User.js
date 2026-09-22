const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  profilePicture: {
    type: String,
    default: '',
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  referralEarnings: {
    type: Number,
    default: 0,
    min: 0,
  },
  preferredLanguage: {
    type: String,
    enum: ['en', 'hi'],
    default: 'en',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      // Never expose passwordHash in API responses
      delete ret.passwordHash;
      return ret;
    },
  },
  toObject: { virtuals: true },
});

// Index for referral lookups
userSchema.index({ referralCode: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
