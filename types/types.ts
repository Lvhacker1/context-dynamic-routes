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

export interface LoginFormTypes {
    pageTitle: string;
    subTitle: string;
    email: string;
    password: string;
    submitButton: string;
    errorMessage: string;
    exampleAccountTitle: string;
}

export interface ExampleAccount {
    email: string;
    password: string;
}

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}