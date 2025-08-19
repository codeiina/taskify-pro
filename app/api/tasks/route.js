import { NextResponse } from "next/server"
import { pool } from "../../../lib/db"

// GET /api/tasks?username=rina
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username") || "guest"

  const { rows } = await pool.query(
    'SELECT * FROM "Task" WHERE "username"=$1 ORDER BY "createdAt" DESC',
    [username]
  )
  return NextResponse.json(rows)
}

// POST
export async function POST(req) {
  const { title, username, category, deadline } = await req.json()

  await pool.query(
    'INSERT INTO "Task" ("title","done","username","category","deadline","createdAt") VALUES ($1, false, $2, $3, $4, NOW())',
    [title, username, category, deadline || null]
  )
  return NextResponse.json({ ok: true }, { status: 201 })
}

// PUT (toggle done)
export async function PUT(req) {
  const { id, done } = await req.json()
  await pool.query(
    'UPDATE "Task" SET "done"=$1 WHERE "id"=$2',
    [done, id]
  )
  return NextResponse.json({ ok: true })
}

// DELETE
export async function DELETE(req) {
  const { id } = await req.json()
  await pool.query(
    'DELETE FROM "Task" WHERE "id"=$1',
    [id]
  )
  return NextResponse.json({ ok: true })
}
