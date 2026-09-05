import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import News from './pages/News'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminHero from './pages/admin/AdminHero'
import AdminCourses from './pages/admin/AdminCourses'
import AdminNews from './pages/admin/AdminNews'
import AdminContacts from './pages/admin/AdminContacts'

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
        <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
