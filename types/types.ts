export interface NavLinks {
    href: string;
    label: string;
}

export interface NavbarConfig {
    title: string;
    welcomeText: string;
    logoutButton: string;
}

export interface Users {
    id: string;
    name: string;
    email: string;
    password: string;
    savedMeals: string[];
    favoriteCategory: string | null;
}