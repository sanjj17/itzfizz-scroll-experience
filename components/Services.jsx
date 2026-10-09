'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  {
    number: '01',
    tag: 'BUILD',
    title: 'Digital that\nfeels different.',
    body: 'Responsive websites and web experiences that combine thoughtful design with dependable engineering.',
    detail: 'From focused landing pages to multi-page web applications, we build responsive interfaces with accessible markup, maintainable components and performance in mind.',
    tools: ['React / Next.js', 'Web development', 'Performance'],
    visual: 'visual-code',
  },
  {
    number: '02',
    tag: 'CONVERT',
    title: 'Commerce with\nless friction.',
    body: 'Clear journeys, purposeful interfaces and digital storefronts designed to help people take the next step.',
    detail: 'We shape product discovery, storefront layouts and clear customer journeys so shopping experiences feel intuitive from the first click through checkout.',
    tools: ['Shopify', 'Landing pages', 'Conversion UX'],
    visual: 'visual-commerce',
  },
  {
    number: '03',
    tag: 'MOVE',
    title: 'Motion with\na reason.',
    body: 'Scroll-led storytelling, micro-interactions and moments of delight that make a brand memorable.',
    detail: 'Purposeful motion brings a story to life. We use scroll-driven scenes and responsive micro-interactions to make interfaces feel alive without getting in the way.',
    tools: ['GSAP', 'Interaction design', 'Creative development'],
    visual: 'visual-motion',
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!activeService) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') setActiveService(null);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeService]);

  return (
    <section className="services-section" id="services">
      <div className="section-shell mx-auto">
        <div className="section-kicker"><span>WHAT WE DO</span><span>02 — THE TOOLKIT</span></div>
        <div className="services-intro" id="approach">
          <p className="section-label"><span className="eyebrow-dot" /> FROM FIRST IMPRESSION TO FINAL PIXEL</p>
          <h2>We build experiences<br />that <em>move people.</em></h2>
          <p className="services-summary">A good website does more than look good. It makes a brand easier to understand, easier to trust, and easier to choose.</p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top">
                <span>{service.number} / {service.tag}</span>
                <button
                  className="service-open"
                  type="button"
                  onClick={() => setActiveService(service)}
                  aria-label={`Explore ${service.tag.toLowerCase()} services`}
                  aria-haspopup="dialog"
                >
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
              <div className={`service-visual ${service.visual}`} aria-hidden="true">
                {service.visual === 'visual-code' && <div className="code-window"><div className="window-dots"><i /><i /><i /></div><div className="code-lines"><i /><i /><i /><i /><i /></div><span className="code-cursor" /></div>}
                {service.visual === 'visual-commerce' && <div className="commerce-window"><div className="commerce-image"><span /><i /></div><div className="commerce-lines"><i /><i /></div><div className="commerce-button" /></div>}
                {service.visual === 'visual-motion' && <div className="motion-orbit"><span /><span /><span /><i>↗</i></div>}
              </div>
              <h3>{service.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
              <p className="service-body">{service.body}</p>
              <div className="service-tags">{service.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              <button className="service-text-link" type="button" onClick={() => setActiveService(service)}>
                EXPLORE SERVICE <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>

        <div className="build-note">
          <div><span className="build-note-kicker">BUILT FOR THE REAL WORLD</span><p>Responsive by default. Considered in every detail.</p></div>
          <div className="build-note-points"><span><i /> ACCESSIBLE</span><span><i /> PERFORMANCE-MINDED</span><span><i /> REDUCED-MOTION AWARE</span></div>
        </div>
      </div>

      {activeService && (
        <div
          className="service-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveService(null);
          }}
        >
          <section className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title" aria-describedby="service-modal-description">
            <div className="service-modal-topline">
              <span>{activeService.number} / {activeService.tag}</span>
              <button ref={closeButtonRef} className="service-modal-close" type="button" onClick={() => setActiveService(null)} aria-label="Close service details">×</button>
            </div>
            <h3 id="service-modal-title">{activeService.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
            <p id="service-modal-description">{activeService.detail}</p>
            <p className="service-modal-includes">WHAT'S INCLUDED</p>
            <div className="service-modal-tags">{activeService.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            <a className="service-modal-cta" href="#contact" onClick={() => setActiveService(null)}>LET'S TALK ABOUT IT <span aria-hidden="true">↗</span></a>
          </section>
        </div>
      )}
    </section>
  );
}
