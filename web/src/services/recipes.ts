import { Recipe } from '@cms-types'

export const getRecipes = async (): Promise<Recipe[]> => {
    const data = await fetch('http://localhost:3001/api/recipes')
    const recipes = await data.json()

    return recipes.docs
}

export const getRecipeBySlug = async (slug: string): Promise<Recipe> => {
    const data = await fetch(`http://localhost:3001/api/recipes/?where[slug][equals]=${slug}`)
    const recipe = await data.json()

    return recipe.docs[0]
}

export const getRecipesByCuisine = async (cuisine: string): Promise<Recipe[]> => {
    const data = await fetch(`http://localhost:3001/api/recipes/?where[cuisine.name][equals]=${cuisine}`)
    const recipe = await data.json()

    return recipe.docs
}
