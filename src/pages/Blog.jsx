import "./Blog.css";
import Reveal from "../components/Reveal/Reveal";
import { Link } from "react-router-dom";


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

        <div className="blog-empty">
          <span className="blog-empty-number">JOURNAL / 001</span>

          <div className="blog-empty-content">
            <span>COMING SOON</span>

            <h3>
              New perspectives
              <br />
              will be shared here.
            </h3>

            <p>
              Articles and updates will appear here
              when they are ready to publish.
            </p>
          </div>

          <span className="blog-empty-mark">RKS</span>
        </div>
      </section>
{/* BLOG CLOSING SECTION */}
<section className="blog-closing">
  <div className="blog-closing-content">
    <span className="blog-closing-label">RKS / JOURNAL</span>

    <h2>
      Stay Connected
      <br />
      With RKS.
    </h2>

    <p>
      Explore our services and learn more about our approach to security.
    </p>

    <Link to="/services" className="blog-closing-button">
      Explore Our Services
    </Link>
  </div>
</section>
    </main>
  );
}

export default Blog;