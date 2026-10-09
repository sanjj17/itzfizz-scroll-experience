export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-shell mx-auto">
        <div className="footer-topline"><span>THE NEXT MOVE IS YOURS</span><span>ITZFIZZ DIGITAL / CONCEPT 2026</span></div>
        <a className="footer-cta" href="https://itzfizz.com/" target="_blank" rel="noreferrer">
          <span>Have a good<br /><em>idea?</em></span><span className="footer-cta-arrow" aria-hidden="true">↗</span>
        </a>
        <div className="footer-bottom">
          <a className="brand-lockup" href="#top"><span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span><span>ITZFIZZ<span className="brand-period">.</span></span></a>
          <p>Concept landing page built with Next.js, Tailwind CSS and GSAP.</p>
          <a className="back-top" href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}
