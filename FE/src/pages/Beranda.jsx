// =============================================
// Beranda.jsx — Homepage
// =============================================
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { getWhatsAppLink, fetchProducts } from '../helpers.js'

function Beranda() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const allProducts = await fetchProducts()
        setProducts(allProducts.slice(0, 6))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <>
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-split">
          <div className="hero-content">
            <span className="hero-badge">Rubber Teknik Industri</span>
            <h1>Solusi Rubber Berkualitas untuk Industri Anda</h1>
            <p className="hero-subtitle">
              Manufaktur &amp; fabrikasi rubber mounting, screen, sheet, fender, coupling,
              dan custom rubber untuk kebutuhan tambang, konstruksi, dan manufaktur.
            </p>
            <div className="hero-actions">
              <Link to="/produk" className="btn btn-primary">Lihat Katalog Produk</Link>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.285-.143-1.686-.832-1.947-.927-.261-.095-.451-.143-.641.143-.19.285-.736.927-.903 1.117-.166.19-.333.214-.618.071-.285-.143-1.204-.444-2.293-1.415-.847-.755-1.42-1.688-1.586-1.973-.166-.285-.018-.439.125-.581.129-.128.285-.333.428-.499.143-.166.19-.285.285-.476.095-.19.048-.356-.024-.499-.071-.143-.641-1.569-.879-2.139-.231-.555-.467-.479-.641-.488-.166-.008-.356-.01-.547-.01-.19 0-.499.071-.76.356-.261.285-.998.975-.998 2.378 0 1.403 1.022 2.758 1.165 2.948.143.19 2.01 3.069 4.871 4.304.68.293 1.21.468 1.624.6.684.218 1.306.187 1.796.114.547-.081 1.686-.689 1.924-1.355.238-.666.238-1.236.166-1.355-.071-.119-.261-.19-.547-.333z" />
                </svg>
                <span>Konsultasi WhatsApp</span>
              </a>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <img src="/Logo/MITRA JAYA RUBBER SHOPPE (14).png" alt="Mitra Jaya Rubber - Industrial Rubber Specialist" className="hero-banner-img" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="stats-row">
            <div className="stat-item"><div className="stat-number">10+</div><div className="stat-label">Tahun Pengalaman</div></div>
            <div className="stat-item"><div className="stat-number">500+</div><div className="stat-label">Produk Terjual</div></div>
            <div className="stat-item"><div className="stat-number">100+</div><div className="stat-label">Klien Industri</div></div>
            <div className="stat-item"><div className="stat-number">50+</div><div className="stat-label">Jenis Produk</div></div>
          </div>
        </div>
      </section>

      {/* Produk Unggulan */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Produk Unggulan</h2>
            <p>Rubber teknik berkualitas tinggi untuk berbagai kebutuhan industri</p>
          </div>
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Memuat produk...</p>
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>Belum ada produk unggulan</h3>
              <p>Tambahkan produk via halaman <Link to="/admin" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>/admin</Link></p>
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/produk" className="btn btn-primary">Lihat Semua Produk →</Link>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Layanan Kami</h2>
            <p>Solusi lengkap untuk kebutuhan rubber teknik industri Anda</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3>Rubber Moulding</h3>
              <p>Pembuatan produk rubber dengan cetakan presisi sesuai spesifikasi teknis.</p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <h3>Fabrikasi Rubber</h3>
              <p>Proses fabrikasi rubber custom untuk kebutuhan khusus industri.</p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
              </div>
              <h3>Pembuatan Mould</h3>
              <p>Desain dan pembuatan cetakan rubber sesuai drawing atau sample.</p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>
              </div>
              <h3>Produksi Custom</h3>
              <p>Produksi massal berdasarkan sample, gambar teknik, atau spesifikasi klien.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/jasa" className="btn btn-outline">Selengkapnya →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero" style={{ padding: '3rem 0' }}>
        <div className="hero-container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)' }}>Butuh Rubber Custom untuk Industri Anda?</h2>
          <p className="hero-subtitle" style={{ margin: '1rem auto 2rem', maxWidth: '500px' }}>
            Konsultasikan kebutuhan Anda langsung dengan tim kami. Respon cepat via WhatsApp.
          </p>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
            Hubungi via WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}

export default Beranda
