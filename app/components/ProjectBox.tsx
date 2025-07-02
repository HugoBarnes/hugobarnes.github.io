import React from 'react';
import Link from 'next/link';

interface ProjectBoxProps{
    name: string;
    link: string;
    description?: string;
}
const ProjectBox: React.FC<ProjectBoxProps> = ({name, link, description}) =>{
    return (
        <div>
            <Link href={link}>
                <div className="bg-black text-sm text-white hover:underline shadow-md w-77 rounded border-black p-2 h-15 aspect-square transition duration-200 cursor-pointer flex items-center justify-center text-center">
                    <h2 className="text-lg font-semibold">{name}</h2>
                </div>
            </Link>
            <p className='text-sm text-center mb-4 px-2 w-75'>{description}</p>
        </div>
    );
};
export default ProjectBox;