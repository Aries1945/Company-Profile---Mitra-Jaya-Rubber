// =============================================
// Navbar.jsx — Public Navigation Bar
// Tokopedia / Shopee clean marketplace style (No emojis)
// =============================================
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/produk', label: 'Produk' },
  { to: '/jasa', label: 'Jasa' },
  { to: '/portofolio', label: 'Portofolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/kontak', label: 'Kontak' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/produk?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/Logo/LOGO.png" alt="Mitra Jaya Rubber" className="navbar-logo-img" />
          <span className="logo-text">Mitra Jaya <span className="logo-accent">Rubber</span></span>
        </Link>

        {/* Search Bar Desktop */}
        <form onSubmit={handleSearch} className="nav-search-form desktop-only">
          <input
            type="text"
            placeholder="Cari produk rubber teknik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="nav-search-input"
          />
          <button type="submit" className="nav-search-btn" aria-label="Cari">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </button>
        </form>

        {/* Nav Links Desktop */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="nav-link">{link.label}</Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Toggle Mobile */}
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu Navigasi"
        >
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="mobile-menu">
          <form onSubmit={handleSearch} className="nav-search-form mobile-search-form">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="nav-search-input"
            />
            <button type="submit" className="nav-search-btn" aria-label="Cari">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
          </form>

          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
