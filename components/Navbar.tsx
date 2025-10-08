'use client'
import Link from "next/link"
import { navbarConfig, navlinksData } from "@/data/data"
import { NavLinks } from "@/types/types"


const Navar = () => {
    return (
        <nav>
            <div>
                <div>
                    <h1>
                        {navbarConfig.title}
                    </h1>
                    <div>
                        {navlinksData.map((link: NavLinks) => (
                            <Link
                            href={link.href}
                            key={link.href}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div>
                        <span>
                            {navbarConfig.welcomeText}
                        </span>
                        <button>
                            {navbarConfig.logoutButton}
                        </button>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navar