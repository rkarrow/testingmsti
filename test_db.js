const mongoose = require('mongoose');
const Course = require('./server/models/Course');
require('dotenv').config({ path: './server/.env' });

async function run() {
  await mongoose.connect('mongodb+srv://rashmikak217_db_user:10Krashm%40@cluster0.qqvcriy.mongodb.net/msti_maritime?retryWrites=true&w=majority');
  console.log('Connected');
  const count = await Course.countDocuments();
  console.log('Count:', count);
  const courses = await Course.find();
  console.log(courses);
  process.exit(0);
}
run();
