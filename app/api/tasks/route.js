import { NextResponse } from "next/server"
import { pool } from "../../../lib/db"

// GET /api/tasks?username=rina
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username")

  const { rows } = await pool.query(
    'SELECT * FROM "Task" WHERE "username"=$1 ORDER BY "createdAt" DESC',
    [username]
  )
  return NextResponse.json(rows)
}

// POST
export async function POST(req) {
  const { title, username } = await req.json()
  await pool.query(
    'INSERT INTO "Task" ("title","done","username","createdAt") VALUES ($1, false, $2, NOW())',
    [title, username]
  )
  return NextResponse.json({ ok: true }, { status: 201 })
}
