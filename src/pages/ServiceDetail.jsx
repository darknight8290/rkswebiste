
import { Link, useParams } from "react-router-dom";
import services from "../data/servicesData";
import "./ServiceDetail.css";

function ServiceDetail() {
  const { slug } = useParams();

  const service = services.find(
    (item) => item.slug === slug
  );

  // SERVICE NOT FOUND
  if (!service) {
    return (
      <main className="service-not-found">
        <span>404 / SERVICE NOT FOUND</span>

        <h1>Service <em>Unavailable.</em></h1>

        <p>
          The service you are looking for could not be found.
        </p>

        <Link to="/services">
          BACK TO SERVICES ↗
        </Link>
      </main>
    );
  }

  return (
    <main className="service-detail-page">

      {/* HERO */}
      <section className="service-detail-hero">
        <div className="service-detail-hero-content">

          <span className="service-detail-eyebrow">
            ROYAL KINGS SECURITY / OUR SERVICES
          </span>

          <span className="service-detail-number">
            {service.number} / 07
          </span>

          <h1>
            {service.title}
          </h1>

          <p>{service.description}</p>

          <Link to="/services" className="service-detail-back">
            ← ALL SERVICES
          </Link>

        </div>
      </section>

      {/* OVERVIEW */}
      <section className="service-detail-overview">

        <div className="service-detail-label">
          <span>01 / OVERVIEW</span>
          <span>{service.tag}</span>
        </div>

        <div className="service-detail-overview-content">

          <h2>
            Protection with
            <br />
            <em>purpose.</em>
          </h2>

          <p>{service.overview}</p>

        </div>
      </section>

      {/* SERVICE COVERAGE */}
      <section className="service-detail-coverage">

        <div className="service-detail-label">
          <span>02 / WHAT WE COVER</span>
          <span>OUR RESPONSIBILITIES</span>
        </div>

        <div className="service-detail-coverage-content">

          <h2>
            Our approach to
            <br />
            <em>your safety.</em>
          </h2>

          <div className="service-detail-list">
            {service.coverage.map((item, index) => (
              <div className="service-detail-list-item" key={`${service.slug}-${item}`}>
                <span>0{index + 1}</span>
                <p>{item}</p>
                <span>↗</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="service-detail-cta">

        <span>ROYAL KINGS SECURITY</span>

        <h2>
          Looking for reliable
          <br />
          <em>security solutions?</em>
        </h2>

        <p>
          Connect with our team to discuss your security
          requirements and explore the right approach.
        </p>

        <Link to="/contact">
          GET IN TOUCH <span>↗</span>
        </Link>

      </section>

    </main>
  );
}

export default ServiceDetail;
