import {  CategoriesPageContent, CategoryPageContent, HomePageContent, LoginFormTypes, MealPageContent, NavbarConfig, NavLinks, ProfilePageContent } from "@/types/types";

export const navlinksData: NavLinks[] = [
    {href: '/', label: 'Home'},
    {href: '/categories', label: 'Category'},
    {href: '/profile', label: 'Profile'}
]

export const navbarConfig: NavbarConfig = {
    title: 'MEALDB',
    accountIcon: '👤',
    logoutButton: 'Log Out'
}

export const loginFormData: LoginFormTypes = {
    pageTitle: 'MEALDB',
    subTitle: 'Log In and Let Your Recipes Come to Life',
    email: 'Email Adress:',
    password: 'Password:',
    submitButton: 'SIGN IN',
    errorMessage: 'blablabla',
    exampleAccountTitle: 'Example Account',
    signUpText: "Don't have an account?",
    signUpLink: 'Sign up here!'
}

export const homePageContent: HomePageContent = {
    title: 'Welcome back ',
    subTitle: 'Good taste starts here! Explore new recipes, save your favourites, and make every meal a little more fun.',
    links: [
        {
            href: '/categories',
            description: 'Recipes'
        },
        {
            href: '/profile',
            description: 'Account'
        },
    ]
}

export const profilePageContent: ProfilePageContent = {
    profileInfo: {
        savedRecipes: 'Saved Recipes'
    },
    sections: {
        mySavedRecipes: 'My Saved Recipes',
        loading: 'Loading...',
        noSaved: 'No saved recipes yet',
        exploreRecipes: 'Explore Recipes'
    }
}

export const categoriesPageContent: CategoriesPageContent = {
    title: 'Meal files for your browsing',
    loading: 'Loading...',
    favorite: 'Favorite',
    setFavorite: 'Set as Favorite'
}

export const categoryPageContent: CategoryPageContent = {
    linkText: 'Back to Categories',
    loading: 'Loading...'
}

export const mealPageContent: MealPageContent = {
    loadingMessage: 'Loading...',
    notFoundMessage: 'Recipe Not Found',
    backButton: 'Back',
    deleteButton: 'Remove',
    saveButton: 'Save',
    ingredientsTitle:'Ingredients',
    instructionsTitle: 'Instructions',
    youtubeLink: 'Watch On Youtube'
}