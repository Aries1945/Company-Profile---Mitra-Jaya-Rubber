// =============================================
// Produk.jsx — Product Catalog Page
// =============================================
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { CATEGORIES, fetchProducts } from '../helpers.js'

function Produk() {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParam = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || 'Semua'

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [searchQuery, setSearchQuery] = useState(queryParam)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam)
    if (categoryParam) setSelectedCategory(categoryParam)
  }, [queryParam, categoryParam])

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.material && p.material.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === 'Semua' || p.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  function handleCategoryChange(cat) {
    setSelectedCategory(cat)
    const newParams = new URLSearchParams(searchParams)
    if (cat === 'Semua') {
      newParams.delete('category')
    } else {
      newParams.set('category', cat)
    }
    setSearchParams(newParams)
  }

  function handleSearchChange(e) {
    const val = e.target.value
    setSearchQuery(val)
    const newParams = new URLSearchParams(searchParams)
    if (val) {
      newParams.set('q', val)
    } else {
      newParams.delete('q')
    }
    setSearchParams(newParams)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Katalog Produk</h2>
          <p>Temukan komponen karet teknik industri yang sesuai dengan kebutuhan Anda</p>
        </div>

        {/* Filter Controls */}
        <div className="catalog-filters">
          <div className="catalog-search-wrapper">
            <input
              type="text"
              placeholder="Cari produk, material, atau spesifikasi..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="catalog-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  const newParams = new URLSearchParams(searchParams)
                  newParams.delete('q')
                  setSearchParams(newParams)
                }}
                className="catalog-search-clear"
              >
                ✕
              </button>
            )}
          </div>

          <div className="catalog-categories">
            <button
              className={`category-btn ${selectedCategory === 'Semua' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('Semua')}
            >
              Semua Produk
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="catalog-results-info">
          <span>Menampilkan {filteredProducts.length} produk</span>
          {(searchQuery || selectedCategory !== 'Semua') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('Semua')
                setSearchParams({})
              }}
              className="reset-filter-btn"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Memuat katalog produk...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Produk Tidak Ditemukan</h3>
            <p>Maaf, produk dengan kata kunci atau kategori yang Anda pilih tidak ditemukan.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Produk
