"use client";

import Link from "next/link";
import { PlugIcon, FilmIcon, LinkIcon, CheckIcon, MapIcon } from "@/components/icons";

const CATEGORY_CARDS = [
  { label: "Tech", desc: "Apiverse, Imagine AI, and more.", Icon: PlugIcon, enabled: false },
  { label: "Entertainment", desc: "Movie finder, movie bracket, and more.", Icon: FilmIcon, enabled: false },
  { label: "Social", desc: "LinkHub Pro — all your links, one place.", Icon: LinkIcon, enabled: true, href: "/social" },
  { label: "Productivity", desc: "Weather, tasks, and more.", Icon: CheckIcon, enabled: false },
  { label: "Local", desc: "City guides and local links.", Icon: MapIcon, enabled: false },
];

export default function HomePage() {
  return (
    <div className="content">
      <div className="page-head">
        <h1>Welcome to GrandWave</h1>
        <p>One friendly hub for everything mighty. Pick a category to get started.</p>
      </div>

      <div className="link-grid">
        {CATEGORY_CARDS.map(({ label, desc, Icon, enabled, href }) => {
          const card = (
            <div className="link-card" style={{ opacity: enabled ? 1 : 0.6, cursor: enabled ? "pointer" : "default" }}>
              <div className="lc-icon">
                <Icon size={17} />
              </div>
              <b>{label}</b>
              <span className="note">{desc}</span>
              {!enabled && <span className="poster">Coming soon</span>}
            </div>
          );
          return enabled && href ? (
            <Link key={label} href={href} style={{ textDecoration: "none" }}>
              {card}
            </Link>
          ) : (
            <div key={label}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
