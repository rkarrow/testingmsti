const defaultCourses = [
  {
    _id: '101',
    title: 'Officer & Rating Training',
    description: 'A comprehensive nautical science and pre-sea officer cadetship designed to develop world-class merchant navy officers.',
    shortDescription: 'Officer Cadet (Nautical Science / Pre-Sea)',
    category: 'Deck Department',
    duration: '24 Months',
    level: 'Degree',
    featured: true,
    intake: 'January & July',
    image: '/course-officer.jpg',
    isActive: true,
  },
  {
    _id: '102',
    title: 'Marine Engineering Cadetship',
    description: 'An intensive marine engineering programme focusing on ship propulsion systems, marine automation, and engine room operations.',
    shortDescription: 'Class IV Marine Engineer Officer CoC Track',
    category: 'Engine Propulsion',
    duration: '36 Months',
    level: 'Degree',
    featured: true,
    intake: 'January & July',
    image: '/course-engineering.jpg',
    isActive: true,
  },
  {
    _id: '103',
    title: 'Pre-Sea General Purpose Rating',
    description: 'Practical seamanship, firefighting, survival craft, and deck machinery operations for general purpose maritime ratings.',
    shortDescription: 'Seamanship, Firefighting & Lifeboat Proficiency',
    category: 'Pre-Sea General',
    duration: '9 Months',
    level: 'Diploma',
    featured: true,
    intake: 'March & September',
    image: '/course-rating.jpg',
    isActive: true,
  },
  {
    _id: '104',
    title: 'ECDIS & Simulator Lab',
    description: 'STCW-compliant electronic chart display, radar navigation, and full-mission bridge simulator competency modules.',
    shortDescription: 'IMO STCW Modular & Mandatory Competencies',
    category: 'STCW Modular',
    duration: 'Fast Track',
    level: 'Certificate',
    featured: true,
    intake: 'Monthly',
    image: '/course-ecdis.jpg',
    isActive: true,
  },
];

// GET all courses
exports.getAllCourses = async (req, res) => {
  try {
    const { category, featured, limit, includeInactive } = req.query;
    let query = {};
    if (includeInactive !== 'true') {
      query.isActive = true;
    }
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    let coursesQuery = Course.find(query).sort({ createdAt: -1 });
    if (limit) coursesQuery = coursesQuery.limit(parseInt(limit));

    let courses = await coursesQuery;
    if (!courses || courses.length === 0) {
      courses = defaultCourses;
    }
    res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.json({ success: true, count: defaultCourses.length, data: defaultCourses });
  }
};

// GET single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST create course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/courses/seed - Seed default 4 courses
exports.seedCourses = async (req, res) => {
  try {
    await Course.deleteMany({});
    const created = await Course.insertMany(defaultCourses.map(({ _id, ...rest }) => rest));
    res.json({ success: true, count: created.length, data: created });
  } catch (error) {
    res.json({ success: true, count: defaultCourses.length, data: defaultCourses });
  }
};
