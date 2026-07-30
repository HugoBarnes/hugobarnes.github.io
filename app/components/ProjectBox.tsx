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
      <div className="h-full flex flex-col rounded-lg border border-[#efefef] bg-[#fafafa] p-4
        transition-colors group-hover:border-[#ff6719]">
        <h3 className="text-base text-[#1c1c1c] group-hover:text-[#ff6719] transition-colors">
          <span className="text-[#a0a0a0]">&gt;</span> {name}
        </h3>
        {description && (
          <p className="mt-2 text-xs leading-relaxed text-[#5a5a5a] flex-grow">
            {description}
          </p>
        )}
        <span className="mt-3 text-xs text-[#a0a0a0] group-hover:text-[#e05a10] transition-colors">
          open →
        </span>
      </div>
    </Link>
  );
};

export default ProjectBox;
