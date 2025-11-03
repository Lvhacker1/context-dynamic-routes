'use client'
import Navbar from "@/components/Navbar"
import { useUser } from "@/context/UserContext"
import { categoriesPageContent } from "@/data/data";
import { getCategories } from "@/lib/api";
import { Category } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CategoriesPage = () => {
    const {user, setFavoriteCategory}= useUser();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState<{[key: string]: boolean}>({});
    const containerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        getCategories().then(data => {
            setCategories(data); 
            setLoading(false); });
    }, []);

    const scrollCategories = (direction: 'left' | 'right') => {
        let newIndex = currentIndex + (direction === 'left' ? -1 : 1);
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= categories.length) newIndex = categories.length - 1;
        
        const container = containerRef.current;
        
        if (container) {
            container.style.scrollSnapType = 'none';
            
            const targetScroll = newIndex * container.offsetWidth;
            const duration = 1200;
            const startTime = performance.now();
            let hasScrolled = false;
            
            const animateScroll = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                if (progress < 0.35) {
                    const wipeProgress = progress / 0.35;
                    const maskPosition = (1 - wipeProgress) * 100;
                    container.style.maskImage = `linear-gradient(90deg, white ${maskPosition}%, transparent ${maskPosition}%)`;
                    (container.style as any).webkitMaskImage = `linear-gradient(90deg, white ${maskPosition}%, transparent ${maskPosition}%)`;
                } else if (progress < 0.55) {
                    container.style.maskImage = `linear-gradient(90deg, transparent 0%, transparent 100%)`;
                    (container.style as any).webkitMaskImage = `linear-gradient(90deg, transparent 0%, transparent 100%)`;
                    
                    if (!hasScrolled) {
                        container.scrollLeft = targetScroll;
                        setCurrentIndex(newIndex);
                        hasScrolled = true;
                    }
                } else {
                    const wipeProgress = (progress - 0.55) / 0.45;
                    const maskPosition = wipeProgress * 100;
                    container.style.maskImage = `linear-gradient(90deg, white ${maskPosition}%, transparent ${maskPosition}%)`;
                    (container.style as any).webkitMaskImage = `linear-gradient(90deg, white ${maskPosition}%, transparent ${maskPosition}%)`;
                    container.scrollLeft = targetScroll;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    container.style.maskImage = 'none';
                    (container.style as any).webkitMaskImage = 'none';
                    container.scrollLeft = targetScroll;
                    container.style.scrollSnapType = 'x mandatory';
                }
            };
            
            requestAnimationFrame(animateScroll);
        }
    }

    const toggleDescription = (categoryId: string) => {
        setShowFullDescription(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    if (!user) return null;
    if (loading) return <div><Navbar/><p>{categoriesPageContent.loading}</p></div>

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="p-2 overflow-x-hidden">
                <h1 className="text-center text-3xl font-bold lg:text-5xl mb-6">{categoriesPageContent.title}</h1>
                <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto overflow-hidden px-10">
                    <button 
                        onClick={() => scrollCategories('left')}
                        disabled={currentIndex === 0}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-black p-2 disabled:cursor-not-allowed disabled:text-gray-500 hover:text-gray-500  transition-colors duration-300 cursor-pointer">
                        <IoIosArrowBack size={32} />
                    </button>
                    <div className="rounded my-8 w-full" style={{ boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                        <div className="flex overflow-x-scroll w-full snap-x snap-mandatory rounded"
                        ref={containerRef}>
                            {categories.map((c, i) => (
                                <div className="flex-shrink-0 w-full snap-center p-4 sm:p-6  flex flex-col items-center text-center justify-between"
                                    key={c.idCategory}
                                   >
                                    <div className="flex items-center justify-between w-full mb-4">
                                        <h2 className="text-2xl lg:text-3xl mb-2 text-black font-bold">{c.strCategory}</h2>
                                        <button 
                                            className={`text-4xl transition-all duration-300 hover:scale-110 transform ${
                                                user.favoriteCategories?.includes(c.strCategory) ? 'text-yellow-400' : 'text-black'}`}
                                            onClick={() => setFavoriteCategory(c.strCategory)}
                                            aria-label={user.favoriteCategories?.includes(c.strCategory) ? "Remove from favorites" : "Add to favorites"}>
                                            {user.favoriteCategories?.includes(c.strCategory) ? '★' : '☆'}
                                        </button>
                                    </div>
                                    <Link href={`/categories/${c.strCategory}`} className="w-full">
                                    <div className="flex justify-center mb-4 w-full">
                                        <Image src={c.strCategoryThumb} alt={c.strCategory} width={200} height={100} className="rounded object-cover w-full h-auto max-w-md" />
                                    </div>
                                    </Link>
                                    <div>
                                        <p className={`text-sm text-gray-600 ${showFullDescription[c.idCategory] ? '' : 'line-clamp-2'}`}>
                                            {c.strCategoryDescription}
                                        </p>
                                        {c.strCategoryDescription && c.strCategoryDescription.length > 100 && (
                                            <button
                                                onClick={() => toggleDescription(c.idCategory)}
                                                className="text-blue-600 hover:text-blue-800 text-sm mt-1 underline">
                                                {showFullDescription[c.idCategory] ? 'Read less' : 'Read more'}
                                            </button>
                                        )}
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
                                </div>
                            ))}
                        </div>
                    </div>
                    <button 
                        onClick={() => scrollCategories('right')}
                        disabled={currentIndex === categories.length - 1}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-black p-2 hover:text-gray-500  transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-500">
                        <IoIosArrowForward size={32} />
                    </button>
                </div>
            </main>
        </div>
    )
}

export default CategoriesPage