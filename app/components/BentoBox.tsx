"use client"
import React, {useState, useRef, useEffect} from 'react';
import ProjectBox from './ProjectBox';

const projectData = [
    { name: 'Scrabble Solver',link: "/Projects/ScrabbleSolver", description: "Takes letters and the board state as input. Outputs the optimal move."},
    { name: '3D Printed Drawing Machine', link:"/Projects/DrawingMachine", description:"An arduino (cnc extension) powered drawing machine. Inspired by the movie Hugo."},
    { name: 'Calvin and Hobbes Reader', link:"/Projects/CalvinAndHobbes", description:"Downloaded from the Internet Archive. The complete Calvin and Hobbes Collection."},
    { name: 'Sudoku Solver', link:"/Projects/Sudoku", description: "Try a solvable Sudoku! Or have it solved for you."},
    //{ name: 'Crossword Team Play', link:"/", description:"Get a previous New York Times Crossword and Solve it with a friend."},
    //{ name: 'Reinforcement Learning Tic-Tac-Toe', link:"/",description:"Example from Sutton's Reinforcement Learning Textbook."},
    //{ name: 'Neighborhood Work App', link:"/",description: "A web app that allows homeowners to connect with contractors."},
    { name: 'Linear Algebra Calculator', link:"/Projects/LinAlgebra",description:"A web app for Matrix computations."},
    //{name: 'RailTracker', link:"/Projects/AmtrakTracker", description:"A lightweight web app for tracking trains."}
];

const BentoBox = () =>{
    return(
        <main>
            <div className='flex flex-wrap gap-2 p-2'>
                {projectData.map((item) =>(
                    <ProjectBox 
                    key={item.name}
                    name={item.name}
                    link={item.link}
                    description={item.description}
                  />
                ))}
            </div>
        </main>
    );
};

export default BentoBox;