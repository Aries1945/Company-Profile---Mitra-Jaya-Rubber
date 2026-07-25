-- ========================================================
-- MITRA JAYA RUBBER — POSTGRESQL SCHEMA (UNTOK POSTGREST)
-- ========================================================

-- 1. Buat Tabel Products
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    material VARCHAR(100),
    price NUMERIC(12, 2),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Index untuk Pencarian Cepat
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- 3. Data Sample Awal (Opsional)
INSERT INTO products (id, name, category, description, material, price, image_url)
VALUES 
  ('101', 'Rubber Mounting Engine Heavy Duty', 'Rubber Mounting', 'Peredam getaran mesin industri skala besar dengan daya tahan beban tinggi.', 'Natural Rubber', 150000, ''),
  ('102', 'Rubber Screen Mesh Type V', 'Rubber Screen', 'Saringan rubber penyaring batubara tahan abrasi gesekan tinggi.', 'NBR / Synthetic Rubber', 450000, '')
ON CONFLICT (id) DO NOTHING;
