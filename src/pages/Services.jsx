
import "./Services.css";
import Reveal from "../components/Reveal/Reveal";
import { Link } from "react-router-dom";
import services from "../data/servicesData";

function Services() {
  return (
    <main className="services-page">

      {/* SERVICES HERO */}
      <section className="services-hero">
        <div className="services-hero-content">
          <span className="services-eyebrow">WHAT WE DO</span>

          <h1>
            Security
            <br />
            <em>Solutions.</em>
          </h1>

          <p>
            Professional security services built around
            responsibility, safety and reliability.
          </p>
        </div>

        <span className="services-hero-number">
          03 / SERVICES
        </span>
      </section>

      {/* SERVICES INTRO */}
      <section className="services-intro">
        <div className="services-section-label">
          <span>01 / OUR SERVICES</span>
          <span>PROTECTION WITH PURPOSE</span>
        </div>

        <div className="services-intro-content">
          <h2>
            The right approach
            <br />
            to <em>every responsibility.</em>
          </h2>

          <p>
            Every environment has different security needs.
            Our services focus on providing professional
            support with a responsible approach.
          </p>
        </div>
      </section>

      {/* DYNAMIC SERVICES ACCORDION */}
      <section className="services-list-section">
        <div className="services-section-label">
          <span>02 / WHAT WE OFFER</span>
          <span>OUR EXPERTISE</span>
        </div>

        <div className="services-accordion">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 100}>
              <Link
                to={`/services/${service.slug}`}
                className="service-card-link"
              >
                <article
                  className={`service-card service-card-${service.theme}`}
                >

                  {/* SERVICE BACKGROUND IMAGE */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-card-image"
                    loading="lazy"
                  />

                  {/* CARD TOP */}
                  <div className="service-card-top">
                    <span className="service-number">
                      {service.number}
                    </span>

                    <span className="service-arrow">
                      ↗
                    </span>
                  </div>

                  {/* CARD CONTENT */}
                  <div className="service-card-content">
                    <span className="service-tag">
                      {service.tag}
                    </span>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <span className="service-card-bottom">
                      EXPLORE SERVICE ↗
                    </span>
                  </div>

                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES CLOSING */}
      <section className="services-closing">
        <span className="services-closing-label">
          BUILT AROUND YOUR SECURITY NEEDS
        </span>

        <h2>
          Protection starts
          <br />
          with the <em>right approach.</em>
        </h2>

        <p>
          Discover more about Royal Kings Security and
          our commitment to professional security solutions.
        </p>

        <Link to="/about" className="services-closing-link">
          DISCOVER RKS
          <span>↗</span>
        </Link>
      </section>

    </main>
  );
}

export default Services;
