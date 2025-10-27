'use client'
import Navbar from "@/components/Navbar"
import { useUser } from "@/context/UserContext"
import { categoriesPageContent } from "@/data/data";
import { getCategories } from "@/lib/api";
import { Category } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CategoriesPage = () => {
    const {user, setFavoriteCategory}= useUser();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        getCategories().then(data => {
            setCategories(data); 
            setLoading(false); });
    }, []);

    const scrollCategories = (direction: 'left' | 'right') => {
        let newIndex = currentIndex + (direction === 'left' ? -1 : 1);
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= categories.length) newIndex = categories.length - 1;

        setCurrentIndex(newIndex);

        const card = cardRefs.current[newIndex];
        card?.scrollIntoView({behavior: 'smooth', inline: 'start' });
    };

    if (!user) return null;
    if (loading) return <div><Navbar/><p>{categoriesPageContent.loading}</p></div>

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="p-8">
                <h2>{categoriesPageContent.title}</h2>
                <div>
                    <button 
                        onClick={() => scrollCategories('left')}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors">
                        <p>{"<"}</p>
                    </button>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                        {user.favoriteCategory === c.strCategory ? categoriesPageContent.favorite : categoriesPageContent.setFavorite}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => scrollCategories('right')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors">
                        <p>{">"}</p>
                    </button>
                </div>
            </main>
        </div>
    )
}

export default CategoriesPage