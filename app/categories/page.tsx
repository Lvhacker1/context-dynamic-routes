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
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
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
        if (card) {
        card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
        }
    }

    if (!user) return null;
    if (loading) return <div><Navbar/><p>{categoriesPageContent.loading}</p></div>

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="p-4 sm:p-8">
                <h2 className="text-center text-xl sm:text-2xl lg:text-4xl font-semibold mb-6">{categoriesPageContent.title}</h2>
                <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto">
                    <button 
                        onClick={() => scrollCategories('left')}
                        disabled={currentIndex === 0}
                        className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors z-10 disabled:opacity-40">
                        <p>{"<"}</p>
                    </button>
                    <div className="flex overflow-x-hidden w-full">
                        {categories.map((c, i) => (
                            <div className="flex-shrink-0 w-full border rounded p-4 sm:p-6 shadow-sm flex flex-col items-center text-center"
                                key={c.idCategory}
                                ref={el => {
                                    cardRefs.current[i] = el!
                                }}>
                                <Link href={`/categories/${c.strCategory}`}>
                                <div className="flex justify-center mb-4 w-full">
                                    <Image src={c.strCategoryThumb} alt={c.strCategory} width={200} height={100} className="rounded object-cover w-full h-auto max-w-md" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{c.strCategory}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-4">{c.strCategoryDescription}</p>
                                </div>
                                </Link>
                                <div className="mt-4">
                                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 md:text-lg" 
                                    onClick={() => setFavoriteCategory(c.strCategory)}>
                                        {user.favoriteCategory === c.strCategory ? categoriesPageContent.favorite : categoriesPageContent.setFavorite}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => scrollCategories('right')}
                        disabled={currentIndex === categories.length - 1}
                        className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors z-10 disabled:opacity-40">
                        <p>{">"}</p>
                    </button>
                </div>
                <div className="flex justify-center mt-6 gap-2">
                    {categories.map((_, i) => (
                        <span
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                            i === currentIndex ? "bg-blue-500" : "bg-gray-300"
                        }`}
                        ></span>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default CategoriesPage