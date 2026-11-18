
import "./Footer.css";
import { Link } from "react-router-dom";

import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="rks-footer">

      {/* TOP BRAND ROW */}
      <div className="footer-top">

        <Link to="/" className="footer-brand">
          <img src="/rks-logo.png" alt="RKS Logo" />

          <div>
            <h2>R.K.S. ROYAL KINGS SECURITY</h2>
            <span>PROFESSIONAL SECURITY SERVICES</span>
          </div>
        </Link>

        <span className="footer-brand-tag">
          SAFETY · TRUST · RELIABILITY
        </span>

      </div>

      {/* FOOTER MAIN CONTENT */}
      <div className="footer-main">

        {/* SERVICES */}
        <div className="footer-column">
          <h3>Services</h3>

          <ul>
            <li>School Security</li>
            <li>Mall Security</li>
            <li>Hotel Security</li>
            <li>Personal Security</li>
            <li>Corporate Security</li>
            <li>Event Security</li>
          </ul>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="footer-column footer-contact">
          <h3>Contact Information</h3>

          <div className="footer-contact-item">
            <Phone size={15} />

            <div>
              <span>Phone</span>

              <a href="tel:+917073350667">
                +91 7073350667
              </a>

              <a href="tel:+919983831205">
                +91 9983831205
              </a>
            </div>
          </div>

          <div className="footer-contact-item">
            <Mail size={15} />

            <div>
              <span>Email</span>

              <a href="mailto:Rks.royalkings@gmail.com">
                Rks.royalkings@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* OFFICE LOCATIONS */}
        <div className="footer-column footer-offices">
          <h3>Office Locations</h3>

          <div className="footer-office">
            <MapPin size={15} />

            <div>
              <strong>Head Office</strong>

              <p>
                Man Ji Ka Hatta, Paota,
                Jodhpur, Rajasthan - 342001
              </p>
            </div>
          </div>

          <div className="footer-office">
            <MapPin size={15} />

            <div>
              <strong>Regional Office</strong>

              <p>
                Children's Park Road,
                Behind Saras Cabin,
                Sardarpura, Jodhpur,
                Rajasthan - 342001
              </p>
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="footer-column footer-social">
          <h3>Social Media</h3>

          <div className="footer-social-links">
            <span>Facebook</span>

            <span className="footer-social-icon facebook-icon">
              f
            </span>
          </div>

          <div className="footer-social-links">
            <span>Instagram</span>

            <span className="footer-social-icon instagram-icon">
              ◎
            </span>
          </div>

          <Link to="/services" className="footer-explore">
            Explore Our Services
            <ArrowUpRight size={15} />
          </Link>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} Royal Kings Security.
          All Rights Reserved.
        </span>

        <Link to="/">
          Back to Home ↑
        </Link>

      </div>

    </footer>
  );
}

export default Footer;
