// =============================================
// Portofolio.jsx — Portfolio Showcase (No emojis)
// =============================================
import { getWhatsAppLink } from '../helpers.js'

const portfolios = [
  {
    id: 1,
    title: 'Rubber Screen Mesh Vibrating Screen',
    category: 'Pertambangan',
    client: 'Perusahaan Tambang Batubara Kalimantan',
    description: 'Fabrikasi rubber screen mesh tahan abrasi tinggi untuk menyaring hasil tambang batubara.',
  },
  {
    id: 2,
    title: 'Rubber Mounting Engine Heavy Duty',
    category: 'Manufaktur & Heavy Equipment',
    client: 'Pabrik Semen & Konstruksi',
    description: 'Pengadaan rubber mounting peredam getaran mesin crushing plant skala besar.',
  },
  {
    id: 3,
    title: 'Rubber Fender Type D & Square',
    category: 'Maritim & Pelabuhan',
    client: 'Pengelola Dermaga Swasta',
    description: 'Produksi rubber fender perlindungan lambung kapal & bantalan dermaga laut.',
  },
  {
    id: 4,
    title: 'Rubber Coupling Spider & Pin Cushion',
    category: 'Industri Otomotif & Pabrik',
    client: 'Pabrik Perakitan Otomotif Bekas',
    description: 'Pembuatan rubber coupling custom peredam kejut transmisi poros motor listrik.',
  },
  {
    id: 5,
    title: 'Elastomeric Bearing Pad Jembatan',
    category: 'Konstruksi Sipil',
    client: 'Kontraktor BUMN Jembatan',
    description: 'Bantalan karet jembatan dengan sisipan pelat baja pendukung struktur beban jembatan.',
  },
  {
    id: 6,
    title: 'Rubber Sheet Neoprene Tahan Minyak',
    category: 'Industri Migas & Kimia',
    client: 'Pabrik pengolahan minyak kelapa sawit (PKS)',
    description: 'Suplai kustom gasket karet lembaran tahan hidrokarbon & temperatur minyak tinggi.',
  },
]

function Portofolio() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Portofolio Proyek</h2>
          <p>Pengalaman kami dalam mensuplai komponen karet teknik untuk berbagai proyek nasional</p>
        </div>

        <div className="portfolio-grid">
          {portfolios.map((item) => (
            <div key={item.id} className="portfolio-card">
              <div className="portfolio-card-header">
                <span className="portfolio-badge">{item.category}</span>
                <h3>{item.title}</h3>
              </div>
              <div className="portfolio-card-body">
                <p className="portfolio-client">Klien: <strong>{item.client}</strong></p>
                <p className="portfolio-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-box" style={{ marginTop: '3rem', textAlign: 'center', background: 'var(--white)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <h3>Punya Proyek Serupa?</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 1.5rem' }}>
            Konsultasikan spesifikasi gambar teknik atau kebutuhan sampel produk proyek Anda bersama tim profesional kami.
          </p>
          <a href={getWhatsAppLink('Diskusi Proyek Baru')} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            Diskusi Proyek via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default Portofolio
