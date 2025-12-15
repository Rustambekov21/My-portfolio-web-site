import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import AutoCarousel from "./components/AutoCarousel";
import ieltsCert from "./assets/certs/ielts.png";
import cefrCert from "./assets/certs/cefr.png";
import "./App.css";

/**
 * API BASE URL
 * - local: http://localhost:5050
 * - production: VITE_API_URL (Vercel / Render)
 */
const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5050").replace(
  /\/$/,
  ""
);

export default function App() {
  const [toast, setToast] = useState(null); // { type: "success"|"error"|"warn", title, message }

  // Auto-close toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  function showToast(payload) {
    setToast(payload);
  }

  return (
    <div className="app">
      <Navbar />

      {/* Toast Popup */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      <main>
        {/* ================= HERO ================= */}
        <section id="home" className="hero">
          <div className="container hero-inner">
            <div className="hero-left">
              <p className="kicker">Frontend Developer</p>
              <h1>
                Hello, I'm <span className="grad">Rajabboy</span>.
              </h1>
              <p className="lead">
                I build modern, fast, and beautiful web applications with React.
                This is my portfolio.
              </p>

              <div className="hero-actions">
                <a className="btn" href="#projects">
                  Projects
                </a>
                <a className="btn ghost" href="#contact">
                  Contact
                </a>
              </div>

              <div className="chips">
                {["React", "Vite", "CSS", "Git", "SCSS", "JavaScript"].map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-card">
              <div className="card">
                <p className="card-title">Now I'm working:</p>
                <ul className="list">
                  <li>Portfolio design + responsive</li>
                  <li>Projects category</li>
                  <li>Deploy (Vercel)</li>
                </ul>

                <div className="mini">
                  <Mini title="Mini projects" value="10+" />
                  <Mini title="Portfolio" value="1" />
                  <Mini title="Learning" value="∞" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <Section id="about" title="About" subtitle="Qisqacha o‘zim haqimda">
          <div className="grid2">
            <div className="panel">
              <h3>Who am I?</h3>
              <p>
                I am Rustambekov Rajabboy, born on May 21, 2008 in Urgench,
                Khorezm region. I study at Khanka Specialized School and focus
                on frontend development.
              </p>
              <p className="muted">
                I care about UI/UX, clean code and responsive design.
              </p>
            </div>

            <div className="panel">
              <h3>Skills</h3>
              <div className="chips">
                {["HTML", "CSS", "JavaScript", "React", "REST API", "Git/GitHub"].map(
                  (s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* ================= HONORS ================= */}
        <Section id="honors" title="Honors" subtitle="My certificate results">
          <AutoCarousel className="cards honors-cards" interval={2500}>
            {/* IELTS */}
            <HonorCard
              title="IELTS"
              img={ieltsCert}
              scores={[
                ["L: 7.0", "R: 6.5"],
                ["W: 6.0", "S: 6.5"],
                ["Overall: 6.5"],
              ]}
            />

            {/* CEFR */}
            <HonorCard
              title="CEFR MULTILEVEL"
              img={cefrCert}
              scores={[
                ["L: 75", "R: 60"],
                ["W: 50", "S: 52"],
                ["Overall: 59 (B2)"],
              ]}
            />

            {/* SAT */}
            <article className="p-card honor-card">
              <div className="p-top">
                <h3>SAT</h3>
              </div>

              <div className="cert-box coming-soon">
                <p className="coming-title">
                  Coming soon <Dots />
                </p>
                <p className="coming-date">December 19</p>
              </div>

              <div className="scores sat-scores">
                {["R & W", "Math", "Overall"].map((t) => (
                  <div key={t} className="score-row center">
                    <div className="score-pill overall">
                      {t}: <Dots />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </AutoCarousel>
        </Section>

        {/* ================= PROJECTS ================= */}
        <Section id="projects" title="Projects" subtitle="My best projects">
          <AutoCarousel className="cards" interval={2500}>
            {[
              ["Project 1", "To do list with DOM"],
              ["Project 2", "Weight on planets with DOM"],
              ["Project 3", "Online market with React"],
            ].map(([title, desc]) => (
              <article key={title} className="p-card">
                <div className="p-top">
                  <h3>{title}</h3>
                  <span className="badge">Demo</span>
                </div>
                <p className="muted">{desc}</p>
                <div className="p-actions">
                  <a className="link" href="#" onClick={(e) => e.preventDefault()}>
                    Live
                  </a>
                  <a className="link" href="#" onClick={(e) => e.preventDefault()}>
                    Code
                  </a>
                </div>
              </article>
            ))}
          </AutoCarousel>
        </Section>

        {/* ================= CONTACT ================= */}
        <Section id="contact" title="Contact" subtitle="All messages will be sent to Telegram">
          <div className="grid2">
            <ContactInfo />
            <ContactForm showToast={showToast} />
          </div>
        </Section>

        {/* ================= FOOTER ================= */}
        <footer className="footer">
          <div className="container footer-inner">
            <span className="muted">© {new Date().getFullYear()} My Portfolio</span>
            <a className="muted" href="#home">
              Back to top ↑
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icon =
    toast.type === "success" ? "✅" : toast.type === "warn" ? "⚠️" : "❌";

  return (
    <div className={`toast ${toast.type}`} role="status" aria-live="polite">
      <div className="toast-icon" aria-hidden>
        {icon}
      </div>

      <div className="toast-body">
        <div className="toast-title">{toast.title || "Message"}</div>
        <div className="toast-text">{toast.message}</div>
      </div>

      <button className="toast-close" onClick={onClose} aria-label="Close">
        ×
      </button>

      <div className="toast-bar" />
    </div>
  );
}

function Mini({ title, value }) {
  return (
    <div className="mini-box">
      <span className="mini-num">{value}</span>
      <span className="mini-txt">{title}</span>
    </div>
  );
}

function Dots() {
  return (
    <span className="dot-anim" aria-hidden>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  );
}

function HonorCard({ title, img, scores }) {
  return (
    <article className="p-card honor-card">
      <div className="p-top">
        <h3>{title}</h3>
      </div>

      <div className="cert-box">
        <img className="cert-img" src={img} alt={title} />
      </div>

      <div className="scores">
        {scores.map((row, i) => (
          <div key={i} className={`score-row ${row.length === 1 ? "center" : ""}`}>
            {row.map((s) => (
              <div key={s} className="score-pill overall">
                {s}
              </div>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}

function ContactInfo() {
  return (
    <div className="panel contact-panel">
      <h3>Contact</h3>

      <ContactItem
        icon="email"
        href="mailto:rajabboyrustambekov@gmail.com"
        text="rajabboyrustambekov@gmail.com"
      />
      <ContactItem icon="telegram" href="https://t.me/otabekovich_757" text="@otabekovich_757" />
      <ContactItem
        icon="instagram"
        href="https://instagram.com/_rustambekov_r"
        text="@_rustambekov_r"
      />
      <ContactItem icon="github" href="https://github.com/Rustambekov21" text="github.com/Rustambekov21" />
    </div>
  );
}

function ContactItem({ icon, href, text }) {
  return (
    <p className="contact-item">
      <span className={`icon ${icon}`} />
      <a className="link" href={href} target="_blank" rel="noreferrer">
        {text}
      </a>
    </p>
  );
}

function ContactForm({ showToast }) {
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value.trim();
    const message = form.message.value.trim();

    if (!message) {
      showToast({
        type: "warn",
        title: "Message empty",
        message: "Iltimos, xabar yozing 🙂",
      });
      return;
    }

    setSending(true);

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      const data = await res.json().catch(() => ({}));
      console.log("CONTACT DEBUG:", { status: res.status, data });

      if (res.ok && data.ok) {
        showToast({
          type: "success",
          title: "Sent!",
          message: "Telegramga muvaffaqiyatli yuborildi ✅",
        });
        form.reset();
      } else {
        showToast({
          type: "error",
          title: "Failed",
          message:
            data?.hint ||
            data?.message ||
            "Xabar yuborilmadi. Backend loglarini tekshiring.",
        });
      }
    } catch (err) {
      console.error(err);
      showToast({
        type: "error",
        title: "Server error",
        message: "Server bilan aloqa yo‘q (backend ishlayaptimi?)",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" placeholder="Your name" disabled={sending} />
      </label>

      <label>
        Message
        <textarea name="message" placeholder="Message..." rows={4} disabled={sending} />
      </label>

      <button className="btn" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
