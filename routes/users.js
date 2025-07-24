const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user'); // Import the main User model

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await mongoose.connection.db.collection('users_over_21').findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (user) {
      return res.json(user);
    }

    return res.status(404).json({ message: 'User not found' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

