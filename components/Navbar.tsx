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
        <nav className="text-white shadow-lg px-2 sm:px-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 sm:py-4 gap-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-6 text-center">
                    <h1>
                        {navbarConfig.title}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        {navlinksData.map(link => (
                            <Link
                            className={` ${pathname === link.href ? 'text-blue-700' : 'hover:font-bold'}`}
                            href={link.href}
                            key={link.href}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4">
                    <div className="flex items-center gap-4">
                        <span>
                            {navbarConfig.welcomeText}
                        </span>
                        <button onClick={logout} className="px-2 py-1 bg-orange-800 hover:bg-orange-900 rounded-sm transition-colors">
                            {navbarConfig.logoutButton}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar