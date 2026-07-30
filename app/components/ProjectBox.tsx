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
      <div className="h-full flex flex-col rounded-lg border border-[#241a20] bg-[#1a1218] p-4
        transition-colors group-hover:border-[#9aa5cc]">
        <h3 className="text-base text-[#f2e0d3] group-hover:text-[#9aa5cc] transition-colors">
          <span className="text-[#4a3a42]">&gt;</span> {name}
        </h3>
        {description && (
          <p className="mt-2 text-xs leading-relaxed text-[#a68f97] flex-grow">
            {description}
          </p>
        )}
        <span className="mt-3 text-xs text-[#4a3a42] group-hover:text-[#b5a8d0] transition-colors">
          open →
        </span>
      </div>
    </Link>
  );
};

export default ProjectBox;
