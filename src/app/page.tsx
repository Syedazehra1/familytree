"use client";

import React, { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, Heart, Baby, Home, MapPin, Info } from "lucide-react";
import { SAMPLE_FAMILY } from "../constant";

type Gender = "M" | "F" | "U"; // Male, Female, Unknown
type LifeStatus = "alive" | "deceased" | "unknown";

export interface Person {
  id: string; // unique key you will reference from Excel
  firstName?: string;
  lastName?: string;
  displayName?: string; // optional: for bilingual or custom display like "Khadim Hussain خادم حسین"
  gender: Gender;
  lifeStatus?: LifeStatus;
  birthDate?: string;
  deathDate?: string;
  address?: string; // current or last address
  notes?: string;
  avatarUrl?: string;
  // If deceased, optional grave info
  grave?: {
    city?: string;
    cemetery?: string;
    section?: string;
    location?: string; // GPS or row/plot
    notes?: string;
  };
  spouseIds?: string[]; // all spouses (husband/wife)
  parentIds?: string[]; // usually [fatherId, motherId] when known
  /** Birth order among siblings of the SAME two parents: 1 = eldest */
  orderId?: number;
}

export interface FamilyTree {
  rootId: string; // family head to start from
  persons: Record<string, Person>;
}

/* =========================
   Utils
========================= */

function clsx(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function getDisplayName(p?: Person | null) {
  if (!p) return "Unknown";
  return p.displayName || [p.firstName, p.lastName].filter(Boolean).join(" ") || p.id;
}

function isRTL(text: string) {
  // rudimentary RTL check for Arabic/Urdu characters
  return /[\u0600-\u06FF]/.test(text);
}

function lifeBadge(status?: LifeStatus) {
  switch (status) {
    case "alive":
      return { label: "Alive", color: "bg-emerald-100 text-emerald-700" };
    case "deceased":
      return { label: "Deceased", color: "bg-rose-100 text-rose-700" };
    default:
      return { label: "Unknown", color: "bg-slate-100 text-slate-600" };
  }
}

/** Sort: first by orderId (if present), else by display name */
function sortByOrderThenName(a: Person, b: Person) {
  const oa = a.orderId ?? Number.POSITIVE_INFINITY;
  const ob = b.orderId ?? Number.POSITIVE_INFINITY;
  if (oa !== ob) return oa - ob;
  return getDisplayName(a).localeCompare(getDisplayName(b));
}

/** Defensive normalizer: splits comma-joined parentIds, drops missing refs, and makes spouse links symmetric */
type NormalizeResult = { tree: FamilyTree; warnings: string[] };

function normalizeFamilyTree(raw: FamilyTree): NormalizeResult {
  const warnings: string[] = [];
  const persons: Record<string, Person> = {};

  // Copy and force each person's id to match its key
  for (const [key, person] of Object.entries(raw.persons)) {
    const p: Person = { ...person, id: key };

    // Fix parentIds like ["a, b"] -> ["a","b"]
    if (p.parentIds && p.parentIds.length === 1 && p.parentIds[0]?.includes(",")) {
      const split = p.parentIds[0]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      p.parentIds = split;
      warnings.push(`Split comma-joined parentIds for ${key}: [${split.join(", ")}]`);
    }

    persons[key] = p;
  }

  const exists = (id: string) => id in persons;

  // Clean references and ensure spouse symmetry
  for (const [key, p] of Object.entries(persons)) {
    if (p.spouseIds) {
      p.spouseIds = p.spouseIds.filter((sid) => {
        if (!exists(sid)) {
          warnings.push(`Missing spouse '${sid}' referenced by '${key}' — removed`);
          return false;
        }
        return true;
      });
    }
    if (p.parentIds) {
      p.parentIds = p.parentIds.filter((pid) => {
        if (!exists(pid)) {
          warnings.push(`Missing parent '${pid}' referenced by '${key}' — removed`);
          return false;
        }
        return true;
      });
    }
  }

  // Spouse symmetry pass (after cleaning)
  for (const [key, p] of Object.entries(persons)) {
    for (const sid of p.spouseIds || []) {
      const s = persons[sid];
      s.spouseIds ??= [];
      if (!s.spouseIds.includes(key)) s.spouseIds.push(key);
    }
  }

  return { tree: { rootId: raw.rootId, persons }, warnings };
}

/* =========================
   Relationship helpers
========================= */

function childrenOfCouple(data: FamilyTree, aId: string, bId: string) {
  const { persons } = data;
  const res: Person[] = [];
  for (const p of Object.values(persons)) {
    const parents = p.parentIds || [];
    if (parents.includes(aId) && parents.includes(bId)) res.push(p);
  }
  return res.sort(sortByOrderThenName);
}

function spousesOf(person: Person, data: FamilyTree): Person[] {
  const ids = person.spouseIds || [];
  return ids.map((id) => data.persons[id]).filter(Boolean);
}

function childrenOf(person: Person, data: FamilyTree): Person[] {
  // Any child having this person among parentIds
  const res: Person[] = [];
  for (const p of Object.values(data.persons)) {
    const parents = p.parentIds || [];
    if (parents.includes(person.id)) res.push(p);
  }
  return res.sort(sortByOrderThenName);
}

/* =========================
   UI Components
========================= */

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", className)}>
      {children}
    </span>
  );
}

