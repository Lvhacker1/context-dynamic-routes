import {  LoginFormTypes, NavbarConfig, NavLinks } from "@/types/types";

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