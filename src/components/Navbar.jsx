import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "honors", label: "Honors" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 800) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function goTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        {/* LOGO */}
        <button className="brand" onClick={() => goTo("home")}>
          <img src={logo} alt="RR logo" className="logo" />
        </button>

        {/* DESKTOP NAV */}
        <nav className="nav-links desktop">
          {links.map((l) => (
            <button
              key={l.id}
              className="nav-link"
              onClick={() => goTo(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* MOBILE BURGER */}
        <button
          className="burger"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`bar ${open ? "x1" : ""}`} />
          <span className={`bar ${open ? "x2" : ""}`} />
          <span className={`bar ${open ? "x3" : ""}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mobile-menu">
          {links.map((l) => (
            <button
              key={l.id}
              className="mobile-link"
              onClick={() => goTo(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
