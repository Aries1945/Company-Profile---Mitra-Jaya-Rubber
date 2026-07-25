// =============================================
// HELPER FUNCTIONS & BACKEND API INTEGRATION
// =============================================
import { BACKEND_CONFIG } from './config.js'

// Informasi Kontak Resmi Mitra Jaya Rubber
export const COMPANY_CONTACT = {
  address: 'Pertokoan Glodok Jaya, Jalan Hayam Wuruk Blustru Lantai Dasar Blok C No. C50–69, Jakarta Barat',
  phone1: '08138525630',
  phone1Raw: '628138525630',
  phone2: '085779621939',
  phone2Raw: '6285779621939',
  email: 'mitrajayarubberrr@gmail.com',
}

// Kategori produk default
export const CATEGORIES = [
  'Karet Coupling',
  'Karet Deck',
  'Karet Lift Block Mobil',
  'Karet List',
  'Karet Mounting',
  'Rubber Fender',
  'Rubber Seal Pintu Air',
  'Rubber Wheel Chock',
]

// Password admin default (fallback)
export const ADMIN_PASSWORD = 'admin123'

// Buat link WhatsApp dengan pesan otomatis
export function getWhatsAppLink(productName, phoneRaw) {
  const phone = phoneRaw || COMPANY_CONTACT.phone1Raw
  const baseUrl = `https://wa.me/${phone}`

  if (productName) {
    const message = encodeURIComponent(
      `Halo Mitra Jaya Rubber, saya tertarik dengan produk *${productName}*. Bisa minta info penawaran harga & spesifikasinya?`
    )
    return `${baseUrl}?text=${message}`
  }

  return `${baseUrl}?text=${encodeURIComponent('Halo Mitra Jaya Rubber, saya ingin berkonsultasi mengenai pemesanan produk rubber teknik industri.')}`
}

// Format harga ke Rupiah
export function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Format tanggal ke bahasa Indonesia
export function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// =============================================
// AUTHENTICATION API (POSTGRESQL DATABASE)
// =============================================

// Login Admin via Database
export async function loginAdmin(username, password) {
  const backendBase = BACKEND_CONFIG.apiUrl.replace(/\/api\/products\/?$/, '')
  const res = await fetch(`${backendBase}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || 'Gagal login.')
  }
  return data
}

// Ubah Password Admin via Database
export async function changeAdminPassword(username, oldPassword, newPassword) {
  const backendBase = BACKEND_CONFIG.apiUrl.replace(/\/api\/products\/?$/, '')
  const res = await fetch(`${backendBase}/api/auth/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, oldPassword, newPassword }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || 'Gagal mengganti password.')
  }
  return data
}

// =============================================
// PRODUCT MANAGEMENT API (POSTGRESQL DATABASE)
// =============================================

// Ambil semua produk dari Database PostgreSQL
export async function fetchProducts() {
  const { apiUrl } = BACKEND_CONFIG
  if (!apiUrl) throw new Error('API URL backend belum dikonfigurasi.')

  const res = await fetch(apiUrl, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`Gagal mengambil data dari database (Status ${res.status})`)
  }
  return await res.json()
}

// Tambah produk baru ke Database PostgreSQL
export async function createProduct(product) {
  const { apiUrl } = BACKEND_CONFIG
  if (!apiUrl) throw new Error('API URL backend belum dikonfigurasi.')

  const newProduct = {
    id: Date.now().toString(),
    name: product.name,
    category: product.category,
    description: product.description,
    material: product.material || '',
    specifications: product.specifications || {},
    features: product.features || [],
    price: product.price ? Number(product.price) : null,
    imageUrl: product.imageUrl || '',
    createdAt: new Date().toISOString(),
  }

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  })

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || `Gagal menyimpan produk ke database (Status ${res.status})`)
  }

  return await res.json()
}

// Update produk di Database PostgreSQL
export async function editProduct(id, updatedData) {
  const { apiUrl } = BACKEND_CONFIG
  if (!apiUrl) throw new Error('API URL backend belum dikonfigurasi.')

  const res = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  })

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || `Gagal memperbarui produk di database (Status ${res.status})`)
  }

  return await res.json()
}

// Hapus produk dari Database PostgreSQL
export async function removeProduct(id) {
  const { apiUrl } = BACKEND_CONFIG
  if (!apiUrl) throw new Error('API URL backend belum dikonfigurasi.')

  const res = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || `Gagal menghapus produk dari database (Status ${res.status})`)
  }

  return await res.json()
}
