// =============================================
// ProductCard.jsx — Product Card with Click-to-Preview Modal
// =============================================
import { useState } from 'react'
import { formatPrice, getWhatsAppLink } from '../helpers.js'

function parseJsonField(field) {
  if (!field) return null
  if (typeof field === 'object') return field
  try {
    return JSON.parse(field)
  } catch (e) {
    return null
  }
}

function ProductCard({ product }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const specifications = parseJsonField(product.specifications)
  const features = parseJsonField(product.features)

  function openPreview(e) {
    // If clicking on the WA button directly, do not open modal
    if (e.target.closest('.product-card-wa-btn')) return
    setIsPreviewOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function closePreview() {
    setIsPreviewOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      {/* Product Card Component */}
      <div className="product-card" onClick={openPreview} title="Klik untuk lihat detail produk">
        <div className="product-card-image-wrapper">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="product-card-image" />
          ) : (
            <div className="product-no-img">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
          )}
          {product.category && <span className="product-card-badge">{product.category}</span>}
        </div>

        <div className="product-card-body">
          <h3 className="product-card-title">{product.name}</h3>

          {product.material && (
            <p className="product-card-material">Material: <strong>{product.material}</strong></p>
          )}

          {product.description && (
            <p className="product-card-desc">
              {product.description.length > 90 ? product.description.substring(0, 90) + '...' : product.description}
            </p>
          )}

          <div className="product-card-footer">
            <div className="product-card-price">
              {product.price ? (
                <span className="price-value">{formatPrice(product.price)}</span>
              ) : (
                <span className="price-contact">Tanya Harga</span>
              )}
            </div>

            <a
              href={getWhatsAppLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card-wa-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.285-.143-1.686-.832-1.947-.927-.261-.095-.451-.143-.641.143-.19.285-.736.927-.903 1.117-.166.19-.333.214-.618.071-.285-.143-1.204-.444-2.293-1.415-.847-.755-1.42-1.688-1.586-1.973-.166-.285-.018-.439.125-.581.129-.128.285-.333.428-.499.143-.166.19-.285.285-.476.095-.19.048-.356-.024-.499-.071-.143-.641-1.569-.879-2.139-.231-.555-.467-.479-.641-.488-.166-.008-.356-.01-.547-.01-.19 0-.499.071-.76.356-.261.285-.998.975-.998 2.378 0 1.403 1.022 2.758 1.165 2.948.143.19 2.01 3.069 4.871 4.304.68.293 1.21.468 1.624.6.684.218 1.306.187 1.796.114.547-.081 1.686-.689 1.924-1.355.238-.666.238-1.236.166-1.355-.071-.119-.261-.19-.547-.333z" />
              </svg>
              <span>Pesan</span>
            </a>
          </div>
        </div>
      </div>

      {/* Detail Preview Modal */}
      {isPreviewOpen && (
        <div className="product-preview-overlay" onClick={closePreview}>
          <div className="product-preview-content" onClick={(e) => e.stopPropagation()}>
            <div className="product-preview-header">
              <div className="product-preview-title-group">
                {product.category && <span className="product-preview-badge">{product.category}</span>}
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Detail Produk</span>
              </div>
              <button className="modal-close-btn" onClick={closePreview} title="Tutup Modal">
                ✕
              </button>
            </div>

            <div className="product-preview-body">
              {/* Media Section */}
              <div className="product-preview-media-box">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} />
                ) : (
                  <div className="product-no-img" style={{ padding: '3rem' }}>
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                      <circle cx="9" cy="9" r="2"/>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="product-preview-info-box">
                <div>
                  <h2 className="product-preview-name">{product.name}</h2>
                  {product.material && (
                    <p className="product-preview-material">
                      Material / Bahan: <strong>{product.material}</strong>
                    </p>
                  )}
                </div>

                {product.description && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', fontWeight: 600 }}>Deskripsi Produk:</h4>
                    <p className="product-preview-desc">{product.description}</p>
                  </div>
                )}

                {/* Specs */}
                {specifications && Object.keys(specifications).length > 0 && (
                  <div className="product-preview-specs">
                    <h4>📐 Spesifikasi & Dimensi</h4>
                    <div className="spec-grid-chips">
                      {Object.entries(specifications).map(([key, val]) => (
                        <div key={key} className="spec-chip">
                          <span className="spec-chip-key">{key}</span>
                          <span className="spec-chip-val">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {features && Array.isArray(features) && features.length > 0 && (
                  <div className="product-preview-features">
                    <h4>✨ Fitur & Keunggulan</h4>
                    <ul>
                      {features.map((feat, idx) => (
                        <li key={idx}>
                          <span className="feature-icon-check">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="product-preview-footer">
              <div className="product-card-price">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Estimasi Harga:</span>
                {product.price ? (
                  <span className="price-value">{formatPrice(product.price)}</span>
                ) : (
                  <span className="price-contact" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                    Tanya Harga / Negosiasi
                  </span>
                )}
              </div>

              <a
                href={getWhatsAppLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
                style={{ padding: '0.65rem 1.5rem', fontSize: '0.95rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.285-.143-1.686-.832-1.947-.927-.261-.095-.451-.143-.641.143-.19.285-.736.927-.903 1.117-.166.19-.333.214-.618.071-.285-.143-1.204-.444-2.293-1.415-.847-.755-1.42-1.688-1.586-1.973-.166-.285-.018-.439.125-.581.129-.128.285-.333.428-.499.143-.166.19-.285.285-.476.095-.19.048-.356-.024-.499-.071-.143-.641-1.569-.879-2.139-.231-.555-.467-.479-.641-.488-.166-.008-.356-.01-.547-.01-.19 0-.499.071-.76.356-.261.285-.998.975-.998 2.378 0 1.403 1.022 2.758 1.165 2.948.143.19 2.01 3.069 4.871 4.304.68.293 1.21.468 1.624.6.684.218 1.306.187 1.796.114.547-.081 1.686-.689 1.924-1.355.238-.666.238-1.236.166-1.355-.071-.119-.261-.19-.547-.333z" />
                </svg>
                <span>Pesan via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard
