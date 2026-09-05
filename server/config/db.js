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
    if (courseCount < 4) {
      await Course.deleteMany({});
      await Course.insertMany([
        {
          title: 'Officer & Rating Training',
          description: 'A comprehensive nautical science and pre-sea officer cadetship designed to develop world-class merchant navy officers.',
          shortDescription: 'Officer Cadet (Nautical Science / Pre-Sea)',
          category: 'Deck Department',
          duration: '24 Months',
          level: 'Degree',
          featured: true,
          intake: 'January & July',
          image: '/course-officer.jpg',
        },
        {
          title: 'Marine Engineering Cadetship',
          description: 'An intensive marine engineering programme focusing on ship propulsion systems, marine automation, and engine room operations.',
          shortDescription: 'Class IV Marine Engineer Officer CoC Track',
          category: 'Engine Propulsion',
          duration: '36 Months',
          level: 'Degree',
          featured: true,
          intake: 'January & July',
          image: '/course-engineering.jpg',
        },
        {
          title: 'Pre-Sea General Purpose Rating',
          description: 'Practical seamanship, firefighting, survival craft, and deck machinery operations for general purpose maritime ratings.',
          shortDescription: 'Seamanship, Firefighting & Lifeboat Proficiency',
          category: 'Pre-Sea General',
          duration: '9 Months',
          level: 'Diploma',
          featured: true,
          intake: 'March & September',
          image: '/course-rating.jpg',
        },
        {
          title: 'ECDIS & Simulator Lab',
          description: 'STCW-compliant electronic chart display, radar navigation, and full-mission bridge simulator competency modules.',
          shortDescription: 'IMO STCW Modular & Mandatory Competencies',
          category: 'STCW Modular',
          duration: 'Fast Track',
          level: 'Certificate',
          featured: true,
          intake: 'Monthly',
          image: '/course-ecdis.jpg',
        },
      ]);
      console.log('✅ Default 4 Figma courses seeded successfully');
    }
  } catch (e) {
    console.log('Seed error:', e.message);
  }
};

const connectDB = async () => {
  mongoose.set('bufferCommands', false);
  if (mongoose.connection.readyState >= 1) return;

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/msti_maritime';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log(`✅ MongoDB Connected to Atlas/Primary Database`);
    await seedDB();
  } catch (error) {
    console.log(`⚠️ Primary Database Connection Error: ${error.message}`);
    if (process.env.NODE_ENV !== 'production') {
      try {
        mongoServer = await MongoMemoryServer.create();
        const memUri = mongoServer.getUri();
        await mongoose.connect(memUri);
        console.log(`✅ MongoDB Connected to In-Memory Database`);
        await seedDB();
      } catch (memErr) {
        console.log('In-Memory DB error:', memErr.message);
      }
    }
  }
};

module.exports = connectDB;
