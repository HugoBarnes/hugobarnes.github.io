import React from 'react';

interface computationsProps{
    comp: React.ReactNode;
    onClick: () => void;
};


export default function Computations({comp, onClick}: computationsProps){
    return(
        <button onClick={onClick}   className="flex-grow flex-shrink basis-1/4 bg-black text-white p-2 hover:cursor-pointer hover:underline"
>
            {comp}
        </button>
    );
};