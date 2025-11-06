'use client'
import Navbar from "@/components/Navbar"
import { useUser } from "@/context/UserContext";
import { mealPageContent } from "@/data/data";
import { getMealsById } from "@/lib/api";
import { Meal } from "@/types/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";


const MealPage = () => {
    const params = useParams();
    const router = useRouter();
    const mealId = params.mealId as string;
    const {user, addSavedMeals, removeSavedMeals, isMealSaved} = useUser();
    const [meal, setMeals] = useState<Meal | null>(null);
    const [loading, setLoading] = useState(true);
    const saved = isMealSaved(mealId);

    useEffect(() => {
        getMealsById(mealId).then(data => {setMeals(data); setLoading(false);})
    }, [mealId]);

    if (!user) return null;
    if (loading) return <div className="bg-black min-h-screen"><Navbar /> <p className="text-white text-center pt-20">{mealPageContent.loadingMessage}</p></div>
    if (!meal) return <div className="bg-black min-h-screen"><Navbar /> <p className="text-white text-center pt-20">{mealPageContent.notFoundMessage}</p></div>

    const ingredients= [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) ingredients.push(`${ingredient} ${measure}`)
    }

    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
                <button onClick={() => router.back()} className="text-red-500 hover:text-red-400 font-semibold mb-6 transition-colors duration-300 flex items-center gap-2">← {mealPageContent.backButton}</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-red-500/10">
                        <Image src={meal.strMealThumb} alt={meal.strMeal} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{meal.strMeal}</h1>
                            <div className="flex gap-3 mb-6">
                                <span className="bg-red-500/20 text-red-500 px-4 py-2 rounded-full text-sm font-semibold border border-red-500/30">{meal.strCategory}</span>
                                <span className="bg-red-500/20 text-red-500 px-4 py-2 rounded-full text-sm font-semibold border border-red-500/30">{meal.strArea}</span>
                            </div>
                        </div>
                        <button onClick={() => saved ? removeSavedMeals(mealId) : addSavedMeals(mealId)} className={saved ? "bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md shadow-red-500/20 flex items-center justify-center gap-2" : "bg-red-500 border-2 border-red-500 text-white hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 font-semibold py-3 px-6 rounded-lg shadow-lg shadow-red-500/30 transition-all duration-300 flex items-center justify-center gap-2"}>
                            <span className="text-2xl">{saved ? '★' : '☆'}</span>
                            <span>{saved ? mealPageContent.deleteButton : mealPageContent.saveButton}</span>
                        </button>
                    </div>
                    <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800 shadow-xl">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-red-500/30 pb-2">{mealPageContent.ingredientsTitle}</h2>
                            <ul className="space-y-2">
                                {ingredients.map((ing, i) => <li key={i} className="text-gray-300 flex items-start gap-2"><span className="text-red-500 mt-1">•</span><span>{ing}</span></li>)}
                            </ul>
                        </div>
                    </div>
                    <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800 shadow-xl">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4 border-b border-red-500/30 pb-2">{mealPageContent.instructionsTitle}</h3>
                            <p className="text-gray-300 leading-relaxed mb-6">{meal.strInstructions}</p>
                            {meal.strYoutube && (
                                <a href={meal.strYoutube} target="_blank" className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40">
                                    {mealPageContent.youtubeLink} →
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MealPage