// =============================================
// Admin.jsx — Professional Admin Dashboard
// Mitra Jaya Rubber — Seller Center
// =============================================
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BACKEND_CONFIG } from '../config.js'
import {
  CATEGORIES,
  fetchProducts,
  createProduct,
  editProduct,
  removeProduct,
  loginAdmin,
  changeAdminPassword,
  formatPrice,
} from '../helpers.js'

function Admin() {
  // Auth & Session
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  // Change Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passForm, setPassForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [passStatus, setPassStatus] = useState({ error: '', success: '', loading: false })

  // Data State
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  // Form State (Product Modal)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    category: CATEGORIES[0],
    description: '',
    material: '',
    specifications: {},
    features: [],
    price: '',
    imageUrl: '',
  })

  // Spec/Feature input helpers
  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecVal, setNewSpecVal] = useState('')
  const [newFeature, setNewFeature] = useState('')

  // Session check
  useEffect(() => {
    const session = sessionStorage.getItem('mjr_admin_user')
    if (session) {
      try {
        const userObj = JSON.parse(session)
        setCurrentUser(userObj)
        setUsername(userObj.username || 'admin')
        setIsLoggedIn(true)
      } catch (err) {
        sessionStorage.removeItem('mjr_admin_user')
      }
    }
  }, [])

  // Load products on login
  useEffect(() => {
    if (isLoggedIn) loadData()
  }, [isLoggedIn])

  async function loadData() {
    setIsLoading(true)
    setFetchError('')
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      console.error(err)
      setFetchError(err.message || 'Gagal terhubung ke database PostgreSQL.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoginError('')
    setIsLoading(true)

    try {
      const res = await loginAdmin(username, password)
      if (res.success) {
        setIsLoggedIn(true)
        setCurrentUser(res.user)
        sessionStorage.setItem('mjr_admin_user', JSON.stringify(res.user))
        setPassword('')
      }
    } catch (err) {
      setLoginError(err.message || 'Username atau password salah')
    } finally {
      setIsLoading(false)
    }
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setCurrentUser(null)
    sessionStorage.removeItem('mjr_admin_user')
  }

  // Handle Ubah Password
  async function handleChangePasswordSubmit(e) {
    e.preventDefault()
    setPassStatus({ error: '', success: '', loading: true })

    if (passForm.newPassword !== passForm.confirmPassword) {
      setPassStatus({ error: 'Konfirmasi password baru tidak cocok!', success: '', loading: false })
      return
    }

    try {
      const res = await changeAdminPassword(username, passForm.oldPassword, passForm.newPassword)
      setPassStatus({ error: '', success: res.message || 'Password berhasil diubah!', loading: false })
      setPassForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => {
        setShowPasswordModal(false)
        setPassStatus({ error: '', success: '', loading: false })
      }, 1500)
    } catch (err) {
      setPassStatus({ error: err.message || 'Gagal mengubah password', success: '', loading: false })
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 2MB!')
      return
    }
    const reader = new FileReader()
    reader.onload = (event) => setForm((prev) => ({ ...prev, imageUrl: event.target.result }))
    reader.readAsDataURL(file)
  }

  function addSpecification() {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return
    setForm({ ...form, specifications: { ...form.specifications, [newSpecKey.trim()]: newSpecVal.trim() } })
    setNewSpecKey('')
    setNewSpecVal('')
  }

  function removeSpecification(key) {
    const updated = { ...form.specifications }
    delete updated[key]
    setForm({ ...form, specifications: updated })
  }

  function addFeature() {
    if (!newFeature.trim()) return
    setForm({ ...form, features: [...form.features, newFeature.trim()] })
    setNewFeature('')
  }

  function removeFeature(idx) {
    setForm({ ...form, features: form.features.filter((_, i) => i !== idx) })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.description) {
      alert('Nama produk dan deskripsi wajib diisi!')
      return
    }

    const productData = {
      name: form.name,
      category: form.category,
      description: form.description,
      material: form.material,
      specifications: form.specifications,
      features: form.features,
      price: form.price ? Number(form.price) : null,
      imageUrl: form.imageUrl,
    }

    setIsLoading(true)
    try {
      if (editingId) {
        await editProduct(editingId, productData)
      } else {
        await createProduct(productData)
      }
      resetForm()
      await loadData()
    } catch (err) {
      alert(err.message || 'Gagal menyimpan produk')
    } finally {
      setIsLoading(false)
    }
  }

  function handleEdit(product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      category: product.category || CATEGORIES[0],
      description: product.description || '',
      material: product.material || '',
      specifications: product.specifications || {},
      features: product.features || [],
      price: product.price || '',
      imageUrl: product.imageUrl || '',
    })
    setShowFormModal(true)
  }

  async function handleDelete(id) {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini dari database?')) {
      setIsLoading(true)
      try {
        await removeProduct(id)
        await loadData()
      } catch (err) {
        alert(err.message || 'Gagal menghapus produk')
      } finally {
        setIsLoading(false)
      }
    }
  }

  function resetForm() {
    setForm({
      name: '',
      category: CATEGORIES[0],
      description: '',
      material: '',
      specifications: {},
      features: [],
      price: '',
      imageUrl: '',
    })
    setEditingId(null)
    setShowFormModal(false)
    setNewSpecKey('')
    setNewSpecVal('')
    setNewFeature('')
  }

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = activeCategoryFilter === 'Semua' ? true : p.category === activeCategoryFilter
    return matchesSearch && matchesCategory
  })

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-container">
          <div className="admin-login-header">
            <img src="/Logo/LOGO.png" alt="Mitra Jaya Rubber" className="admin-login-logo" />
            <h1>Seller Center</h1>
            <p>Masukkan username dan password admin untuk mengakses dashboard PostgreSQL</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label className="form-label">Username Admin</label>
              <div className="input-with-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username admin..."
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password Akses Admin</label>
              <div className="input-with-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin..."
                  className="form-control"
                  required
                />
              </div>
              {loginError && <p className="form-error-msg">{loginError}</p>}
            </div>

            <button type="submit" className="btn-admin-submit" disabled={isLoading}>
              {isLoading ? 'Memverifikasi Data...' : 'Masuk ke Dashboard'}
            </button>
          </form>

          <div className="admin-login-footer">
            <Link to="/">← Kembali ke Website Utama</Link>
          </div>
        </div>
      </div>
    )
  }

  // DASHBOARD PAGE
  return (
    <div className="admin-dashboard-layout">
      {/* Top Navigation Header */}
      <header className="admin-navbar">
        <div className="admin-navbar-inner">
          <div className="admin-navbar-brand">
            <img src="/Logo/LOGO.png" alt="Mitra Jaya Rubber" className="admin-navbar-logo-img" />
            <div className="admin-navbar-brand-text">
              <span className="brand-name">Mitra Jaya Rubber</span>
              <span className="admin-badge">Seller Center</span>
            </div>
          </div>

          <div className="admin-navbar-actions">
            <button onClick={() => setShowPasswordModal(true)} className="btn-view-site" title="Ubah Password Admin">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Ubah Password</span>
            </button>

            <Link to="/" className="btn-view-site" target="_blank">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              <span>Lihat Website</span>
            </Link>

            <button onClick={handleLogout} className="btn-admin-logout">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main-container">
        {/* Page Header */}
        <div className="admin-page-header">
          <div>
            <h2>Manajemen Produk</h2>
            <p>Kelola katalog produk rubber teknik industri (Terkoneksi PostgreSQL Database)</p>
          </div>
          <button onClick={() => { resetForm(); setShowFormModal(true) }} className="btn-add-product">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>Tambah Produk</span>
          </button>
        </div>

        {/* Stats */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(0,102,255,0.08)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
            </div>
            <div>
              <span className="stat-title">Total Produk</span>
              <h3 className="stat-value">{products.length}</h3>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16,185,129,0.08)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            </div>
            <div>
              <span className="stat-title">Kategori</span>
              <h3 className="stat-value">{CATEGORIES.length}</h3>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(245,158,11,0.08)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            </div>
            <div>
              <span className="stat-title">Database</span>
              <h3 className="stat-value">PostgreSQL</h3>
            </div>
          </div>
        </div>

        {fetchError && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '0.9rem 1.2rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #FCA5A5', fontSize: '0.88rem' }}>
            ⚠️ {fetchError}
          </div>
        )}

        {/* Filter & Search */}
        <div className="admin-filter-card">
          <div className="admin-search-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              placeholder="Cari produk berdasarkan nama atau deskripsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="admin-category-pills">
            <button
              onClick={() => setActiveCategoryFilter('Semua')}
              className={`pill-btn ${activeCategoryFilter === 'Semua' ? 'active' : ''}`}
            >
              Semua ({products.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = products.filter((p) => p.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`pill-btn ${activeCategoryFilter === cat ? 'active' : ''}`}
                >
                  {cat} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Products Table / Empty State */}
        {isLoading ? (
          <div className="admin-loading-box">
            <div className="admin-loading-spinner"></div>
            <p>Memuat data dari PostgreSQL...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="admin-empty-state">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            </div>
            <h3>Belum ada produk</h3>
            <p>Klik tombol "Tambah Produk" untuk menambahkan produk ke katalog PostgreSQL database</p>
          </div>
        ) : (
          <div className="admin-table-card">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Gambar</th>
                    <th>Nama & Kategori</th>
                    <th>Material</th>
                    <th>Harga</th>
                    <th>Spesifikasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const specsCount = product.specifications ? Object.keys(product.specifications).length : 0
                    const featuresCount = product.features ? product.features.length : 0

                    return (
                      <tr key={product.id}>
                        <td>
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="product-thumb-img" />
                          ) : (
                            <div className="product-no-img">No Image</div>
                          )}
                        </td>
                        <td>
                          <div className="product-name-cell">
                            <strong>{product.name}</strong>
                            <span className="product-cat-badge">{product.category}</span>
                          </div>
                        </td>
                        <td>{product.material || '-'}</td>
                        <td>
                          {product.price ? (
                            <span className="price-tag">{formatPrice(product.price)}</span>
                          ) : (
                            <span className="price-negosiasi">Negosiasi</span>
                          )}
                        </td>
                        <td>
                          <div className="specs-count-badge">
                            <span>{specsCount} Spesifikasi</span>
                            <span>•</span>
                            <span>{featuresCount} Fitur</span>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button onClick={() => handleEdit(product)} className="btn-action-edit" title="Edit Produk">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="btn-action-delete" title="Hapus Produk">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: UBAH PASSWORD ADMIN */}
      {showPasswordModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3>Ubah Password Admin</h3>
              <button onClick={() => setShowPasswordModal(false)} className="btn-close-modal">✕</button>
            </div>
            <form onSubmit={handleChangePasswordSubmit}>
              <div className="modal-body">
                {passStatus.error && (
                  <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '0.8rem' }}>
                    ⚠️ {passStatus.error}
                  </div>
                )}
                {passStatus.success && (
                  <div style={{ background: '#D1FAE5', color: '#065F46', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '0.8rem' }}>
                    ✓ {passStatus.success}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Password Lama *</label>
                  <input
                    type="password"
                    value={passForm.oldPassword}
                    onChange={(e) => setPassForm({ ...passForm, oldPassword: e.target.value })}
                    placeholder="Masukkan password saat ini"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password Baru * (Min 6 Karakter)</label>
                  <input
                    type="password"
                    value={passForm.newPassword}
                    onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                    placeholder="Masukkan password baru"
                    className="form-control"
                    required
                    minLength={6}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Konfirmasi Password Baru *</label>
                  <input
                    type="password"
                    value={passForm.confirmPassword}
                    onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                    placeholder="Ketik ulang password baru"
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowPasswordModal(false)} className="btn-modal-cancel">
                  Batal
                </button>
                <button type="submit" className="btn-modal-submit" disabled={passStatus.loading}>
                  {passStatus.loading ? 'Menyimpan...' : 'Simpan Password Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH / EDIT PRODUK */}
      {showFormModal && (
        <div className="modal-backdrop">
          <div className="modal-content modal-wide-rectangle">
            <div className="modal-header">
              <h3>{editingId ? 'Edit Produk' : '📦 Tambah Produk Baru'}</h3>
              <button onClick={resetForm} className="btn-close-modal">✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Section 1: Informasi Produk */}
                <div className="form-section-divider">
                  📌 Informasi Utama Produk
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label">Nama Produk *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Contoh: Rubber Mounting Engine"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kategori Produk *</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Harga (Rp)</label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Kosongkan jika negosiasi"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Section 2: Material & Media */}
                <div className="form-section-divider">
                  🧪 Material & Berkas Foto
                </div>

                <div className="form-grid-2" style={{ alignItems: 'flex-start' }}>
                  <div className="form-group">
                    <label className="form-label">Material / Bahan</label>
                    <input
                      type="text"
                      name="material"
                      value={form.material}
                      onChange={handleChange}
                      placeholder="Contoh: Natural Rubber, NBR, EPDM"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Foto Produk (Maks 2MB)</label>
                    <div className="upload-dropzone" style={{ padding: '0.6rem 0.8rem' }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        id="product-img-file"
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="product-img-file" className="upload-label">
                        {form.imageUrl ? (
                          <div className="uploaded-preview">
                            <img src={form.imageUrl} alt="Preview" style={{ height: '40px' }} />
                            <span style={{ fontSize: '0.8rem' }}>Klik untuk mengganti gambar</span>
                          </div>
                        ) : (
                          <div className="upload-placeholder" style={{ padding: '0.2rem' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                            <span style={{ fontSize: '0.8rem' }}>Pilih foto dari komputer</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Section 3: Deskripsi & Atribut */}
                <div className="form-section-divider">
                  ⚙️ Deskripsi & Atribut Tambahan
                </div>

                <div className="form-group">
                  <label className="form-label">Deskripsi Lengkap *</label>
                  <textarea
                    name="description"
                    rows="2"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Tuliskan spesifikasi, dimensi, ketahanan, dan penggunaan produk..."
                    className="form-control"
                    required
                  ></textarea>
                </div>

                <div className="form-grid-2" style={{ alignItems: 'flex-start' }}>
                  {/* Spesifikasi & Dimensi */}
                  <div className="form-group">
                    <label className="form-label">Spesifikasi & Dimensi</label>
                    <div className="specs-list">
                      {Object.entries(form.specifications).map(([key, val]) => (
                        <div key={key} className="spec-row">
                          <span className="spec-key">{key}:</span>
                          <span className="spec-val">{val}</span>
                          <button
                            type="button"
                            onClick={() => removeSpecification(key)}
                            className="btn-remove-spec"
                            title="Hapus Spesifikasi"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="spec-add-row">
                      <input
                        type="text"
                        placeholder="Nama (cth: Diameter)"
                        value={newSpecKey}
                        onChange={(e) => setNewSpecKey(e.target.value)}
                        className="form-control form-control-sm"
                        style={{ flex: '1' }}
                      />
                      <input
                        type="text"
                        placeholder="Nilai (cth: 22 mm)"
                        value={newSpecVal}
                        onChange={(e) => setNewSpecVal(e.target.value)}
                        className="form-control form-control-sm"
                        style={{ flex: '1' }}
                      />
                      <button
                        type="button"
                        onClick={addSpecification}
                        className="btn-add-spec"
                        title="Tambah Spesifikasi"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Fitur & Keunggulan */}
                  <div className="form-group">
                    <label className="form-label">Fitur & Keunggulan</label>
                    <div className="features-list">
                      {form.features.map((feat, idx) => (
                        <div key={idx} className="feature-row">
                          <span className="feature-bullet">•</span>
                          <span className="feature-text">{feat}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(idx)}
                            className="btn-remove-spec"
                            title="Hapus Fitur"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="spec-add-row">
                      <input
                        type="text"
                        placeholder="Contoh: Tahan oli dan air"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        className="form-control form-control-sm"
                        style={{ flex: '1' }}
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="btn-add-spec"
                        title="Tambah Fitur"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={resetForm} className="btn-modal-cancel">
                  Batal
                </button>
                <button type="submit" className="btn-modal-submit" disabled={isLoading}>
                  {isLoading ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
