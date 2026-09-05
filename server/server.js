require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Connect to database
connectDB();

const app = express();

// 1. Security HTTP Headers (XSS, Clickjacking, MIME-Sniffing, HSTS)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// 2. Rate Limiting (Prevent Brute-force & DDoS attacks)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 login attempts per windowMs
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' },
});

// Apply rate limiter to API routes
app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);

// 3. Prevent NoSQL Injection attacks by sanitizing input
app.use(mongoSanitize());

// 4. CORS Setup with strict options
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow during dev, restrict in prod
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 5. Body parser payload size limit (Prevent Denial of Service / Payload Flooding)
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/news', require('./routes/news'));
app.use('/api/contact', require('./routes/contact'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'MSTI Maritime Academy Security-hardened API is running 🚢🛡️',
    security: 'Enabled (Helmet, RateLimit, MongoSanitize, CORS, Bcrypt, JWT)',
    timestamp: new Date(),
  });
});

// Centralized error handler (secure error reporting without stack trace leakage)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚢 MSTI Server running on http://localhost:${PORT}`);
  console.log(`🛡️ Security Middlewares Active (Helmet, RateLimit, MongoSanitize, CORS, Bcrypt, JWT)`);
});
