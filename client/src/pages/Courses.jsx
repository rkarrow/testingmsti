import { useState } from 'react'
import { FiClock, FiArrowRight, FiCheckCircle, FiShield, FiBook, FiAward, FiAnchor } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'

const officerCadetPrograms = [
  {
    title: 'Navigation Officer Cadet',
    overview: "The life of a navigation officer cadet or deck cadet is adventurous and rewarding. When in charge of the navigational watch one must undertake responsibilities while also being a trustworthy individual. It is undoubtedly the ideal learning experience in seafaring and marine engineering in Sri Lanka, which is an essential step in a cadet's journey towards becoming a Ship's Captain.\n\nIn addition to the prospect of adventure at sea, a navigation officer cadet will receive an attractive tax-free remuneration in US dollars. As work is assigned on a contractual basis, cadets taking seaman courses can also maintain a healthy work-life balance while planning a productive retirement.",
    journey: [
      'Phase I — Residential, shore-based training (6 months)',
      'Phase II — On-board training (12 months)',
      'Phase III — Preparatory course for Officer in Charge of a Navigational Watch, Class III (6 months)',
    ],
    requirements: [
      'GCE O/L passes in 6 subjects, including a credit pass for English',
      'GCE A/L in the Maths stream (2 passes) or Bio Science stream (2 passes), with a pass in Physics or Combined Maths — or the relevant Technology-stream "S" pass combinations specified by DGMS',
      'Age 18 to 24',
      'Mental and physical fitness',
      '6/6 vision and colour vision',
    ],
    outcome: 'On completing the programme and the ministry exam, cadets qualify to sail as Third Officer on foreign-going ships.',
    careerSea: 'Third Officer → Second Officer → Chief Officer → Captain',
    careerAshore: 'Harbour Pilot, Marine Superintendent, Shipping Administrator, Port State Controller, Harbour Master, Crew Manager, Maritime Educator'
  },
  {
    title: 'Engineering Officer Cadet',
    overview: "A trained marine engineering officer must ensure the smooth operation of the ship's propulsion plants and support systems during the entire seafaring process. Experiencing career growth, an engineering officer is also offered excellent tax-free remuneration at an early stage of the career. As in the case of a navigation officer, an engineering officer will also work on a contract basis which makes it easier to plan work and family life.",
    journey: [
      'Phase I — Residential, shore-based training at the Institute (12 months)',
      'Phase II — Industrial training (9 months)',
      'Phase III — Onboard training (12 months)',
      'Phase IV — Preparatory course for Officer in Charge of an Engineering Watch, Class III (4 months)',
    ],
    requirements: [
      'GCE O/L passes in 6 subjects, including a credit pass for English',
      'GCE A/L in the Maths stream (2 passes) or Bio Science stream (2 passes), with a pass in Physics or Combined Maths — or the equivalent Technology-stream "S" pass combinations',
      'Age 18 to 24',
      'Mental and physical fitness',
      '6/6 vision and colour vision',
    ],
    outcome: 'On completing the programme and the ministry exam, cadets receive a Class III certificate of competency, qualifying them to serve as Third or Fourth Engineer on a foreign-going ship.',
    careerSea: 'Fourth Engineer → Third Engineer → Second Engineer → Chief Engineer',
    careerAshore: 'Maintenance Engineer (star-class hotels), Ships & Industrial Surveyor, Technical Superintendent, Maritime Educator, Ship Repairs/Construction'
  }
]

const ratingPrograms = [
  {
    title: 'Deck Rating',
    overview: 'Working on the deck while seafaring requires continuous vigilance. Ensuring the protection of the cargo, and carrying out navigational, security and maintenance work are also areas that will be perfected at the end of the best rating training course in Sri Lanka.',
    requirements: '6 "S" passes at GCE O/L including Science, Maths & English; age 18+ at recruitment; demonstrated medical fitness.',
    careerPath: 'Ordinary Seaman at sea, progressing with experience and qualification toward Captain.',
  },
  {
    title: 'Engine Rating',
    overview: 'Upon completion of this course, participants will gain the ability to single-handedly and collectively manage maintenance work in the engine room and on board a ship while seafaring... and assist the marine engineers.',
    requirements: '6 "S" passes at GCE O/L including Science, Maths & English; age 18+ at recruitment; demonstrated medical fitness.',
    careerPath: 'Engine Rating, with the potential to progress toward Chief Engineer with training and dedication.',
  },
  {
    title: 'Electro-Technical Rating (ETR)',
    overview: 'The Electro-Technical Rating Programme equips candidates with the technical knowledge and hands-on skills required to serve as Electro-Technical Ratings aboard modern merchant vessels, meeting current STCW requirements for electrical, electronic, instrumentation and control systems.',
    requirements: 'GCE O/L passes; minimum age 18; medical fitness and eyesight (including colour vision) per STCW; interview if required.',
    careerPath: 'Trainee Electro-Technical Rating → Electrical/Instrumentation Maintenance Technician, ship-repair or marine power-generation roles → with experience, advancement toward Electro-Technical Officer.',
  },
  {
    title: 'Catering Rating',
    overview: 'Specialized training for those interested in joining the maritime hospitality sector. Practical training is offered at a partner star-class hotel.',
    requirements: 'GCE O/L passes; minimum age 18; demonstrated medical fitness.',
    careerPath: 'Catering Rating Programme → theory and practical training at a star-class hotel → Cook.',
  }
]

