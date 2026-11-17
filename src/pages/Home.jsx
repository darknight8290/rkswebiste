
import "./Home.css";
import HeroRibbon from "../components/HeroRibbon/HeroRibbon";
import Reveal from "../components/Reveal/Reveal";
import { Link } from "react-router-dom";

import {
  ShieldCheck,
  Users,
  Building2,
  Eye,
  Award,
  Handshake,
  ArrowUpRight,
  BriefcaseBusiness,
} from "lucide-react";

/* SERVICES */
const services = [
  {
    number: "01",
    slug: "security-guard-services",
    title: "Security Guard Services",
    description:
      "Professional security personnel focused on maintaining safe and secure environments.",
    image: "/images/security-team.jpg",
    icon: ShieldCheck,
  },
  {
    number: "02",
    slug: "corporate-security",
    title: "Corporate Security",
    description:
      "Security support for offices, workplaces and commercial properties.",
    image: "/images/corporate-security.jpg",
    icon: Building2,
  },
  {
    number: "03",
    slug: "event-security",
    title: "Event Security",
    description:
      "Organised security arrangements for events and public gatherings.",
    image: "/images/event-security.jpg",
    icon: Users,
  },
  {
    number: "04",
    slug: "surveillance-services",
    title: "Surveillance Services",
    description:
      "Monitoring solutions designed to support safety and awareness.",
    image: "/images/cctv-monitoring.jpg",
    icon: Eye,
  },
  {
    number: "05",
    slug: "residential-security",
    title: "Residential Security",
    description:
      "Security support for residential communities and private properties.",
    image: "/images/entrance-security.jpg",
    icon: ShieldCheck,
  },
  {
    number: "06",
    slug: "industrial-security",
    title: "Industrial Security",
    description:
      "Professional security support for industrial sites and facilities.",
    image: "/images/security-patrol.jpg",
    icon: Building2,
  },
  {
    number: "07",
    slug: "hotel-security",
    title: "Hotel & Hospitality Security",
    description:
      "Security services designed for hotels and hospitality environments.",
    image: "/images/hotel-security.jpg",
    icon: BriefcaseBusiness,
  },
  {
    number: "08",
    slug: "vip-protection",
    title: "VIP Protection",
    description:
      "Professional protection arrangements tailored to individual requirements.",
    image: "/images/professional-guards.jpg",
    icon: Users,
  },
];

/* VALUES */
const values = [
  {
    number: "01",
    title: "Trust & Safety",
    description:
      "A responsible approach to protecting people, property and workplaces.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Professional Team",
    description:
      "A focus on professionalism, discipline and responsible service.",
    icon: Users,
  },
  {
    number: "03",
    title: "Client Commitment",
    description:
      "Understanding requirements and working towards dependable solutions.",
    icon: Handshake,
  },
  {
    number: "04",
    title: "Quality Approach",
    description:
      "Maintaining a consistent focus on service and professional standards.",
    icon: Award,
  },
];

/* PROJECTS */
const projects = [
  {
    title: "Corporate Protection",
    category: "CORPORATE SECURITY",
    image: "/images/corporate-security.jpg",
  },
  {
    title: "Professional Guarding",
    category: "SECURITY PERSONNEL",
    image: "/images/security-team.jpg",
  },
  {
    title: "Event Protection",
    category: "EVENT SECURITY",
    image: "/images/event-security.jpg",
  },
];

/* BLOG */
const articles = [
  {
    category: "TECHNOLOGY",
    date: "INSIGHTS & UPDATES",
    title: "The Role of Technology in Modern Security",
    description:
      "Understanding how modern monitoring and technology support security services.",
    image: "/images/cctv-monitoring.jpg",
  },
  {
    category: "CORPORATE",
    date: "INSIGHTS & UPDATES",
    title: "Creating Safer Commercial Environments",
    description:
      "Why a professional security approach matters in workplaces and businesses.",
    image: "/images/corporate-security.jpg",
  },
  {
    category: "COMMUNITY",
    date: "INSIGHTS & UPDATES",
    title: "Building a Culture of Safety Together",
    description:
      "The importance of awareness, responsibility and cooperation in security.",
    image: "/images/entrance-security.jpg",
  },
];

