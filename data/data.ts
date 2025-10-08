import {  NavbarConfig, NavLinks } from "@/types/types";

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