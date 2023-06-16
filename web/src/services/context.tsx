'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getRecipes } from './recipes'
import { getCategories } from './categories'

export const RecipeContext = createContext(null)

export default async function RecipeProvider({ children }) {
    const [recipes, setRecipes] = useState([])
    const [categories, setCategories] = useState([])

    const getData = async () => {
        const recipeData = await getRecipes()

        setRecipes(recipeData)
    }
    const getData2 = async () => {
        const categoryData = await getCategories()

        setCategories(categoryData)
    }

    useEffect(() => {
        getData()
        getData2()
    }, [])

    return <RecipeContext.Provider value={{ recipes, categories }}>{children}</RecipeContext.Provider>
}

export const useRecipes = () => {
    const recipes = useContext(RecipeContext)
    return recipes
}
