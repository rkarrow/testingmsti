const defaultNews = [
  {
    _id: 'n1',
    title: 'Global Shipping Giant Signs Guaranteed Cadet Placement Agreement with MSTI',
    content: 'In a landmark development for Sri Lankan maritime education, MSTI has signed a comprehensive cadet placement agreement with one of the world\'s largest shipping conglomerates. The agreement guarantees employment for all graduating cadets from the Officer Cadetship Programme.',
    excerpt: 'MSTI signs guaranteed placement agreement with global shipping giant, securing maritime officer careers for all graduating cadets.',
    category: 'News',
    featured: true,
    author: 'MSTI Editorial',
    publishedAt: new Date('2026-08-15'),
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    isPublished: true,
  },
  {
    _id: 'n2',
    title: 'MSTI Achieves ISO 9001:2015 Certification for Maritime Training Excellence',
    content: 'The Maritime Skills and Training Institute (MSTI) has been awarded the prestigious ISO 9001:2015 certification, recognizing our commitment to quality management systems in maritime education.',
    excerpt: 'MSTI awarded ISO 9001:2015 certification recognizing international quality standards in merchant navy officer education.',
    category: 'Achievement',
    featured: false,
    author: 'Quality Assurance',
    publishedAt: new Date('2026-07-22'),
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=800',
    isPublished: true,
  },
  {
    _id: 'n3',
    title: 'New $4.2M Transas 180° Full Mission Bridge Simulator Commissioned',
    content: 'MSTI proudly announces the commissioning of its newest full-mission ship bridge simulator, representing a $4.2 million investment in training infrastructure.',
    excerpt: 'State-of-the-art radar, ECDIS and bridge simulation lab commissioned at MSTI campus to train seafarers for ocean vessels.',
    category: 'Announcement',
    featured: false,
    author: 'Simulator Lab',
    publishedAt: new Date('2026-06-10'),
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    isPublished: true,
  },
  {
    _id: 'n4',
    title: 'July 2026 Intake: Applications Now Open for Officer Cadetship',
    content: 'MSTI is now accepting applications for the July 2026 intake of our flagship Officer Cadetship Programme. Limited seats are available.',
    excerpt: 'Applications open for July 2026 Officer Cadetship intake. Limited seats available for qualified GCE A/L candidates.',
    category: 'Bulletin',
    featured: false,
    author: 'Admissions Office',
    publishedAt: new Date('2026-05-01'),
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800',
    isPublished: true,
  },
];

// GET all news
exports.getAllNews = async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    let query = { isPublished: true };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    let newsQuery = News.find(query).sort({ publishedAt: -1 });
    if (limit) newsQuery = newsQuery.limit(parseInt(limit));

    let news = await newsQuery;
    if (!news || news.length === 0) {
      news = defaultNews;
    }
    res.json({ success: true, count: news.length, data: news });
  } catch (error) {
    res.json({ success: true, count: defaultNews.length, data: defaultNews });
  }
};

// GET single news
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST create news
exports.createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json({ success: true, data: news });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT update news
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE news
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });
    res.json({ success: true, message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
