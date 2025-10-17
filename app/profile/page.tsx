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
        <div>
            <Navbar />
            <main>
                <div>
                    <div>
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-amber-50">{user.name}</h2>
                        <p>{user.email}</p>
                        {user.favoriteCategory && (
                            <p>{profilePageContent.profileInfo.favoriteCategory} {user.favoriteCategory}</p>
                        )}
                    </div>
                    <div>
                        <div>
                            <p>{user.savedMeals.length}</p>
                            <p>{profilePageContent.profileInfo.savedRecipes}</p>
                        </div>
                        <div>
                            <p>{user.favoriteCategory ? 1: 0}</p>
                            <p>{profilePageContent.profileInfo.favoriteCategory}</p>
                        </div>
                    </div>
                </div>
                <h3>{profilePageContent.sections.mySavedRecipes}</h3>
                { loading? (
                    <p>{profilePageContent.sections.loading}</p>
                ) : savedMeals.length === 0 ? (
                    <div>
                        <p>{profilePageContent.sections.noSaved}</p>
                        <Link href='/categories'>
                        {profilePageContent.sections.exploreRecipes}
                        </Link>
                    </div>
                ) : (
                    <div>
                        {savedMeals.map(meals => (
                            <Link
                            key={meals.idMeal}
                            href={`/meals/${meals.idMeal}`}>
                                <div>
                                    <Image src={meals.strMealThumb} alt={meals.strMeal} />
                                </div>
                                <div>
                                    <h4>{meals.strMeal}</h4>
                                    <p>{meals.strCategory}</p>
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