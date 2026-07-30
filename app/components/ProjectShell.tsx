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
        className="text-sm text-[#6b6b6b] no-underline hover:text-[#ff6719]"
      >
        &larr; All Projects
      </Link>

      <header className="mt-3 mb-8 border-b border-[#efefef] pb-5">
        <h1 className="text-4xl font-bold text-[#1c1c1c]">{headline(title)}</h1>
        {description && (
          <p className="mt-2 text-lg text-[#6b6b6b] max-w-prose">{description}</p>
        )}
      </header>

      {children}
    </div>
  );
}
