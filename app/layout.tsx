import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/Footer";
import FileTree from "@/app/components/FileTree";
import ThemeToggle from "@/app/components/ThemeToggle";

// Applied before paint so a dark-mode visitor never sees a white flash.
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.dataset.theme=t;}catch(e){}})();`;

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[var(--ss-bg)] text-[color:var(--ss-text)]"
      >
        <ThemeToggle />
        <div className="w-full flex-grow flex items-start">
          {/* File tree pinned to the left edge of the viewport */}
          <aside className="hidden md:block w-72 shrink-0 sticky top-0 max-h-screen overflow-y-auto py-10 pl-6 pr-4 border-r border-[color:var(--ss-rule)]">
            <FileTree />
          </aside>
          <div className="w-full min-w-0">
            {/* Mobile: collapsible tree in place of the removed header */}
            <details className="md:hidden mx-6 mt-4 border border-[color:var(--ss-rule)] rounded-md">
              <summary className="cursor-pointer px-3 py-2 text-sm text-[color:var(--ss-text)] select-none">
                Hugo Barnes
              </summary>
              <div className="px-3 pb-3 overflow-x-auto">
                <FileTree />
              </div>
            </details>
            <main className="w-full max-w-[760px] mx-auto px-6 text-center">{children}</main>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
