import React from 'react';
import { News_Cycle } from "next/font/google";

const NewsCycle  = News_Cycle({
  subsets:['latin'],
  weight:'400'
});

interface cellProps{
    value: string;
    onChange: (val: string) => void;
    cellType: "None" | "TripleWord" | "TripleLetter" | "DoubleWord" | "DoubleLetter" | "StartSquare";
}

const Cell: React.FC<cellProps> = ({value, onChange,cellType}) =>{
    let bgColor = "";
    switch(cellType){
        case "TripleWord":
            bgColor="bg-red-500";
            break;
        case "TripleLetter":
            bgColor="bg-blue-500";
            break;
        case "DoubleWord":
            bgColor="bg-pink-300";
            break;
        case "DoubleLetter":
            bgColor="bg-blue-300";
            break;
        case "StartSquare":
            bgColor="bg-red-500";
            break;
        default:
            bgColor="bg-white"
    }
    let points = "";
    switch(value){
        case "A":
        case "E":
        case "I":
        case "L":
        case "N":
        case "O":
        case "R":
        case "S":
        case "T":
        case "U":
            points="1";
            break;
        case "D":
        case "G":
            points="2";
            break;
        case "B":
        case "C":
        case "M":
        case "P":
            points="3";
            break;
        case "F":
        case "H":
        case "V":
        case "Y":
        case "W":
            points="4";
            break;
        case "K":
            points="5";
            break;
        case "J":
        case "X":
            points="8";
            break;
        case "Q":
        case "Z":
            points="10";
            break;
        default:
            points=""
            break;
    }

    return (
  <div className="relative w-9 h-9">
    <input
      type="text"
      value={value}
      maxLength={1}
      onChange={(e) => onChange(e.target.value.toUpperCase())}
      className={`
        ${NewsCycle.className}
        w-full h-full text-center text-lg font-bold border-2
        ${value ? "border-black" : "border-gray-300"}
        ${bgColor}
      `}
    />
    <span
      className={`
        absolute  leading-none text-black
        ${value === "Q" || value === "Z" ? "text-[2px] bottom-[0px] right-[0px]"  : " bottom-[2px] right-[2px] text-[4px]"}
      `}
    >
      {points}
    </span>
  </div>
);
};
export default Cell;