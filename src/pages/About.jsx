import "./About.css";
import HeroAnimation from "../components/HeroAnimation/HeroAnimation";
import Reveal from "../components/Reveal/Reveal";

function About() {
  return (
    <main className="about-page">

      {/* ABOUT HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">WHO WE ARE</span>

          <h1>
            A Commitment to
            <br />
            <span>Safety & Trust.</span>
          </h1>

          <p>
            Royal Kings Security is committed to providing
            professional security solutions built around
            safety, trust and reliability.
          </p>
        </div>
      </section>

      {/* ABOUT INTRO */}
      <section className="about-intro">
        <div className="about-section-label">
          <span>01 / ABOUT RKS</span>
          <span>ROYAL KINGS SECURITY</span>
        </div>

        <div className="about-intro-content">
          <h2>
            Security is more than protection.
            It is a responsibility.
          </h2>

          <p>
            We believe in creating a safer environment through
            professional security services and a commitment
            to our clients.
          </p>
        </div>
      </section>

      {/* RAJASTHAN ANIMATION */}
      <HeroAnimation />

      {/* OUR VALUES */}
      <section className="about-values">
        <div className="about-section-label">
          <span>02 / OUR VALUES</span>
          <span>WHAT DEFINES US</span>
        </div>

        <div className="about-values-grid">
          <article className="about-value-card">
            <span>01</span>
            <h3>Trust & Safety</h3>
            <p>
              Building confidence through a commitment to safety.
            </p>
          </article>

          <article className="about-value-card">
            <span>02</span>
            <h3>Professional Team</h3>
            <p>
              Professionalism at the heart of our security services.
            </p>
          </article>

          <article className="about-value-card">
            <span>03</span>
            <h3>Client Commitment</h3>
            <p>
              Keeping client needs and responsibilities a priority.
            </p>
          </article>
        </div>
      </section>

      {/* WHY CHOOSE RKS */}
      <section className="about-why">
        <div className="about-section-label">
          <span>03 / WHY RKS</span>
          <span>OUR APPROACH</span>
        </div>

        <div className="about-why-content">
          <Reveal animation="reveal-left">
            <div className="about-why-heading">
              <span>THE RKS DIFFERENCE</span>

              <h2>
                Protection with
                <br />
                <em>purpose.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <p className="about-why-description">
              Our approach is built around responsibility,
              professionalism and a commitment to providing
              dependable security solutions.
            </p>
          </Reveal>
        </div>

        <div className="about-why-list">
          {[
            {
              number: "01",
              title: "Professional Approach",
              text: "A focus on professionalism and responsibility in every assignment.",
            },
            {
              number: "02",
              title: "Commitment to Safety",
              text: "Keeping protection and safety at the centre of our work.",
            },
            {
              number: "03",
              title: "Client Focus",
              text: "Understanding client needs and maintaining a responsible approach.",
            },
          ].map((item, index) => (
            <Reveal key={item.number} delay={index * 100}>
              <article className="about-why-item">
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="about-why-arrow">↗</span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
            {/* ABOUT CLOSING SECTION */}
      <section className="about-closing">
        <span className="about-closing-label">CONTINUE EXPLORING</span>

        <h2>
          Discover what
          <br />
          <em>RKS stands for.</em>
        </h2>

        <p>
          Explore our security services and learn more about
          our approach to professional protection.
        </p>

        <a href="/services" className="about-closing-link">
          EXPLORE OUR SERVICES
          <span>↗</span>
        </a>
      </section>

    </main>
  );
}

export default About;