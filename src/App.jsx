
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import CurtainIntro from "./components/CurtainIntro/CurtainIntro";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import Contact from "./pages/Contact";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Career from "./pages/Career";

import PlaceholderPage from "./pages/PlaceholderPage";

import "./styles/global.css";
import "./styles/animations.css";

function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SmoothScroll />
      <CustomCursor />

      <CurtainIntro />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* SERVICES */}
          <Route path="/services" element={<Services />} />
          <Route
            path="/services/:slug"
            element={<ServiceDetail />}
          />

          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="*"
            element={<PlaceholderPage title="Page Not Found" number="404" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
