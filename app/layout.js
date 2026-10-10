import './globals.css';

export const metadata = {
  title: 'ITZFIZZ — Digital Experiences in Motion',
  description:
    'A scroll-driven creative landing page concept for Itzfizz Digital, built with Next.js, Tailwind CSS, GSAP and ScrollTrigger.',
  keywords: ['Itzfizz', 'creative development', 'GSAP', 'ScrollTrigger', 'Next.js'],
};

export const viewport = {
  themeColor: '#0a0c0b',
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the inline script below adds a `js` class before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
