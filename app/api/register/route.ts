import clientPromise from '../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json() as { email?: string; password?: string }
    const { email, password } = body

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Missing' }), { status: 400 })
    }

    const client = await clientPromise
    const users = client.db().collection('users')

    const exists = await users.findOne({ email })
    if (exists) {
      return new Response(JSON.stringify({ message: 'User exists' }), { status: 400 })
    }

    const hash = await bcrypt.hash(password, 10)

    await users.insertOne({
      email,
      passwordHash: hash,
      createdAt: new Date()
    })

    return new Response(JSON.stringify({ ok: true }), { status: 201 })

  } catch (err: unknown) {
    let message = 'Unknown error'
    if (err instanceof Error) message = err.message

    return new Response(JSON.stringify({ message }), { status: 500 })
  }
}
