
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
          <span className="services-eyebrow">
            WHAT WE DO
          </span>

          <h1>
            Security<br />
            <em>Solutions.</em>
          </h1>

          <p>
            Professional security solutions designed around
            protection, responsibility and trust.
          </p>
        </div>

        <span className="services-hero-number">
          03 / OUR SERVICES
        </span>
      </section>

      {/* SERVICES INTRO */}
      <section className="services-intro">
        <div className="services-section-label">
          <span>01 / OUR EXPERTISE</span>
          <span>SECURITY WITH PURPOSE</span>
        </div>

        <div className="services-intro-content">
          <Reveal animation="reveal-left">
            <h2>
              Security with<br />
              <em>purpose.</em>
            </h2>
          </Reveal>

          <Reveal>
            <p>
              Professional security solutions designed around
              protection, responsibility and trust.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section className="services-list-section">
        <div className="services-section-label">
          <span>02 / WHAT WE PROVIDE</span>
          <span>EXPLORE OUR SERVICES</span>
        </div>

        <div className="services-accordion">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.slug}`}
              className={`service-accordion-card ${
                index === 0 ? "active" : ""
              }`}
              key={service.slug}
            >
              {/* CARD IMAGE */}
              <img
                className="service-accordion-image"
                src={service.image}
                alt={service.title}
                loading="lazy"
              />

              {/* IMAGE OVERLAY */}
              <div className="service-accordion-overlay"></div>

              {/* CARD TOP */}
              <div className="service-accordion-top">
                <span className="service-accordion-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="service-accordion-arrow">
                  ↗
                </span>
              </div>

              {/* COLLAPSED TITLE */}
              <h3 className="service-accordion-vertical-title">
                {service.title}
              </h3>

              {/* EXPANDED CONTENT */}
              <div className="service-accordion-content">
                <span className="service-accordion-tag">
                  {service.tag || "RKS SECURITY SERVICES"}
                </span>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <span className="service-accordion-explore">
                  EXPLORE SERVICE <span>↗</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link to="/services" className="services-all-link">
          EXPLORE ALL SERVICES <span>↗</span>
        </Link>
      </section>

      {/* SERVICES CLOSING */}
      <section className="services-closing">
        <div className="services-closing-content">
          <span>RKS / OUR COMMITMENT</span>

          <h2>
            Protection<br />
            <em>With Purpose.</em>
          </h2>

          <p>
            Discover the values and professional approach
            behind Royal Kings Security.
          </p>

          <Link to="/about" className="services-closing-link">
            ABOUT ROYAL KINGS <span>↗</span>
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Services;