const shortCourses = {
  stcw: [
    'AFF — Proficiency in Advanced Fire Fighting',
    'Refreshing & Updating for Advanced Fire Fighting (AFF)',
    'EFA — Proficiency in Elementary First Aid',
    'FPFF — Proficiency in Fire Prevention & Fire Fighting',
    'MFA — Proficiency in Medical First Aid',
    'Refreshing & Updating for Medical First Aid (MFA)',
    'PSCRB — Proficiency in Survival Craft & Rescue Boats other than Fast Rescue Boats',
    'Refreshing & Updating for PSCRB',
    'PSSR — Proficiency in Personal Safety & Social Responsibilities',
    'PST — Proficiency in Personal Survival Techniques',
    'Refresher & Updating for Fire Prevention & Fire-Fighting',
    'Revalidation Course for Deck Officers of Ships of 500GT or More — Operational Level',
    'SDSD — Proficiency in Security Training for Seafarers with Designated Security Duties'
  ],
  nonStcw: [
    'Crowd Management',
    'Certificate of Proficiency Deck/Engine (COP)',
    'Preparatory Course for Able Seafarer – Deck (COP Deck)',
    'Preparatory Course for Able Seafarer – Engine (COP Engine)',
    'Basic Short Courses (BST: Fire Prevention, PST, PSSR, EFA)',
    'Advanced Short Courses (Advanced Fire Fighting, Medical First Aid, PSCRB, Ship Security Officer)',
    'Refreshing & Updating Basic Courses',
    'Refresher & Updating Advanced Courses',
    'ROP — Radar Observation and Plotting',
    'SSO — Proficiency as Ship Security Officer',
    'SSA — Proficiency in Ship Security Awareness',
    'Passenger Ship Crisis Management & Human Behaviour'
  ],
  simulator: [
    'MEOL — Maritime English Language Course, Operational Level',
    'MESL — Maritime English Language Course, Support Level',
    'Engine Room Simulator, Operational Level',
    'ARPA — Automatic Radar Plotting Aids',
    'ECDIS — Electronic Chart Display & Information System',
    'ENS — Electronic Navigation Systems',
    'NWKS — Navigation Watch Keeping Simulator, Operational Level',
    'ROP — Radar Observation & Plotting',
    'RS — Radar Simulator',
    'ECDIS Type-Specific — Safe Bridge',
    'ECDIS Type-Specific — Furuno'
  ],
  customized: [
    'COLREGS',
    'HAZMAT',
    'Heavy Lift Operation Training Course',
    'VHF Communication',
    'AIDA Orientation (AIDA Cruises)',
    'Chart Symbols & Abbreviation',
    'Elementary Trauma Care',
    'IALA Maritime Buoyage System',
    'Introduction to Fire Safety & Survival at Sea',
    'Safety Awareness Course (Swire Shipping)'
  ]
}

