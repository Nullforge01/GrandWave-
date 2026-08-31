"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { WaveIcon } from "@/components/icons";

type Mode = "password" | "magic";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push("/");
    });
  }, [router]);

  async function handlePasswordSubmit() {
    setError(null);
    setStatus(null);
    if (!email.trim() || !password.trim()) return;
    setLoading(true);

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (isSignUp) {
      setStatus("Account created — check your email to confirm, then sign in.");
    } else {
      router.push("/");
    }
  }

  async function handleMagicLink() {
    setError(null);
    setStatus(null);
    if (!email.trim()) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({ email });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setStatus("Check your email for the magic link.");
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-mark">
          <WaveIcon size={20} color="white" />
        </div>
        <h1>Welcome to GrandWave</h1>
        <p>Sign in to view and post links.</p>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {mode === "password" && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
          />
        )}

        {error && (
          <div style={{ color: "#D9503F", fontSize: "0.8rem", fontWeight: 600, marginBottom: 10 }}>
            {error}
          </div>
        )}
        {status && (
          <div style={{ color: "#0E8E75", fontSize: "0.8rem", fontWeight: 600, marginBottom: 10 }}>
            {status}
          </div>
        )}

        {mode === "password" ? (
          <>
            <button className="btn" style={{ width: "100%" }} onClick={handlePasswordSubmit} disabled={loading}>
              {loading ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}
            </button>
            <div className="login-note">
              <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(!isSignUp); setError(null); setStatus(null); }}>
                {isSignUp ? "Already have an account? Sign in" : "New here? Create an account"}
              </a>
              <br /><br />
              <a href="#" onClick={(e) => { e.preventDefault(); setMode("magic"); setError(null); setStatus(null); }}>
                Or sign in with a magic link instead
              </a>
            </div>
          </>
        ) : (
          <>
            <button className="btn" style={{ width: "100%" }} onClick={handleMagicLink} disabled={loading}>
              {loading ? "Sending…" : "Send magic link"}
            </button>
            <div className="login-note">
              <a href="#" onClick={(e) => { e.preventDefault(); setMode("password"); setError(null); setStatus(null); }}>
                Use email + password instead
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
