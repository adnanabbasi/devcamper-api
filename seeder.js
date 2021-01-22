const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');
const Review = require('./models/Review');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'));


// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Bootcamp data imported...'.green.inverse);
    await Course.create(courses);
    console.log('Course data imported...'.green.inverse);
    await User.create(users);
    console.log('User data imported...'.green.inverse);
    await Review.create(reviews);
    console.log('Review data imported...'.green.inverse);

    //console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Bootcamp data destroyed...'.red.inverse);
    await Course.deleteMany();
    console.log('Course data destroyed...'.red.inverse);
    await User.deleteMany();
    console.log('User data destroyed...'.red.inverse);
    await Review.deleteMany();
    console.log('Review data destroyed...'.red.inverse);
    //console.log('Data Destroyed...'.red.inverse);
    if (process.argv[2] === '-d') {
      process.exit();
    }
  } catch (err) {
    console.error(err);
  }
};

// if (process.argv[2] === '-i') {
//   importData();
// } else if (process.argv[2] === '-d') {
//   deleteData();
// }

// Reset Data
const resetData = async () => {
  try {
    console.log('Deleting data...')
    await deleteData()
    console.log('data deleted')
    console.log('Importing data...')
    await importData()
    console.log('data imported')
  } catch (error) {
    console.error(error)
  }
}
 
if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
} else if (process.argv[2] === '-r') {
  resetData()
}