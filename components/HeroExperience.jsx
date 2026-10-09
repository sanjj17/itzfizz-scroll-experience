'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarIllustration from './CarIllustration';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 58, suffix: '%', label: 'More meaningful\nengagement', index: '01' },
  { value: 23, suffix: '%', label: 'Faster digital\nexperiences', index: '02' },
  { value: 27, suffix: '%', label: 'Higher campaign\ninteraction', index: '03' },
  { value: 40, suffix: '%', label: 'Less friction\nin journeys', index: '04' },
];

export default function HeroExperience() {
  const journeyRef = useRef(null);
  const stageRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const roadGlowRef = useRef(null);
  const progressRef = useRef(null);
  const haloRef = useRef(null);

  useLayoutEffect(() => {
    if (!journeyRef.current) return undefined;

    const root = journeyRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(carRef.current, { x: Math.max(0, window.innerWidth * 0.42) });
        gsap.set(roadGlowRef.current, { scaleX: 1 });
        gsap.set(progressRef.current, { scaleX: 1 });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .fromTo('.site-nav', { y: -16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 })
        .fromTo('.hero-eyebrow', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.28')
        .fromTo(
          '.title-letter',
          { yPercent: 115, rotateX: -55, autoAlpha: 0 },
          { yPercent: 0, rotateX: 0, autoAlpha: 1, duration: 0.72, stagger: 0.027, ease: 'power4.out' },
          '-=0.2'
        )
        .fromTo('.hero-subtitle', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 }, '-=0.28')
        .fromTo('.metric', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1 }, '-=0.12')
        .fromTo('.scroll-note', { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 }, '-=0.08');

      const counterEls = gsap.utils.toArray(root.querySelectorAll('[data-count]'));
      counterEls.forEach((element, index) => {
        const target = Number(element.dataset.count);
        const state = { value: 0 };
        intro.to(
          state,
          {
            value: target,
            duration: 0.72,
            ease: 'power2.out',
            onUpdate: () => {
              element.textContent = `${Math.round(state.value)}${element.dataset.suffix || ''}`;
            },
          },
          2.23 + index * 0.085
        );
      });

      const letters = gsap.utils.toArray(root.querySelectorAll('.title-letter'));
      const setCarGlow = gsap.quickSetter(carRef.current, 'filter');
      const travel = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: journeyRef.current,
          start: 'top top',
          end: () => (window.innerWidth < 700 ? '+=1180' : '+=1650'),
          pin: stageRef.current,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const velocity = Math.min(Math.abs(self.getVelocity()) / 5000, 1);
            setCarGlow(`drop-shadow(0 0 ${8 + velocity * 14}px rgba(217,255,88,${0.13 + velocity * 0.28}))`);
          },
        },
      });

      travel
        .to(carRef.current, { x: () => window.innerWidth + 270, duration: 1 }, 0)
        .to(trailRef.current, { scaleX: 1, opacity: 0.88, duration: 0.82 }, 0.03)
        .to(roadGlowRef.current, { scaleX: 1, duration: 0.96 }, 0.02)
        .to(progressRef.current, { scaleX: 1, duration: 1 }, 0)
        .to(haloRef.current, { xPercent: 10, yPercent: -8, scale: 1.12, duration: 1 }, 0)
        .to(letters, { color: '#f2f2eb', stagger: { each: 0.035, from: 'start' }, duration: 0.015 }, 0.05)
        .to('.hero-copy', { yPercent: -7, duration: 0.8 }, 0.1)
        .to('.road-caption', { autoAlpha: 0.12, duration: 0.35 }, 0.67);

      return () => {
        travel.scrollTrigger?.kill();
        travel.kill();
        intro.kill();
      };
    }, root);

    return () => context.revert();
  }, []);

  const welcomeLetters = 'WELCOME'.split('').map((letter, index) => (
    <span className="title-letter" aria-hidden="true" key={`${letter}-welcome-${index}`}>
      {letter}
    </span>
  ));
  const brandLetters = 'ITZFIZZ'.split('').map((letter, index) => (
    <span className="title-letter" aria-hidden="true" key={`${letter}-brand-${index}`}>
      {letter}
    </span>
  ));

  return (
    <section className="hero-journey" id="top" ref={journeyRef} aria-label="Itzfizz scroll-driven hero experience">
      <div className="hero-stage" ref={stageRef}>
        <div className="ambient-halo" ref={haloRef} aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <nav className="site-nav mx-auto flex w-full items-center justify-between" aria-label="Main navigation">
          <a className="brand-lockup" href="#top" aria-label="Itzfizz home">
            <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
            <span>ITZFIZZ<span className="brand-period">.</span></span>
          </a>
          <div className="nav-links hidden items-center gap-8 md:flex">
            <a href="#services">WHAT WE DO</a>
            <a href="#approach">OUR APPROACH</a>
          </div>
          <a href="#contact" className="nav-cta group">
            LET&apos;S TALK <span className="nav-arrow" aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className="hero-copy">
          <div className="hero-eyebrow"><span className="eyebrow-dot" /> INDEPENDENT DIGITAL STUDIO <span className="eyebrow-rule" /></div>
          <h1 className="hero-headline" aria-label="Welcome Itzfizz">
            <span className="headline-row headline-row-one">{welcomeLetters}</span>
            <span className="headline-row headline-row-two">{brandLetters}</span>
          </h1>
          <p className="hero-subtitle">Ideas in motion. <em>Impact in mind.</em></p>
        </div>

        <div className="road-scene" aria-hidden="true">
          <div className="road-base" />
          <div className="road-dashes" />
          <div className="road-glow" ref={roadGlowRef} />
          <div className="car-actor" ref={carRef}>
            <span className="car-trail" ref={trailRef} />
            <CarIllustration />
            <span className="car-shadow" />
          </div>
          <span className="road-caption road-caption-left">CREATIVE / DEVELOPMENT</span>
          <span className="road-caption road-caption-right">SCROLL TO ACCELERATE ↘</span>
        </div>

        <div className="metrics-wrap">
          <div className="metrics-heading"><span>THE IMPACT MINDSET</span><span>ILLUSTRATIVE METRICS*</span></div>
          <div className="hero-stats grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-6">
            {metrics.map((metric) => (
              <article className="metric" key={metric.index}>
                <div className="metric-top"><span>{metric.index}</span><span className="metric-plus">↗</span></div>
                <div className="metric-value"><span data-count={metric.value} data-suffix={metric.suffix}>{metric.value}{metric.suffix}</span></div>
                <p>{metric.label.split('\n').map((line) => <span key={line}>{line}</span>)}</p>
              </article>
            ))}
          </div>
          <p className="metrics-disclaimer">*Concept figures for this design exercise — not actual client results.</p>
        </div>

        <div className="hero-bottomline">
          <span className="scroll-note"><span className="scroll-mouse"><i /></span> SCROLL TO EXPLORE</span>
          <span className="frame-count">EXPERIENCE <strong>01</strong> <i>/</i> 03</span>
        </div>
        <div className="scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>
      </div>
    </section>
  );
}
