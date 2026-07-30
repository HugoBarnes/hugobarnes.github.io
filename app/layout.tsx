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
        className="min-h-screen flex flex-col bg-[#f7f9fc] text-[#121722]"
      >
        <div className="mx-auto w-full max-w-5xl flex-grow flex items-start">
          <aside className="hidden md:block w-64 shrink-0 sticky top-0 max-h-screen overflow-y-auto py-10 pl-6 pr-4 border-r border-[#e4e9f2]">
            <FileTree />
          </aside>
          <div className="w-full min-w-0">
            {/* Mobile: collapsible tree in place of the removed header */}
            <details className="md:hidden mx-6 mt-4 border border-[#e4e9f2] rounded-sm">
              <summary className="cursor-pointer px-3 py-2 text-xs text-[#10151f] select-none">
                hugo-barnes
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