/* LEADERSHIP */
const leaders = [
  {
    name: "Narendra Singh Bhadoria",
    role: "Founder, Director & CEO",
    description:
      "Leading the company with a vision of trust, discipline and excellence in security services.",
    image: "/images/narendra-singh.jpg",
  },
  {
    name: "Ashok Choudhary",
    role: "Co-founder",
    description:
      "Contributing to reliable operations and professional security solutions.",
    image: "/images/ashok-choudhary.jpg",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <HeroRibbon />

      {/* ABOUT */}
      <section className="home-about">
        <Reveal>
          <div className="home-section-top">
            <span>01 / WHO WE ARE</span>
            <span>ROYAL KINGS SECURITY</span>
          </div>
        </Reveal>

        <div className="about-preview-content">
          <Reveal animation="reveal-left">
            <div className="about-preview-heading">
              <span className="about-small-label">ABOUT RKS</span>
              <h2>
                A commitment to
                <br />
                <em>Safety & Trust.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="about-preview-description">
              <p>
                Royal Kings Security is committed to providing professional
                security solutions with a focus on safety, trust and
                reliability.
              </p>
              <p>
                We believe that effective security begins with understanding
                people, places and their individual requirements.
              </p>
              <Link to="/about" className="home-text-link">
                DISCOVER OUR STORY <ArrowUpRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="about-preview-bottom">
            <span>TRUST & SAFETY</span>
            <span>PROFESSIONAL TEAM</span>
            <span>CLIENT COMMITMENT</span>
          </div>
        </Reveal>
      </section>

      {/* SERVICES */}
      <section className="home-services">
        <Reveal>
          <div className="home-section-top light">
            <span>02 / WHAT WE DO</span>
            <span>OUR SERVICES</span>
          </div>
        </Reveal>

        <div className="home-heading-row">
          <Reveal animation="reveal-left">
            <div>
              <span className="home-eyebrow">OUR EXPERTISE</span>
              <h2>
                Security with
                <br />
                <em>purpose.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <p>
              Professional security solutions designed around protection,
              responsibility and trust.
            </p>
          </Reveal>
        </div>

        {/* HORIZONTAL ACCORDION CARDS */}
        <div className="home-service-deck">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                to={`/services/${service.slug}`}
                className="home-service-playing-card"
                key={service.number}
              >
                <div className="service-card-image">
                  <img src={service.image} alt={service.title} />
                  <div className="service-card-overlay" />
                </div>

                <div className="service-card-content">
                  <div className="service-card-top">
                    <span>{service.number}</span>
                    <Icon size={25} strokeWidth={1.4} />
                  </div>

                  <div className="service-card-vertical-title">
                    {service.title}
                  </div>

                  <div className="service-card-details">
                    <span className="service-card-category">
                      RKS SECURITY SERVICES
                    </span>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <span className="service-card-learn">
                      LEARN MORE <ArrowUpRight size={17} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link to="/services" className="home-text-link light-link">
          EXPLORE ALL SERVICES <ArrowUpRight size={17} />
        </Link>
      </section>

      {/* WHY CHOOSE RKS */}
      <section className="home-values">
        <Reveal>
          <div className="home-section-top">
            <span>03 / OUR APPROACH</span>
            <span>WHY ROYAL KINGS SECURITY</span>
          </div>
        </Reveal>

        <div className="home-heading-row">
          <Reveal animation="reveal-left">
            <div>
              <span className="home-eyebrow">WHAT DEFINES US</span>
              <h2>
                Built on
                <br />
                <em>strong values.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <p>
              Our approach is shaped by responsibility, professionalism and
              the importance of creating safer environments.
            </p>
          </Reveal>
        </div>

        <div className="home-values-grid">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <Reveal key={value.number}>
                <div className="home-value-card">
                  <span className="home-value-number">{value.number}</span>
                  <Icon size={30} strokeWidth={1.4} />
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* PROJECT SHOWCASE */}
      <section className="home-projects">
        <Reveal>
          <div className="home-section-top">
            <span>04 / OUR WORK</span>
            <span>PROJECT SHOWCASE</span>
          </div>
        </Reveal>

        <div className="home-heading-row">
          <Reveal animation="reveal-left">
            <div>
              <span className="home-eyebrow">OUR EXPERIENCE</span>
              <h2>
                Focused on
                <br />
                <em>protection.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <p>
              Explore visual examples of the different security environments
              and service areas we work with.
            </p>
          </Reveal>
        </div>

        <div className="home-project-grid">
          {projects.map((project, index) => (
            <Reveal key={project.title}>
              <Link to="/projects" className="home-project-card">
                <div className="home-project-image">
                  <img src={project.image} alt={project.title} />
                  <span>0{index + 1}</span>
                </div>
                <div className="home-project-info">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <ArrowUpRight size={20} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Link to="/projects" className="home-text-link">
          VIEW ALL PROJECTS <ArrowUpRight size={17} />
        </Link>
      </section>

      {/* BLOG */}
      <section className="home-blog">
        <Reveal>
          <div className="home-section-top">
            <span>05 / INSIGHTS & UPDATES</span>
            <span>THE RKS JOURNAL</span>
          </div>
        </Reveal>

        <div className="home-heading-row">
          <Reveal animation="reveal-left">
            <div>
              <span className="home-eyebrow">NEWS & KNOWLEDGE</span>
              <h2>
                Ideas that
                <br />
                <em>inform.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <p>
              Read about security awareness, professional practices and
              developments across the security industry.
            </p>
          </Reveal>
        </div>

        <div className="home-blog-grid">
          {articles.map((article) => (
            <Reveal key={article.title}>
              <Link to="/blog" className="home-blog-card">
                <div className="home-blog-image">
                  <img src={article.image} alt={article.category} />
                </div>
                <div className="home-blog-content">
                  <div className="home-blog-meta">
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <span className="home-blog-read">
                    READ INSIGHT <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Link to="/blog" className="home-text-link">
          EXPLORE THE JOURNAL <ArrowUpRight size={17} />
        </Link>
      </section>

      {/* LEADERSHIP */}
      <section className="home-leadership">
        <Reveal>
          <div className="home-section-top">
            <span>06 / LEADERSHIP</span>
            <span>THE PEOPLE BEHIND RKS</span>
          </div>
        </Reveal>

        <div className="home-heading-row">
          <Reveal animation="reveal-left">
            <div>
              <span className="home-eyebrow">OUR LEADERSHIP</span>
              <h2>
                Guided by
                <br />
                <em>experience.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <p>
              Meet the leadership behind Royal Kings Security and its
              commitment to professional security services.
            </p>
          </Reveal>
        </div>

        <div className="home-leaders-grid">
          {leaders.map((leader) => (
            <Reveal key={leader.name}>
              <article className="home-leader-card">
                <div className="home-leader-image">
                  <img src={leader.image} alt={leader.name} />
                </div>
                <div className="home-leader-info">
                  <span>{leader.role}</span>
                  <h3>{leader.name}</h3>
                  <p>{leader.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CAREERS */}
      <section className="home-career">
        <Reveal>
          <div className="home-section-top">
            <span>07 / OPPORTUNITIES</span>
            <span>CAREERS AT RKS</span>
          </div>
        </Reveal>

        <div className="career-preview-content">
          <Reveal animation="reveal-left">
            <div className="career-preview-heading">
              <span>GROW WITH US</span>
              <h2>
                Build your
                <br />
                <em>future.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="career-preview-description">
              <BriefcaseBusiness size={32} strokeWidth={1.3} />
              <p>
                Interested in becoming part of a professional security team?
                Explore career opportunities and learn more about working
                with Royal Kings Security.
              </p>
              <Link to="/career" className="home-text-link">
                EXPLORE CAREERS <ArrowUpRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="home-cta">
        <Reveal>
          <span className="home-eyebrow">LET'S TALK SECURITY</span>
          <h2>
            Your safety.
            <br />
            <em>Our commitment.</em>
          </h2>
          <p>
            Tell us about your security requirements. Let's explore a suitable
            solution together.
          </p>
          <Link to="/contact" className="home-cta-button">
            REQUEST A QUOTE <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}

export default Home;
