// =============================================
// App.jsx — Routing & Layout Separation
// Public Pages use PublicLayout (Navbar, Footer, WA Float)
// Admin Page is completely standalone (Dedicated Admin Layout)
// =============================================
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'

import Beranda from './pages/Beranda.jsx'
import Produk from './pages/Produk.jsx'
import Jasa from './pages/Jasa.jsx'
import Portofolio from './pages/Portofolio.jsx'
import Blog from './pages/Blog.jsx'
import Tentang from './pages/Tentang.jsx'
import Kontak from './pages/Kontak.jsx'
import Admin from './pages/Admin.jsx'

// Layout khusus halaman publik (Memiliki Navbar, Footer, & WA Float)
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="public-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route Publik — Dibungkus PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/jasa" element={<Jasa />} />
          <Route path="/portofolio" element={<Portofolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/kontak" element={<Kontak />} />
        </Route>

        {/* Route Admin — Terpisah total dari Layout Publik */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
