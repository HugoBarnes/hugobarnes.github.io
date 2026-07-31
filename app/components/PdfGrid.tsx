import Image from "next/image";

export interface PdfGridItem {
  title: string;
  href: string;
  thumb: string;
}

/* Thumbnail cards for PDFs; thumbs come from scripts/generate-pdf-thumbs.sh */
export default function PdfGrid({ items }: { items: PdfGridItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block no-underline hover:no-underline"
        >
          <span
            className="block overflow-hidden rounded-md border
              border-[color:var(--ss-rule-dark)] group-hover:border-[color:var(--ss-accent)]
              shadow-sm group-hover:shadow-md transition-all"
          >
            {/* uniform page-shaped frame; landscape decks letterbox on white */}
            <Image
              src={item.thumb}
              alt={`First page of ${item.title}`}
              width={371}
              height={480}
              className="w-full aspect-[3/4] object-contain bg-white block"
            />
          </span>
          <span
            className="mt-2 block text-[1.125rem] leading-snug text-center
              text-[color:var(--ss-text-soft)] group-hover:text-[color:var(--ss-accent)]
              transition-colors"
          >
            {item.title}
          </span>
        </a>
      ))}
    </div>
  );
}
