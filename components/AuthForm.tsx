'use client';

import { useState, FormEvent } from "react";

interface AuthFormProps {
  action?: string;
  submitLabel?: string;
}

export default function AuthForm({
  action = "/api/register",
  submitLabel = "Submit",
}: AuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [ok, setOk] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setOk("");

    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: { message?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      setOk("Success!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-lg font-medium mb-4">{submitLabel}</h2>

      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      {ok && <div className="text-sm text-green-600 mb-2">{ok}</div>}

      <label className="block mb-2">
        <div className="text-sm mb-1">Email</div>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          type="email"
        />
      </label>

      <label className="block mb-4">
        <div className="text-sm mb-1">Password</div>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          type="password"
        />
      </label>

      <button className="w-full py-2 rounded bg-indigo-600 text-white">
        {submitLabel}
      </button>
    </form>
  );
}
