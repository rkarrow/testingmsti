const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const News = require('./models/News');

async function clearNews() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://rashmikak217_db_user:Rashmika10K2026@cluster0.qqvcriy.mongodb.net/msti_maritime?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB Atlas');

    const countBefore = await News.countDocuments();
    console.log(`Current news articles count: ${countBefore}`);

    await News.deleteMany({});
    console.log('✅ All default/seeded news articles cleared successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error clearing news:', error.message);
    process.exit(1);
  }
}

clearNews();
