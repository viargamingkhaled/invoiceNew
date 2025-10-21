export const dynamic = 'force-dynamic';
import '../globals.css';

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          /* Hide website header/footer in print layout */
          header, nav, footer, [role="banner"], [role="navigation"], [role="contentinfo"] {
            display: none !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
        `}</style>
      </head>
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  );
}
