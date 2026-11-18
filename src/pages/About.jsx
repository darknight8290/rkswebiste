import "./About.css";
import { Link } from "react-router-dom";

import HeroAnimation from "../components/HeroAnimation/HeroAnimation";
import Reveal from "../components/Reveal/Reveal";

function About() {
  const whyChooseRKS = [
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
  ];

  const clientsRowOne = [
    { name: "Ajit Bhawan", mark: "AJIT", style: "ajit" },
    { name: "Rajasthan Royals", mark: "RR", style: "royals" },
    { name: "Radisson Hotels", mark: "RADISSON", style: "radisson" },
    { name: "E2P Mart", mark: "E2P", style: "e2p" },
    { name: "Sekura", mark: "SEKURA", style: "sekura" },
    { name: "Suryagarh Jaisalmer", mark: "SURYAGARH", style: "suryagarh" },
    { name: "TEDx", mark: "TEDx", style: "tedx" },
    { name: "SSPARK", mark: "SSPARK", style: "sspark" },
  ];

  const clientsRowTwo = [
    { name: "Taj Hotels", mark: "TAJ", style: "taj" },
    {
      name: "Uttarakhand Premier League (UPL)",
      mark: "UPL",
      style: "upl",
    },
    {
      name: "Rajasthan Premier League (RPL)",
      mark: "RPL",
      style: "rpl",
    },
    {
      name: "National Institute of Fashion Technology (NIFT)",
      mark: "NIFT",
      style: "nift",
    },
    {
      name: "Indian Institute of Technology (IIT)",
      mark: "IIT",
      style: "iit",
    },
    { name: "Dainik Bhaskar", mark: "दैनिक भास्कर", style: "dainik" },
    { name: "The Jaipur Dialogues", mark: "TJD", style: "jaipur" },
    { name: "Radisson Hotels", mark: "RADISSON", style: "radisson" },
  ];

  const renderClientCard = (client, index) => (
    <article
      className="about-client-card"
      key={`${client.name}-${index}`}
    >
      <div className={`about-client-logo ${client.style}`}>
        {client.mark}
      </div>

      <span className="about-client-name">
        {client.name}
      </span>
    </article>
  );

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
          <Reveal animation="reveal-left">
            <h2>
              Security is more than protection.
              It is a responsibility.
            </h2>
          </Reveal>

          <Reveal>
            <p>
              We believe in creating a safer environment through
              professional security services and a commitment
              to our clients.
            </p>
          </Reveal>
        </div>
      </section>

      {/* RAJASTHAN ANIMATION */}
      <HeroAnimation />

      {/* ORGANIZATIONS THAT TRUST RKS */}
      <section className="about-clients">
        <div className="about-clients-heading">
          <span className="about-clients-eyebrow">
            TRUSTED BY INDUSTRY LEADERS
          </span>

          <Reveal>
            <h2>
              Organizations That Trust Our
              <br />
              <em>Security Services.</em>
            </h2>
          </Reveal>

          <p>
            Over the years, we have proudly delivered professional
            security solutions for leading organizations across
            hospitality, corporate, sports, education, media,
            and commercial sectors.
          </p>
        </div>

        {/* FIRST AUTOMATIC ROW */}
        <div className="about-client-marquee">
          <div className="about-client-track">
            {clientsRowOne.map(renderClientCard)}

            {clientsRowOne.map((client, index) =>
              renderClientCard(client, `duplicate-${index}`)
            )}
          </div>
        </div>

        {/* SECOND AUTOMATIC ROW */}
        <div className="about-client-marquee about-client-marquee-reverse">
          <div className="about-client-track">
            {clientsRowTwo.map(renderClientCard)}

            {clientsRowTwo.map((client, index) =>
              renderClientCard(client, `duplicate-${index}`)
            )}
          </div>
        </div>

        <div className="about-clients-cta">
          <Link to="/contact">
            Become Our Next Success Story
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="about-values">
        <div className="about-section-label">
          <span>03 / OUR VALUES</span>
          <span>WHAT DEFINES US</span>
        </div>

        <div className="about-values-grid">
          <Reveal>
            <article className="about-value-card">
              <span>01</span>
              <h3>Trust & Safety</h3>
              <p>
                Building confidence through a commitment to safety.
              </p>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="about-value-card">
              <span>02</span>
              <h3>Professional Team</h3>
              <p>
                Professionalism at the heart of our security services.
              </p>
            </article>
          </Reveal>

          <Reveal delay={200}>
            <article className="about-value-card">
              <span>03</span>
              <h3>Client Commitment</h3>
              <p>
                Keeping client needs and responsibilities a priority.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE RKS */}
      <section className="about-why">
        <div className="about-section-label">
          <span>04 / WHY RKS</span>
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
          {whyChooseRKS.map((item, index) => (
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

      {/* ABOUT CLOSING */}
      <section className="about-closing">
        <span className="about-closing-label">
          CONTINUE EXPLORING
        </span>

        <h2>
          Discover what
          <br />
          <em>RKS stands for.</em>
        </h2>

        <p>
          Explore our security services and learn more about
          our approach to professional protection.
        </p>

        <Link to="/services" className="about-closing-link">
          EXPLORE OUR SERVICES
          <span>↗</span>
        </Link>
      </section>
    </main>
  );
}

export default About;