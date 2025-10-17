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

    const ingredients= [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) ingredients.push(`${ingredient} ${measure}`)
    }

    return (
        <div>
            <Navbar />
            <main>
                <button onClick={() => router.back()}>Back</button>
                <div>
                    <div>
                        <Image src={meal.strMealThumb} alt={meal.strMeal} width={200} height={100} />
                    </div>
                    <div>
                        <div>
                            <h1>{meal.strMeal}</h1>
                            <div>
                                <span>{meal.strCategory}</span>
                                <span>{meal.strArea}</span>
                            </div>
                        </div>
                        <button onClick={() => saved ? removeSavedMeals(mealId) : addSavedMeals(mealId)}>
                            {saved ? 'Remove' : 'Save'}
                        </button>
                    </div>
                    <div>
                        <div>
                            <h2>Ingredients</h2>
                            <ul>
                                {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3>Instructions</h3>
                            <p>{meal.strInstructions}</p>
                            {meal.strYoutube && (
                                <a href={meal.strYoutube} target="_blank">
                                    Watch On Youtubeeeeeetizi
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