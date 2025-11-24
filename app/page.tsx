import Link from 'next/link'


export default function Page() {
return (
<div className="min-h-[60vh] flex items-center justify-center">
<div className="p-6 max-w-md w-full bg-white rounded-2xl shadow">
<h1 className="text-2xl font-semibold mb-4">NextAuth </h1>
<p className="mb-6 text-sm text-gray-600">Register or login to see the protected dashboard.</p>
<div className="flex gap-3">
<Link href="/register" className="flex-1 text-center py-2 px-4 rounded bg-indigo-600 text-white">Register</Link>
<Link href="/login" className="flex-1 text-center py-2 px-4 rounded border border-gray-200">Login</Link>
</div>
</div>
</div>
)
}