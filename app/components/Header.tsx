import Link from "next/link";

function Header(){
    return(
        <header className="bg-black text-white text-sm text-bold">
            <nav className="px-6 mx-auto max-w-2xl">
            <div className="flex justify-between items-center w-full">
                <ul className="flex items-center space-x-4">
                        <li>
                            <Link href="/" className="hover:underline decoration-2">
                                Hugo Barnes
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <Link href="/Thesis" className="hover:underline decoration-2">
                                Thesis
                            </Link>
                        </li>
                        <li>
                            <Link href="/Projects" className="hover:underline decoration-2">
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link href="/Teaching" className="hover:underline decoration-2">
                                Teaching
                            </Link>
                        </li>
                        <li>
                            <Link href="/Research" className="hover:underline decoration-2">
                                Research
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
    export default Header;