
import { useEffect, useState } from "react";
import "./CurtainIntro.css";

function CurtainIntro() {
  // Check session storage before the first render
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem("rksIntroSeenV4");
  });

  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const openingTimer = setTimeout(() => {
      setOpening(true);
    }, 1500);

    const removeTimer = setTimeout(() => {
      sessionStorage.setItem("rksIntroSeenV4", "true");
      setVisible(false);
    }, 3200);

    return () => {
      clearTimeout(openingTimer);
      clearTimeout(removeTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`curtain-intro ${opening ? "opening" : ""}`}>
      <div className="curtain-panel curtain-left" />
      <div className="curtain-panel curtain-right" />

      <div className="curtain-content">
        <div className="curtain-logo">
          <img
            src="/rks-logo.png"
            alt="RKS Royal Kings Security"
          />
        </div>

        <div className="curtain-gold-line" />
      </div>

      <div className="curtain-caption">
        SAFETY · TRUST · RELIABILITY
      </div>
    </div>
  );
}

export default CurtainIntro;
