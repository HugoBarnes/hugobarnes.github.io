"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface TreeNode {
  name: string;
  path?: string; // internal route (may include #hash)
  href?: string; // external link
  children?: TreeNode[];
}

const TREE: TreeNode[] = [
  {
    name: "about",
    path: "/#about",
  },
  {
    name: "notes",
    path: "/#notes",
    children: [
      { name: "real-analysis.pdf", href: "/pdfs/BasicRealAnalyis.pdf" },
      { name: "adv-linear-algebra.pdf", href: "/pdfs/AdvancedLinearAlgebra.pdf" },
      { name: "combinatorics.pdf", href: "/pdfs/Combinatorics.pdf" },
    ],
  },
  {
    name: "teaching",
    path: "/#teaching",
    children: [
      {
        name: "lecture-10am.mp4",
        href: "https://drive.google.com/file/d/1Hg4Fh8s8LziblSEHTzarVoWh0xnGjGwj/view?usp=sharing",
      },
      {
        name: "lecture-11am.mp4",
        href: "https://drive.google.com/file/d/1rzBw8mNJ64H_2Y4qAj71WGmSwG3vW5Uq/view?usp=sharing",
      },
    ],
  },
  {
    name: "projects",
    path: "/#projects",
    children: [
      { name: "scrabble-solver", path: "/Projects/ScrabbleSolver", children: [] },
      { name: "sudoku", path: "/Projects/Sudoku", children: [] },
      { name: "lin-algebra", path: "/Projects/LinAlgebra", children: [] },
      { name: "drawing-machine", path: "/Projects/DrawingMachine", children: [] },
      { name: "calvin-and-hobbes", path: "/Projects/CalvinAndHobbes", children: [] },
    ],
  },
  {
    name: "research",
    path: "/Research",
  },
  {
    name: "cv.pdf",
    href: "https://drive.google.com/file/d/1XtvFwW5hjlpOykbEgqKnrKFYIxWucJyb/view?usp=sharing",
  },
];

const LINE = "border-[color:var(--ss-text)]/20"; // thin white connector lines

const isDir = (node: TreeNode) => node.children !== undefined;

function nodeKey(node: TreeNode, trail: string): string {
  return `${trail}/${node.name}`;
}

function allDirKeys(nodes: TreeNode[], trail = ""): string[] {
  return nodes.flatMap((n) => {
    const key = nodeKey(n, trail);
    return isDir(n) ? [key, ...allDirKeys(n.children!, key)] : [];
  });
}

// Keys of every directory on the way to the node with the given path
function ancestorsOf(nodes: TreeNode[], target: string, trail = ""): string[] | null {
  for (const n of nodes) {
    const key = nodeKey(n, trail);
    if (n.path === target) return [];
    if (isDir(n)) {
      const sub = ancestorsOf(n.children!, target, key);
      if (sub) return [key, ...sub];
    }
  }
  return null;
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 shrink-0"
      aria-hidden
    >
      {open ? (
        <path d="M3 8V6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1M3 8h16.2a1 1 0 0 1 .97 1.24l-2.2 8A2 2 0 0 1 16 19H5a2 2 0 0 1-2-2V8z" />
      ) : (
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      )}
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 shrink-0"
      aria-hidden
    >
      <path d="M14 2H7a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6l-4-4z" />
      <path d="M14 2v4h4" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-3.5 h-3.5 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

// Next's Link uses pushState for same-page hash jumps, which fires neither
// hashchange nor popstate — so clicks must also report the hash directly
// via setHash (see onNavigate below).
function useActiveLocation(): [string, (hash: string) => void] {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, [pathname]);

  // The site exports with trailingSlash, so live URLs are "/Research/" while
  // tree paths are "/Research" — normalize before comparing.
  const clean = pathname.replace(/\/+$/, "") || "/";
  return [clean === "/" && hash ? `/${hash}` : clean, setHash];
}

interface RowProps {
  node: TreeNode;
  guides: boolean[]; // one entry per ancestor: does that ancestor have later siblings?
  isLast: boolean;
  trail: string;
  active: string;
  collapsed: Set<string>;
  onToggle: (key: string) => void;
  onNavigate: (path: string) => void;
}

