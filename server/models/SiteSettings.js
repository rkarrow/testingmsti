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

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
