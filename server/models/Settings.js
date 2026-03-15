import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  siteTitle: {
    type: String,
    default: 'CodePulse'
  },
  siteDescription: {
    type: String,
    default: 'The Ultimate Platform for Mastering Coding Challenges'
  },
  contactEmail: {
    type: String,
    default: 'admin@codepulse.app'
  },
  maxSubmissionsPerDay: {
    type: Number,
    default: 100
  },
  enableRegistration: {
    type: Boolean,
    default: true
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  maintenanceMessage: {
    type: String,
    default: 'The site is currently undergoing maintenance. Please check back later.'
  },
  aiHelpEnabled: {
    type: Boolean,
    default: true
  },
  aiHelpCredits: {
    type: Number,
    default: 5
  }
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
