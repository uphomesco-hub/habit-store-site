import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import "./styles.css";

const asset = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const productVariants = [
  {
    title: "Habit Support",
    copy: "A simple hand-and-mouth tool to help you with unwanted habit triggers such as smoking, vaping, chewing, or obsessive fidgeting.",
    image: asset("troll-smoke.png"),
  },
  {
    title: "Sensory & Oral Fixations",
    copy: "A safe alternative for people with special mental and physical oral-focus issues.",
    image: asset("troll-cake.png"),
  },
  {
    title: "Speech & Tongue Exercise",
    copy: "A tool to help Speech Therapists and families coach their clients and loved ones with structured tongue and mouth movements.",
    image: asset("troll-drink.png"),
  },
];

const notes = [
  "For people redirecting cravings, nail biting, smoking triggers, or fidget habits.",
  "For teens and adults who want a simple oral-focus routine.",
  "For parents, caregivers, and support teams looking for sensory-friendly tools.",
  "For speech therapy and tongue-exercise routines guided by a professional.",
];

const productLoop = [
  "Break the loop",
  "Redirect the urge",
  "Get Con-Troll",
  "Train the brain",
  "Add alternatives",
  "Build better routines",
];

function App() {
  const [page, setPage] = React.useState(getPageFromHash());
  const [sent, setSent] = React.useState(false);
  const internalNavigation = React.useRef(false);
  useScrollMotion(page);

  const markInternalNavigation = React.useCallback(() => {
    internalNavigation.current = true;
  }, []);

  React.useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash !== "#contact") {
      if (window.location.hash && window.location.hash !== "#home") {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#home`);
      }
      window.scrollTo(0, 0);
    }
  }, []);

  React.useEffect(() => {
    let hasHandledInitialHash = false;

    const onHashChange = () => {
      const nextPage = getPageFromHash();
      const id = window.location.hash.replace("#", "");
      const cameFromSiteClick = internalNavigation.current;
      internalNavigation.current = false;

      if (nextPage === "home" && id && id !== "home" && !cameFromSiteClick) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#home`);
        window.scrollTo({ top: 0, behavior: "auto" });
        setPage("home");
        return;
      }

      setPage(nextPage);

      window.requestAnimationFrame(() => {
        if (!hasHandledInitialHash) {
          hasHandledInitialHash = true;
          if (nextPage === "home" && (!id || id === "home")) {
            window.scrollTo({ top: 0, behavior: "auto" });
            return;
          }
        }

        if (nextPage === "home" && id && id !== "home") {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    };

    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <>
      <Header page={page} onNavigate={markInternalNavigation} />
      <main>
        {page === "contact" ? (
          <ContactPage sent={sent} setSent={setSent} />
        ) : (
          <HomePage onNavigate={markInternalNavigation} />
        )}
      </main>
    </>
  );
}

function getPageFromHash() {
  return window.location.hash === "#contact" ? "contact" : "home";
}

function Header({ page, onNavigate }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="The Habit Store home" onClick={onNavigate}>
        <img src={asset("habit-store-logo.png")} alt="" />
        <span>
          The Habit Store
          <small>Get Con-Troll</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#support" onClick={onNavigate}>
          Who We Help
        </a>
        <a href="#product" onClick={onNavigate}>
          Products
        </a>
        <a href="#contact" className={page === "contact" ? "active" : ""} onClick={onNavigate}>
          Contact
        </a>
      </nav>
    </header>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <section className="panel hero" id="home">
        <div className="hero-center">
          <div className="hero-art" aria-label="The Habit Store product logo">
            <img className="hero-logo" src={asset("habit-store-logo.png")} alt="The Habit Store Get Con-Troll logo" />
          </div>

          <div className="hero-copy">
            <p>Tools to Help You Grab Con-Troll of Bad Habits</p>
            <div className="actions">
              <a className="button primary" href="#contact" onClick={onNavigate}>
                Start a conversation <ArrowRight size={18} />
              </a>
              <a className="button secondary" href="#product" onClick={onNavigate}>
                See Our Introductory Product Line
              </a>
            </div>
          </div>
        </div>

        <div className="floating-trolls" aria-hidden="true">
          <img src={asset("troll-smoke.png")} alt="" />
          <img src={asset("troll-drink.png")} alt="" />
          <img src={asset("troll-cake.png")} alt="" />
          <img src={asset("troll-money.png")} alt="" />
        </div>

        <div className="product-marquee" aria-label="Product positioning">
          <div className="marquee-track">
            {[...productLoop, ...productLoop].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="panel section support-section" id="support">
        <div>
          <p className="eyebrow">Who We Help</p>
          <p className="support-copy">
            The Habit Store gives people tools to keep their mouth, hands, and attention focused
            when a habit loop starts.
          </p>
        </div>
        <div className="support-list">
          {notes.map((note) => (
            <p key={note}>
              <CheckCircle2 size={20} />
              {note}
            </p>
          ))}
        </div>
      </section>

      <section className="panel section product-section" id="product">
        <div className="section-heading">
          <p className="eyebrow">First Product Family</p>
          <h2>One Tool - Many Twists</h2>
          <div className="habit-twister-cta">
            <img src={asset("habit-twister-logo.png")} alt="Habit Twister logo" />
            <p>Are you ready to Twist your Bad Habit away?</p>
            <a href="https://www.habittwister.com" target="_blank" rel="noreferrer">
              Click here <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <div className="product-grid">
          {productVariants.map((item, index) => (
            <article className="product-card" key={item.title} style={{ "--card-delay": `${index * 80}ms` }}>
              <img src={item.image} alt={`${item.title} Con-Troll character`} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel final-cta">
        <div className="final-card">
          <div className="final-main">
            <img src={asset("troll-money.png")} alt="Con-Troll character holding a card" />
            <div>
              <p className="eyebrow">The Habit Store</p>
              <h2>Tools to help you Con-Troll your bad habits.</h2>
              <a className="button primary" href="#contact" onClick={onNavigate}>
                Contact The Habit Store <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage({ sent, setSent }) {
  return (
    <section className="panel contact-page">
      <div className="contact-copy">
        <p className="eyebrow">Contact Us</p>
        <h1>Contact via the form or email below:</h1>
        <div className="contact-points">
          <p>
            <Mail size={20} />
            info@habit-store.com
          </p>
        </div>
      </div>

      <form
        className="contact-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <img src={asset("habit-store-logo.png")} alt="The Habit Store logo" />
        <label>
          Name
          <input name="name" placeholder="Your name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          Message
          <textarea name="message" rows="5" placeholder="Tell us what you need help with." required />
        </label>
        <button type="submit">Send message</button>
        {sent && <p className="form-note">Thanks. The message UI is working; backend email can be connected next.</p>}
      </form>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);

function useScrollMotion(page) {
  React.useEffect(() => {
    const panels = Array.from(document.querySelectorAll(".panel"));
    let frame = 0;

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const update = () => {
      frame = 0;
      const height = window.innerHeight || 1;
      const isMobileMotion = window.matchMedia("(max-width: 900px)").matches;
      const navProbeY = Math.min(86, height * 0.14);
      const darkSection = document.querySelector(".support-section");
      let navOnDark = false;

      if (darkSection) {
        const darkRect = darkSection.getBoundingClientRect();
        navOnDark = darkRect.top <= navProbeY && darkRect.bottom >= navProbeY;
      }

      document.documentElement.classList.toggle("nav-on-dark", navOnDark);

      panels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        const progress = clamp((height - rect.top) / (height * 2), 0, 1);
        const visiblePixels = Math.min(rect.bottom, height) - Math.max(rect.top, 0);
        const visibleRatio = clamp(visiblePixels / Math.min(rect.height || height, height), 0, 1);
        const desktopPresence = clamp(1 - Math.abs(rect.top) / height, 0, 1);
        const presence = isMobileMotion && visibleRatio > 0.08 ? 1 : desktopPresence;
        const revealY = isMobileMotion && presence === 1 ? 0 : (1 - presence) * 72;
        const mediaY = isMobileMotion && presence === 1 ? 0 : (0.5 - progress) * 96;
        const reverseY = isMobileMotion && presence === 1 ? 0 : (progress - 0.5) * 82;
        const opacity = 0.52 + presence * 0.48;
        const scale = 0.966 + presence * 0.034;

        panel.classList.toggle("is-visible", presence > 0.18);
        panel.style.setProperty("--section-presence", presence.toFixed(4));
        panel.style.setProperty("--section-progress", progress.toFixed(4));
        panel.style.setProperty("--reveal-y", `${revealY.toFixed(2)}px`);
        panel.style.setProperty("--media-y", `${mediaY.toFixed(2)}px`);
        panel.style.setProperty("--reverse-y", `${reverseY.toFixed(2)}px`);
        panel.style.setProperty("--reveal-opacity", opacity.toFixed(4));
        panel.style.setProperty("--reveal-scale", scale.toFixed(4));
      });
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("hashchange", requestUpdate);
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [page]);
}
