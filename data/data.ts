import {  HomePageContent, LoginFormTypes, NavbarConfig, NavLinks, ProfilePageContent } from "@/types/types";

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