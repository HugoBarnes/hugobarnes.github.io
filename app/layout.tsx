import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/Footer";
import FileTree from "@/app/components/FileTree";

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
        className="min-h-screen flex flex-col bg-[#ffffff] text-[#1c1c1c]"
      >
        <div className="w-full flex-grow flex items-start">
          {/* File tree pinned to the left edge of the viewport */}
          <aside className="hidden md:block w-72 shrink-0 sticky top-0 max-h-screen overflow-y-auto py-10 pl-6 pr-4 border-r border-[#efefef]">
            <FileTree />
          </aside>
          <div className="w-full min-w-0">
            {/* Mobile: collapsible tree in place of the removed header */}
            <details className="md:hidden mx-6 mt-4 border border-[#efefef] rounded-md">
              <summary className="cursor-pointer px-3 py-2 text-sm text-[#1c1c1c] select-none">
                Hugo Barnes
              </summary>
              <div className="px-3 pb-3 overflow-x-auto">
                <FileTree />
              </div>
            </details>
            <main className="w-full max-w-[760px] px-8 text-center">{children}</main>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
