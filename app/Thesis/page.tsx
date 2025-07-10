"use client";
import Link from "next/link";
import { useState } from "react";

/*********************************************************************
 * DATA MODEL
 *********************************************************************/
export type ThesisUpdate = {
  id: string;            // YYYY-MM-DD
  date: string;          // ISO date
  title: string;
  details: string[];
  status: "done" | "in-progress" | "planned";
  /** Tailwind colour class (e.g. "bg-red-600") overrides default dot */
  color?: string;
};

/*********************************************************************
 * TIMELINE DATA – edit as needed
 *********************************************************************/
const updates: ThesisUpdate[] = [
  {
    id: "2025-07-03",
    date: "2025-07-03",
    title: "Began Setup Phase",
    details: ["Created Slideshow", "Installed Yolov12 With Docker", "Added Nvidia Container Toolkit", "Updated Nvidia Drivers"],
    status: "done",
    color: "bg-black",
  },
  {
    id: "2025-07-04",
    date: "2025-07-04",
    title: "Administrative Work",
    details: ["Created this page", "Updated Calendar", "Read the Currently Reading Article", "Created Obsidian Folder for reading takeaways"],
    status: "done",
  },
  {
    id: "2025-08-06",
    date: "2025-08-06",
    title: "W.F. (EXH)",
    details: ["Team Plays Wake Forest in North Carolina 7:00 PM"],
    status:"planned",
    color: "bg-blue-800"
  },
  {
    id: "2025-08-09",
    date: "2025-08-09",
    title: "DC POWER (EXH)",
    details: ["Team Plays DC POWER in Charlottesville 8:00 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-08-14",
    date: "2025-08-14",
    title: "WV",
    details: ["Team Plays West Virginia in Morgantown 7:00 PM"],
    status:"planned",
    color: "bg-blue-800"
  },
  {
    id: "2025-08-21",
    date: "2025-08-21",
    title: "X",
    details: ["Team Plays Xavier in Charlottesville 5:30 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-08-24",
    date: "2025-08-24",
    title: "Liberty",
    details: ["Team Plays Liberty in Lynchburg 1:00 PM"],
    status:"planned",
    color: "bg-blue-800"
  },
  {
    id: "2025-08-28",
    date: "2025-08-28",
    title: "Charlotte",
    details: ["Team Plays Charlotte in Charlottesville 7:00 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-08-31",
    date: "2025-08-31",
    title: "Georgetown",
    details: ["Team Plays Georgetown in Charlottesville 1:00 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-09-04",
    date: "2025-09-04",
    title: "Penn State",
    details: ["Team Plays Penn State in Charlottesville 7:00 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-09-11",
    date: "2025-09-11",
    title: "Duke (ACC)",
    details: ["Team Plays Duke in Charlottesville 7:00 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-09-14",
    date: "2025-09-14",
    title: "VCU",
    details: ["Team Plays VCU in Charlottesville 5:30 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-09-20",
    date: "2025-09-20",
    title: "Syracuse (ACC)",
    details: ["Team Plays Syracuse in Syracuse 7:00 PM"],
    status:"planned",
    color: "bg-blue-800"
  },
  {
    id: "2025-09-25",
    date: "2025-09-25",
    title: "Clemson (ACC)",
    details: ["Team Plays Clemson in Clemson 7:00 PM"],
    status:"planned",
    color: "bg-blue-800"
  },
  {
    id: "2025-10-04",
    date: "2025-10-04",
    title: "Virginia Tech (ACC)",
    details: ["Team Plays Virginia Tech in Charlottesville 7:00 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-10-09",
    date: "2025-10-09",
    title: "California (ACC)",
    details: ["Team Plays California in Berkeley 6:30 PM"],
    status:"planned",
    color: "bg-blue-800"
  },
  {
    id: "2025-10-12",
    date: "2025-10-12",
    title: "Stanford (ACC)",
    details: ["Team Plays Stanford in Palo Alto 4:00 PM"],
    status:"planned",
    color: "bg-blue-800"
  },
  {
    id: "2025-10-18",
    date: "2025-10-18",
    title: "Louisville (ACC)",
    details: ["Team Plays Louisville in Louisville 5:00 PM"],
    status:"planned",
    color: "bg-blue-800"
  },
  {
    id: "2025-10-23",
    date: "2025-10-23",
    title: "FSU (ACC)",
    details: ["Team Plays FSU in Charlottesville 7:00 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-10-26",
    date: "2025-10-26",
    title: "Pittsburgh (ACC)",
    details: ["Team Plays Pittsburgh in Charlottesville 2:00 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-10-30",
    date: "2025-10-30",
    title: "Boston College (ACC)",
    details: ["Team Plays Boston College in Charlottesville 7:00 PM"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-11-02",
    date: "2025-11-02",
    title: "ACC Quarters",
    details: ["ACC Quarter Finals"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-11-06",
    date: "2025-11-06",
    title: "ACC Finals",
    details: ["ACC Championships"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-11-14",
    date: "2025-11-14",
    title: "NCAA First Round",
    details: ["NCAA First Round"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-11-21",
    date: "2025-11-21",
    title: "NCAA Second Round",
    details: ["NCAA Second Round"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-11-23",
    date: "2025-11-23",
    title: "NCAA Third Round",
    details: ["NCAA Third Round"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-11-28",
    date: "2025-11-28",
    title: "NCAA Quarter Final",
    details: ["NCAA Quarter Final"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-12-05",
    date: "2025-12-05",
    title: "College Cup",
    details: ["College Cup"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-12-06",
    date: "2025-12-06",
    title: "College Cup",
    details: ["College Cup"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-12-07",
    date: "2025-12-07",
    title: "College Cup",
    details: ["College Cup"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-12-08",
    date: "2025-12-08",
    title: "College Cup",
    details: ["College Cup"],
    status:"planned",
    color: "bg-orange-500"
  },
  {
    id: "2025-08-05",
    date: "2025-08-05",
    title: "Finish Collecting Data from Fall 2024",
    details: ["Finish the Data Collection and Data Storage From Fall 2024","Data visualization on pitch", "Voronoi Diagrams", "2D Top Down Diagrams", "Saved Timestamps From Games", "Passes, touches, tackles etc. CSV", "Make certain clips are saved modularly and is highly accessible"],
    status: "planned",
    color: "bg-yellow-600"
  },
  {
    id: "2025-08-12",
    date: "2025-08-12",
    title: "Summary of Findings from Fall 2024",
    details: ["Send to Coach Eilidh and Coach Swanson the findings from Fall 2024"],
    status: "planned",
    color: "bg-yellow-600"
  },
  {
    id: "2025-07-15",
    date: "2025-07-15",
    title: "Model Should be trained",
    details: ["Yolov12 model should be trained on the Soccer-v3 dataset","Need to start analyzing and evaluating our matches", "Begin to figure out how to build Voronoi Diagram, 2D diagram, Heat Map"],
    status: "planned",
    color: "bg-yellow-600"
  },
  {
    id: "2025-07-08",
    date: "2025-07-08",
    title: "Output from Model",
    details: ["The output from the Model should be defined: CSV's, Voronoi Diagram, Heat Map, 2D Perspective Should be kept in mind","Focus on making it clear how we can train or ask the model to achieve these goals", "Tailor our model's approach to these tasks"],
    status: "planned",
    color: "bg-yellow-600"
  },
  {
    id: "2025-07-11",
    date: "2025-07-11",
    title: "TENTATIVE Meeting Via Zoom with Professor Hartvigsen (and Coach Eilidh?)",
    details: ["Meet with Professor Hartvigsen and maybe Coach Eilidh Via zoom.","Talk about plans for the thesis, answering the right questions","overall approach","approach to research","approach to helping the Team"],
    status: "planned",
    color: "bg-yellow-600"
  },
  


];


/* ---------------------------------------------------------------
 * ThesisPage – mobile-first + dark-mode calendar
 * --------------------------------------------------------------*/
/******************************************************************
 * STATUS DOT COLOURS
 ******************************************************************/
const defaultDot: Record<ThesisUpdate['status'], string> = {
  done: 'bg-black',
  'in-progress': 'bg-gray-700',
  planned: 'bg-gray-500',
};

/******************************************************************
 * CALENDAR HELPERS
 ******************************************************************/
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthKey = (d: Date) =>
  d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

interface MonthBucket {
  year: number;
  monthIdx: number;
  offset: number;
  rows: (ThesisUpdate[])[][];
}

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function ensureAllMonths(
  map: Map<string, MonthBucket>,
  first: Date,
  last: Date,
) {
  const cur = new Date(first);
  cur.setDate(1);
  while (cur <= last) {
    const key = monthKey(cur);
    if (!map.has(key)) {
      const offset = (cur.getDay() + 6) % 7;
      map.set(key, {
        year: cur.getFullYear(),
        monthIdx: cur.getMonth(),
        offset,
        rows: [],
      });
    }
    cur.setMonth(cur.getMonth() + 1);
  }
}

function buildCalendar(list: ThesisUpdate[]): [string, MonthBucket][] {
  if (!list.length) return [];

  const map = new Map<string, MonthBucket>();

  // 1️⃣  create month buckets
  list.forEach(u => {
    const d = parseISODate(u.date);
    const key = monthKey(d);
    if (!map.has(key)) {
      const first = new Date(d.getFullYear(), d.getMonth(), 1);
      const offset = (first.getDay() + 6) % 7;
      map.set(key, { year: d.getFullYear(), monthIdx: d.getMonth(), offset, rows: [] });
    }
  });

  // 2️⃣  fill any gaps so months stay contiguous
  ensureAllMonths(map, parseISODate(list[0].date), parseISODate(list.at(-1)!.date));

  // 3️⃣  populate each bucket with rows of seven cells
  map.forEach(bucket => {
    const { year, monthIdx, offset } = bucket;
    const total = daysInMonth(year, monthIdx);
    let row: (ThesisUpdate[])[] = Array(offset).fill([]);

    for (let day = 1; day <= total; day++) {
      const iso = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      row.push(list.filter(u => u.date === iso));
      if (row.length === 7) {
        bucket.rows.push(row);
        row = [];
      }
    }
    if (row.length) {
      while (row.length < 7) row.push([]);
      bucket.rows.push(row);
    }
  });

  return [...map.entries()].sort(
    (a, b) =>
      new Date(a[1].year, a[1].monthIdx).getTime() -
      new Date(b[1].year, b[1].monthIdx).getTime(),
  );
}

/******************************************************************
 * COMPONENT
 ******************************************************************/
export default function ThesisPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const months = buildCalendar(updates);

  return (
    <section
      className="
        w-full px-4 md:px-8 py-10
        bg-white text-gray-900
        dark:bg-gray-900 dark:text-gray-100
        relative
      "
    >
      {/* ── overlay for dismissing pop-outs ─────────────────── */}
      {expanded && (
        <button
          aria-label="Close details"
          className="fixed inset-0 z-10 bg-black/30 dark:bg-black/60 cursor-pointer"
          onClick={() => setExpanded(null)}
        />
      )}

      {/* ── heading & narrative ─────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-12 relative z-20">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Thesis Overview
        </h1>

        <div className="flex flex-wrap gap-4 mb-4 text-sm sm:text-base">
          <Link
            href="https://docs.google.com/presentation/d/1gfgt_30JxTbR-H5-jgGlvBoFjbOOj7gfgjZlAc3u2-4/edit?usp=sharing"
            target="_blank"
            className="underline"
          >
            View slides ↗
          </Link>
          <Link
            href="https://www.overleaf.com/read/dnsqpdpxksmj#e5afbf"
            target="_blank"
            className="underline"
          >
            View Proposal ↗
          </Link>
        </div>

        {/* ------------- PARAGRAPHS – kept EXACTLY as supplied ------------- */}
        <p className="mb-4 underline">
          Currently Reading:
        </p>
        <div className="flexbox flex space-x-4 mb-4">
          <Link
            href="https://arxiv.org/pdf/2309.12067"
            target="_blank"
            className="text-gray"
          >
            SURVEY OF ACTION RECOGNITION, SPOTTING AND
            SPATIO-TEMPORAL LOCALIZATION IN SOCCER - CURRENT
            TRENDS AND RESEARCH PERSPECTIVES ↗
          </Link>
        </div>
        <p className="mb-4 underline">
          Previously Read:
        </p>
        <p className="mb-4 text-bold underline">
          Long Term Plan
        </p>
        <p className="mb-4">
          This work is broken into three parts.
        </p>
        <p className="mb-4">
          <strong>Phase 1 — Summer 2025.</strong> This work aims to build a deterministic computer-vision model that takes as input full- soccer match video and outputs well-structured data objects. See July 8th in the calendar below and the “Projects” tab above for concrete examples. The objective is to give Coach Eilidh and Coach Swanson data that is richer, more precisely annotated, and more user-friendly than anything currently available.
        </p>
        <p className="mb-4">
          <strong>Phase 2 — Fall 2025.</strong> Once the UVA Women’s team begins its season (Aug. 14), this phase intends to levrage the deterministic model against future opponents by capturing insights from how future opponents played against similarly ranked teams in the past. These reports will address three core questions:  
          “How is the opponent likely to play?”,  
          “Where will they try to create chances?”, and  
          “Where can we exploit weaknesses?”
          More information about these reports may be found in the calendar below.  
        </p>
        <p className="mb-4">
          <strong>Phase 3 — Spring 2026.</strong> The project concludes with a comprehensive presentation and written summary of our methods, results, and key insights.
        </p>
        <p className="mb-4">
          The calendar below outlines Phases 1 and 2. Day-to-day progress updates are available in the slide deck above.
        </p>
        {/* ----------------------------------------------------------------- */}
      </header>

      {/* ── calendar ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-20 relative z-20">
        {months.map(([label, bucket]) => (
          <article key={label} className="max-w-6xl mx-auto w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              {label}
            </h2>

            {/* weekday headers */}
            <div className="grid grid-cols-7 text-center text-[11px] sm:text-xs font-semibold">
              {WEEK_DAYS.map(d => (
                <div
                  key={d}
                  className="
                    h-8 sm:h-9 flex items-center justify-center
                    bg-black text-white
                    dark:bg-gray-700
                    border border-black dark:border-gray-600
                  "
                >
                  {d}
                </div>
              ))}
            </div>

            {/* scroll container so small screens don’t squash the grid */}
            <div className="overflow-x-auto">
              <div className="grid grid-cols-7">
                {bucket.rows.map((week, rIdx) =>
                  week.map((cell, cIdx) => {
                    const dateNum = rIdx * 7 + cIdx - bucket.offset + 1;
                    const valid =
                      dateNum > 0 &&
                      dateNum <= daysInMonth(bucket.year, bucket.monthIdx);
                    const iso = valid
                      ? `${bucket.year}-${String(bucket.monthIdx + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`
                      : '';
                    const open = expanded === iso;

                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className="h-24 sm:h-28 relative border border-black dark:border-gray-600"
                      >
                        {valid && (
                          <button
                            onClick={() => setExpanded(open ? null : iso)}
                            className="
                              w-full h-full text-left
                              p-1 sm:p-2
                              focus:outline-none
                              focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300
                            "
                          >
                            <span className="font-semibold text-[10px] sm:text-sm inline-block mb-1">
                              {dateNum}
                            </span>

                            {!open && cell.length > 0 && (
                              <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                                <span
                                  className={`
                                    inline-block h-1.5 w-1.5 rounded-full
                                    ${cell[0].color ?? defaultDot[cell[0].status]}
                                  `}
                                />
                                <span className="truncate flex-1 text-black/80 dark:text-gray-300">
                                  {cell[0].title}
                                </span>
                              </div>
                            )}
                          </button>
                        )}

                        {open && (
                          <div
                            onClick={e => e.stopPropagation()}
                            className="
                              absolute z-30 left-1/2 -translate-x-1/2
                              top-full mt-2
                              w-64 sm:w-72
                              max-h-80 overflow-auto
                              bg-white dark:bg-gray-800
                              border border-black dark:border-gray-600
                              shadow-xl rounded-lg
                              p-4
                              scrollbar-thin dark:scrollbar-thumb-gray-600
                            "
                          >
                            <h3 className="font-bold mb-2">
                              {parseISODate(iso).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </h3>
                            <ul className="space-y-3 text-[11px] sm:text-xs">
                              {cell.map(u => (
                                <li key={u.id}>
                                  <p className="font-medium flex items-center gap-2 mb-1">
                                    <span
                                      className={`
                                        inline-block h-2 w-2 rounded-full
                                        ${u.color ?? defaultDot[u.status]}
                                      `}
                                    />
                                    {u.title}
                                  </p>
                                  <ul className="list-disc ml-5 space-y-1 text-black/70 dark:text-gray-300 text-[10px] sm:text-xs">
                                    {u.details.map((d, i) => (
                                      <li key={i}>{d}</li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  }),
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
