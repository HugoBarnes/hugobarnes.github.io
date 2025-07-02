"use client"
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';

function Footer(){
    return(
        <footer className="border-t border-black text-sm text-bold">
            <nav className="px-6 mx-auto max-w-2xl">    
            <div className="flex justify-between items-start w-full">
                <ul className="flex flex-col space-y-1">
                        <li>
                            <a href="mailto:hugo.s.barnes@gmail.com" className="text-blue-500 underline hover:text-blue-700">
                                hugo.s.barnes@gmail.com
                            </a>
                        </li>
                    </ul>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <button
                            onClick={() => window.open('https://www.linkedin.com/in/hugo-barnes/', '_blank')}
                            className="text-blue-600 hover:text-blue-800 text-xl hover:cursor-pointer"
                            >
                            <FontAwesomeIcon icon={faLinkedin} />
                            </button>
                        </li>
                        <li>
                            <button
                            onClick={() => window.open('https://github.com/HugoBarnes', '_blank')}
                            className="text-black-600 hover:text-black-800 text-xl hover:cursor-pointer">
                            <FontAwesomeIcon icon={faSquareGithub} />
                            </button>
                        </li>
                        <li>
                            <button
                            onClick={() => window.open('https://drive.google.com/file/d/1XtvFwW5hjlpOykbEgqKnrKFYIxWucJyb/view?usp=sharing', '_blank')}
                            className="text-black-600 hover:text-black-800 text-xl hover:cursor-pointer">
                            <FontAwesomeIcon icon={faFile} />
                            </button>
                        </li>
                        </ul>
                </div>
            </nav>
        </footer>
    );
}

export default Footer;