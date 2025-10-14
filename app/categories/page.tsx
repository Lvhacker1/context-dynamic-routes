'use client'
import Navbar from "@/components/Navbar"
import { useUser } from "@/context/UserContext"
import { getCategories } from "@/lib/api";
import { Category } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
    const {user, setFavoriteCategory}= useUser();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories().then(data => {setCategories(data); setLoading(false); });
    }, []);

    if (!user) return null;
    if (loading) return <div><Navbar/><p>Loading...</p></div>

    return (
        <div>
            <Navbar />
            <main>
                <h2></h2>
                <div>
                    {categories.map(c => (
                        <div key={c.idCategory}>
                            <Link href={`/categories/${c.strCategory}`}>
                            <div>
                                <Image src={c.strCategoryThumb} alt={c.strCategory} width={200} height={100} />
                            </div>
                            <div>
                                <h3>{c.strCategory}</h3>
                                <p>{c.strCategoryDescription}</p>
                            </div>
                            </Link>
                            <div>
                                <button onClick={() => setFavoriteCategory(c.strCategory)}>
                                    {user.favoriteCategory === c.strCategory ? 'Fvaorite' : 'Set as Favorite'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default CategoriesPage