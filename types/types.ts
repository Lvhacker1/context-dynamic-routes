export interface NavLinks {
    href: string;
    label: string;
}

export interface NavbarConfig {
    title: string;
    accountIcon: string;
    logoutButton: string;
}

export interface Users {
    id: string;
    name: string;
    email: string;
    password: string;
    savedMeals: string[];
    favoriteCategories: string[];
}

export interface LoginFormTypes {
    pageTitle: string;
    subTitle: string;
    email: string;
    password: string;
    submitButton: string;
    errorMessage: string;
    exampleAccountTitle: string;
    signUpText: string;
    signUpLink: string;
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

export interface MealPreview {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  [key: `strIngredient${number}`]: string | undefined;
  [key: `strMeasure${number}`]: string | undefined;
}

export interface HomePageContent {
    title: string;
    subTitle: string;
    links: {
        href: string;
        description: string;
    }[];
}

export interface ProfilePageContent {
    pageTitle: string;
    profileInfo: {
        savedRecipes: string;
    },
    sections: {
        mySavedRecipes: string;
        loading: string;
        noSaved: string;
        exploreRecipes: string;
    }
}

export interface CategoriesPageContent {
    title: string;
    loading: string;
    favorite: string;
    setFavorite: string;
}

export interface CategoryPageContent {
    linkText: string;
    loading: string;
}

export interface MealPageContent {
    loadingMessage: string;
    notFoundMessage: string;
    backButton: string;
    deleteButton: string;
    saveButton: string;
    ingredientsTitle: string;
    instructionsTitle: string;
    youtubeLink: string;
}

export interface NotFoundPageContent {
    title: string;
    subtitle: string;
    description: string;
    backButton: string;
}