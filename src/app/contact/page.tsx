"use client";

import React, { useMemo, useState } from "react";
import { Phone, Mail, MapPin, Info, Search, Filter, Copy, Skull, Heart, ArrowLeft, ChevronLeft } from "lucide-react";
import { SAMPLE_FAMILY } from "../../constant";
import Image from "next/image";

// If you already exported types from your constants file, you can import them instead
// Re-declaring here for isolation
export type Gender = "M" | "F" | "U";
export type LifeStatus = "alive" | "deceased" | "unknown";
export interface Person {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  gender: Gender;
  lifeStatus?: LifeStatus;
  birthDate?: string;
  deathDate?: string;
  address?: string;
  notes?: string;
  avatarUrl?: string;
  grave?: {
    city?: string;
    cemetery?: string;
    section?: string;
    location?: string; // GPS or row/plot — can be used as "grave no"
    notes?: string;
  };
  spouseIds?: string[];
  parentIds?: string[];
}

// Optional: a separate map for contacts so you don't have to modify your Person interface immediately.
// You can move phone/email directly into Person later if desired.
const CONTACTS: Record<string, { phone?: string; email?: string }> = {
  // examples — add real ones as you have them
  "hassan-abbas": { phone: "0300 2196569 ", email: "hajaffrey@gmail.com" },
  "ghayas-ali":{ phone: "+92 300 2661456", email: "ghayas110@gmail.com" },
  "kisa-mubarka": { phone: "+92 314 2087091", email: "zehrariz531@gmail.com" },
  "messam": { phone: "03357586707", email: "measumhasan27@gmail.com" },
  "lubaba": { phone: "03001234567", email:"measumhasan27@gmail.com" },
  "akbar": { phone: "03001234567", email:"measumhasan27@gmail.com" },
  "azra": { phone: "03001234567", email:"measumhasan27@gmail.com" },
  "Imran": { phone: "03318922637", email:"simranhz1973@gmail.com" },
  "jawad-mushir":{phone: "03322379912", email:"jawwadprkhi@gmail.com"},
  "nida":{phone: "0470527985", email:"Nidazehra93@gmail.com"},
  "faheem-mushir":{phone: "03414446665", email:"faheem.mushir@gmail.com"},
  "kumail":{phone: "+15138889153", email:"Kumailjafre@gmail.com"},
  "kaneez-fatima":{phone: "03340003163", email:"afsheenjaffri@hotmail.com"},
  "kamran-mushir":{phone: "03002778817", email:"kamran.mushir@gmail.com"},
  "abid":{phone: "03361156234", email:"Smabid17@gmail.com "},
  "dilawar":{phone: "03339127478", email:"dilawarbaqir@gmail.com"},
  "fozia":{phone: "03339127478", email:"foziadilawar@gmail.com"},
  "abiha-dilawar":{phone: "03339127478", email:"dilawarbaqir@gmail.com"},
  "abbas-dilawar":{phone: "03339127478", email:"dilawarbaqir@gmail.com"},
  "hussain-dilawar":{phone: "03339127478", email:"dilawarbaqir@gmail.com"},
  "tahira-abbas":{phone: "0434625727", email:"shandarabbas@hotmail.com"},
  "shandar-abbas":{phone: "0434625727", email:"shandarabbas@hotmail.com"},
  "mohsin-abbas":{phone: "0469828603", email:"mohsinabbas782@gmail.com"},
  "naseem-abbas":{phone: "03333441618", email:"naseemabbas782@gmail.com"},
  "hilal":{phone: "0470488304", email:"Hilal0208@live.com"},
  "komal":{phone: "+971585446206", email:"komalzehra24@gmail.com"},
  "sajjad":{phone: "+971507909469", email:"Sajjadahmad.sa@gmail.com"},
  "abis":{phone: "+971507909469", email:"komalzehra24@gmail.com"},
  "joan":{phone: "+971507909469", email:"joan@gmail.com"},
  "sani":{phone: "0416145683", email:"ezehrasani@gmail.com"},
  "mehdi":{phone: "+61405851852", email:"mehdiabidi254@gmail.com"},
  "naqi":{phone: "0416145683", email:"naqi.mehr@gmail.com"},
  "iqtida-mehdi-miqdad":{phone: "03331303899", email:"siqtida@gmail.com"},
  "naveed-abbas":{phone: "03001234567", email:"naveed@gmail.com"},
  "shoa-zehra":{phone: "9825192110", email:"shoazehra110@gmail.com"},
  "sidra":{phone: "03353389880", email:"syedasidra192@gmail.com "},
  "uzma":{phone: "03335355128", email:"Suzehra173@gmail.com"},
  "amira-haider":{phone: "03367078024", email:"amira.haider@gmail.com"},
  "mustafa-haider":{phone: "03007078024", email:"mustafa.haider@gmail.com"}
};

