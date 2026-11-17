import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import {
  Menu,
  X,
  House,
  UserRound,
  ShieldCheck,
  FolderKanban,
  Newspaper,
  BriefcaseBusiness,
  Mail,
} from "lucide-react";



import "./Navbar.css";

const navLinks = [
  { name: "Home", path: "/", icon: House },
  { name: "About", path: "/about", icon: UserRound },
  { name: "Services", path: "/services", icon: ShieldCheck },
  { name: "Projects", path: "/projects", icon: FolderKanban },
  { name: "Blog", path: "/blog", icon: Newspaper },
  { name: "Career", path: "/career", icon: BriefcaseBusiness },
  { name: "Contact", path: "/contact", icon: Mail },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <header className="rks-navbar">
        <Link to="/" className="rks-logo">
          <img src="/rks-logo.png" alt="RKS Royal Kings Security" />
        </Link>
      </header>

      <div className={`radial-navigation ${menuOpen ? "is-open" : ""}`}>
        <div className="radial-navigation-items">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const angle = 180 + index * 18;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                tabIndex={menuOpen ? 0 : -1}
                aria-label={link.name}
                data-label={link.name}
                style={{
                  "--angle": `${angle}deg`,
                  "--counter-angle": `${-angle}deg`,
                  "--item-delay": `${index * 60}ms`,
                }}
                className={({ isActive }) =>
                  `radial-nav-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} strokeWidth={1.7} />
              </NavLink>
            );
          })}
        </div>

        <button
          className="radial-menu-toggle"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          <span className="radial-toggle-icon">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </span>
        </button>
      </div>

      {menuOpen && (
        <button
          className="radial-menu-backdrop"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;