"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ChatIcon } from "./icons";

export interface LinkItem {
  id: string;
  category: string;
  title: string;
  url: string;
  note: string | null;
  poster_name: string | null;
  likes: number;
  dislikes: number;
  myVote: number | null; // 1, -1, or null
}

export default function LinkCard({ item, userId }: { item: LinkItem; userId: string | null }) {
  const [likes, setLikes] = useState(item.likes);
  const [dislikes, setDislikes] = useState(item.dislikes);
  const [myVote, setMyVote] = useState<number | null>(item.myVote);
  const [busy, setBusy] = useState(false);

  async function vote(value: 1 | -1) {
    if (!userId || busy) return;
    setBusy(true);

    try {
      if (myVote === value) {
        // Clicking the same vote again removes it
        await supabase.from("votes").delete().eq("link_id", item.id).eq("user_id", userId);
        setMyVote(null);
        value === 1 ? setLikes((n) => n - 1) : setDislikes((n) => n - 1);
      } else {
        await supabase.from("votes").upsert(
          { link_id: item.id, user_id: userId, value },
          { onConflict: "link_id,user_id" }
        );
        if (myVote === 1) setLikes((n) => n - 1);
        if (myVote === -1) setDislikes((n) => n - 1);
        value === 1 ? setLikes((n) => n + 1) : setDislikes((n) => n + 1);
        setMyVote(value);
      }
    } catch (err) {
      console.error("Vote failed", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="link-card" style={{ cursor: "default" }}>
      <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="lc-icon">
          <ChatIcon size={17} />
        </div>
        <b>{item.title}</b>
        {item.note && <span className="note">{item.note}</span>}
        <span className="url">{item.url}</span>
        <span className="poster">posted by {item.poster_name || "someone"}</span>
      </a>
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <button
          onClick={() => vote(1)}
          disabled={!userId || busy}
          style={{
            display: "flex", alignItems: "center", gap: 5, border: "1.5px solid var(--line)",
            background: myVote === 1 ? "var(--mint-soft)" : "transparent",
            color: myVote === 1 ? "#0E8E75" : "var(--text-dim)",
            borderRadius: 999, padding: "4px 10px", fontSize: "0.76rem", fontWeight: 700, cursor: userId ? "pointer" : "default",
          }}
        >
          ▲ {likes}
        </button>
        <button
          onClick={() => vote(-1)}
          disabled={!userId || busy}
          style={{
            display: "flex", alignItems: "center", gap: 5, border: "1.5px solid var(--line)",
            background: myVote === -1 ? "var(--coral-soft)" : "transparent",
            color: myVote === -1 ? "#B8461F" : "var(--text-dim)",
            borderRadius: 999, padding: "4px 10px", fontSize: "0.76rem", fontWeight: 700, cursor: userId ? "pointer" : "default",
          }}
        >
          ▼ {dislikes}
        </button>
      </div>
    </div>
  );
}
