import {  CategoriesPageContent, CategoryPageContent, HomePageContent, LoginFormTypes, MealPageContent, NavbarConfig, NavLinks, ProfilePageContent } from "@/types/types";

export const navlinksData: NavLinks[] = [
    {href: '/', label: 'Home'},
    {href: '/categories', label: 'CA'},
    {href: '/profile', label: 'PR'}
]

export const navbarConfig: NavbarConfig = {
    title: 'MEALDB',
    welcomeText: 'Welcome',
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
    subTitle: 'Find and save your favorite recepies',
    favoriteCategory: 'Your favorite categories:',
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
        savedRecipes: 'saved blbal',
        favoriteCategory: 'fav cat'
    },
    sections: {
        mySavedRecipes: 'my sav rec',
        loading: 'loading...',
        noSaved: 'no saved yet',
        exploreRecipes: 'explore blabla'
    }
}

export const categoriesPageContent: CategoriesPageContent = {
    title: 'Food Categories',
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