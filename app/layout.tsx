import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/Footer";
import FileTree from "@/app/components/FileTree";

const firaCode = Fira_Code({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hugo Barnes",
  description:
    "Hugo Barnes — Mathematics (Probability & Statistics) and Computer Science at the University of Virginia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.className} min-h-screen flex flex-col bg-[#0f0b10] text-[#f2e0d3]`}
      >
        <div className="mx-auto w-full max-w-5xl flex-grow flex items-start">
          <aside className="hidden md:block w-64 shrink-0 sticky top-0 max-h-screen overflow-y-auto py-10 pl-6 pr-4 border-r border-[#241a20]">
            <FileTree />
          </aside>
          <div className="w-full min-w-0">
            {/* Mobile: collapsible tree in place of the removed header */}
            <details className="md:hidden mx-6 mt-4 border border-[#241a20] rounded-sm">
              <summary className="cursor-pointer px-3 py-2 text-xs text-[#b8bd8f] select-none">
                ~/hugo-barnes <span className="text-[#9aa5cc]">git:(</span>
                <span className="text-[#e8837e]">main</span>
                <span className="text-[#9aa5cc]">)</span>
              </summary>
              <div className="px-3 pb-3 overflow-x-auto">
                <FileTree />
              </div>
            </details>
            <main className="w-full max-w-3xl mx-auto px-6">{children}</main>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
