"use client"
import { useEffect, useState } from "react"

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Work")
  const [deadline, setDeadline] = useState("")
  const [name, setName] = useState("")

  // Load username dari localStorage + refresh data
  useEffect(() => {
    const saved = localStorage.getItem("username") || "guest"
    setName(saved)
    refresh(saved)
  }, [])

  // Refresh tasks sesuai username
  async function refresh(username) {
    const res = await fetch(`/api/tasks?username=${username}`)
    const data = await res.json()
    setTasks(data)
  }

  // Tambah task
  async function addTask(e) {
    e.preventDefault()
    const username = localStorage.getItem("username") || "guest"

    await fetch("/api/tasks", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, deadline, username }) 
    })

    setTitle("")
    setDeadline("")
    refresh(username)
  }

  // Toggle done
  async function toggle(id, done) {
    await fetch("/api/tasks", { 
      method: "PUT", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, done: !done }) 
    })
    const username = localStorage.getItem("username") || "guest"
    refresh(username)
  }

  // Hapus task
  async function remove(id) {
    await fetch("/api/tasks", { 
      method: "DELETE", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }) 
    })
    const username = localStorage.getItem("username") || "guest"
    refresh(username)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">👋 Halo, {name || "User"}!</h1>
      <form onSubmit={addTask} className="flex flex-col gap-3 mb-6">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Judul tugas..." required className="border px-4 py-2 rounded-lg"/>
        <select value={category} onChange={e=>setCategory(e.target.value)} className="border px-4 py-2 rounded-lg">
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
        </select>
        <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} className="border px-4 py-2 rounded-lg"/>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg">➕ Tambah</button>
      </form>

      <ul className="space-y-3">
        {tasks.map(t=>(
          <li key={t.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow">
            <div>
              <p className={t.done ? "line-through text-gray-400" : "font-semibold"}>{t.title}</p>
              <span className="text-sm text-gray-500">📂 {t.category} | 📅 {t.deadline || "No deadline"}</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" checked={t.done} onChange={()=>toggle(t.id, t.done)} className="w-5 h-5 accent-indigo-600"/>
              <button onClick={()=>remove(t.id)} className="text-red-500 hover:text-red-700">🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
