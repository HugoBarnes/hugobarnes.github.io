import Link from "next/link";

interface ProjectShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

// Consistent wrapper for every project page: a back-link, a titled header in the
// site's gruvbox terminal style, an optional description, then the content.
export default function ProjectShell({
  title,
  description,
  children,
}: ProjectShellProps) {
  return (
    <div className="py-10">
      <Link
        href="/#projects"
        className="text-xs text-[#8a7080] hover:text-[#b5a8d0] transition-colors"
      >
        <span className="text-[#4a3a42]">cd</span> ../projects
      </Link>

      <header className="mt-3 mb-8 border-b border-[#241a20] pb-4">
        <h1 className="text-2xl text-[#f2c078]">
          <span className="text-[#4a3a42]">~/projects/</span>
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm text-[#a68f97] max-w-prose">{description}</p>
        )}
      </header>

      {children}
    </div>
  );
}
