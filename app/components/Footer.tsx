"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="border-t border-[#3b4252] text-xs text-[#d8dee9] mt-12">
      <nav className="mx-auto max-w-3xl px-6 py-6">
        <div className="flex justify-between items-start w-full">
          <ul className="flex flex-col space-y-1">
            <li>
              <span className="text-[#4c566a]">$</span>{" "}
              <a
                href="mailto:hugo.s.barnes@gmail.com"
                className="text-[#88c0d0] hover:text-[#8fbcbb]"
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
                className="text-[#81a1c1] hover:text-[#88c0d0] cursor-pointer"
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
                className="text-[#d8dee9] hover:text-[#88c0d0] cursor-pointer"
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
                className="text-[#d8dee9] hover:text-[#88c0d0] cursor-pointer"
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
