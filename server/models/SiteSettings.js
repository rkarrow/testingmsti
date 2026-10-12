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
  
  // Dynamic Hero Slides Array
  heroSlides: [
    {
      image: { type: String },
      badge: { type: String },
      title: { type: String },
      subtitle: { type: String },
    }
  ],

  // Structured Training Programmes
  officerCadetPrograms: [
    {
      title: { type: String },
      category: { type: String, default: 'Officer Cadetship' },
      duration: { type: String },
      overview: { type: String },
      journey: [{ type: String }],
      requirements: [{ type: String }],
      outcome: { type: String },
      careerSea: { type: String },
      careerAshore: { type: String },
      image: { type: String },
    }
  ],

  ratingPrograms: [
    {
      title: { type: String },
      category: { type: String, default: 'Rating Training' },
      duration: { type: String },
      overview: { type: String },
      requirements: { type: String },
      careerPath: { type: String },
      image: { type: String },
    }
  ],

  shortCourses: {
    stcw: [{ type: String }],
    nonStcw: [{ type: String }],
    simulator: [{ type: String }],
    customized: [{ type: String }],
  },

  // Cadet Enrolment & Medical Standards
  cadetStandards: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      badge: "Admissions",
      title: "Cadet Enrolment & Medical Standards",
      description: "All prospective cadets must meet our enrolment requirements and pass a comprehensive medical examination conducted by an approved maritime medical examiner.",
      medicalTitle: "Medical Standards",
      medicalItems: [
        "Vision: Minimum 6/6 corrected or uncorrected",
        "Color vision: No red/green color blindness",
        "Hearing: Adequate for bridge communication",
        "Cardiovascular: No significant cardiac conditions",
        "BMI within acceptable maritime health range",
        "No disqualifying chronic medical conditions",
      ],
      enrolmentTitle: "Enrolment Requirements",
      academicRequirements: [
        "Minimum GCE A/L qualification (Science preferred)",
        "Mathematics & Physics for Engineering track",
        "English proficiency required",
      ],
      ageRequirements: [
        "Officer Cadetship: 17–25 years",
        "Marine Engineering: 17–25 years",
        "Short courses: 18+ years",
      ],
      documentRequirements: [
        "Certified copies of educational certificates",
        "Birth certificate",
        "National ID or passport",
        "Medical fitness certificate",
      ],
      placementTitle: "🎯 Guaranteed Placement",
      placementText: "All graduating cadets are guaranteed placement through our network of 50+ international shipping company partners.",
      ctaText: "Start Enrolment Process",
      ctaLink: "/contact",
    },
  },

  // Rating Enrolment & Medical Standards
  ratingStandards: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      badge: "Rating Admissions",
      title: "Rating Enrolment & Medical Standards",
      description: "Prospective rating candidates must meet entry standards and undergo medical fitness screening under Merchant Shipping guidelines to join Deck, Engine, and Catering training tracks.",
      medicalTitle: "Medical & Physical Standards",
      medicalItems: [
        "Vision: Minimum 6/6 (aided or unaided) with valid colour vision",
        "Physical fitness capable of shipboard deck & engine maintenance duties",
        "Adequate hearing for emergency siren and engine room alerts",
        "General physical fitness complying with DGMS standards",
        "Negative screening for communicable diseases",
      ],
      enrolmentTitle: "Rating Entry Requirements",
      academicRequirements: [
        "6 \"S\" passes at GCE O/L including Science, Mathematics & English",
        "Basic technical / vocational background preferred for Engine Ratings",
        "Food handling certification standard for Catering Ratings",
      ],
      ageRequirements: [
        "Minimum 18 years of age at the time of recruitment",
        "Upper age limit per DGMS Seafarer Regulations (typically 28-30 years)",
      ],
      documentRequirements: [
        "GCE O/L educational certificates",
        "National Identity Card (NIC) and valid Passport",
        "Police clearance report",
        "Pre-Sea medical fitness certificate by approved marine doctor",
      ],
      placementTitle: "⚓ Sea Service & Career Path",
      placementText: "Qualified ratings are placed aboard ocean-going commercial vessels with complete CDC (Continuous Discharge Certificate) endorsement and progression opportunities.",
      ctaText: "Apply for Rating Training",
      ctaLink: "/contact",
    },
  },

  // STCW Hierarchical Courses Structure
  stcwData: {
    type: mongoose.Schema.Types.Mixed,
    default: [
      {
        category_id: "stcw-courses",
        title: "STCW Courses",
        slug: "/stcw-courses",
        children: [
          {
            category_id: "basic-short-courses",
            title: "Basic Short Courses",
            slug: "/stcw-courses/basic-short-courses",
            items: [
              { id: "1.1", code: "FPFF", name: "Fire Prevention and Fire Fighting", slug: "/stcw-courses/basic-short-courses/fpff" },
              { id: "1.2", code: "PST", name: "Personal Survival Techniques", slug: "/stcw-courses/basic-short-courses/pst" },
              { id: "1.3", code: "PSSR", name: "Personal Safety and Social Responsibilities", slug: "/stcw-courses/basic-short-courses/pssr" },
              { id: "1.4", code: "EFA", name: "Elementary First Aid", slug: "/stcw-courses/basic-short-courses/efa" },
              { id: "1.5", code: "SDSD", name: "Security Duties / Security Awareness", slug: "/stcw-courses/basic-short-courses/sdsd" },
              { id: "1.6", code: "MESL", name: "MESL", slug: "/stcw-courses/basic-short-courses/mesl" },
              { id: "1.7", code: "MEOL", name: "MEOL", slug: "/stcw-courses/basic-short-courses/meol" }
            ]
          },
          {
            category_id: "advance-short-courses",
            title: "Advance Short Courses",
            slug: "/stcw-courses/advance-short-courses",
            items: [
              { id: "2.1", code: "MFA", name: "Medical First Aid", slug: "/stcw-courses/advance-short-courses/mfa" },
              { id: "2.2", code: "AFF", name: "Advanced Fire Fighting", slug: "/stcw-courses/advance-short-courses/aff" },
              { id: "2.3", code: "PSCRB", name: "Proficiency in Survival Craft and Rescue Boats", slug: "/stcw-courses/advance-short-courses/pscrb" },
              { id: "2.4", code: "SSO", name: "Ship Security Officer", slug: "/stcw-courses/advance-short-courses/sso" }
            ]
          },
          {
            category_id: "basic-refresher-course",
            title: "Basic Refresher Course",
            slug: "/stcw-courses/basic-refresher-course",
            items: []
          },
          {
            category_id: "advance-refresher-course",
            title: "Advance Refresher Course",
            slug: "/stcw-courses/advance-refresher-course",
            items: []
          },
          {
            category_id: "other-courses",
            title: "NON-STCW Courses",
            slug: "/stcw-courses/other-courses",
            items: [
              { id: "5.1", code: "CRISIS", name: "Crisis Management", slug: "/stcw-courses/other-courses/crisis-management" },
              { id: "5.2", code: "CROWD", name: "Crowd Management", slug: "/stcw-courses/other-courses/crowd-management" },
              { id: "5.3", code: "HAZMAT", name: "HAZMAT", slug: "/stcw-courses/other-courses/hazmat" },
              { id: "5.4", code: "HEAVY_LIFT", name: "Heavy Lift Training", slug: "/stcw-courses/other-courses/heavy-lift-training" },
              { id: "5.5", code: "SAFETY_AWARENESS", name: "Safety Awareness Course", slug: "/stcw-courses/other-courses/safety-awareness" }
            ]
          }
        ]
      }
    ]
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
  aboutHistoryHeading: {
    type: String,
    default: "MSTI is proud of its 39 years – plus history of expertise in maritime training and education.",
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

  // About Page Story Images (Collage)
  aboutStoryImages: [
    { type: String }
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
