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
        className="text-sm text-[color:var(--ss-gray)] no-underline hover:text-[color:var(--ss-accent)]"
      >
        &larr; All Projects
      </Link>

      <header className="mt-3 mb-8 border-b border-[color:var(--ss-rule)] pb-5">
        <h1 className="text-4xl font-bold text-[color:var(--ss-text)]">{headline(title)}</h1>
        {description && (
          <p className="mt-2 text-2xl text-[color:var(--ss-gray)] max-w-prose">{description}</p>
        )}
      </header>

      {children}
    </div>
  );
}
