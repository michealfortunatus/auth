'use client'

import { signIn } from 'next-auth/react'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (!res || res.error) {
      setError(res?.error || 'Invalid credentials')
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handle}
        className="w-full max-w-sm p-6 bg-white shadow rounded-xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        {error && (
          <div className="text-red-600 text-sm mb-3 text-center">
            {error}
          </div>
        )}

        <label className="block mb-3">
          <div className="text-sm mb-1">Email</div>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block mb-4">
          <div className="text-sm mb-1">Password</div>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  )
}
