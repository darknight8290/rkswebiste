import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SmoothScroll() {
  useEffect(() => {
    // Respect the visitor's reduced-motion preference.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    // Create smooth scrolling.
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    // Keep GSAP ScrollTrigger in sync with Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's ticker to update Lenis.
    const updateScroll = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);

    // Refresh trigger positions after setup.
    ScrollTrigger.refresh();

    // Clean up when the component unmounts.
    return () => {
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;