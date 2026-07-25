// =============================================
// Kontak.jsx — Contact Page (No emojis)
// =============================================
import { useState } from 'react'
import { COMPANY_CONTACT, getWhatsAppLink } from '../helpers.js'

function Kontak() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    product: '',
    message: '',
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const textMessage = `Halo Mitra Jaya Rubber,
Saya *${formData.name}* ${formData.company ? `dari *${formData.company}*` : ''}.

*Detail Permintaan Penawaran:*
- Produk/Jasa: ${formData.product || 'Umum'}
- No. Kontak: ${formData.phone}
- Pesan: ${formData.message}

Mohon dapat dihubungi kembali. Terima kasih.`

    const waUrl = `https://wa.me/${COMPANY_CONTACT.phone1Raw}?text=${encodeURIComponent(textMessage)}`
    window.open(waUrl, '_blank')
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Hubungi Kami</h2>
          <p>Dapatkan penawaran harga terbaik dan konsultasi teknis kebutuhan produk karet industri Anda</p>
        </div>

        <div className="contact-grid">
          {/* Info Detail */}
          <div className="contact-info-card">
            <h3>Mitra Jaya Rubber</h3>
            <p className="contact-sub">Pusat Manufaktur &amp; Supplier Rubber Teknik Jakarta</p>

            <ul className="contact-detail-list">
              <li>
                <div className="contact-icon-svg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <strong>Alamat Toko &amp; Workshop:</strong>
                  <p>{COMPANY_CONTACT.address}</p>
                </div>
              </li>

              <li>
                <div className="contact-icon-svg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <strong>Telepon / WhatsApp:</strong>
                  <p>
                    <a href={getWhatsAppLink(undefined, COMPANY_CONTACT.phone1Raw)} target="_blank" rel="noopener noreferrer" className="link-contact">
                      {COMPANY_CONTACT.phone1} (WA Admin 1)
                    </a>
                  </p>
                  <p style={{ marginTop: '0.25rem' }}>
                    <a href={getWhatsAppLink(undefined, COMPANY_CONTACT.phone2Raw)} target="_blank" rel="noopener noreferrer" className="link-contact">
                      {COMPANY_CONTACT.phone2} (WA Admin 2)
                    </a>
                  </p>
                </div>
              </li>

              <li>
                <div className="contact-icon-svg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <strong>Email Resmi:</strong>
                  <p><a href={`mailto:${COMPANY_CONTACT.email}`} className="link-contact">{COMPANY_CONTACT.email}</a></p>
                </div>
              </li>

              <li>
                <div className="contact-icon-svg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <strong>Jam Operasional Toko:</strong>
                  <p>Senin - Sabtu: 09:00 - 17:00 WIB (Minggu/Hari Libur Tutup)</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form RFQ */}
          <div className="contact-form-card">
            <h3>Formulir Minta Penawaran (RFQ)</h3>
            <p className="contact-sub">Kirim rincian kebutuhan Anda, sistem akan membuatkan format pesan WA otomatis</p>

            <form onSubmit={handleSubmit} className="rfq-form">
              <div className="form-group">
                <label className="form-label">Nama Lengkap *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nama Perusahaan / PT (Opsional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Contoh: PT Tri Utama Teknik"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">No. HP / WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contoh: 08123456789"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Produk / Layanan yang Diminta</label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Contoh: Rubber Mounting Engine 50 pcs"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pesan / Spesifikasi Singkat *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Jelaskan ukuran, jumlah order, atau lampirkan info gambar drawing..."
                  className="form-control"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-wa-submit">
                Kirim Penawaran via WhatsApp
              </button>
            </form>
          </div>
        </div>

        {/* Peta Lokasi Google Maps */}
        <div className="map-container" style={{ marginTop: '3rem' }}>
          <h3>Lokasi Pertokoan Glodok Jaya Jakarta Barat</h3>
          <div className="map-embed-wrapper" style={{ marginTop: '1rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <iframe
              title="Lokasi Mitra Jaya Rubber Glodok Jaya"
              src="https://maps.google.com/maps?q=Glodok+Jaya+Hayam+Wuruk+Blustru+Jakarta+Barat&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Kontak
