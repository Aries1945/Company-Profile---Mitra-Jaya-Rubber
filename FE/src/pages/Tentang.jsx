// =============================================
// Tentang.jsx — About Us Page (No emojis)
// =============================================
import { Link } from 'react-router-dom'
import { getWhatsAppLink } from '../helpers.js'

function Tentang() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Tentang Mitra Jaya Rubber</h2>
          <p>Produsen dan Mitra Terpercaya Komponen Karet Teknik Industri sejak 2014</p>
        </div>

        <div className="about-content">
          <div className="about-text-block">
            <h3>Siapa Kami</h3>
            <p>
              <strong>Mitra Jaya Rubber</strong> adalah spesialis manufaktur dan supplier komponen karet teknik (technical rubber products) yang berpusat di Kawasan Pertokoan Glodok Jaya, Jakarta Barat.
            </p>
            <p>
              Dengan pengalaman lebih dari 10 tahun, kami melayani berbagai industri di seluruh Indonesia, termasuk sektor pertambangan, pabrik manufaktur, konstruksi sipil, otomotif, hingga perkapalan maritim.
            </p>
          </div>

          <div className="vision-mission-grid">
            <div className="vm-card">
              <h3>Visi Kami</h3>
              <p>Menjadi produsen komponen rubber teknik industri pilihan utama di Indonesia yang dikenal atas kualitas produk presisi, keandalan material, dan pelayanan cepat.</p>
            </div>
            <div className="vm-card">
              <h3>Misi Kami</h3>
              <ul className="vm-list">
                <li>Menghasilkan produk karet berstandar tinggi yang tahan lama dan presisi.</li>
                <li>Memberikan solusi kustom sesuai kebutuhan teknis setiap klien.</li>
                <li>Memberikan harga manufaktur yang kompetitif dengan purna jual terbaik.</li>
              </ul>
            </div>
          </div>

          <div className="advantages-section">
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Mengapa Memilih Mitra Jaya Rubber?</h3>
            <div className="advantages-grid">
              <div className="adv-card">
                <h4>Presisi Tinggi</h4>
                <p>Proses moulding dan manufaktur dikerjakan dengan cetakan presisi sesuai spesifikasi teknis.</p>
              </div>
              <div className="adv-card">
                <h4>Pilihan Material Lengkap</h4>
                <p>Menyediakan Natural Rubber, NBR (tahan minyak), EPDM (tahan cuaca/panas), Silicone, Neoprene, dan Polyurethane.</p>
              </div>
              <div className="adv-card">
                <h4>Layanan Custom (Drawing/Sample)</h4>
                <p>Menerima pembuatan produk custom berdasarkan contoh produk lama maupun gambar teknik 2D/3D.</p>
              </div>
              <div className="adv-card">
                <h4>Lokasi Strategis di Pusat Industri Glodok</h4>
                <p>Toko fisik di Glodok Jaya Jakarta Barat mempermudah pengiriman cepat ke seluruh wilayah Indonesia.</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href={getWhatsAppLink('Konsultasi Kebutuhan Rubber')} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              Konsultasi Langsung via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tentang
