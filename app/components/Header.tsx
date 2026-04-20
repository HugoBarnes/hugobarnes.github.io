import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#2e3440]/90 backdrop-blur border-b border-[#3b4252]">
      <nav className="mx-auto max-w-3xl px-6">
        <div className="flex justify-between items-center w-full py-3 text-sm">
          <Link
            href="/#home"
            className="text-[#a3be8c] hover:text-[#88c0d0] transition-colors"
          >
            <span className="text-[#4c566a]">~/</span>hugo-barnes
          </Link>
          <ul className="flex items-center space-x-6 text-[#d8dee9]">
            <li>
              <a href="#notes" className="hover:text-[#88c0d0] transition-colors">
                notes
              </a>
            </li>
            <li>
              <a
                href="#teaching"
                className="hover:text-[#88c0d0] transition-colors"
              >
                teaching
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-[#88c0d0] transition-colors"
              >
                projects
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
