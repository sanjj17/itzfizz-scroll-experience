import './globals.css';

export const metadata = {
  title: 'ITZFIZZ — Digital Experiences in Motion',
  description:
    'A scroll-driven creative landing page concept for Itzfizz Digital, built with Next.js, Tailwind CSS, GSAP and ScrollTrigger.',
  keywords: ['Itzfizz', 'creative development', 'GSAP', 'ScrollTrigger', 'Next.js'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
