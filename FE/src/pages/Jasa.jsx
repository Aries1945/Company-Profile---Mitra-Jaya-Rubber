// =============================================
// Jasa.jsx — Services Page (No emojis)
// =============================================
import { getWhatsAppLink } from '../helpers.js'

const services = [
  {
    id: 'moulding',
    title: 'Rubber Moulding',
    subtitle: 'Pembuatan Komponen Cetakan Presisi',
    description: 'Layanan pembuatan komponen karet teknik menggunakan cetakan (moulding) berpresisi tinggi. Kami mampu memproduksi produk karet dengan spesifikasi ukuran, kekerasan (Shore A), dan ketahanan kimia yang Anda perlukan.',
    features: ['Material NBR, EPDM, Silicone, Natural Rubber', 'Kekerasan disesuaikan (40 - 90 Shore A)', 'Toleransi dimensi presisi tinggi', 'Kapasitas produksi kecil hingga massal'],
  },
  {
    id: 'fabrikasi',
    title: 'Fabrikasi Rubber Custom',
    subtitle: 'Pembuatan Sesuai Gambar & Sample',
    description: 'Kami melayani fabrikasi produk rubber custom dari gambar teknis (drawing), 3D model, maupun contoh fisik produk yang sudah ada. Tim teknis kami berpengalaman dalam merekayasa ulang komponen karet industri.',
    features: ['Reverse engineering dari sample bekas', 'Desain cetakan internal', 'Pengujian ketahanan material', 'Solusi kustom untuk sparepart langka'],
  },
  {
    id: 'mould-making',
    title: 'Desain & Pembuatan Mould',
    subtitle: 'Jasa Pembuatan Cetakan Matris',
    description: 'Selain memproduksi karetnya, kami juga melayani pembuatan cetakan (mould/matris) berbahan baja/besi berkualitas. Dibuat presisi menggunakan mesin bubut dan CNC milling.',
    features: ['Baja cetakan berkualitas tahan panas', 'Pengerjaan mesin bubut & CNC', 'Garansi bentuk dan dimensi produk', 'Biaya investasi mould kompetitif'],
  },
  {
    id: 'lining',
    title: 'Rubber Lining & Coating',
    subtitle: 'Pelapisan Karet Tahan Abrasi & Kimia',
    description: 'Jasa pelapisan karet pada permukaan pipa, tangki kimia, impeller, dan chuting tambang untuk melindungi dari abrasi, korosi, dan benturan material keras.',
    features: ['Pelapisan tangki kimia & pipa industri', 'Rubber sheet tahan gesek & asam/basa', 'Vulkanisasi dingin & panas', 'Meningkatkan usia pakai peralatan'],
  },
  {
    id: 'maintenance',
    title: 'Perbaikan & Replacement Rubber',
    subtitle: 'Penggantian Rubber Mounting & Seal',
    description: 'Layanan penggantian dan perbaikan komponen karet mesin industri seperti rubber mounting genset/mesin, rubber coupling, dan elastomeric bearing pad bridge.',
    features: ['Inspeksi kondisi karet mesin', 'Penggantian mounting & coupling aus', 'Uji peredaman getaran (vibration dampening)', 'Layanan cepat untuk meminimalkan downtime'],
  },
  {
    id: 'testing',
    title: 'Konsultasi Material Rubber',
    subtitle: 'Pemilihan Formulasi Bahan Karet',
    description: 'Tim ahli kami siap membantu Anda menentukan spesifikasi jenis karet yang paling tepat untuk lingkungan kerja mesin Anda (tahan oli, tahan panas, tahan sinar UV, tahan zat kimia agresif).',
    features: ['Rekomendasi jenis elastomer', 'Uji ketahanan minyak (NBR) & panas (EPDM/Silicone)', 'Konsultasi efisiensi biaya material', 'Dukungan teknis purna jual'],
  },
]

function Jasa() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Layanan &amp; Jasa Fabrikasi</h2>
          <p>Layanan profesional manufaktur dan rekayasa komponen rubber teknik industri</p>
        </div>

        <div className="services-list-grid">
          {services.map((service) => (
            <div key={service.id} className="service-detail-card">
              <div className="service-detail-header">
                <h3>{service.title}</h3>
                <span className="service-subtitle">{service.subtitle}</span>
              </div>
              <p className="service-desc">{service.description}</p>
              <ul className="service-features-list">
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="service-card-action">
                <a href={getWhatsAppLink(`Konsultasi Jasa ${service.title}`)} target="_blank" rel="noopener noreferrer" className="btn btn-wa-sm">
                  Konsultasi Jasa Ini via WA
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Jasa