function PersonCard({
  person,
  onClick,
  emphasize = false,
}: {
  person: Person;
  onClick?: () => void;
  emphasize?: boolean;
}) {
  const name = getDisplayName(person);
  const rtl = isRTL(name);
  const badge = lifeBadge(person.lifeStatus);
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative w-full text-left",
        "rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md",
        emphasize ? "border-sky-300 ring-2 ring-sky-200" : "border-slate-200"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100" aria-hidden>
          {/* Avatar placeholder; wire up person.avatarUrl if available */}
          {person.avatarUrl ? <img src={person.avatarUrl} alt="" className="h-full w-full object-cover" />:
                    <div className="h-full w-full flex items-center justify-center text-slate-400">👤</div>

          }
          <div className="h-full w-full flex items-center justify-center text-slate-400">👤</div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={clsx("truncate text-base font-semibold text-slate-900", rtl && "rtl")}
              style={rtl ? ({ direction: "rtl" } as React.CSSProperties) : undefined}
              title={name}
            >
              {name}
            </h3>
            <Badge className={badge.color}>{badge.label}</Badge>
          </div>
          <div className="mt-1 text-sm text-slate-600 flex flex-wrap items-center gap-3">
            {person.address && (
              <span className="inline-flex items-center gap-1">
                <Home className="h-4 w-4" />
                {person.address}
              </span>
            )}
            {person.grave?.city && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Grave: {person.grave.city}
                {person.grave.cemetery ? `, ${person.grave.cemetery}` : ""}
              </span>
            )}
          </div>
          {person.notes && (
            <p className="mt-2 line-clamp-2 text-sm text-slate-700">
              <span className="inline-flex items-center gap-1 font-medium text-slate-900">
                <Info className="h-4 w-4" />
                Notes:
              </span>{" "}
              {person.notes}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {icon} <span>{title}</span>
      </div>
      {children}
    </section>
  );
}

/* =========================
   Page Component
========================= */

