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
    if (loading) return <div><Navbar /> <p>{categoryPageContent.loading}</p></div>
    return (
        <div>
            <Navbar />
            <main>
                <div>
                    <Link href='/categories'>{categoryPageContent.linkText}</Link>
                    <h1>{categoryName}</h1>
                    <div>
                        {meals.map(meal => (
                            <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`}>
                                <div>
                                    <Image src={meal.strMealThumb} alt={meal.strMeal} width={200} height={100} />
                                </div>
                                <div>
                                    <h3>{meal.strMeal}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CategoryPage