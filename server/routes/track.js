const express = require('express')
const router = express.Router()
const PageView = require('../models/PageView')
const { protect } = require('../middleware/auth')

// ─── Helper: Parse User-Agent ───────────────────────────────────────────────
function parseUserAgent(ua = '') {
  const uaLower = ua.toLowerCase()

  // Device
  let device = 'desktop'
  if (/mobile|android.*mobile|iphone|ipod|blackberry|windows phone/i.test(ua)) {
    device = 'mobile'
  } else if (/ipad|android(?!.*mobile)|tablet/i.test(ua)) {
    device = 'tablet'
  }

  // Browser
  let browser = 'Other'
  if (/edg\//i.test(ua))              browser = 'Edge'
  else if (/samsungbrowser/i.test(ua)) browser = 'Samsung Internet'
  else if (/opr\//i.test(ua))         browser = 'Opera'
  else if (/chrome/i.test(ua))        browser = 'Chrome'
  else if (/safari/i.test(ua))        browser = 'Safari'
  else if (/firefox/i.test(ua))       browser = 'Firefox'
  else if (/msie|trident/i.test(ua))  browser = 'Internet Explorer'

  // Handle Android Webview
  if (/wv\)/i.test(ua) && /android/i.test(ua)) browser = 'Android Webview'

  // OS
  let os = 'Other'
  if (/android/i.test(ua))        os = 'Android'
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS'
  else if (/windows nt/i.test(ua)) os = 'Windows'
  else if (/mac os x/i.test(ua))   os = 'Macintosh'
  else if (/linux/i.test(ua))      os = 'Linux'
  else if (/cros/i.test(ua))       os = 'Chrome OS'

  return { device, browser, os }
}

// ─── POST /api/track ─────────────────────────────────────────────────────────
// Public endpoint — called by frontend on every page visit
router.post('/', async (req, res) => {
  try {
    const { page, referrer, sessionId } = req.body
    if (!page) return res.status(400).json({ success: false })

    const ua = req.headers['user-agent'] || ''
    const { device, browser, os } = parseUserAgent(ua)

    // Get client IP
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim()

    // Parse referrer source
    let refSource = 'direct'
    if (referrer) {
      try {
        const refHost = new URL(referrer).hostname.replace('www.', '')
        if (refHost && refHost !== new URL(req.headers.origin || 'http://localhost').hostname) {
          refSource = refHost
        }
      } catch (_) {}
    }

    await PageView.create({
      page,
      referrer: refSource,
      device,
      browser,
      os,
      sessionId: sessionId || '',
      ip,
      timestamp: new Date(),
    })

    res.json({ success: true })
  } catch (err) {
    // Silently fail — don't break the site
    res.json({ success: false })
  }
})

// ─── GET /api/track/analytics ─────────────────────────────────────────────────
// Admin-protected — returns aggregated analytics data
router.get('/analytics', protect, async (req, res) => {
  try {
    const { days = 30 } = req.query
    const since = new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000)
    const allTime = new Date('2020-01-01')

    // Total views (all time)
    const totalViews = await PageView.countDocuments()

    // Views in selected period
    const periodViews = await PageView.countDocuments({ timestamp: { $gte: since } })

    // Unique sessions (all time)
    const uniqueSessions = await PageView.distinct('sessionId', { sessionId: { $ne: '' } })
    const totalSessions = uniqueSessions.length

    // Unique sessions in period
    const periodSessions = await PageView.distinct('sessionId', { timestamp: { $gte: since }, sessionId: { $ne: '' } })

    // Top pages
    const topPages = await PageView.aggregate([
      { $group: { _id: '$page', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
      { $project: { page: '$_id', views: 1, _id: 0 } }
    ])

    // Device breakdown
    const devices = await PageView.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Browser breakdown
    const browsers = await PageView.aggregate([
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 }
    ])

    // OS breakdown
    const osStats = await PageView.aggregate([
      { $group: { _id: '$os', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 }
    ])

    // Top referrers / traffic sources
    const referrers = await PageView.aggregate([
      { $group: { _id: '$referrer', sessions: { $sum: 1 } } },
      { $sort: { sessions: -1 } },
      { $limit: 10 }
    ])

    // Daily trend (last 30 days)
    const dailyTrend = await PageView.aggregate([
      { $match: { timestamp: { $gte: since } } },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' },
            day: { $dayOfMonth: '$timestamp' }
          },
          views: { $sum: 1 },
          sessions: { $addToSet: '$sessionId' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
      {
        $project: {
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: {
                $dateFromParts: {
                  year: '$_id.year', month: '$_id.month', day: '$_id.day'
                }
              }
            }
          },
          views: 1,
          sessions: { $size: '$sessions' },
          _id: 0
        }
      }
    ])

    // Recent page views (last 20)
    const recent = await PageView.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .select('page device browser os referrer timestamp -_id')
      .lean()

    res.json({
      success: true,
      data: {
        summary: {
          totalViews,
          periodViews,
          totalSessions,
          periodSessions: periodSessions.length,
          days: parseInt(days),
        },
        topPages,
        devices,
        browsers,
        osStats,
        referrers,
        dailyTrend,
        recent,
      }
    })
  } catch (err) {
    console.error('Analytics error:', err)
    res.status(500).json({ success: false, message: 'Analytics fetch error' })
  }
})

module.exports = router
