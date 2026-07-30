"use client";
import dynamic from "next/dynamic";
import ProjectShell from "@/app/components/ProjectShell";

const PDFViewer = dynamic(() => import("@/app/components/PDFViewer"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <ProjectShell
      title="calvin-and-hobbes"
      description="The complete Calvin and Hobbes collection, from the Internet Archive — read any volume right here."
    >
      <PDFViewer />
    </ProjectShell>
  );
}
