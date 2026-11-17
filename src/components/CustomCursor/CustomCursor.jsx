import { useEffect, useRef } from "react";
import "./CustomCursor.css";

function CustomCursor() {
  const rippleRef = useRef(null);
  const dotRef = useRef(null);
  const clickRippleRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouchDevice || reduceMotion) return;

    const ripple = rippleRef.current;
    const dot = dotRef.current;
    const clickRipple = clickRippleRef.current;

    if (!ripple || !dot || !clickRipple) return;

    let mouseX = 0;
    let mouseY = 0;
    let rippleX = 0;
    let rippleY = 0;
    let animationFrame;

    const moveCursor = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.transform =
        `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const animateCursor = () => {
      rippleX += (mouseX - rippleX) * 0.16;
      rippleY += (mouseY - rippleY) * 0.16;

      ripple.style.transform =
        `translate3d(${rippleX}px, ${rippleY}px, 0) translate(-50%, -50%)`;

      animationFrame = requestAnimationFrame(animateCursor);
    };

    const handleMouseOver = (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("a, button, [data-cursor-hover]")
      ) {
        ripple.classList.add("cursor-hover");
      }
    };

    const handleMouseOut = (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("a, button, [data-cursor-hover]") &&
        !(
          event.relatedTarget instanceof Element &&
          event.relatedTarget.closest("a, button, [data-cursor-hover]")
        )
      ) {
        ripple.classList.remove("cursor-hover");
      }
    };

    const handleClick = () => {
      clickRipple.classList.remove("is-clicking");
      void clickRipple.offsetWidth;
      clickRipple.classList.add("is-clicking");
    };

    const handleRippleEnd = () => {
      clickRipple.classList.remove("is-clicking");
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick);
    clickRipple.addEventListener("animationend", handleRippleEnd);

    animationFrame = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("click", handleClick);
      clickRipple.removeEventListener("animationend", handleRippleEnd);

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div ref={rippleRef} className="custom-cursor-ripple">
        <span
          ref={clickRippleRef}
          className="cursor-click-ripple"
        />
      </div>

      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}

export default CustomCursor;