'use client'
import Link from "next/link"
import { navbarConfig, navlinksData } from "@/data/data"
import { NavLinks } from "@/types/types"
import { useUser } from "@/context/UserContext"
import { usePathname } from "next/navigation"


const Navbar = () => {
    const {user, logout} = useUser()
    const pathname = usePathname()

    if (!user) return null;

    return (
        <nav className="bg-zinc-900/80 backdrop-blur-md text-white shadow-xl shadow-black/50 border-b border-zinc-800 px-4 sm:px-6 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-5 gap-3">
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
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300 text-sm sm:text-base">
                            {navbarConfig.welcomeText}
                        </span>
                        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40">
                            {navbarConfig.logoutButton}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar