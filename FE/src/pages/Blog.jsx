// =============================================
// Blog.jsx — Articles Page (No emojis)
// =============================================
import BlogCard from '../components/BlogCard.jsx'

const articles = [
  {
    id: 1,
    title: 'Panduan Memilih Material Rubber Mounting yang Tepat untuk Mesin Industri',
    excerpt: 'Ketahui perbedaan karakteristik Natural Rubber, NBR, EPDM, dan Silicone dalam meredam getaran mesin genset dan pabrik.',
    date: '2026-06-15',
  },
  {
    id: 2,
    title: 'Pentingnya Rubber Screen Mesh pada Vibrating Screen Tambang Batubara',
    excerpt: 'Mengapa rubber screen lebih awet dan hemat biaya maintenance dibandingkan kawat besi kassa biasa pada industri pertambangan.',
    date: '2026-05-28',
  },
  {
    id: 3,
    title: 'Cara Mengukur Kekerasan Karet (Durometer Shore A) Secara Tepat',
    excerpt: 'Memahami standar skala kekerasan rubber dan bagaimana dampaknya terhadap performa seal maupun bantalan peredam.',
    date: '2026-04-10',
  },
  {
    id: 4,
    title: 'Fungsi &amp; Pemeliharaan Rubber Fender pada Dermaga Pelabuhan',
    excerpt: 'Tips memperpanjang usia pakai rubber fender agar efektif melindungi kapal dari benturan keras saat berlabuh.',
    date: '2026-03-05',
  },
]

function Blog() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Blog &amp; Artikel Teknis</h2>
          <p>Informasi dan edukasi seputar teknologi material karet dan teknik industri</p>
        </div>

        <div className="blog-grid">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
