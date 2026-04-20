import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#282828]/90 backdrop-blur border-b border-[#3c3836]">
      <nav className="mx-auto max-w-3xl px-6">
        <div className="flex justify-between items-center w-full py-3 text-sm">
          <Link
            href="/#home"
            className="text-[#b8bb26] hover:text-[#8ec07c] transition-colors"
          >
            <span className="text-[#665c54]">~/</span>hugo-barnes
          </Link>
          <ul className="flex items-center space-x-6 text-[#d5c4a1]">
            <li>
              <a href="#notes" className="hover:text-[#83a598] transition-colors">
                notes
              </a>
            </li>
            <li>
              <a
                href="#teaching"
                className="hover:text-[#83a598] transition-colors"
              >
                teaching
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-[#83a598] transition-colors"
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
