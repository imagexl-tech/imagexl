import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login, isLoggedIn, ApiError } from "../api/client";
import ThemeToggle from "../components/ThemeToggle";
import Logo from "../components/Logo";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (isLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm border border-line bg-card p-8 shadow-sm">
        <Logo wordmarkSize="text-2xl" taglineSize="text-[10px]" />
        <h1 className="font-serif-heading mt-4 text-2xl font-bold">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted">Manage products, reviews and enquiries.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
          <input
            required
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-sm border border-dark bg-dark px-5 py-2.5 text-xs font-bold text-white hover:bg-black disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
