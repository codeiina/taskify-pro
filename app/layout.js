import Link from "next/link"
import "./globals.css"

export const metadata = {
  title: "Taskify Pro",
  description: "Elegant Todo App with Next.js & TailwindCSS",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md fixed w-full z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-white font-extrabold text-2xl">🚀 Taskify Pro</h1>
            <ul className="flex gap-6 text-white font-medium">
              <li><Link href="/" className="hover:text-yellow-300">🏠 Home</Link></li>
              <li><Link href="/tasks" className="hover:text-yellow-300">✅ Tasks</Link></li>
              <li><Link href="/about" className="hover:text-yellow-300">ℹ️ About</Link></li>
            </ul>
          </div>
        </nav>

        <main className="flex-1 pt-24 px-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-center py-4 mt-10">
          <p>
            © {new Date().getFullYear()} <b>Taskify Pro ✨</b> — Built with ❤️ using Next.js + TailwindCSS + PostgreSQL
          </p>
        </footer>
      </body>
    </html>
  )
}
