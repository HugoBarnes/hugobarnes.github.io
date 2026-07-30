import Link from "next/link";

interface ProjectShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

// Turn a slug like "calvin-and-hobbes" into "Calvin And Hobbes"
function headline(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Consistent wrapper for every project page: a back-link, a newspaper-style
// headline, an optional standfirst, then the content.
export default function ProjectShell({
  title,
  description,
  children,
}: ProjectShellProps) {
  return (
    <div className="py-10">
      <Link
        href="/#projects"
        className="text-xs text-[#5b6577] uppercase tracking-widest no-underline hover:text-[#1a3e8c]"
      >
        &larr; All Projects
      </Link>

      <header className="mt-3 mb-8 border-b-2 border-[#10151f] pb-4">
        <h1 className="text-3xl font-bold text-[#10151f]">{headline(title)}</h1>
        {description && (
          <p className="mt-2 text-sm text-[#4d576b] italic max-w-prose">{description}</p>
        )}
      </header>

      {children}
    </div>
  );
}
