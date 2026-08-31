"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { WaveIcon, PlugIcon, FilmIcon, LinkIcon, CheckIcon, MapIcon } from "./icons";

const NAV = [
  { label: "Tech", href: "/tech", Icon: PlugIcon, enabled: false },
  { label: "Entertainment", href: "/entertainment", Icon: FilmIcon, enabled: false },
  { label: "Social", href: "/social", Icon: LinkIcon, enabled: true },
  { label: "Productivity", href: "/productivity", Icon: CheckIcon, enabled: false },
  { label: "Local", href: "/local", Icon: MapIcon, enabled: false },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <WaveIcon size={17} color="white" />
        </div>
        GrandWave
      </div>

      <div className="nav-group">
        <div className="nav-label">Categories</div>
        {NAV.map(({ label, href, Icon, enabled }) => {
          if (!enabled) {
            return (
              <div key={label} className="nav-item disabled">
                <Icon size={16} />
                {label}
                <span className="soon-badge">SOON</span>
              </div>
            );
          }
          const active = pathname.startsWith(href);
          return (
            <Link key={label} href={href} className={`nav-item ${active ? "active" : ""}`}>
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </div>

      <button
        onClick={handleSignOut}
        style={{ marginTop: "auto", background: "none", border: "none", color: "var(--text-dim)", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", textAlign: "left", padding: "8px 10px" }}
      >
        Sign out
      </button>
    </aside>
  );
}
