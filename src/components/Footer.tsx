import { ArrowUp } from 'lucide-react';
import { HERO_DATA, NAV_LINKS } from '../data/portfolio';

export function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="bg-[#0A0F1C] py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="font-mono text-xs text-[#94A3B8]">
          &copy; 2026 {HERO_DATA.name}
        </p>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="inline-flex min-h-[44px] items-center text-xs font-medium text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex min-h-[44px] items-center gap-2 border border-white/10 bg-[#111827] px-4 py-2 font-mono text-xs text-[#F8FAFC] transition-colors hover:border-white/25"
        >
          Back to Top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
