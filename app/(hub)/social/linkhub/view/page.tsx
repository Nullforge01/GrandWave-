"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import SocialTopNav from "@/components/SocialTopNav";
import LinkCard, { LinkItem } from "@/components/LinkCard";

const CATEGORIES = ["Channel", "TikTok", "Business", "Advertising", "Entertainment", "Social"];

export default function SocialViewPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    setUserId(user?.id ?? null);

    const { data: linkRows, error: linkErr } = await supabase
      .from("links")
      .select("id, category, title, url, note, poster_name")
      .order("created_at", { ascending: false });

    const { data: voteRows, error: voteErr } = await supabase
      .from("votes")
      .select("link_id, user_id, value");

    if (linkErr || voteErr) {
      console.error(linkErr || voteErr);
      setLoading(false);
      return;
    }

    const merged: LinkItem[] = (linkRows || []).map((l) => {
      const votesForLink = (voteRows || []).filter((v) => v.link_id === l.id);
      const likes = votesForLink.filter((v) => v.value === 1).length;
      const dislikes = votesForLink.filter((v) => v.value === -1).length;
      const mine = votesForLink.find((v) => v.user_id === user?.id);
      return { ...l, likes, dislikes, myVote: mine ? mine.value : null };
    });

    setLinks(merged);
    setLoading(false);
  }

  return (
    <div>
      <SocialTopNav />
      <div className="content">
        <div className="page-head">
          <h1>Social — LinkHub</h1>
          <p>
            Every link the GrandWave community has posted, organized by Channel, TikTok,
            Business, Advertising, Entertainment, and Social.
          </p>
        </div>

        {loading && <p style={{ color: "var(--text-dim)" }}>Loading…</p>}

        {!loading &&
          CATEGORIES.map((cat) => {
            const items = links.filter((l) => l.category === cat);
            return (
              <div className="cat-block" key={cat}>
                <div className="cat-head">
                  <h2>{cat}</h2>
                  <span className="cat-count">
                    · {items.length} link{items.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="link-grid">
                  {items.length ? (
                    items.map((item) => <LinkCard key={item.id} item={item} userId={userId} />)
                  ) : (
                    <div className="empty-slot">
                      No links here yet
                      <br />
                      <span>Be the first to add one</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
