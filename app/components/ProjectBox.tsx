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
      <div className="h-full flex flex-col rounded-lg border border-[#e4e9f2] bg-[#eef1f7] p-4
        transition-colors group-hover:border-[#1a3e8c]">
        <h3 className="text-base text-[#121722] group-hover:text-[#1a3e8c] transition-colors">
          <span className="text-[#8e99ac]">&gt;</span> {name}
        </h3>
        {description && (
          <p className="mt-2 text-xs leading-relaxed text-[#4d576b] flex-grow">
            {description}
          </p>
        )}
        <span className="mt-3 text-xs text-[#8e99ac] group-hover:text-[#33508e] transition-colors">
          open →
        </span>
      </div>
    </Link>
  );
};

export default ProjectBox;
