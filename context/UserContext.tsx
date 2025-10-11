import { Users } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
    user: Users | null;
    login: (user: Users) => void;
    logout: ()=> void;
    addSavedMeals: (mealId: string) => void;
    removeSavedMeals: (mealId: string) => void;
    setFavoriteCategory: (category: string) => void;
    isMealSaved: (mealId: string) => boolean;
}

const UserContext = createContext <UserContextType | undefined> (undefined);

export function UserProvider({children}: {children: ReactNode}) {
    const [user, setUser] =useState<Users | null>(null);

    const login = (userData: Users) => setUser(userData)
    const logout = () => setUser(null)

    const addSavedMeals = (mealId: string) => {
        if (user && !user.savedMeals.includes(mealId)) {
            setUser({...user, savedMeals: [...user.savedMeals, mealId]})
        }
    }

    const removeSavedMeals = (mealId: string) => {
        if (user) {
            setUser({...user, savedMeals: user.savedMeals.filter(id => id !== mealId)})
        }
    }

    const setFavoriteCategory = (category: string) => {
        if (user) setUser({...user, favoriteCategory: category})
    }

    const isMealSaved = (mealId: string) => user?.savedMeals.includes(mealId) || false;

    return (
        <UserContext.Provider value={{user, login, logout, addSavedMeals, removeSavedMeals, setFavoriteCategory, isMealSaved }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context)
        throw new Error ('blablabal');
    return context;
}