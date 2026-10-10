'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarIllustration from './CarIllustration';

gsap.registerPlugin(ScrollTrigger);

// Stops mobile address-bar show/hide from re-triggering a layout refresh mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

const metrics = [
  { value: 58, suffix: '%', label: 'More meaningful\nengagement', index: '01' },
  { value: 23, suffix: '%', label: 'Faster digital\nexperiences', index: '02' },
  { value: 27, suffix: '%', label: 'Higher campaign\ninteraction', index: '03' },
  { value: 40, suffix: '%', label: 'Less friction\nin journeys', index: '04' },
];

// Elements that are hidden by CSS until the intro timeline reveals them (prevents a flash on load).
const INTRO_TARGETS = '.site-nav, .hero-eyebrow, .title-letter, .hero-subtitle, .metric, .scroll-note, .car-art';

const isMobile = () => window.innerWidth < 700;

export default function HeroExperience() {
  const journeyRef = useRef(null);
  const stageRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const glowRef = useRef(null);
  const roadGlowRef = useRef(null);
  const progressRef = useRef(null);
  const haloRef = useRef(null);

  useLayoutEffect(() => {
    const root = journeyRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const letters = Array.from(root.querySelectorAll('.title-letter'));

    const context = gsap.context(() => {
      /* ------------------------------------------------------------------
       * Reduced motion: show the finished state, no pinned journey.
       * ------------------------------------------------------------------ */
      if (reduceMotion) {
        gsap.set(INTRO_TARGETS, { autoAlpha: 1 });
        letters.forEach((letter) => letter.classList.add('is-lit'));
        gsap.set(carRef.current, { x: window.innerWidth * 0.42 });
        gsap.set(glowRef.current, { opacity: 0.35 });
        gsap.set(roadGlowRef.current, { scaleX: 1 });
        gsap.set(progressRef.current, { scaleX: 1 });
        return;
      }

      /* ------------------------------------------------------------------
       * 1. Intro (time based): nav -> headline letters -> stats -> car.
       * ------------------------------------------------------------------ */
      const counters = gsap.utils.toArray(root.querySelectorAll('[data-count]'));
      counters.forEach((el) => {
        el.textContent = `0${el.dataset.suffix || ''}`;
      });

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .fromTo('.site-nav', { y: -16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 })
        .fromTo('.hero-eyebrow', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.28')
        .fromTo(
          '.title-letter',
          { yPercent: 115, rotateX: -55, autoAlpha: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            autoAlpha: 1,
            duration: 0.72,
            stagger: 0.04,
            ease: 'power4.out',
          },
          '-=0.2'
        )
        .fromTo('.hero-subtitle', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 }, '-=0.28')
        .fromTo(
          '.car-art',
          { xPercent: -18, scale: 0.92, autoAlpha: 0 },
          { xPercent: 0, scale: 1, autoAlpha: 1, duration: 0.9 },
          '-=0.35'
        )
        .to(glowRef.current, { opacity: 0.35, duration: 0.9 }, '<')
        .addLabel('stats', '-=0.5')
        .fromTo('.metric', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1 }, 'stats')
        .fromTo('.scroll-note', { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 }, '-=0.1');

      counters.forEach((el, index) => {
        const state = { value: 0 };
        intro.to(
          state,
          {
            value: Number(el.dataset.count),
            duration: 0.9,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${Math.round(state.value)}${el.dataset.suffix || ''}`;
            },
          },
          `stats+=${index * 0.1}`
        );
      });

      /* ------------------------------------------------------------------
       * 2. Scroll journey (scrub based): the car drives left -> right and
       *    each headline letter lights up as the car's nose passes it.
       * ------------------------------------------------------------------ */
      const startX = () => Math.max(16, window.innerWidth * 0.04);
      const endX = () => window.innerWidth + 40;

      // Measured on every ScrollTrigger refresh so resizes stay correct.
      let carWidth = 0;
      let thresholds = [];
      const lit = letters.map(() => false);

      const measure = () => {
        carWidth = carRef.current.offsetWidth;
        const from = startX();
        const span = endX() - from;
        thresholds = letters.map((letter, i) => {
          const centre = letter.offsetLeft + letter.offsetWidth / 2;
          const progress = (centre - carWidth - from) / span;
          // Small stagger floor so nothing is lit before the user starts scrolling.
          return Math.max(progress, 0.04 + i * 0.006);
        });
      };

      const setRoadGlow = gsap.quickSetter(roadGlowRef.current, 'scaleX');
      const setCarGlow = gsap.quickSetter(glowRef.current, 'opacity');

      const onScrub = (self) => {
        const progress = self.progress;
        const noseX = startX() + progress * (endX() - startX()) + carWidth;

        // Road glow follows the car's nose.
        setRoadGlow(Math.min(1, Math.max(0, noseX / window.innerWidth)));

        // Letters toggle a class only when they cross their threshold (no per-frame style writes).
        for (let i = 0; i < letters.length; i += 1) {
          const on = progress >= thresholds[i];
          if (on !== lit[i]) {
            lit[i] = on;
            letters[i].classList.toggle('is-lit', on);
          }
        }

        // Velocity only changes the opacity of a glow layer - cheap, compositor friendly.
        const velocity = Math.min(Math.abs(self.getVelocity()) / 5000, 1);
        setCarGlow(0.35 + velocity * 0.65);
      };

      const travel = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => (isMobile() ? '+=1180' : '+=1650'),
          pin: stageRef.current,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onRefresh: measure,
          onUpdate: onScrub,
        },
      });

      travel
        .fromTo(carRef.current, { x: startX }, { x: endX, duration: 1 }, 0)
        .to(trailRef.current, { scaleX: 1, opacity: 0.88, duration: 0.8 }, 0.03)
        .to(trailRef.current, { opacity: 0, duration: 0.15 }, 0.85)
        .to(progressRef.current, { scaleX: 1, duration: 1 }, 0)
        .to(haloRef.current, { xPercent: 10, yPercent: -8, scale: 1.12, duration: 1 }, 0)
        .to('.hero-copy', { yPercent: -4, duration: 0.8 }, 0.1)
        .to('.road-caption', { autoAlpha: 0.12, duration: 0.35 }, 0.67);

      measure();
    }, root);

    return () => {
      context.revert();
      letters.forEach((letter) => letter.classList.remove('is-lit'));
    };
  }, []);

  const toLetters = (word, key) =>
    word.split('').map((letter, index) => (
      <span className="title-letter" aria-hidden="true" key={`${key}-${index}`}>
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
            <span className="headline-row headline-row-one">{toLetters('WELCOME', 'welcome')}</span>
            <span className="headline-row headline-row-two">{toLetters('ITZFIZZ', 'brand')}</span>
          </h1>
          <p className="hero-subtitle">Ideas in motion. <em>Impact in mind.</em></p>
        </div>

        <div className="road-scene" aria-hidden="true">
          <div className="road-base" />
          <div className="road-dashes" />
          <div className="road-glow" ref={roadGlowRef} />
          <div className="car-actor" ref={carRef}>
            <span className="car-glow" ref={glowRef} />
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
                <div className="metric-value">
                  <span data-count={metric.value} data-suffix={metric.suffix}>{metric.value}{metric.suffix}</span>
                </div>
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