export default function FamilyTreePage() {
  // Normalize your imported dataset once
  const { tree: NORMALIZED_FAMILY, warnings } = useMemo(() => normalizeFamilyTree(SAMPLE_FAMILY), []);
  useEffect(() => {
    if (warnings.length) console.warn("[FamilyTree warnings]", warnings);
  }, [warnings]);

  const [data, setData] = useState<FamilyTree>(NORMALIZED_FAMILY);

  // Explorer state
  const [currentId, setCurrentId] = useState<string>(data.rootId);
  const current = data.persons[currentId];
  const [selectedSpouseId, setSelectedSpouseId] = useState<string | null>(null);
  const selectedSpouse = selectedSpouseId ? data.persons[selectedSpouseId] : null;
  const [showSpouses, setShowSpouses] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const [path, setPath] = useState<string[]>([data.rootId]); // breadcrumb of person IDs

  // Search
  const [q, setQ] = useState("");
  const matches = useMemo(() => {
    if (!q.trim()) return [] as Person[];
    const needle = q.toLowerCase();
    return Object.values(data.persons)
      .filter((p) => getDisplayName(p).toLowerCase().includes(needle))
      .slice(0, 8);
  }, [q, data]);

  useEffect(() => {
    // Auto-open spouse pane when navigating into a person
    if (!current) return;
    setShowSpouses(true);
    setSelectedSpouseId(null);
    setShowChildren(false);
  }, [currentId]);

  const spouses = useMemo(() => (current ? spousesOf(current, data) : []), [current, data]);
  const coupleChildren = useMemo(() => {
    if (!current || !selectedSpouse) return [] as Person[];
    return childrenOfCouple(data, current.id, selectedSpouse.id);
  }, [current, selectedSpouse, data]);

  function goToPerson(p: Person) {
    setCurrentId(p.id);
    setPath((prev) => (prev[prev.length - 1] === p.id ? prev : [...prev, p.id]));
  }

  function goBackTo(index: number) {
    const targetId = path[index];
    setPath((prev) => prev.slice(0, index + 1));
    setCurrentId(targetId);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 bg-white">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Khadim Hussain Family Tree</h1>
        </div>
        <div className="w-full sm:w-80">
          <div className="relative">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
              placeholder="Search name (English/Urdu)…"
            />
            {q && matches.length > 0 && (
              <div className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                {matches.map((p) => (
                  <div
                    key={p.id}
                    className="cursor-pointer rounded-lg px-2 py-1.5 text-sm hover:bg-slate-50"
                    onClick={() => {
                      setQ("");
                      goToPerson(p);
                    }}
                  >
                    {getDisplayName(p)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {path.map((pid, i) => {
          const p = data.persons[pid];
          return (
            <React.Fragment key={pid}>
              {i > 0 && <ChevronRight className="h-4 w-4 text-slate-400" />}
              <button
                className={clsx("rounded-lg px-2 py-1", i === path.length - 1 ? "bg-slate-100 font-medium" : "hover:bg-slate-50")}
                onClick={() => goBackTo(i)}
              >
                {getDisplayName(p)}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Current person */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PersonCard person={current} emphasize />
        {selectedSpouse && <PersonCard person={selectedSpouse} />}
      </div>

      {/* Spouses */}
      <Section title="Spouse(s)" icon={<Heart className="h-4 w-4" />}>
        <div className="flex items-center gap-3">
       
        </div>
        {showSpouses && (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {spouses.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">No spouse data.</div>
            )}
            {spouses.map((s) => (
              <div
                key={s.id}
                className={clsx(selectedSpouseId === s.id && "ring-2 ring-sky-200 rounded-2xl")}
                onClick={() => {
                  setSelectedSpouseId(s.id);
                  setShowChildren(false);
                }}
              >
                <PersonCard person={s} />
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Children of selected couple */}
      <Section title="Children" icon={<Baby className="h-4 w-4" />}>
        <div className="flex items-center gap-3">
          <button
            disabled={!selectedSpouse}
            className={clsx(
              "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm",
              selectedSpouse ? "border-slate-300 bg-white hover:bg-slate-50" : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
            )}
            onClick={() => setShowChildren((v) => !v)}
          >
            {showChildren ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}{" "}
            {showChildren ? "Hide" : "Show"} children of this couple
          </button>
          {!selectedSpouse && <span className="text-xs text-slate-500">Select a spouse first.</span>}
        </div>

        {showChildren && selectedSpouse && (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {coupleChildren.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                No children recorded for this couple.
              </div>
            )}
            {coupleChildren.map((child) => (
              <div key={child.id} onClick={() => goToPerson(child)}>
                <PersonCard person={child} />
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Sidebar: Quick list of siblings (same parents) & immediate children */}
      <aside className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Users className="h-4 w-4" /> Siblings
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {(() => {
              // Siblings: people sharing any parent with current (simple approach)
              const sibs = Object.values(data.persons)
                .filter((p) => p.id !== current.id)
                .filter((p) => (p.parentIds || []).some((pid) => (current.parentIds || []).includes(pid)))
                .sort(sortByOrderThenName);
              if (sibs.length === 0) return <div className="text-sm text-slate-500">None recorded.</div>;
              return sibs.map((p) => (
                <button
                  key={p.id}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50"
                  onClick={() => goToPerson(p)}
                >
                  {getDisplayName(p)}
                </button>
              ));
            })()}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Users className="h-4 w-4" /> Children (any spouse)
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {(() => {
              const kids = childrenOf(current, data);
              if (kids.length === 0) return <div className="text-sm text-slate-500">None recorded.</div>;
              return kids.map((p) => (
                <button
                  key={p.id}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50"
                  onClick={() => goToPerson(p)}
                >
                  {getDisplayName(p)}
                </button>
              ));
            })()}
          </div>
        </div>
      </aside>
    </div>
  );
}
