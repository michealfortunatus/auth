import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/authOptions"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/register")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      <div className="p-6 bg-white rounded-xl shadow max-w-lg w-full">
        <h1 className="text-2xl font-semibold">Welcome, {session.user?.email}</h1>
      </div>
    </div>
  )
}
