// =============================================
// BlogCard.jsx — Blog Article Card (No emojis)
// =============================================
import { formatDate } from '../helpers.js'

function BlogCard({ article }) {
  return (
    <div className="blog-card">
      <div className="blog-card-body">
        <span className="blog-card-date">{formatDate(article.date)}</span>
        <h3 className="blog-card-title">{article.title}</h3>
        <p className="blog-card-excerpt">{article.excerpt}</p>
        <div className="blog-card-footer">
          <span className="blog-read-more">Baca Selengkapnya →</span>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
