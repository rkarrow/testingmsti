require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const News = require('./models/News');
const SiteSettings = require('./models/SiteSettings');

const defaultAdmin = {
  name: 'MSTI Admin',
  email: 'admin@msti.lk',
  password: 'admin123', // Will be hashed by User schema pre-save hook
  role: 'admin',
};

const defaultSettings = {
  heroBadge: "⚓ FOUNDING EXCELLENCE SINCE 2002 • SRI LANKA'S PREMIER CADET CORPS",
  heroTitle: "The Premier Maritime Academy in Sri Lanka",
  heroSubtitle: "We aspire to become the premier training institute for maritime careers in Sri Lanka and overseas. Fully accredited merchant navy officer training under IMO STCW and DG Shipping.",
  heroBgImage: "/hero-image.jpg",
  heroPrimaryCtaText: "Explore Programs",
  heroPrimaryCtaLink: "/courses",
  heroSecondaryCtaText: "Book a Campus Visit",
  heroSecondaryCtaLink: "/contact",

  stats: [
    { value: '12:1', label: 'STUDENT-FACULTY RATIO' },
    { value: '94%', label: 'FLEET PLACEMENT RATE' },
    { value: '180+', label: 'ACADEMIC & SEA PROGRAMS' },
    { value: '$42M', label: 'TRAINING SIMULATORS & FLEET' },
  ],

  aboutBadge: "ABOUT US",
  aboutTitle: "The Premier Maritime Academy in Sri Lanka",
  aboutDesc1: "We aim to continuously contribute to the growth of individuals and organizations to ensure they are qualified to deliver results at the highest levels of performance. To do so, we engage in the most suitable solutions in training, assessment, and career development, delivering the best maritime courses Sri Lanka has to offer.",
  aboutDesc2: "Our goal at MSTI Maritime Academy is to be recognized worldwide as a top quality service provider to the international marine industry in maritime training, adhering to strict IMO guidelines and global merchant fleets.",
  aboutLeaderName: "Capt. Ayesha Fernando",
  aboutLeaderRole: "Valedictorian • Officer of the Watch (STCW II/1)",
  aboutLeaderImage: "/captain.jpg",
};

const courses = [
  {
    title: 'Officer & Rating Training',
    description: 'A comprehensive nautical science and pre-sea officer cadetship designed to develop world-class merchant navy officers.',
    shortDescription: 'Officer Cadet (Nautical Science / Pre-Sea)',
    category: 'Deck Department',
    duration: '24 Months',
    level: 'Degree',
    featured: true,
    intake: 'January & July',
    requirements: ['Minimum GCE A/L qualification', 'Age 17-25', 'Medical fitness certificate'],
    outcomes: ['Certificate of Competency (OOW)', 'International fleet placement'],
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
    requirements: ['A/L with Mathematics & Physics', 'Age 17-25', 'Medical fitness'],
    outcomes: ['Class IV Engine Officer certification', 'Chief Engineer career track'],
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
    requirements: ['GCE O/L passes', 'Age 16+'],
    outcomes: ['GP Rating Certification', 'Immediate sea service readiness'],
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
    requirements: ['Valid medical certificate', 'Seafarer record'],
    outcomes: ['IMO STCW Certificate', 'Passage planning mastery'],
    image: '/course-ecdis.jpg',
  },
];

