'use client'
import Navbar from "@/components/Navbar"
import { useUser } from "@/context/UserContext";
import { categoryPageContent } from "@/data/data";
import { getMealsByCategory } from "@/lib/api";
import { MealPreview } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";


const CategoryPage = () => {
    const params = useParams();
    const categoryName = params.categoryName as string;
    const {user} = useUser();
    const [meals, setMeals] = useState<MealPreview[]> ([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cat = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        getMealsByCategory(cat).then(data => {
            console.log("Fetched meals:", data);
            setMeals(data); setLoading(false);})
    }, [categoryName])

    if (!user) return null;
    if (loading) return <div className="min-h-screen bg-black"><Navbar /> <div className="flex items-center justify-center h-[calc(100vh-80px)]"><div className="text-center"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mx-auto mb-6"></div><p className="text-gray-300 text-lg font-medium">{categoryPageContent.loading}</p></div></div></div>

    const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href='/categories' className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-all mb-8 group text-lg font-medium">
                    <IoArrowBack className="group-hover:-translate-x-2 transition-transform text-xl" />
                    <span>{categoryPageContent.linkText}</span>
                </Link>

                <div className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">{formattedCategoryName}</h1>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/50"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {meals.map(meal => (
                        <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`} className="group">
                            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2 border-2 border-gray-700/50 hover:border-red-500">
                                <div className="relative aspect-square overflow-hidden bg-gray-900">
                                    <Image src={meal.strMealThumb} alt={meal.strMeal} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-500 group-hover:brightness-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">{meal.strMeal}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default CategoryPage