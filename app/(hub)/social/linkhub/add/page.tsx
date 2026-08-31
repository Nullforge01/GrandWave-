"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SocialTopNav from "@/components/SocialTopNav";

const CATEGORIES = ["Channel", "TikTok", "Business", "Advertising", "Entertainment", "Social"];

export default function AddLinkPage() {
  const router = useRouter();
  const [category, setCategory] = useState("Social");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!title.trim() || !url.trim()) return;
    setSubmitting(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You need to be signed in to post a link.");
      setSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from("links").insert({
      category,
      title,
      url,
      note: note || null,
      poster_id: user.id,
      poster_name: user.email,
    });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
    } else {
      router.push("/social/linkhub/view");
    }
  }

  return (
    <div>
      <SocialTopNav />
      <div className="content">
        <div className="page-head">
          <h1>Add a link</h1>
          <p>Submit your channel, page, or link to be featured on GrandWave — free for now.</p>
        </div>
        <div className="form-card">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. My WhatsApp Channel" />

          <label>Link URL</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />

          <label>Short note (optional)</label>
          <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="What is this link about?" />

          {error && (
            <div style={{ color: "#D9503F", fontSize: "0.8rem", fontWeight: 600, marginBottom: 12 }}>
              {error}
            </div>
          )}

          <button className="btn" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Posting…" : "Post link"}
          </button>
          <div className="form-note">
            Posted links appear publicly on the View links tab for everyone using GrandWave.
          </div>
        </div>
      </div>
    </div>
  );
  
