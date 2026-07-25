// =============================================
// SERVER.JS — EXPRESS + POSTGRESQL BACKEND API
// Mitra Jaya Rubber Product & Auth API
// =============================================
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pkg from 'pg'
import crypto from 'crypto'

dotenv.config()
const { Pool } = pkg

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Konfigurasi PostgreSQL Pool
const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'admin',
  database: process.env.PGDATABASE || 'mitra_jaya_rubber',
})

// Helper Hash Password
function hashPassword(password) {
  const salt = process.env.SECRET_SALT || 'mitra_jaya_rubber_secure_salt_2026'
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
}

// =============================================
// AUTHENTICATION API ENDPOINTS
// =============================================

// POST /api/auth/login — Login Admin
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password wajib diisi!' })
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username.trim()])

    if (result.rowCount === 0) {
      return res.status(401).json({ error: 'Username atau password tidak ditemukan.' })
    }

    const user = result.rows[0]
    const inputHash = hashPassword(password)

    if (user.password_hash !== inputHash) {
      return res.status(401).json({ error: 'Username atau password salah.' })
    }

    // Login sukses
    res.json({
      success: true,
      message: 'Login berhasil!',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    })
  } catch (err) {
    res.status(500).json({ error: 'Gagal memproses login', details: err.message })
  }
})

// POST /api/auth/change-password — Ubah Password Admin
app.post('/api/auth/change-password', async (req, res) => {
  const { username, oldPassword, newPassword } = req.body

  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Data tidak lengkap. Harap isi semua bidang!' })
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password baru minimal harus 6 karakter!' })
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan.' })
    }

    const user = result.rows[0]
    const oldHash = hashPassword(oldPassword)

    if (user.password_hash !== oldHash) {
      return res.status(400).json({ error: 'Password lama Anda tidak sesuai!' })
    }

    const newHash = hashPassword(newPassword)
    await pool.query('UPDATE users SET password_hash = $1 WHERE username = $2', [newHash, username])

    res.json({ success: true, message: 'Password berhasil diperbarui!' })
  } catch (err) {
    res.status(500).json({ error: 'Gagal memperbarui password', details: err.message })
  }
})


// PRODUCT MANAGEMENT API ENDPOINTS


// 1. GET /api/products — Ambil semua produk
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC')
    const products = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      description: row.description,
      material: row.material,
      specifications: row.specifications || {},
      features: row.features || [],
      price: row.price ? Number(row.price) : null,
      imageUrl: row.image_url,
      createdAt: row.created_at,
    }))
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data produk dari database', details: err.message })
  }
})

// 2. POST /api/products — Tambah produk baru
app.post('/api/products', async (req, res) => {
  const { id, name, category, description, material, specifications, features, price, imageUrl } = req.body

  if (!name || !description) {
    return res.status(400).json({ error: 'Nama produk dan deskripsi wajib diisi!' })
  }

  const productId = id || Date.now().toString()

  try {
    const query = `
      INSERT INTO products (id, name, category, description, material, specifications, features, price, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `
    const values = [productId, name, category, description, material || '', JSON.stringify(specifications || {}), JSON.stringify(features || []), price || null, imageUrl || '']
    const result = await pool.query(query, values)
    
    const createdProduct = result.rows[0]
    res.status(201).json({
      id: createdProduct.id,
      name: createdProduct.name,
      category: createdProduct.category,
      description: createdProduct.description,
      material: createdProduct.material,
      specifications: createdProduct.specifications || {},
      features: createdProduct.features || [],
      price: createdProduct.price ? Number(createdProduct.price) : null,
      imageUrl: createdProduct.image_url,
      createdAt: createdProduct.created_at,
    })
  } catch (err) {
    res.status(500).json({ error: 'Gagal menambah produk ke database', details: err.message })
  }
})

// 3. PUT /api/products/:id — Edit produk
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params
  const { name, category, description, material, specifications, features, price, imageUrl } = req.body

  try {
    const query = `
      UPDATE products
      SET name = $1, category = $2, description = $3, material = $4, specifications = $5, features = $6, price = $7, image_url = $8
      WHERE id = $9
      RETURNING *;
    `
    const values = [name, category, description, material || '', JSON.stringify(specifications || {}), JSON.stringify(features || []), price || null, imageUrl || '', id]
    const result = await pool.query(query, values)

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' })
    }

    res.json({ message: 'Produk berhasil diperbarui' })
  } catch (err) {
    res.status(500).json({ error: 'Gagal memperbarui produk', details: err.message })
  }
})

// 4. DELETE /api/products/:id — Hapus produk
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' })
    }
    res.json({ message: 'Produk berhasil dihapus dari database' })
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus produk', details: err.message })
  }
})

// Jalankan Server
app.listen(PORT, () => {
  console.log(`🚀 Server Backend Mitra Jaya Rubber berjalan di http://localhost:${PORT}`)
})
