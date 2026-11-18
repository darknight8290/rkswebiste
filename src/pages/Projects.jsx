
import "./Projects.css";
import Reveal from "../components/Reveal/Reveal";
import { Link } from "react-router-dom";

function Projects() {
  return (
    <main className="projects-page">

      {/* PROJECTS HERO */}
      <section className="projects-hero">
        <div className="projects-hero-content">
          <span className="projects-eyebrow">
            OUR EXPERIENCE
          </span>

          <h1>
            Projects &
            <br />
            <em>Experience.</em>
          </h1>

          <p>
            A closer look at the work and experience
            behind Royal Kings Security.
          </p>
        </div>

        <span className="projects-hero-number">
          04 / PROJECTS
        </span>
      </section>

      {/* PROJECTS INTRO */}
      <section className="projects-intro">
        <div className="projects-section-label">
          <span>01 / OUR WORK</span>
          <span>ROYAL KINGS SECURITY</span>
        </div>

        <div className="projects-intro-content">
          <Reveal animation="reveal-left">
            <h2>
              Every responsibility
              <br />
              deserves a <em>professional approach.</em>
            </h2>
          </Reveal>

          <Reveal>
            <p>
              Our work reflects a commitment to safety,
              professionalism and dependable security support.
              This space will showcase our project experience.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <section className="projects-gallery-section">
        <div className="projects-section-label">
          <span>02 / SELECTED WORK</span>
          <span>PROJECT GALLERY</span>
        </div>

        <div className="projects-empty">
          <span className="projects-empty-number">
            01 — 00
          </span>

          <div className="projects-empty-content">
            <span>PROJECT SHOWCASE</span>

            <h3>
              Our work will be featured here.
            </h3>

            <p>
              Project details and visual highlights will be
              added when the material is available.
            </p>
          </div>

          <span className="projects-empty-mark">
            RKS
          </span>
        </div>
      </section>

      {/* PROJECTS CLOSING */}
      <section className="projects-closing">
        <span>BEHIND EVERY PROJECT</span>

        <h2>
          Commitment.
          <br />
          <em>Professionalism.</em>
        </h2>

        <p>
          Learn more about the values and approach
          that define Royal Kings Security.
        </p>

        <Link
          to="/about"
          className="projects-closing-link"
        >
          ABOUT ROYAL KINGS
          <span>↗</span>
        </Link>
      </section>

    </main>
  );
}

export default Projects;
