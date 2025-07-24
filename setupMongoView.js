require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

const setup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected to MongoDB');

    try {
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
      if (error.codeName !== 'NamespaceExists') {
        throw error;
      }
      console.log('View "users_over_21" already exists.');
    }

    // Insert sample data
    await User.deleteMany({}); // Clear existing data
    const users = await User.insertMany([
      { name: 'John Doe', age: 30, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
      { name: 'Peter Pan', age: 12, email: 'peter.pan@example.com' },
      { name: 'Alice Wonderland', age: 20, email: 'alice.wonderland@example.com' },
    ]);

    console.log('Sample data inserted successfully.');
    console.log('Inserted user IDs:');
    users.forEach(user => console.log(user._id));


  } catch (error) {
    console.error('Error setting up MongoDB view:', error);
  } finally {
    mongoose.disconnect();
  }
};

setup();
