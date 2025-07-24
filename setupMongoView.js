require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

const setup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected to MongoDB');

    // Create a view for users over 21
    await User.collection.conn.db.command({
      create: 'users_over_21',
      viewOn: 'users',
      pipeline: [
        {
          $match: {
            age: { $gt: 21 },
          },
        },
      ],
    });

    console.log('View "users_over_21" created successfully.');

  } catch (error) {
    console.error('Error setting up MongoDB view:', error);
  } finally {
    mongoose.disconnect();
  }
};

setup();
