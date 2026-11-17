import { ArrowUpRight, ArrowUp } from "lucide-react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="rks-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/rks-logo.png" alt="RKS Royal Kings Security" />

          <p>
            Professional security solutions with a commitment to safety,
            trust and reliability.
          </p>
        </div>

        <div className="footer-navigation">
          <span className="footer-label">EXPLORE</span>

          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/projects">Projects</a>
          <a href="/blog">Blog</a>
          <a href="/career">Career</a>
        </div>

        <div className="footer-contact">
          <span className="footer-label">GET IN TOUCH</span>

          <p>
            Have a question or want to know more about our security
            solutions?
          </p>

          <span className="footer-contact-note">
            Contact details will be added here.
          </span>
        </div>
      </div>

      <div className="footer-middle">
        <span>SAFETY</span>
        <span className="footer-middle-dot">•</span>
        <span>TRUST</span>
        <span className="footer-middle-dot">•</span>
        <span>RELIABILITY</span>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} R.K.S. Royal Kings Security. All rights reserved.
        </p>

        <button
          className="footer-back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          BACK TO TOP <ArrowUp size={16} />
        </button>

        <span>DESIGNED WITH PURPOSE.</span>
      </div>
    </footer>
  );
}

export default Footer;