/** Helpers */
function clsx(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function getDisplayName(p?: Person | null) {
  if (!p) return "Unknown";
  return p.displayName || [p.firstName, p.lastName].filter(Boolean).join(" ") || p.id;
}

function isRTL(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

function lifeBadge(status?: LifeStatus) {
  switch (status) {
    case "alive":
      return { label: "Alive", color: "bg-emerald-100 text-emerald-700", icon: <Heart className="h-3.5 w-3.5" /> };
    case "deceased":
      return { label: "Deceased", color: "bg-rose-100 text-rose-700", icon: <Skull className="h-3.5 w-3.5" /> };
    default:
      return { label: "Unknown", color: "bg-slate-100 text-slate-600", icon: <Info className="h-3.5 w-3.5" /> };
  }
}

function copy(text: string) {
  try {
    navigator.clipboard?.writeText(text);
  } catch {}
}

/** Search + filter */
function matchesQuery(p: Person, q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const contact = CONTACTS[p.id] || {};
  const hay = [
    getDisplayName(p),
    p.address,
    p.grave?.city,
    p.grave?.cemetery,
    p.grave?.section,
    p.grave?.location,
    (contact.phone || (p as any).phone),
    (contact.email || (p as any).email),
  ]
    .filter(Boolean)
    .map((s) => (s as string).toLowerCase());
  return hay.some((s) => s.includes(needle));
}

if (process.env.NODE_ENV !== "production") {
  // Tiny sanity tests for matchesQuery
  const sample = {
    id: "x",
    displayName: "Ali Raza",
    gender: "M",
    lifeStatus: "alive",
    address: "Karachi, Pakistan",
  } as Person;
  CONTACTS["x"] = { phone: "+92 300 1234567", email: "ali@example.com" };
  console.assert(matchesQuery(sample, "ali"), "Should match name");
  console.assert(matchesQuery(sample, "karachi"), "Should match address");
  console.assert(matchesQuery(sample, "1234"), "Should match phone");
  console.assert(!matchesQuery(sample, "nope"), "Should not match unrelated text");
}

/** Row/Card for a person */
function Entry({ person }: { person: Person }) {
  const name = getDisplayName(person);
  const rtl = isRTL(name);
  const badge = lifeBadge(person.lifeStatus);
  const contact = CONTACTS[person.id] || ({} as { phone?: string; email?: string });
  const phone = contact.phone || (person as any).phone;
  const email = contact.email || (person as any).email;

  const isDead = person.lifeStatus === "deceased";
  const deathCity = (person as any).deathCity || person.grave?.city; // if you later add deathCity, it'll appear here

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {person.avatarUrl ? (
              // If you have avatar URLs, use them. Otherwise, you can use initials or a placeholder image.
             <Image
                        src={`/family/${person.avatarUrl}`} // ensure files live in /public/family/*
                        alt={name}
                        width={40}
                        height={40}
                        className="relative h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
                      
                      />
            ) : (
            null
            )}
            <h3
              className={clsx("truncate text-base font-semibold text-slate-900", rtl && "rtl")}
              style={rtl ? ({ direction: "rtl" } as React.CSSProperties) : undefined}
              title={name}
            >
              {name}
            </h3>
            <span className={clsx("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", badge.color)}>
              {badge.icon}
              {badge.label}
            </span>
          </div>

          {!isDead ? (
            <div className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="h-4 w-4 text-slate-500" />
                {phone ? (
                  <button onClick={() => copy(phone)} className="truncate hover:underline" title="Copy phone">
                    {phone}
                  </button>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="h-4 w-4 text-slate-500" />
                {email ? (
                  <a href={`mailto:${email}`} className="truncate hover:underline">
                    {email}
                  </a>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </div>
              <div className="col-span-full flex items-center gap-2 text-slate-700">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="truncate">{person.address || <span className="text-slate-400">—</span>}</span>
              </div>
            </div>
          ) : (
            <div className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Info className="h-4 w-4 text-slate-500" />
                <span>Death Date: {person.deathDate || <span className="text-slate-400">—</span>}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span>City of Death: {deathCity || <span className="text-slate-400">—</span>}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span>Cemetery: {person.grave?.cemetery || <span className="text-slate-400">—</span>}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span>
                  Grave No / Location: {person.grave?.location || person.grave?.section || <span className="text-slate-400">—</span>}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {person.notes && (
        <p className="mt-2 line-clamp-3 text-sm text-slate-700">
          <span className="inline-flex items-center gap-1 font-medium text-slate-900">
            <Info className="h-4 w-4" /> Notes:
          </span>{" "}
          {person.notes}
        </p>
      )}
    </div>
  );
}

export default function PhoneBookPage() {
  const persons = useMemo(() => Object.values(SAMPLE_FAMILY.persons) as Person[], []);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "alive" | "deceased">("all");

  const filtered = useMemo(() => {
    return persons
      .filter((p) => (status === "all" ? true : p.lifeStatus === status))
      .filter((p) => matchesQuery(p, q))
      .sort((a, b) => getDisplayName(a).localeCompare(getDisplayName(b)));
  }, [persons, q, status]);

  const aliveCount = persons.filter((p) => p.lifeStatus === "alive").length;
  const deceasedCount = persons.filter((p) => p.lifeStatus === "deceased").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            aria-label="Go back"
            className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1 text-sm shadow-sm hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>

        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Family PhoneBook</h1>
          <p className="mt-1 text-sm text-slate-600">Search, filter, and view contact details for living members or burial details for deceased members.</p>
        </div>

        {/* Search */}
        <div className="w-full sm:w-96">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-sky-200 focus:ring"
              placeholder="Search by name, phone, email, city, cemetery…"
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="inline-flex items-center gap-1 text-slate-600"><Filter className="h-4 w-4" /> Status:</span>
        <div className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white p-1">
          <button onClick={() => setStatus("all")} className={clsx("rounded-lg px-3 py-1.5", status === "all" ? "bg-slate-100 font-medium" : "hover:bg-slate-50")}>All ({persons.length})</button>
          <button onClick={() => setStatus("alive")} className={clsx("rounded-lg px-3 py-1.5", status === "alive" ? "bg-slate-100 font-medium" : "hover:bg-slate-50")}>Alive ({aliveCount})</button>
          <button onClick={() => setStatus("deceased")} className={clsx("rounded-lg px-3 py-1.5", status === "deceased" ? "bg-slate-100 font-medium" : "hover:bg-slate-50")}>Deceased ({deceasedCount})</button>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-3 text-xs text-slate-500">Showing <span className="font-medium">{filtered.length}</span> of {persons.length} people{q && <> for query <span className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[11px]">{q}</span></>}.</div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-600">No matching people. Try different keywords or clear filters.</div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Entry key={p.id} person={p} />
          ))}
        </div>
      )}

      <footer className="mt-10 space-y-2 text-xs text-slate-500">
        <p>
          Tip: add phone/email to the <code>CONTACTS</code> map in this file or extend your <code>Person</code> type and populate <code>SAMPLE_FAMILY</code> directly.
        </p>
        <p>
          City of Death currently uses <code>person.grave.city</code> if no explicit <code>deathCity</code> is provided. If you want a distinct field, I can add <code>deathCity</code> to <code>Person</code>.
        </p>
      </footer>
    </div>
  );
}
