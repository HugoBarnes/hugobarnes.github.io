import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

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
        className={`${firaCode.className} min-h-screen flex flex-col bg-[#282828] text-[#ebdbb2]`}
      >
        <Header />
        <main className="mx-auto w-full max-w-3xl px-6 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
