"use client"
import React, {useState,useRef, useEffect} from 'react';
import Cell from './Cell'

const Board = () =>{
    const [board,setBoard] = useState<string[][]>(
        Array.from({length: 15}, ()=> Array(15).fill(''))
    )
    const handleCellChange = (row: number, col: number, val: string) => {
        const newBoard = board.map((r, i) => r.map((c, j) => (i === row && j === col ? val : c)));
        setBoard(newBoard);
    };

    const getCellType = (row:number, col:number): "None" | "TripleWord" | "TripleLetter" | "DoubleWord" | "DoubleLetter" | "StartSquare" =>{
      // Everything is Zero indexed
      if(row == 7 && col == 7) return "StartSquare";
      if((row == 0 && (col == 0 || col == 7 || col == 14)) || (row == 7 &&(col == 0 || col == 7 || col == 14))|| row == 14 &&(col == 0 || col == 7 || col == 14))  return "TripleWord";
      if(row == 0 && (col == 3 || col == 11) || row == 14 &&(col == 3 || col == 11)) return "DoubleLetter";
      if(row == 2 && (col == 6 || col == 8) || row == 12 && (col == 6 || col == 8)) return "DoubleLetter";
      if(row == 7 && (col == 3 || col == 11)) return "DoubleLetter";
      if(row == 6 && (col == 2 || col == 6 || col == 8 || col == 12) || row == 8 && (col == 2 || col == 6 || col == 8 || col == 12)) return "DoubleLetter"
      if((row == 1 && (col == 5 || col == 9))|| (row == 5 &&(col == 1 || col == 5 || col == 9 || col == 13))|| (row == 9 &&(col == 1 || col == 5 || col == 9 || col == 13)) || row == 13 && (col == 5 || col == 9)) return "TripleLetter";
      if(row == col || row+col == 14) return "DoubleWord";
      if(row == 11 && (col == 0 || col == 7 || col == 14) || row == 3 &&(col == 0 || col == 7 || col == 14) ) return "DoubleLetter"
      return "None";
    }

    return (
        <div className="grid grid-cols-15 gap-0">
          {board.map((row, rowIndex) =>
            row.map((cellValue, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cellValue}
                onChange={(val) => handleCellChange(rowIndex, colIndex, val)}
                cellType={getCellType(rowIndex, colIndex)} // optional if you have types
              />
            ))
          )}
        </div>
      );
};

export default Board