'use client'
import Navbar from "@/components/Navbar"
import { useUser } from "@/context/UserContext"
import { profilePageContent } from "@/data/data"
import { getMealsById } from "@/lib/api"
import { Meal } from "@/types/types"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"


const ProfilePage = () => {
    const {user} = useUser()
    const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        Promise.all(user.savedMeals.map(id => getMealsById(id))).then(data => {
            setSavedMeals(data.filter((meal): meal is Meal => meal !== null));
            setLoading(false)
        })
    }, [user]);

    if (!user) return null;

    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
                <h1 className="sr-only">{profilePageContent.pageTitle}</h1>
                <div className="bg-zinc-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-xl mb-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg shadow-red-500/30">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{user.name}</h2>
                            <p className="text-gray-400 mb-3">{user.email}</p>
                        </div>
                        <div className="flex gap-4 sm:gap-6">
                            <div className="text-center bg-zinc-800/50 px-4 py-3 rounded-lg border border-zinc-700">
                                <p className="text-2xl sm:text-3xl font-bold text-red-500">{user.savedMeals.length}</p>
                                <p className="text-xs sm:text-sm text-gray-400 mt-1">{profilePageContent.profileInfo.savedRecipes}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 border-b border-red-500/30 pb-2">{profilePageContent.sections.mySavedRecipes}</h3>
                { loading? (
                    <p className="text-gray-400 text-center py-12">{profilePageContent.sections.loading}</p>
                ) : savedMeals.length === 0 ? (
                    <div className="text-center py-12 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                        <p className="text-gray-400 mb-6 text-lg">{profilePageContent.sections.noSaved}</p>
                        <Link href='/categories' className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40">
                        {profilePageContent.sections.exploreRecipes}
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedMeals.map(meals => (
                            <Link
                            key={meals.idMeal}
                            href={`/meal/${meals.idMeal}`}
                            className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20 hover:scale-105">
                                <div className="relative h-48 sm:h-56">
                                    <Image src={meals.strMealThumb} alt={meals.strMeal} fill className="object-cover" />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-lg font-semibold text-white mb-2">{meals.strMeal}</h4>
                                    <p className="text-sm text-red-500 font-medium">{meals.strCategory}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

export default ProfilePage