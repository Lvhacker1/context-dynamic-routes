'use client'
import { Users } from "@/types/types";
import { users } from "@/lib/users";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            const allUsers = JSON.parse(localStorage.getItem('allUsers') || JSON.stringify(users));
            const updatedUsers = allUsers.map((u: Users) => u.id === user.id ? user : u);
            localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [user]);

    const login = (userData: Users) => {
        const allUsers = JSON.parse(localStorage.getItem('allUsers') || JSON.stringify(users));
        const savedUserData = allUsers.find((u: Users) => u.id === userData.id);
        setUser(savedUserData || userData);
    }
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
        if (!user) return;
        
        const isFavorite = user.favoriteCategories?.includes(category);
        
        setUser({
            ...user,
            favoriteCategories: isFavorite 
                ? user.favoriteCategories.filter(c => c !== category)
                : [...(user.favoriteCategories || []), category]
        })
    };

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