"use client";
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('@/app/components/PDFViewer'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <PDFViewer />
    </main>
  );
}
