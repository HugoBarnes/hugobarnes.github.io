"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="border-t border-[#efefef] text-xs text-[#404040] mt-12">
      <nav className="mx-auto max-w-3xl px-6 py-6">
        <div className="flex justify-between items-start w-full">
          <ul className="flex flex-col space-y-1">
            <li>
              <a
                href="mailto:hugo.s.barnes@gmail.com"
                className="text-[#ff6719] hover:text-[#e05a10]"
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
                className="text-[#e05a10] hover:text-[#ff6719] cursor-pointer"
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
                className="text-[#404040] hover:text-[#ff6719] cursor-pointer"
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
                className="text-[#404040] hover:text-[#ff6719] cursor-pointer"
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
