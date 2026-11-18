
import { Link, useParams, Navigate } from "react-router-dom";
import blogData from "../data/blogData";
import Reveal from "../components/Reveal/Reveal";
import "./BlogDetail.css";

function BlogDetail() {
  const { slug } = useParams();

  const blog = blogData.find((item) => item.slug === slug);

  // ARTICLE NOT FOUND
  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const articleContent = blog.content || [];

  return (
    <main className="blog-detail-page">

      {/* ARTICLE HERO */}
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-content">

          <Link to="/blog" className="blog-back-link">
            ← BACK TO JOURNAL
          </Link>

          <div className="blog-detail-meta">
            <span>{blog.category}</span>
            <span>{blog.date}</span>
          </div>

          <h1>{blog.title}</h1>

          <p>{blog.excerpt}</p>

          <span className="blog-detail-read-time">
            {blog.readTime}
          </span>

        </div>
      </section>

      {/* FEATURED IMAGE */}
      <section className="blog-detail-featured">
        <Reveal>
          <img
            src={blog.image}
            alt={blog.title}
            loading="eager"
          />
        </Reveal>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="blog-detail-content">

        <div className="blog-detail-label">
          <span>RKS / JOURNAL</span>
          <span>
            ARTICLE / {String(blog.id ?? 0).padStart(3, "0")}
          </span>
        </div>

        <div className="blog-detail-body">

          <Reveal animation="reveal-left">
            <div className="blog-detail-heading">
              <span>INSIGHTS & PERSPECTIVES</span>

              <h2>
                Understanding
                <br />
                <em>the subject.</em>
              </h2>
            </div>
          </Reveal>

          <div className="blog-detail-article">

            {articleContent.map((section, index) => (
              <Reveal key={`${blog.slug}-${index}`}>
                <article className="blog-content-section">

                  <span className="blog-content-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{section.heading}</h3>

                  <p>{section.paragraph}</p>

                </article>
              </Reveal>
            ))}

            {articleContent.length === 0 && (
              <p>Article content will be available soon.</p>
            )}

          </div>

        </div>

      </section>

      {/* ARTICLE FOOTER */}
      <section className="blog-detail-footer">

        <span>RKS / ROYAL KINGS SECURITY</span>

        <h2>
          Thank You
          <br />
          For Reading.
        </h2>

        <Link to="/blog" className="blog-detail-button">
          EXPLORE MORE ARTICLES
          <span>↗</span>
        </Link>

      </section>

    </main>
  );
}

export default BlogDetail;
