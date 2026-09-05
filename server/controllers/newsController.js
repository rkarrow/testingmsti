const News = require('../models/News');

// GET all news
exports.getAllNews = async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    let query = { isPublished: true };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    let newsQuery = News.find(query).sort({ publishedAt: -1 });
    if (limit) newsQuery = newsQuery.limit(parseInt(limit));

    const news = await newsQuery;
    res.json({ success: true, count: news.length, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
