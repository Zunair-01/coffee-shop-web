const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');

const mongoURI = 'mongodb://localhost:27017/CafeCoffe';

const adminData = {
  name: 'Admin',
  email: 'admin@gmail.com',
  password: 'admin123',
  isAdmin: true,
};

async function seedAdmin() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const salt = await bcrypt.genSalt(10);
    adminData.password = await bcrypt.hash(adminData.password, salt);

    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      const adminUser = new User(adminData);
      await adminUser.save();
      console.log('Admin user created successfully');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    mongoose.connection.close();
  }
}

seedAdmin();
