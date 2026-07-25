// =============================================
// Footer.jsx — Public Footer
// No emojis, SVG icons only
// =============================================
import { Link } from 'react-router-dom'
import { COMPANY_CONTACT, getWhatsAppLink } from '../helpers.js'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <img src="/Logo/LOGO.png" alt="Mitra Jaya Rubber" className="footer-logo-img" />
            <span className="logo-text" style={{ color: 'white' }}>Mitra Jaya <span className="logo-accent">Rubber</span></span>
          </div>
          <p className="footer-desc">
            Manufaktur dan supplier komponen karet teknik industri terpercaya di Jakarta.
            Melayani pemesanan kustom sesuai spesifikasi teknis industri Anda.
          </p>
        </div>

        {/* Navigasi */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigasi</h4>
          <ul className="footer-links">
            <li><Link to="/">Beranda</Link></li>
            <li><Link to="/produk">Katalog Produk</Link></li>
            <li><Link to="/jasa">Layanan Jasa</Link></li>
            <li><Link to="/portofolio">Portofolio</Link></li>
            <li><Link to="/blog">Blog & Artikel</Link></li>
            <li><Link to="/tentang">Tentang Kami</Link></li>
            <li><Link to="/kontak">Hubungi Kami</Link></li>
          </ul>
        </div>

        {/* Kategori */}
        <div className="footer-col">
          <h4 className="footer-heading">Kategori Produk</h4>
          <ul className="footer-links">
            <li><Link to="/produk?q=mounting">Rubber Mounting</Link></li>
            <li><Link to="/produk?q=screen">Rubber Screen</Link></li>
            <li><Link to="/produk?q=sheet">Rubber Sheet</Link></li>
            <li><Link to="/produk?q=fender">Rubber Fender</Link></li>
            <li><Link to="/produk?q=coupling">Rubber Coupling</Link></li>
          </ul>
        </div>

        {/* Kontak */}
        <div className="footer-col">
          <h4 className="footer-heading">Kontak Resmi</h4>
          <ul className="footer-contact">
            <li>
              <span className="contact-icon-svg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <span>{COMPANY_CONTACT.address}</span>
            </li>
            <li>
              <span className="contact-icon-svg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <div>
                <a href={getWhatsAppLink(undefined, COMPANY_CONTACT.phone1Raw)} target="_blank" rel="noopener noreferrer">
                  {COMPANY_CONTACT.phone1} (WA 1)
                </a>
                <br />
                <a href={getWhatsAppLink(undefined, COMPANY_CONTACT.phone2Raw)} target="_blank" rel="noopener noreferrer" style={{ marginTop: '0.25rem', display: 'inline-block' }}>
                  {COMPANY_CONTACT.phone2} (WA 2)
                </a>
              </div>
            </li>
            <li>
              <span className="contact-icon-svg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <a href={`mailto:${COMPANY_CONTACT.email}`}>{COMPANY_CONTACT.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mitra Jaya Rubber. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  )
}

export default Footer
