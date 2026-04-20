import React from "react";
import Link from "next/link";

interface ProjectBoxProps {
  name: string;
  link: string;
  description?: string;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ name, link, description }) => {
  return (
    <div className="w-full sm:w-[calc(50%-0.25rem)]">
      <Link href={link}>
        <div className="bg-[#3b4252] text-[#eceff4] border border-[#434c5e] hover:border-[#88c0d0] hover:text-[#88c0d0] rounded p-4 h-28 flex items-center justify-center text-center transition-colors cursor-pointer">
          <h2 className="text-base">
            <span className="text-[#4c566a]">&gt; </span>
            {name}
          </h2>
        </div>
      </Link>
      <p className="text-xs text-[#d8dee9] text-center mt-2 mb-4 px-2">
        {description}
      </p>
    </div>
  );
};

export default ProjectBox;
