import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, 'Please provide a valid email address'],
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false, // Exclude password hash from standard queries
    },
  },
  {
    timestamps: true,
  }
);

// Method to verify password against bcrypt hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.passwordHash) {
    throw new Error('Password hash is not loaded on user model');
  }
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Safe JSON serialization: Never expose passwordHash or internal __v in responses
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.passwordHash;
  delete userObject.__v;
  userObject.id = userObject._id;
  delete userObject._id;
  return userObject;
};

export const User = mongoose.model('User', userSchema);
