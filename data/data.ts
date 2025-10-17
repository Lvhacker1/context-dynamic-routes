import {  CategoriesPageContent, CategoryPageContent, HomePageContent, LoginFormTypes, MealPageContent, NavbarConfig, NavLinks } from "@/types/types";

export const navlinksData: NavLinks[] = [
    {href: '/', label: 'Home'},
    {href: '/categories', label: 'CA'},
    {href: '/profile', label: 'PR'}
]

export const navbarConfig: NavbarConfig = {
    title: 'MealDB',
    welcomeText: 'Welcome',
    logoutButton: 'Log Out'
}

export const loginFormData: LoginFormTypes = {
    pageTitle: 'MealDB',
    subTitle: 'Save Your Favorite Recipies',
    email: 'Email',
    password: 'Password',
    submitButton: 'Log In',
    errorMessage: 'blablabla',
    exampleAccountTitle: 'Example Account'
}

export const homePageContent: HomePageContent = {
    title: 'blabla',
    subTitle: 'Discover new recepies',
    favoriteCategory: 'balbajsjnslks fav cat',
    links: [
        {
            href: '/categories',
            description: 'blablab'
        },
        {
            href: '/profile',
            description: 'blablabaaa'
        },
    ]
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
    backButton: 'Back',
    deleteButton: 'Remove',
    saveButton: 'Save',
    ingredientsTitle:'Ingredients',
    instructionsTitle: 'Instructions',
    youtubeButton: 'Watch On Youtube'
}