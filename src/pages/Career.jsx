import "./Career.css";
import Reveal from "../components/Reveal/Reveal";

function Career() {
  return (
    <main className="career-page">

      {/* CAREER HERO */}
      <section className="career-hero">
        <div className="career-hero-content">
          <span className="career-eyebrow">CAREERS AT RKS</span>

          <h1>
            Grow With
            <br />
            <em>RKS.</em>
          </h1>

          <p>
            Discover opportunities to become part of
            a professional security environment.
          </p>
        </div>

        <span className="career-hero-number">06 / CAREER</span>
      </section>

      {/* CAREER INTRO */}
      <section className="career-intro">
        <div className="career-section-label">
          <span>01 / WORK WITH US</span>
          <span>ROYAL KINGS SECURITY</span>
        </div>

        <div className="career-intro-content">
          <Reveal animation="reveal-left">
            <h2>
              Build your future
              <br />
              with <em>purpose.</em>
            </h2>
          </Reveal>

          <Reveal>
            <p>
              We value professionalism, responsibility and
              commitment. This page is where career
              opportunities at RKS will be shared.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CAREER OPPORTUNITIES */}
      <section className="career-opportunities">
        <div className="career-section-label">
          <span>02 / OPPORTUNITIES</span>
          <span>JOIN OUR TEAM</span>
        </div>

        <div className="career-empty">
          <span className="career-empty-number">RKS / CAREERS</span>

          <div className="career-empty-content">
            <span>CAREER UPDATES</span>

            <h3>
              Opportunities
              <br />
              will appear here.
            </h3>

            <p>
              Available positions and application details
              will be published here when confirmed.
            </p>
          </div>

          <span className="career-empty-mark">RKS</span>
        </div>
      </section>
      {/* CAREER CLOSING */}
      <section className="career-closing">
        <span className="career-closing-label">
          THE RKS APPROACH
        </span>

        <h2>
          Professionalism.
          <br />
          <em>Responsibility.</em>
        </h2>

        <p>
          Discover the values and commitment that
          shape Royal Kings Security.
        </p>

        <a href="/about" className="career-closing-link">
          DISCOVER RKS
          <span>↗</span>
        </a>
      </section>
    </main>
  );
}

export default Career;