function Row({ node, guides, isLast, trail, active, collapsed, onToggle, onNavigate }: RowProps) {
  const key = nodeKey(node, trail);
  const dir = isDir(node);
  const hasKids = dir && node.children!.length > 0;
  const open = dir && !collapsed.has(key);
  const isActive = node.path !== undefined && node.path === active;

  // Thin-line connectors: a vertical guide per ancestor, then an L/T corner.
  const connectors = (
    <span className="flex self-stretch shrink-0" aria-hidden>
      {guides.map((g, i) => (
        <span key={i} className={`w-5 ${g ? `border-l ${LINE}` : ""}`} />
      ))}
      <span className="relative w-5">
        <span
          className={`absolute left-0 top-0 border-l ${LINE} ${isLast ? "h-1/2" : "h-full"}`}
        />
        <span className={`absolute left-0 top-1/2 w-4 border-t ${LINE}`} />
      </span>
    </span>
  );

  const label = (
    <>
      {connectors}
      {hasKids && (
        <span className="text-[color:var(--ss-text)]/50 mr-1 flex items-center">
          <Chevron open={open} />
        </span>
      )}
      <span className={`mr-1.5 flex items-center ${isActive ? "text-[color:var(--ss-text)]" : "text-[color:var(--ss-text)]/60"}`}>
        {dir ? <FolderIcon open={open} /> : <FileIcon />}
      </span>
      <span
        className={`truncate ${
          isActive ? "text-[color:var(--ss-text)] font-semibold" : "text-[color:var(--ss-text)]/75"
        } group-hover:text-[color:var(--ss-text)] transition-colors`}
      >
        {node.name}
      </span>
      {isActive && <span className="sr-only">(current page)</span>}
    </>
  );

  const rowClass =
    "group flex items-center w-full text-left text-sm leading-9 rounded-sm cursor-pointer hover:bg-[var(--ss-text)]/5";

  let row: React.ReactNode;
  if (node.href) {
    row = (
      <a href={node.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
        {label}
      </a>
    );
  } else if (node.path) {
    row = (
      <Link
        href={node.path}
        data-path={node.path}
        className={rowClass}
        onClick={() => {
          if (hasKids) onToggle(key);
          onNavigate(node.path!);
        }}
      >
        {label}
      </Link>
    );
  } else {
    row = (
      <button type="button" className={rowClass} onClick={() => hasKids && onToggle(key)}>
        {label}
      </button>
    );
  }

  return (
    <li>
      {row}
      {hasKids && open && (
        <ul>
          {node.children!.map((child, i) => (
            <Row
              key={nodeKey(child, key)}
              node={child}
              guides={[...guides, !isLast]}
              isLast={i === node.children!.length - 1}
              trail={key}
              active={active}
              collapsed={collapsed}
              onToggle={onToggle}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const HOME_SECTIONS = ["about", "notes", "teaching", "projects"];

export default function FileTree() {
  const [active, setHash] = useActiveLocation();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [marker, setMarker] = useState<{ top: number; height: number } | null>(null);

  // Report where a clicked link points so the indicator moves immediately,
  // even when Next handles the jump with pushState (no hashchange event).
  const handleNavigate = (path: string) => {
    const i = path.indexOf("#");
    setHash(i >= 0 ? path.slice(i) : "");
  };

  // Scrollspy: on the home page, follow the section currently in view.
  useEffect(() => {
    const clean = pathname.replace(/\/+$/, "") || "/";
    if (clean !== "/") return;
    const onScroll = () => {
      let current = "";
      for (const id of HOME_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) {
          current = `#${id}`;
        }
      }
      // At the bottom of the page the last section counts, even if its
      // heading never crosses the trigger line.
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        current = `#${HOME_SECTIONS[HOME_SECTIONS.length - 1]}`;
      }
      setHash(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, setHash]);
  // Start fully collapsed: only the root-level entries are visible.
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set(allDirKeys(TREE)));

  const toggle = (key: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  // Reveal the current page: expand every folder on the way to it.
  useEffect(() => {
    const ancestors = ancestorsOf(TREE, active);
    if (!ancestors || ancestors.length === 0) return;
    setCollapsed((prev) => {
      if (!ancestors.some((k) => prev.has(k))) return prev;
      const next = new Set(prev);
      ancestors.forEach((k) => next.delete(k));
      return next;
    });
  }, [active]);

  // Slide the small black line next to the active row.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const el = nav.querySelector<HTMLElement>(`[data-path="${CSS.escape(active)}"]`);
    if (!el) {
      setMarker(null);
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const rowRect = el.getBoundingClientRect();
    setMarker({ top: rowRect.top - navRect.top + (rowRect.height - 16) / 2, height: 16 });
  }, [active, collapsed]);

  return (
    <nav ref={navRef} aria-label="Site file tree" className="relative text-sm">
      {marker && (
        <span
          aria-hidden
          className="absolute right-0 w-[2px] bg-[var(--ss-text)] transition-[top] duration-300 ease-out"
          style={{ top: marker.top, height: marker.height }}
        />
      )}
      <Link
        href="/#home"
        className="flex items-center gap-2 leading-9 text-base text-[color:var(--ss-text)] hover:bg-[var(--ss-text)]/5 rounded-sm"
      >
        <FolderIcon open />
        <span className="font-semibold">hugo-barnes</span>
      </Link>
      <ul>
        {TREE.map((node, i) => (
          <Row
            key={nodeKey(node, "")}
            node={node}
            guides={[]}
            isLast={i === TREE.length - 1}
            trail=""
            active={active}
            collapsed={collapsed}
            onToggle={toggle}
            onNavigate={handleNavigate}
          />
        ))}
      </ul>
    </nav>
  );
}
