import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Page = {
  title: string;
  href: string;
  group: string;
};

export default function CommandPalette({ pages }: { pages: Page[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-command-trigger]")) {
        setOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      setQuery("");
    }
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return pages.slice(0, 10);

    return pages
      .filter((page) => `${page.title} ${page.group} ${page.href}`.toLowerCase().includes(normalized))
      .slice(0, 12);
  }, [pages, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 px-4 py-20 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search site">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-graphite-900 shadow-panel">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search aria-hidden="true" className="h-5 w-5 text-cyan-200" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-11 flex-1 bg-transparent text-base text-white outline-none placeholder:text-slate-500"
            placeholder="Search frameworks, notes, glossary..."
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-slate-300 transition hover:bg-white/5 hover:text-white"
            aria-label="Close search"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-sm text-slate-400">No matching page found.</p>
          ) : (
            results.map((page) => (
              <a
                key={page.href}
                href={page.href}
                className="grid gap-1 rounded-md px-3 py-3 transition hover:bg-white/6"
                onClick={() => setOpen(false)}
              >
                <span className="text-sm font-bold text-white">{page.title}</span>
                <span className="font-mono text-xs text-slate-500">{page.group} · {page.href}</span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
