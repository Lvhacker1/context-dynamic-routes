'use client'
import Navbar from "@/components/Navbar"
import { useUser } from "@/context/UserContext";
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
    if (loading) return <div><Navbar /> <p>Loading...</p></div>
    if (!meal) return <div><Navbar /> <p>Recipe not found</p></div>

    return (
        <div>
            <Navbar />
            <main>
                <button onClick={() => router.back()}>Back</button>
                <div>
                    <div>
                        <Image src={meal.strMealThumb} alt={meal.strMeal} width={200} height={100} />
                    </div>
                </div>

            </main>
        </div>
    )
}

export default MealPage