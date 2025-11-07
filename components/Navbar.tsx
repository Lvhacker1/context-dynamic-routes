'use client'
import Link from "next/link"
import { navbarConfig, navlinksData } from "@/data/data"
import { NavLinks } from "@/types/types"
import { useUser } from "@/context/UserContext"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"


const Navbar = () => {
    const {user, logout} = useUser()
    const pathname = usePathname()
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    if (!user) return null;

    return (
        <>
            <nav className="bg-zinc-900/80 backdrop-blur-md text-white shadow-xl shadow-black/50 border-b border-zinc-800 px-4 sm:px-6 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex sm:hidden items-center justify-between py-3">
                        <div className="text-lg font-bold text-red-500">
                            {navbarConfig.title}
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white text-2xl focus:outline-none z-[60] relative">
                            {isMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-row sm:justify-between sm:items-center py-4 sm:py-5 gap-3">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 text-center">
                            <div className="text-xl sm:text-2xl font-bold text-red-500">
                                {navbarConfig.title}
                            </div>
                            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                                {navlinksData.map(link => (
                                    <Link
                                    className={`font-semibold transition-all duration-300 ${pathname === link.href ? 'text-red-500 border-b-2 border-red-500 pb-1' : 'text-gray-300 hover:text-red-400'}`}
                                    href={link.href}
                                    key={link.href}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
                            <div className="flex items-center gap-3">
                                <Link href="/profile" className="bg-zinc-800/50 hover:bg-zinc-700 text-white text-xl px-3 py-2 rounded-lg transition-all duration-300 border border-zinc-700 hover:border-red-500/50">
                                    {navbarConfig.accountIcon}
                                </Link>
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40">
                                    {navbarConfig.logoutButton}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-900/95 backdrop-blur-md z-40 sm:hidden animate-[fadeIn_0.3s_ease-in-out_forwards]">
                    <div className="pt-20 px-4 pb-4 space-y-3 animate-[slideDown_0.3s_ease-in-out_forwards]">
                        <div className="flex flex-col gap-3">
                            {navlinksData.map(link => (
                                <Link
                                onClick={() => setIsMenuOpen(false)}
                                className={`font-semibold transition-all duration-300 px-3 py-2 rounded ${pathname === link.href ? 'text-red-500 bg-red-500/10' : 'text-gray-300'}`}
                                href={link.href}
                                key={link.href}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 pt-2 border-t border-zinc-700">
                            <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="bg-zinc-800/50 text-white text-lg px-3 py-2 rounded-lg transition-all duration-300 border border-zinc-700">
                                {navbarConfig.accountIcon}
                            </Link>
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-red-500/30 flex-1">
                                {navbarConfig.logoutButton}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
