import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0f0b10]/90 backdrop-blur border-b border-[#241a20]">
      <nav className="mx-auto max-w-3xl px-6">
        <div className="flex justify-between items-center w-full py-3 text-sm">
          <Link
            href="/#home"
            className="text-[#b8bd8f] hover:text-[#b5a8d0] transition-colors"
          >
            <span className="text-[#4a3a42]">~/</span>hugo-barnes
          </Link>
          <ul className="flex items-center space-x-6 text-[#d9c2ba]">
            <li>
              <Link
                href="/#notes"
                className="hover:text-[#9aa5cc] transition-colors"
              >
                notes
              </Link>
            </li>
            <li>
              <Link
                href="/#teaching"
                className="hover:text-[#9aa5cc] transition-colors"
              >
                teaching
              </Link>
            </li>
            <li>
              <Link
                href="/#projects"
                className="hover:text-[#9aa5cc] transition-colors"
              >
                projects
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
