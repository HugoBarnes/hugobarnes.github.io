import React from "react";
import Link from "next/link";

interface ProjectBoxProps {
  name: string;
  link: string;
  description?: string;
}

// A single project card: title in the terminal prompt style with the
// description inside the card, and a subtle hover affordance.
const ProjectBox: React.FC<ProjectBoxProps> = ({ name, link, description }) => {
  return (
    <Link href={link} className="group block h-full">
      <div className="h-full flex flex-col rounded-lg border border-[color:var(--ss-rule)] bg-[var(--ss-bg-soft)] p-4
        transition-colors group-hover:border-[color:var(--ss-accent)]">
        <h3 className="text-base text-[color:var(--ss-text)] group-hover:text-[color:var(--ss-accent)] transition-colors">
          <span className="text-[color:var(--ss-muted)]">&gt;</span> {name}
        </h3>
        {description && (
          <p className="mt-2 text-xs leading-relaxed text-[color:var(--ss-gray)] flex-grow">
            {description}
          </p>
        )}
        <span className="mt-3 text-xs text-[color:var(--ss-muted)] group-hover:text-[color:var(--ss-accent-dark)] transition-colors">
          open →
        </span>
      </div>
    </Link>
  );
};

export default ProjectBox;
