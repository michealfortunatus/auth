'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Nav() {
  const { data: session } = useSession()

  return (
    <nav className="w-full p-4 bg-white shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-semibold">
          NextAuth MVP
        </Link>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <span className="text-sm">{session.user.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm px-3 py-1 rounded bg-red-600 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm px-3 py-1 rounded bg-indigo-600 text-white"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
