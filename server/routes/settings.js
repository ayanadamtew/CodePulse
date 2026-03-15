import express from 'express';
import Settings from '../models/Settings.js';

const router = express.Router();

// GET /api/admin/settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // If no settings exist, create default ones
    if (!settings) {
      settings = await Settings.create({});
    }
    
    res.json(settings);
  } catch (err) {
    console.error('Error fetching settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/admin/settings
router.put('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      // Update existing settings
      Object.assign(settings, req.body);
    }
    
    await settings.save();
    res.json(settings);
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
