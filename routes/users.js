const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user'); // Import the main User model

// Define a model for the view. In this case we are treating the application as if over 21 is an imperative of the application.
//otherwise we would have a separate view for usersOver_21
const UserOver21 = mongoose.model('UserOver21', new mongoose.Schema({ name: String, email: String, age: Number }), 'users_over_21');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const userFromView = await UserOver21.findById(id);

    if (userFromView) {
      return res.json(userFromView);
    }

    // If not in the view, check the main collection for a more specific error
    const userFromCollection = await User.findById(id);

    if (userFromCollection) {
      // User exists but is not in the view (i.e., not over 21)
      return res.status(404).json({ message: 'User found, but is not over 21 and cannot be returned' });
    }

    // User does not exist in the main collection at all
    return res.status(404).json({ message: 'User not found' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

