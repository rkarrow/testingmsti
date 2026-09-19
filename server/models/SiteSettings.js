const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  // Hero Section
  heroBadge: {
    type: String,
    default: "⚓ FOUNDING EXCELLENCE SINCE 2002 • SRI LANKA'S PREMIER CADET CORPS",
  },
  heroTitle: {
    type: String,
    default: "The Premier Maritime Academy in Sri Lanka",
  },
  heroSubtitle: {
    type: String,
    default: "We aspire to become the premier training institute for maritime careers in Sri Lanka and overseas. Fully accredited merchant navy officer training under IMO STCW and DG Shipping.",
  },
  heroBgImage: {
    type: String,
    default: "/hero-image.jpg",
  },
  heroPrimaryCtaText: {
    type: String,
    default: "Explore Programs",
  },
  heroPrimaryCtaLink: {
    type: String,
    default: "/courses",
  },
  heroSecondaryCtaText: {
    type: String,
    default: "Book a Campus Visit",
  },
  heroSecondaryCtaLink: {
    type: String,
    default: "/contact",
  },

  // Stats
  stats: [
    {
      value: { type: String },
      label: { type: String },
    }
  ],

  // About Page Hero & Top Stats
  aboutHeroBadge: {
    type: String,
    default: "About MSTI",
  },
  aboutHeroTitle: {
    type: String,
    default: "About MSTI — The Flagship Maritime Academy in Sri Lanka",
  },
  aboutHeroSubtitle: {
    type: String,
    default: "Since our founding, MSTI has been at the forefront of maritime education in Sri Lanka, producing world-class officers and engineers who serve with distinction in the global maritime industry.",
  },
  aboutHeroBgImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600",
  },
  aboutStats: [
    {
      value: { type: String },
      label: { type: String },
    }
  ],

  // About Section
  aboutBadge: {
    type: String,
    default: "ABOUT US",
  },
  aboutTitle: {
    type: String,
    default: "The Premier Maritime Academy in Sri Lanka",
  },
  aboutDesc1: {
    type: String,
    default: "We aim to continuously contribute to the growth of individuals and organizations to ensure they are qualified to deliver results at the highest levels of performance. To do so, we engage in the most suitable solutions in training, assessment, and career development, delivering the best maritime courses Sri Lanka has to offer.",
  },
  aboutDesc2: {
    type: String,
    default: "Our goal at MSTI Maritime Academy is to be recognized worldwide as a top quality service provider to the international marine industry in maritime training, adhering to strict IMO guidelines and global merchant fleets.",
  },
  aboutLeaderName: {
    type: String,
    default: "Capt. Ayesha Fernando",
  },
  aboutLeaderRole: {
    type: String,
    default: "Valedictorian • Officer of the Watch (STCW II/1)",
  },
  aboutLeaderImage: {
    type: String,
    default: "/captain.jpg",
  },

  // About Page Full Details
  aboutMission: {
    type: String,
    default: "To continuously contribute to the growth of maritime professionals and organizations through world-class IMO-compliant training, cutting-edge bridge simulators, and rigorous seafarer development.",
  },
  aboutVision: {
    type: String,
    default: "To be recognized globally as Sri Lanka's premier benchmark institution for maritime education, officer cadetship, and merchant marine engineering excellence.",
  },
  aboutHistory: {
    type: String,
    default: "Founded in 1986, MSTI Maritime Academy is Sri Lanka's pioneer private maritime institute with a distinguished legacy spanning nearly four decades.",
  },

  // Leadership Team
  leadership: [
    {
      name: { type: String },
      role: { type: String },
      image: { type: String },
      rank: { type: String },
    }
  ],

  // Facilities
  facilities: [
    {
      title: { type: String },
      desc: { type: String },
      image: { type: String },
    }
  ],

  // Contact Info & Campus Branches
  contactAddress: {
    type: String,
    default: "No. 32, Station Road, Dehiwala 10350, Sri Lanka",
  },
  contactPhone: {
    type: String,
    default: "+94 11 747 6100",
  },
  contactEmail: {
    type: String,
    default: "helpdesk@msti.lk",
  },
  contactHours: {
    type: String,
    default: "Mon–Fri 8:30 AM – 5:30 PM",
  },
  kalutaraSouthAddress: {
    type: String,
    default: "No. 25, St. Sebastian Road, Kalutara South, Sri Lanka",
  },
  kalutaraNorthAddress: {
    type: String,
    default: "Mirishenawatta, Ethanamadala, Kalutara North, Sri Lanka",
  },

  // FAQs
  faqs: [
    {
      q: { type: String },
      a: { type: String },
    }
  ],

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
