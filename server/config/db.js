const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const seedDB = async () => {
  try {
    const User = require('../models/User');
    const SiteSettings = require('../models/SiteSettings');
    const Course = require('../models/Course');
    const News = require('../models/News');

    const adminExists = await User.findOne({ email: 'admin@msti.lk' });
    if (!adminExists) {
      await User.create({
        name: 'MSTI Admin',
        email: 'admin@msti.lk',
        password: 'admin123',
        role: 'admin',
      });
      console.log('👤 Default admin user created: admin@msti.lk / admin123');
    }

    const settingsExist = await SiteSettings.findOne();
    if (!settingsExist) {
      await SiteSettings.create({
        heroBadge: "⚓ FOUNDING EXCELLENCE SINCE 2002 • SRI LANKA'S PREMIER CADET CORPS",
        heroTitle: "The Premier Maritime Academy in Sri Lanka",
        heroSubtitle: "We aspire to become the premier training institute for maritime careers in Sri Lanka and overseas. Fully accredited merchant navy officer training under IMO STCW and DG Shipping.",
        heroBgImage: "/hero-image.jpg",
        heroPrimaryCtaText: "Explore Programs",
        heroPrimaryCtaLink: "/courses",
        heroSecondaryCtaText: "Book a Campus Visit",
        heroSecondaryCtaLink: "/contact",
        aboutBadge: "ABOUT US",
        aboutTitle: "The Premier Maritime Academy in Sri Lanka",
        aboutDesc1: "We aim to continuously contribute to the growth of individuals and organizations to ensure they are qualified to deliver results at the highest levels of performance.",
        aboutDesc2: "Our goal at MSTI Maritime Academy is to be recognized worldwide as a top quality service provider to the international marine industry in maritime training.",
        aboutLeaderName: "Capt. Ayesha Fernando",
        aboutLeaderRole: "Valedictorian • Officer of the Watch (STCW II/1)",
        aboutLeaderImage: "/captain.jpg",
      });
    }

    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany([
        {
          title: 'Officer Cadetship Programme',
          description: 'A comprehensive programme designed to develop world-class maritime officers.',
          shortDescription: 'Train to become a certified maritime officer aboard international vessels.',
          category: 'Officer Cadetship',
          duration: '36 Months',
          level: 'Degree',
          featured: true,
          intake: 'January & July',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
        },
        {
          title: 'Marine Engineering Cadetship',
          description: 'An intensive engineering programme focusing on ship propulsion systems.',
          shortDescription: 'Become a certified marine engineer for global merchant fleets.',
          category: 'Marine Engineering',
          duration: '36 Months',
          level: 'Degree',
          featured: true,
          intake: 'January & July',
          image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600',
        },
        {
          title: 'Port & Shipping Management',
          description: 'A specialized programme covering port operations, logistics, and maritime law.',
          shortDescription: 'Master port operations and maritime logistics management.',
          category: 'Port Management',
          duration: '18 Months',
          level: 'Diploma',
          featured: true,
          intake: 'March & September',
          image: 'https://images.unsplash.com/photo-1504083898675-c896ecdae86e?w=600',
        },
      ]);
    }
  } catch (e) {
    console.log('Seed error:', e.message);
  }
};

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log(`✅ MongoDB Connected to Atlas/Primary Database`);
    await seedDB();
  } catch (error) {
    console.log(`⚠️ Primary Database Connection Failed: ${error.message}`);
    console.log(`⚠️ Starting In-Memory Database fallback...`);
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected to In-Memory Database`);
    await seedDB();
  }
};

module.exports = connectDB;
