"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface TreeNode {
  name: string;
  path?: string; // internal route (may include #hash)
  href?: string; // external link
  children?: TreeNode[];
}

const TREE: TreeNode[] = [
  {
    name: "about.md",
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
    name: "research.md",
    path: "/Research",
  },
  {
    name: "cv.pdf",
    href: "https://drive.google.com/file/d/1XtvFwW5hjlpOykbEgqKnrKFYIxWucJyb/view?usp=sharing",
  },
];

const isDir = (node: TreeNode) => node.children !== undefined;

/* Color a file name the way a terminal `ls`/git tree would */
function nameColor(node: TreeNode, active: boolean): string {
  if (active) return "text-[#f5b78a]";
  if (isDir(node)) return "text-[#9aa5cc]";
  if (node.name.endsWith(".pdf")) return "text-[#cba6c3]";
  if (node.name.endsWith(".mp4")) return "text-[#b5a8d0]";
  return "text-[#f2e0d3]";
}

function nodeKey(node: TreeNode, trail: string): string {
  return `${trail}/${node.name}`;
}

function useActiveLocation(): string {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [pathname]);

  return pathname === "/" && hash ? `/${hash}` : pathname;
}

interface RowProps {
  node: TreeNode;
  guides: boolean[]; // one entry per ancestor: does that ancestor have later siblings?
  isLast: boolean;
  trail: string;
  active: string;
  collapsed: Set<string>;
  onToggle: (key: string) => void;
}

function Row({ node, guides, isLast, trail, active, collapsed, onToggle }: RowProps) {
  const key = nodeKey(node, trail);
  const dir = isDir(node);
  const hasKids = dir && node.children!.length > 0;
  const open = dir && !collapsed.has(key);
  const isActive = node.path !== undefined && node.path === active;

  const prefix =
    guides.map((g) => (g ? "│  " : "   ")).join("") + (isLast ? "└── " : "├── ");

  const label = (
    <>
      <span className="text-[#4a3a42] select-none whitespace-pre">{prefix}</span>
      {hasKids && (
        <span className="text-[#4a3a42] select-none">{open ? "▾ " : "▸ "}</span>
      )}
      <span
        className={`${nameColor(node, isActive)} group-hover:text-[#f5b78a] transition-colors`}
      >
        {node.name}
        {dir && <span className="text-[#4a3a42]">/</span>}
      </span>
      {isActive && <span className="text-[#e8837e] ml-1">●</span>}
    </>
  );

  const rowClass =
    "group block w-full text-left text-xs leading-6 whitespace-pre hover:bg-[#241a20] rounded-sm cursor-pointer";

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
        className={rowClass}
        onClick={() => hasKids && onToggle(key)}
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
      {dir && open && node.children!.length > 0 && (
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
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function FileTree() {
  const active = useActiveLocation();
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggle = (key: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <nav aria-label="Site file tree" className="text-xs font-mono">
      {/* repo header, zsh style */}
      <Link href="/#home" className="group block leading-6 whitespace-pre">
        <span className="text-[#b8bd8f]">~/hugo-barnes</span>{" "}
        <span className="text-[#9aa5cc]">git:(</span>
        <span className="text-[#e8837e]">main</span>
        <span className="text-[#9aa5cc]">)</span>
      </Link>
      <div className="text-[#4a3a42] leading-6 select-none">.</div>
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
          />
        ))}
      </ul>
    </nav>
  );
}