export default function Courses() {
  const [activeTab, setActiveTab] = useState('officer')
  const [activeShortCourseTab, setActiveShortCourseTab] = useState('stcw')

  return (
    <div className="pt-[72px]">
      {/* HERO */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600"
            alt="Maritime Courses"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/90 to-navy-950" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge-blue mb-4 mx-auto">Courses & Training Programs</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            MSTI Maritime Training Programmes
          </h1>
          <p className="text-navy-300 text-lg leading-relaxed max-w-3xl mx-auto">
            Choose your pathway from our comprehensive range of maritime programmes, from Officer Cadetships to Ratings and STCW Short Courses.
          </p>
        </div>
      </section>

      {/* TABS */}
      <section className="bg-navy-950 border-b border-navy-900 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('officer')}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'officer' ? 'border-blue-500 text-blue-400' : 'border-transparent text-navy-400 hover:text-white'}`}
            >
              Officer Cadet Programs
            </button>
            <button
              onClick={() => setActiveTab('rating')}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'rating' ? 'border-blue-500 text-blue-400' : 'border-transparent text-navy-400 hover:text-white'}`}
            >
              Rating Training Programs
            </button>
            <button
              onClick={() => setActiveTab('short')}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'short' ? 'border-blue-500 text-blue-400' : 'border-transparent text-navy-400 hover:text-white'}`}
            >
              Short Courses
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-navy-950 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* OFFICER CADET PROGRAMS */}
          {activeTab === 'officer' && (
            <div className="space-y-16">
              {officerCadetPrograms.map((program, idx) => (
                <div key={idx} className="bg-navy-900 border border-navy-800 rounded-2xl p-6 md:p-10 shadow-xl">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <FiAnchor className="text-blue-500" /> {program.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    {program.overview.split('\n\n').map((para, i) => (
                      <p key={i} className="text-navy-300 leading-relaxed mb-4">{para}</p>
                    ))}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <FiClock className="text-blue-400" /> Your Journey
                      </h3>
                      <ul className="space-y-3">
                        {program.journey.map((phase, i) => (
                          <li key={i} className="flex items-start gap-3 text-navy-300 text-sm bg-navy-800/50 p-3 rounded-lg border border-navy-700/50">
                            <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">{i+1}</span>
                            <span className="mt-0.5">{phase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <FiCheckCircle className="text-green-400" /> Entry Requirements
                      </h3>
                      <ul className="space-y-2 mb-8">
                        {program.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3 text-navy-300 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-2" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-xl">
                        <h4 className="text-blue-400 font-bold text-sm mb-2">Outcome</h4>
                        <p className="text-navy-300 text-sm mb-4">{program.outcome}</p>
                        
                        <h4 className="text-blue-400 font-bold text-sm mb-1">Career Paths at Sea</h4>
                        <p className="text-navy-300 text-sm mb-4">{program.careerSea}</p>
                        
                        <h4 className="text-blue-400 font-bold text-sm mb-1">Career Paths Ashore</h4>
                        <p className="text-navy-300 text-sm">{program.careerAshore}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* RATING TRAINING PROGRAMS */}
          {activeTab === 'rating' && (
            <div className="grid md:grid-cols-2 gap-8">
              {ratingPrograms.map((program, idx) => (
                <div key={idx} className="bg-navy-900 border border-navy-800 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-4 text-blue-400">{program.title}</h3>
                  <p className="text-navy-300 text-sm leading-relaxed mb-6">{program.overview}</p>
                  
                  <div className="mt-auto space-y-6">
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                        <FiCheckCircle className="text-green-400" /> Entry Standards
                      </h4>
                      <p className="text-navy-400 text-sm bg-navy-800/50 p-3 rounded border border-navy-700/50">{program.requirements}</p>
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                        <FiAward className="text-amber-400" /> Career Path
                      </h4>
                      <p className="text-navy-400 text-sm bg-navy-800/50 p-3 rounded border border-navy-700/50">{program.careerPath}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SHORT COURSES */}
          {activeTab === 'short' && (
            <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 md:p-10 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-8">Short Courses Catalogue</h2>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { id: 'stcw', label: 'STCW Courses' },
                  { id: 'nonStcw', label: 'Non-STCW Courses' },
                  { id: 'simulator', label: 'Simulator Training' },
                  { id: 'customized', label: 'Customized Training' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveShortCourseTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeShortCourseTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-navy-800 text-navy-300 hover:text-white hover:bg-navy-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {shortCourses[activeShortCourseTab].map((course, idx) => (
                  <div key={idx} className="bg-navy-800/50 border border-navy-700/50 rounded-xl p-4 flex items-start gap-3">
                    <FiBook className="text-blue-500 mt-1 shrink-0" />
                    <span className="text-navy-200 text-sm">{course}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <p className="text-amber-400/90 text-sm flex items-start gap-2">
                  <FiShield className="mt-1 shrink-0" />
                  Note: To register or inquire about course schedules and fees for any of the short courses listed above, please contact our admissions desk.
                </p>
                <Link to="/contact" className="mt-4 inline-block bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-4 py-2 rounded text-sm transition-colors">
                  Contact Admissions
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Start Your Maritime Journey?"
        subtitle="Applications for our next intake are now open. Join a legacy of maritime excellence."
        primaryLabel="Apply Now"
        primaryTo="/contact"
        secondaryLabel="View Student Life"
        secondaryTo="/about"
      />
    </div>
  )
}
