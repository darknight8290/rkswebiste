
import "./Blog.css";
import Reveal from "../components/Reveal/Reveal";
import { Link } from "react-router-dom";
import blogData from "../data/blogData";

function Blog() {
  return (
    <main className="blog-page">

      {/* BLOG HERO */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <span className="blog-eyebrow">INSIGHTS & UPDATES</span>

          <h1>
            The RKS
            <br />
            <em>Journal.</em>
          </h1>

          <p>
            Perspectives, updates and insights from
            the world of professional security.
          </p>
        </div>

        <span className="blog-hero-number">05 / JOURNAL</span>
      </section>

      {/* BLOG INTRO */}
      <section className="blog-intro">
        <div className="blog-section-label">
          <span>01 / THE JOURNAL</span>
          <span>THOUGHTS & PERSPECTIVES</span>
        </div>

        <div className="blog-intro-content">
          <Reveal animation="reveal-left">
            <h2>
              Knowledge builds
              <br />
              <em>awareness.</em>
            </h2>
          </Reveal>

          <Reveal>
            <p>
              A space for sharing relevant updates,
              perspectives and information related to
              security and safety.
            </p>
          </Reveal>
        </div>
      </section>

      {/* BLOG ARTICLES */}
      <section className="blog-articles-section">
        <div className="blog-section-label">
          <span>02 / LATEST STORIES</span>
          <span>RKS JOURNAL</span>
        </div>

        <div className="blog-articles-grid">
          {blogData.map((blog, index) => (
            <Reveal key={blog.slug} animation="reveal-up">
              <article className="blog-card">

                {/* IMAGE */}
                <Link
                  to={`/blog/${blog.slug}`}
                  className="blog-card-image-link"
                >
                  <div className="blog-card-image">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                    />

                    <span className="blog-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span>{blog.category}</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3>
                    <Link to={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p>{blog.excerpt}</p>

                  <div className="blog-card-bottom">
                    <span>{blog.readTime}</span>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="blog-read-more"
                    >
                      READ ARTICLE
                      <span>↗</span>
                    </Link>
                  </div>
                </div>

              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BLOG CLOSING */}
      <section className="blog-closing">
        <div className="blog-closing-content">
          <span className="blog-closing-label">
            RKS / JOURNAL
          </span>

          <h2>
            Stay Connected
            <br />
            With RKS.
          </h2>

          <p>
            Explore our services and learn more about
            our approach to security.
          </p>

          <Link
            to="/services"
            className="blog-closing-button"
          >
            Explore Our Services
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Blog;
