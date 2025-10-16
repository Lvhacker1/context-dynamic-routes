import { Category, Meal, MealPreview } from "@/types/types";

const API_URL_BASE = 'https://www.themealdb.com/api/json/v1/1';

export const getCategories = async(): Promise<Category[]> => {
    try {
        const response = await fetch(`${API_URL_BASE}/categories.php`);
        const data = await response.json();
        return data.categories || [];
    } catch (error) {
        console.error('Error:', error)
        return []
    }
}

export const getMealsByCategory = async (category: string): Promise<MealPreview[]> => {
    try {
        const response = await fetch(`${API_URL_BASE}/filter.php?c=${category}`);
        const data = await response.json();
        console.log("API response:", data);
        return data.meals || [];
    } catch (error) {
        console.error('Error:', error)
        return []
    }
}

export const getMealsById = async (id: string): Promise<Meal | null> => {
    try {
        const response = await fetch(`${API_URL_BASE}/lookup.php?i=${id}`);
        const data = await response.json();
        return data.meals ? data.meals[0]: null;
    } catch (error) {
        console.error('Error:', error)
        return null;
    }
}