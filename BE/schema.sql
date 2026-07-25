-- ========================================================
-- MITRA JAYA RUBBER — POSTGRESQL DATABASE SCHEMA & SEED
-- ========================================================

-- 1. Buat Tabel Products
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    material VARCHAR(100),
    specifications JSONB DEFAULT '{}',
    features JSONB DEFAULT '[]',
    price NUMERIC(12, 2),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk Akses Cepat Products
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- 2. Buat Tabel Users (Otentikasi Admin)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) DEFAULT 'Admin Mitra Jaya',
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Seed Default Admin (Username: admin, Password: admin123)
INSERT INTO users (username, password_hash, name, role) 
VALUES (
    'admin', 
    '3921bb84154fad4ca573890bc0b661b004f05fbaf6132caa0baa2a95e21be4cf3117e08b851b303e2d6cc5adba469383fcfa9f9d3f786519895644e8ca78837a', 
    'Admin Utama', 
    'admin'
)
ON CONFLICT (username) DO NOTHING;

-- 4. Seed Sample Products (Produk Utama Mitra Jaya Rubber)

INSERT INTO products (id, name, category, description, material, specifications, features, price, image_url) VALUES
(
    'prod-101',
    'Karet Coupling NM-97',
    'Karet Coupling',
    'Karet peredam getaran fleksibel untuk transmisi daya mesin industri pabrik dan pompa heavy duty.',
    'NBR (Nitrile Rubber)',
    '{"Diameter Luar": "97 mm", "Diameter Dalam": "35 mm", "Kekerasan": "80 Shore A", "Ketahanan Suhu": "-20°C hingga 100°C"}',
    '["Tahan gesekan dan beban puntir tinggi", "Meredam getaran torsi mesin", "Tahan kontak cairan oli dan gemuk industri"]',
    150000,
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
),
(
    'prod-102',
    'Rubber Fender D-Type 200H x 200W x 1000L',
    'Rubber Fender',
    'Fender pelindung struktur dermaga pelabuhan dari benturan kapal saat bersandar.',
    'Natural Rubber Heavy Duty',
    '{"Tinggi": "200 mm", "Lebar": "200 mm", "Panjang": "1000 mm", "Kekuatan Tarik": "≥ 16 MPa"}',
    '["Daya serap energi benturan tinggi", "Tahan cuaca ekstrem dan air laut", "Dilengkapi lubang jangkar pengikat baut"]',
    2400000,
    'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=600'
),
(
    'prod-103',
    'Karet Engine Mounting Type Round M12',
    'Karet Mounting',
    'Mounting peredam getaran untuk dudukan mesin genset, kompresor, dan mesin konstruksi.',
    'Natural Rubber / Neoprene',
    '{"Diameter Karet": "50 mm", "Tinggi Karet": "40 mm", "Ukuran Baut": "M12 x 30 mm", "Beban Maksimal": "150 kg/pcs"}',
    '["Mengurangi tingkat kebisingan resonansi", "Baut baja berlapis seng anti-karat", "Elastisitas optimal untuk beban statis & dinamis"]',
    85000,
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=600'
),
(
    'prod-104',
    'Rubber Seal Pintu Air Type P-Profile',
    'Rubber Seal Pintu Air',
    'Karet seal fleksibel tipe P untuk pembendung air bendungan, irigasi, dan pintu air tambak.',
    'EPDM Premium Grade',
    '{"Lebar Head": "50 mm", "Diameter Bulb": "30 mm", "Ketebalan Flange": "10 mm", "Ketahanan Ozon": "Sangat Baik"}',
    '["Kedap air total (Zero Leakage)", "Sangat tahan radiasi UV dan panas matahari", "Fleksibel untuk tekanan hidrostatis tinggi"]',
    350000,
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600'
),
(
    'prod-105',
    'Karet Lift Block Mobil 160 x 120 x 80 mm',
    'Karet Lift Block Mobil',
    'Bantalan karet penyangga chasis kendaraan pada alat car lift bengkel hidrolik & spooring.',
    'Vulcanized High-Density Rubber',
    '{"Panjang": "160 mm", "Lebar": "120 mm", "Tebal": "80 mm", "Kapasitas Tahan Tekan": "5 Ton"}',
    '["Melindungi bodi bawah kendaraan dari goresan besi lift", "Permukaan beralur anti-slip", "Tahan beban berat tanpa berubah bentuk permanen"]',
    175000,
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600'
),
(
    'prod-106',
    'Rubber Wheel Chock Ganjal Ban Truk Heavy Duty',
    'Rubber Wheel Chock',
    'Ganjal ban karet segitiga pejal untuk armada truk kontainer, bus, dan alat berat pertambangan.',
    'Reclaimed High Impact Rubber',
    '{"Panjang": "250 mm", "Lebar": "160 mm", "Tinggi": "190 mm", "Berat": "4.5 kg/pcs"}',
    '["Mencegah kendaraan menggelinding saat parkir di tanjakan", "Dilengkapi pegangan tangan dan pita reflector kilap malam", "Tidak merusak alur ban"]',
    210000,
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600'
)
ON CONFLICT (id) DO NOTHING;
