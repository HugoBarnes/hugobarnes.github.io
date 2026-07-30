"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="border-t border-[#241a20] text-xs text-[#d9c2ba] mt-12">
      <nav className="mx-auto max-w-3xl px-6 py-6">
        <div className="flex justify-between items-start w-full">
          <ul className="flex flex-col space-y-1">
            <li>
              <span className="text-[#4a3a42]">$</span>{" "}
              <a
                href="mailto:hugo.s.barnes@gmail.com"
                className="text-[#9aa5cc] hover:text-[#b5a8d0]"
              >
                hugo.s.barnes@gmail.com
              </a>
            </li>
          </ul>
          <ul className="flex items-center space-x-4 text-lg">
            <li>
              <button
                onClick={() =>
                  window.open("https://www.linkedin.com/in/hugo-barnes/", "_blank")
                }
                className="text-[#7c87b0] hover:text-[#9aa5cc] cursor-pointer"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  window.open("https://github.com/HugoBarnes", "_blank")
                }
                className="text-[#d9c2ba] hover:text-[#9aa5cc] cursor-pointer"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faSquareGithub} />
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1XtvFwW5hjlpOykbEgqKnrKFYIxWucJyb/view?usp=sharing",
                    "_blank"
                  )
                }
                className="text-[#d9c2ba] hover:text-[#9aa5cc] cursor-pointer"
                aria-label="CV"
              >
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
