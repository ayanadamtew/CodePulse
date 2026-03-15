import express from 'express';
import User from '../models/User.js';
import Problem from '../models/Problem.js';
import Submission from '../models/Submission.js';
import ContactSubmission from '../models/ContactSubmission.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard stats (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const [totalUsers, totalProblems, totalSubmissions, pendingContactRequests] = await Promise.all([
      User.countDocuments(),
      Problem.countDocuments(),
      Submission.countDocuments(),
      ContactSubmission.countDocuments({ status: 'new' })
    ]);

    res.json({
      totalUsers,
      totalProblems,
      totalSubmissions,
      pendingContactRequests
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