const newsItems = [
  {
    title: 'Global Shipping Giant Signs Guaranteed Cadet Placement Agreement with MSTI',
    content: 'In a landmark development for Sri Lankan maritime education, MSTI has signed a comprehensive cadet placement agreement with one of the world\'s largest shipping conglomerates. The agreement guarantees employment for all graduating cadets from the Officer Cadetship Programme, marking a significant milestone in the academy\'s mission to provide world-class maritime education and career pathways.',
    excerpt: 'MSTI signs guaranteed placement agreement with global shipping giant, securing maritime careers for all graduating cadets.',
    category: 'News',
    featured: true,
    author: 'MSTI Editorial',
    tags: ['placement', 'cadetship', 'partnership'],
    publishedAt: new Date('2026-08-15'),
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
  },
  {
    title: 'MSTI Achieves ISO 9001:2015 Certification for Maritime Training Excellence',
    content: 'The Maritime Skills and Training Institute (MSTI) has been awarded the prestigious ISO 9001:2015 certification, recognizing our commitment to quality management systems in maritime education. This achievement underscores our dedication to maintaining the highest standards of training and student development.',
    excerpt: 'MSTI awarded ISO 9001:2015 certification recognizing excellence in maritime training standards.',
    category: 'Achievement',
    featured: false,
    author: 'MSTI Editorial',
    tags: ['certification', 'ISO', 'quality'],
    publishedAt: new Date('2026-07-22'),
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=600',
  },
  {
    title: 'New State-of-the-Art Bridge Simulator Commissioned at MSTI Campus',
    content: 'MSTI proudly announces the commissioning of its newest full-mission ship bridge simulator, representing a $4.3 million investment in training infrastructure. The simulator features the latest ECDIS technology, realistic weather simulation, and multi-vessel scenario capability, providing cadets with unparalleled real-world training experience.',
    excerpt: 'New $4.3M full-mission bridge simulator enhances cadet training at MSTI campus.',
    category: 'Announcement',
    featured: false,
    author: 'MSTI Editorial',
    tags: ['simulator', 'facilities', 'technology'],
    publishedAt: new Date('2026-06-10'),
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
  },
  {
    title: 'MSTI Cadets Excel at International Maritime Competition 2026',
    content: 'A team of MSTI cadets has returned with top honors from the 2026 International Maritime Skills Competition held in Singapore. The team secured gold medals in navigation accuracy, emergency response procedures, and marine engineering diagnostics, outperforming 45 competing academies from 28 countries.',
    excerpt: 'MSTI cadets win gold at International Maritime Skills Competition in Singapore.',
    category: 'Achievement',
    featured: false,
    author: 'MSTI Editorial',
    tags: ['competition', 'achievement', 'international'],
    publishedAt: new Date('2026-05-18'),
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600',
  },
  {
    title: 'July 2026 Intake: Applications Now Open for Officer Cadetship',
    content: 'MSTI is now accepting applications for the July 2026 intake of our flagship Officer Cadetship Programme. Limited seats are available. Eligible candidates must be between 17-25 years of age with minimum GCE A/L qualifications. Early applications are strongly encouraged as seats fill rapidly. Application deadline: May 31, 2026.',
    excerpt: 'Applications open for July 2026 Officer Cadetship intake. Limited seats available.',
    category: 'Bulletin',
    featured: false,
    author: 'Admissions Office',
    tags: ['admissions', 'cadetship', 'intake'],
    publishedAt: new Date('2026-04-01'),
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600',
  },
  {
    title: 'Partnership with Port Authority of Sri Lanka for Practical Training',
    content: 'MSTI has formalized a strategic partnership with the Port Authority of Sri Lanka to provide cadets with hands-on practical training at Colombo Port. This collaboration will give students direct exposure to port operations, vessel berthing procedures, and cargo handling — skills that will set them apart in the global maritime job market.',
    excerpt: 'New partnership with Port Authority of Sri Lanka provides cadets with hands-on port training.',
    category: 'News',
    featured: false,
    author: 'MSTI Editorial',
    tags: ['partnership', 'port', 'practical training'],
    publishedAt: new Date('2026-03-12'),
    image: 'https://images.unsplash.com/photo-1504083898675-c896ecdae86e?w=600',
  },
];

const seedDB = async () => {
  try {
    const connectDB = require('./config/db');
    await connectDB();
    console.log('🗑️  Clearing existing data...');
    await Course.deleteMany({});
    await News.deleteMany({});
    await User.deleteMany({});
    await SiteSettings.deleteMany({});

    console.log('👤 Seeding default admin user...');
    await User.create(defaultAdmin);
    console.log(`✅ Admin created: admin@msti.lk / admin123`);

    console.log('⚙️ Seeding default site settings...');
    await SiteSettings.create(defaultSettings);

    console.log('🌱 Seeding courses...');
    await Course.insertMany(courses);

    console.log('🌱 Seeding news...');
    await News.insertMany(newsItems);

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seed error:', error);
  }
};

if (require.main === module) {
  seedDB().then(() => process.exit(0));
} else {
  module.exports = seedDB;
}
