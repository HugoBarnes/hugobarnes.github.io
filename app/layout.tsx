import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
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
        <Header />
        <div className="mx-auto w-full max-w-5xl flex-grow flex items-start">
          <aside className="hidden lg:block w-64 shrink-0 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-10 pl-6 pr-4 border-r border-[#241a20]">
            <FileTree />
          </aside>
          <main className="w-full max-w-3xl mx-auto px-6">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
