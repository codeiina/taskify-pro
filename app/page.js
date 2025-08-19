"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [name, setName] = useState("")
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem("username")
    if (saved) setName(saved)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    localStorage.setItem("username", name)
    router.push("/tasks")
  }

  return (
    <section className="flex flex-col items-center justify-center text-center py-24">
      <h1 className="text-5xl font-extrabold mb-6 text-indigo-600">🚀 Welcome to Taskify Pro</h1>
      <p className="text-gray-600 mb-8 text-lg max-w-xl">Organize your life with style ✨</p>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama kamu..."
          required
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg">Mulai ➡️</button>
      </form>
    </section>
  )
}
