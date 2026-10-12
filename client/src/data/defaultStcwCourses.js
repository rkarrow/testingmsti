export const defaultStcwCourses = [
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
          {
            id: "1.1",
            code: "FPFF",
            name: "Fire Prevention and Fire Fighting",
            slug: "/stcw-courses/basic-short-courses/fpff",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800",
            duration: "3 Days",
            description: "Essential training providing basic knowledge and practical fire safety skills for seafarers under STCW Section A-VI/1-2.",
            requirements: "Valid Seafarer Medical Fitness Certificate\nMinimum 16 years of age",
            outcomes: "IMO STCW Certificate of Proficiency in Fire Prevention and Fire Fighting approved by DGMS Sri Lanka."
          },
          {
            id: "1.2",
            code: "PST",
            name: "Personal Survival Techniques",
            slug: "/stcw-courses/basic-short-courses/pst",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
            duration: "2.5 Days",
            description: "Equips seafarers with life-saving skills, emergency abandonment procedures, and survival craft operation at sea under STCW Section A-VI/1-1.",
            requirements: "Valid Seafarer Medical Fitness Certificate\nMinimum 16 years of age",
            outcomes: "IMO STCW Certificate of Proficiency in Personal Survival Techniques."
          },
          {
            id: "1.3",
            code: "PSSR",
            name: "Personal Safety and Social Responsibilities",
            slug: "/stcw-courses/basic-short-courses/pssr",
            image: "https://images.unsplash.com/photo-1505705694340-019e1e335916?w=800",
            duration: "2 Days",
            description: "Prepares seafarers for human relationships, shipboard social dynamics, safety policies, and hazard prevention under STCW Section A-VI/1-4.",
            requirements: "Valid Medical Fitness\nMinimum 16 years of age",
            outcomes: "IMO STCW Certificate of Proficiency in PSSR."
          },
          {
            id: "1.4",
            code: "EFA",
            name: "Elementary First Aid",
            slug: "/stcw-courses/basic-short-courses/efa",
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800",
            duration: "2.5 Days",
            description: "Hands-on medical training on emergency first aid, CPR, bleeding control, and shock management aboard ship under STCW Section A-VI/1-3.",
            requirements: "Valid Medical Fitness",
            outcomes: "IMO STCW Certificate of Proficiency in Elementary First Aid."
          },
          {
            id: "1.5",
            code: "SDSD",
            name: "Security Duties / Security Awareness",
            slug: "/stcw-courses/basic-short-courses/sdsd",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
            duration: "2 Days",
            description: "Specialized maritime security training for seafarers with designated shipboard security responsibilities under ISPS Code & STCW Section A-VI/6-2.",
            requirements: "Continuous Discharge Certificate (CDC) or Pre-Sea Registration",
            outcomes: "IMO STCW Certificate of Proficiency in Designated Security Duties (SDSD)."
          },
          {
            id: "1.6",
            code: "MESL",
            name: "MESL — Maritime English Support Level",
            slug: "/stcw-courses/basic-short-courses/mesl",
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
            duration: "5 Days",
            description: "Standard Marine Communication Phrases (SMCP) and maritime English proficiency for ratings and support level crew.",
            requirements: "Basic English literacy",
            outcomes: "Certification in Maritime English Language Competence (Support Level)."
          },
          {
            id: "1.7",
            code: "MEOL",
            name: "MEOL — Maritime English Operational Level",
            slug: "/stcw-courses/basic-short-courses/meol",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
            duration: "5 Days",
            description: "Advanced maritime English and technical communication for operational watchkeeping officers per IMO Model Course 3.17.",
            requirements: "Officer Cadet or Watchkeeping Officer candidate",
            outcomes: "Certification in Maritime English Language Competence (Operational Level)."
          }
        ]
      },
      {
        category_id: "advance-short-courses",
        title: "Advance Short Courses",
        slug: "/stcw-courses/advance-short-courses",
        items: [
          {
            id: "2.1",
            code: "MFA",
            name: "Medical First Aid",
            slug: "/stcw-courses/advance-short-courses/mfa",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
            duration: "4 Days",
            description: "Comprehensive medical and trauma care training for designated first aid personnel aboard ships under STCW Section A-VI/4-1.",
            requirements: "Holds Elementary First Aid (EFA) Certificate\nApproved seagoing experience",
            outcomes: "IMO STCW Certificate of Proficiency in Medical First Aid (MFA)."
          },
          {
            id: "2.2",
            code: "AFF",
            name: "Advanced Fire Fighting",
            slug: "/stcw-courses/advance-short-courses/aff",
            image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800",
            duration: "5 Days",
            description: "Advanced command, control, and tactical management of fire-fighting operations aboard ship under STCW Section A-VI/3.",
            requirements: "Holds Basic Fire Prevention & Fire Fighting (FPFF) Certificate\nMinimum 6 months sea service",
            outcomes: "IMO STCW Certificate of Proficiency in Advanced Fire Fighting (AFF)."
          },
          {
            id: "2.3",
            code: "PSCRB",
            name: "Proficiency in Survival Craft and Rescue Boats",
            slug: "/stcw-courses/advance-short-courses/pscrb",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
            duration: "5 Days",
            description: "Practical launching, operating, and managing survival craft, lifeboats, and rescue boats under STCW Section A-VI/2-1.",
            requirements: "Holds PST Certificate\nMinimum 6 months approved sea service",
            outcomes: "IMO STCW Certificate of Proficiency in Survival Craft and Rescue Boats (PSCRB)."
          },
          {
            id: "2.4",
            code: "SSO",
            name: "Ship Security Officer",
            slug: "/stcw-courses/advance-short-courses/sso",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            duration: "3 Days",
            description: "Training for officers designated to perform Ship Security Officer duties in compliance with the ISPS Code and STCW Section A-VI/5.",
            requirements: "Minimum 12 months approved seagoing service as officer or cadet",
            outcomes: "IMO STCW Certificate of Proficiency as Ship Security Officer (SSO)."
          }
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
        title: "Other Courses",
        slug: "/stcw-courses/other-courses",
        items: [
          {
            id: "5.1",
            code: "CRISIS",
            name: "Crisis Management",
            slug: "/stcw-courses/other-courses/crisis-management",
            image: "https://images.unsplash.com/photo-1508873696983-2df5293cb44b?w=800",
            duration: "3 Days",
            description: "Crisis management, human behavior, and passenger safety training for senior officers and key personnel aboard passenger ships.",
            requirements: "Serving officer or senior rating",
            outcomes: "Certificate in Crisis Management and Human Behavior Training."
          },
          {
            id: "5.2",
            code: "CROWD",
            name: "Crowd Management",
            slug: "/stcw-courses/other-courses/crowd-management",
            image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
            duration: "2 Days",
            description: "Crowd control, muster station management, and emergency passenger assistance training under STCW Section A-V/2.",
            requirements: "Seafarer serving aboard passenger or cruise ships",
            outcomes: "Certificate of Proficiency in Crowd Management."
          },
          {
            id: "5.3",
            code: "HAZMAT",
            name: "HAZMAT",
            slug: "/stcw-courses/other-courses/hazmat",
            image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800",
            duration: "3 Days",
            description: "Safe handling, stowage, segregation, and emergency response for hazardous materials and dangerous goods under IMDG Code.",
            requirements: "Deck / Engine crew or cargo handling personnel",
            outcomes: "Certificate in Hazardous Materials (HAZMAT / IMDG Code) Handling."
          },
          {
            id: "5.4",
            code: "HEAVY_LIFT",
            name: "Heavy Lift Training",
            slug: "/stcw-courses/other-courses/heavy-lift-training",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
            duration: "4 Days",
            description: "Specialized operational training on heavy lift crane operation, rigging safety, stability calculations, and cargo securing.",
            requirements: "Cargo handling officers, crane operators, and deck ratings",
            outcomes: "Certificate in Heavy Lift Cargo Operations."
          },
          {
            id: "5.5",
            code: "SAFETY_AWARENESS",
            name: "Safety Awareness Course",
            slug: "/stcw-courses/other-courses/safety-awareness",
            image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800",
            duration: "2 Days",
            description: "Safety awareness, risk assessment, toolbox talks, and safe working habits for offshore and commercial maritime vessels.",
            requirements: "Open to all maritime personnel",
            outcomes: "Certificate in Maritime Safety Awareness."
          }
        ]
      }
    ]
  }
];
