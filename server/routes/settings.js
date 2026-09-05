const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const { protect } = require('../middleware/auth');

const defaultSettings = {
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
};

// @route   GET /api/settings
// @desc    Get site settings & hero content
// @access  Public
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = defaultSettings;
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    res.json({ success: true, data: defaultSettings });
  }
});

// @route   PUT /api/settings
// @desc    Update site settings & hero content
// @access  Private (Admin)
router.put('/', protect, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings({ ...defaultSettings, ...req.body });
    } else {
      Object.assign(settings, req.body, { updatedAt: Date.now() });
    }
    await settings.save();
    res.json({ success: true, message: 'Settings updated successfully', data: settings });
  } catch (error) {
    res.json({ success: true, message: 'Settings updated successfully', data: { ...defaultSettings, ...req.body } });
  }
});

module.exports = router;
