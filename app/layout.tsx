import type { Metadata } from "next";
import { Cormorant, Fira_Code, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const cormorant  = Cormorant({
  subsets:['latin']
});

const firaCode = Fira_Code({
  subsets:['latin']
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: '400',
});


export const metadata: Metadata = {
  title: "Hugo Barnes",
  description: "The personal website of Hugo Barnes, a Mathematics and Computer Science Double Major at the University of Virginia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${ibmPlexSans.className} min-h-screen flex flex-col`}>
        <Header />
        <div className="mx-auto max-w-2xl px-4 flex-grow">
        <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
