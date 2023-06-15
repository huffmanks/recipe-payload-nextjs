import qs from 'qs'
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

export const getRecipesBySearch = async (search: string): Promise<Recipe[]> => {
    const query = {
        or: [
            {
                title: {
                    contains: search,
                },
            },
            {
                description: {
                    contains: search,
                },
            },
            {
                'cuisine.name': {
                    contains: search,
                },
            },
            {
                'categories.name': {
                    contains: search,
                },
            },
            {
                keywords: {
                    contains: search,
                },
            },
            {
                'ingredients.item': {
                    contains: search,
                },
            },
            {
                'instructions.children.text': {
                    contains: search,
                },
            },
        ],
    }

    const stringifiedQuery = qs.stringify({ where: query }, { addQueryPrefix: true })

    const data = await fetch(`http://localhost:3001/api/recipes${stringifiedQuery}`)
    const recipe = await data.json()

    return recipe.docs
}
