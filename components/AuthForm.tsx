"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

interface AuthFormProps {
  action?: string;
  submitLabel?: string;
}

export default function AuthForm({
  action = "/api/register",
  submitLabel = "Create Account",
}: AuthFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loadingToast = toast.loading("Processing...");

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

      toast.success("Success!", { id: loadingToast });

      router.push("/dashboard");
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong",
        { id: loadingToast }
      );
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 text-center"
      >
        <h2 className="text-2xl font-semibold">Create Account</h2>

        {/* Email */}
        <div className="flex flex-col space-y-1 text-left">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-1 text-left">
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>

        {/* Submit */}
        <button
          className="w-full py-3 rounded-xl bg-yellow-400 font-medium hover:bg-yellow-500 transition text-sm"
        >
          Sign Up
        </button>

        <p className="text-xs text-gray-500 mt-4">
          Already Have an Account?{" "}
          <Link className="text-blue-600 underline cursor-pointer" href="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}
