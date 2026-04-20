import Link from "next/link";

export default function Home() {
  return (
    <div className="py-16">
      <h1 className="text-3xl mb-6">Hugo Barnes</h1>
      <ul className="space-y-1 text-sm">
        <li>
          <Link href="/Notes" className="hover:underline">
            Notes
          </Link>
        </li>
        <li>
          <Link href="/Teaching" className="hover:underline">
            Teaching
          </Link>
        </li>
        <li>
          <Link href="/Projects" className="hover:underline">
            Projects and Applications
          </Link>
        </li>
      </ul>
    </div>
  );
}
