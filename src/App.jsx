import React from "react";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import ieltsCert from "./assets/certs/ielts.png";
import cefrCert from "./assets/certs/cefr.png";
import AutoCarousel from "./components/AutoCarousel";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <section id="home" className="hero">
          <div className="container hero-inner">
            <div className="hero-left">
              <p className="kicker">Frontend Developer</p>
              <h1>
                Salom, men <span className="grad">Rajabboy</span>.
              </h1>
              <p className="lead">
                Men React bilan zamonaviy, tez va chiroyli web ilovalar
                yarataman. Bu — mening portfoliom.
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
                <span className="chip">React</span>
                <span className="chip">Vite</span>
                <span className="chip">CSS</span>
                <span className="chip">Git</span>
                <span className="chip">SCSS</span>
                <span className="chip">JavaScript</span>
              </div>
            </div>

            <div className="hero-card">
              <div className="card">
                <p className="card-title">Hozir ishlayapman:</p>
                <ul className="list">
                  <li>Portfolio dizayn + responsive</li>
                  <li>Projects bo‘limi</li>
                  <li>Deploy (Vercel)</li>
                </ul>
                <div className="mini">
                  <div className="mini-box">
                    <span className="mini-num">10+</span>
                    <span className="mini-txt">Mini projects</span>
                  </div>
                  <div className="mini-box">
                    <span className="mini-num">1</span>
                    <span className="mini-txt">Portfolio</span>
                  </div>
                  <div className="mini-box">
                    <span className="mini-num">∞</span>
                    <span className="mini-txt">Learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section
          id="about"
          title="About"
          subtitle="Qisqacha o‘zim haqimda va nimalar qilaman."
        >
          <div className="grid2">
            <div className="panel">
              <h3>Men kimman?</h3>
              <p>
                Men Rustambekov Rajabboy 2008-yilning 21-mayida Xorazm viloyati Urganch shahrida tavallud topganman. Hozirgi vaqtda Xonqa tuman IM da 11-sinfda o'qimoqdaman. Sportga, ayniqsa futbol va voleybolga, qiziqaman va undan tashqari dasturlash bilan ham shug'illanmoqdaman.
              </p>
              <p className="muted">
                Masalan: UI/UXga e’tibor beraman, toza kod yozaman, responsive
                dizayn qilaman.
              </p>
            </div>
            <div className="panel">
              <h3>Skills</h3>
              <div className="chips">
                <span className="chip">HTML</span>
                <span className="chip">CSS</span>
                <span className="chip">JavaScript</span>
                <span className="chip">React</span>
                <span className="chip">REST API</span>
                <span className="chip">Git/GitHub</span>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="honors"
          title="Honors"
          subtitle="Sertifikatlarim natijalari."
        >
          <AutoCarousel className="cards honors-cards" interval={2500} ariaLabel="Honors slider">
            {/* IELTS */}
            <article className="p-card honor-card">
              <div className="p-top">
                <h3>IELTS</h3>
              </div>

              <div className="cert-box">
                <img className="cert-img" src={ieltsCert} alt="IELTS certificate" />
              </div>

              <div className="scores">
                <div className="score-row">
                  <div className="score-pill">L: 7.0</div>
                  <div className="score-pill">R: 6.5</div>
                </div>
                <div className="score-row">
                  <div className="score-pill">W: 6.0</div>
                  <div className="score-pill">S: 6.5</div>
                </div>
                <div className="score-row center">
                  <div className="score-pill overall">Overall: 6.5</div>
                </div>
              </div>
            </article>

            {/* CEFR */}
            <article className="p-card honor-card">
              <div className="p-top">
                <h3>CEFR MULTILEVEL</h3>
              </div>

              <div className="cert-box">
                <img className="cert-img" src={cefrCert} alt="CEFR certificate" />
              </div>

              <div className="scores">
                <div className="score-row">
                  <div className="score-pill">L: 75</div>
                  <div className="score-pill">R: 60</div>
                </div>
                <div className="score-row">
                  <div className="score-pill">W: 50</div>
                  <div className="score-pill">S: 52</div>
                </div>
                <div className="score-row center">
                  <div className="score-pill overall">Overall: 59 (B2)</div>
                </div>
              </div>
            </article>

            {/* SAT */}
            <article className="p-card honor-card">
              <div className="p-top">
                <h3>SAT</h3>
              </div>

              <div className="cert-box coming-soon">
                <p className="coming-title">
                  Coming soon
                  <span className="dot-anim" aria-hidden="true">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                </p>
                <p className="coming-date">December 19</p>
              </div>

              <div className="scores sat-scores">
                <div className="score-row center">
                  <div className="score-pill overall">
                    R&amp;W:
                    <span className="dot-anim" aria-hidden="true">
                      <span>.</span><span>.</span><span>.</span>
                    </span>
                  </div>
                </div>

                <div className="score-row center">
                  <div className="score-pill overall">
                    Math:
                    <span className="dot-anim" aria-hidden="true">
                      <span>.</span><span>.</span><span>.</span>
                    </span>
                  </div>
                </div>

                <div className="score-row center">
                  <div className="score-pill overall">
                    Overall:
                    <span className="dot-anim" aria-hidden="true">
                      <span>.</span><span>.</span><span>.</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </AutoCarousel>
        </Section>



        <Section
          id="projects"
          title="Projects"
          subtitle="Eng yaxshi ishlarim (hozircha demo)."
        >
          <AutoCarousel className="cards" interval={2500} ariaLabel="Projects slider">
            {[
              { title: "Project 1", desc: "Kichik loyiha tavsifi (React)." },
              { title: "Project 2", desc: "Kichik loyiha tavsifi (UI)." },
              { title: "Project 3", desc: "Kichik loyiha tavsifi (API)." },
            ].map((p) => (
              <article key={p.title} className="p-card">
                <div className="p-top">
                  <h3>{p.title}</h3>
                  <span className="badge">Demo</span>
                </div>
                <p className="muted">{p.desc}</p>
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


       <Section
          id="contact"
          title="Contact"
          subtitle="Bog‘lanish uchun (Telegramga yuboriladi)."
        >
          <div className="grid2">
            <div className="panel">
              <h3>Aloqa</h3>
              <p className="muted">Email: rajabbotrustabekov@gmail.com</p>
              <p className="muted">Telegram: @otabekovich_757</p>
              <p className="muted">GitHub: github.com/Rustambekov21 </p>
            </div>

            <form
              className="panel form"
              onSubmit={async (e) => {
                e.preventDefault();

                const formEl = e.currentTarget;
                const name = formEl.elements.name?.value?.trim() || "";
                const message = formEl.elements.message?.value?.trim() || "";

                if (!message) {
                  alert("❌ Message bo‘sh bo‘lmasin");
                  return;
                }

                const btn = formEl.querySelector('button[type="submit"]');
                const oldBtnText = btn?.textContent;

                try {
                  if (btn) {
                    btn.disabled = true;
                    btn.textContent = "Sending...";
                  }

                  const res = await fetch("http://localhost:5050/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, message }),
                  });

                  // Backend qaytargan javobni o‘qishga harakat qilamiz
                  let data = null;
                  const contentType = res.headers.get("content-type") || "";
                  if (contentType.includes("application/json")) {
                    data = await res.json();
                  } else {
                    const text = await res.text();
                    data = { ok: false, message: text };
                  }

                  // Debug: hammasini consolega chiqaramiz
                  console.log("CONTACT DEBUG:", {
                    httpStatus: res.status,
                    httpOk: res.ok,
                    data,
                  });

                  // Agar HTTP status 2xx bo‘lmasa
                  if (!res.ok) {
                    alert(
                      `❌ Server error (HTTP ${res.status})\n` +
                        `telegramStatus: ${data?.telegramStatus ?? "—"}\n` +
                        `desc: ${data?.telegramData?.description ?? data?.message ?? "—"}`
                    );
                    return;
                  }

                  // res.ok bo‘lsa ham, data.ok false bo‘lishi mumkin
                  if (data?.ok) {
                    alert("✅ Xabaringiz Telegramga yuborildi!");
                    formEl.reset();
                  } else {
                    alert(
                      `❌ Xabar yuborilmadi\n` +
                        `telegramStatus: ${data?.telegramStatus ?? "—"}\n` +
                        `desc: ${data?.telegramData?.description ?? data?.message ?? "—"}`
                    );
                  }
                } catch (err) {
                  console.error("CONTACT FETCH ERROR:", err);
                  alert("❌ Server bilan aloqa yo‘q (backend ishlamayapti yoki port noto‘g‘ri)");
                } finally {
                  if (btn) {
                    btn.disabled = false;
                    btn.textContent = oldBtnText || "Send";
                  }
                }
              }}
            >
              <label>
                Name
                <input name="name" placeholder="Ismingiz" />
              </label>

              <label>
                Message
                <textarea name="message" placeholder="Xabar..." rows={4} />
              </label>

              <button className="btn" type="submit">
                Send
              </button>
            </form>

          </div>
        </Section>


        <footer className="footer">
          <div className="container footer-inner">
            <span className="muted">© {new Date().getFullYear()} My Portfolio</span>
            <a className="muted" href="#home">Back to top ↑</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
