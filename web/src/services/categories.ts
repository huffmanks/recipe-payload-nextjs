import qs from 'qs'
import { Category } from '@cms-types'

export const getCategories = async (): Promise<Category[]> => {
    const recipeData = await fetch('http://localhost:3001/api/recipes?limit=100')
    const recipes = await recipeData.json()

    const flattenedCategories = recipes.docs.flatMap((item) => item.categories)

    const uniqueCategoryNames = Array.from(new Set(flattenedCategories.map((category) => category.name)))

    const query = {
        name: {
            in: uniqueCategoryNames,
        },
    }

    const stringifiedQuery = qs.stringify({ where: query }, { addQueryPrefix: true })

    const data = await fetch(`http://localhost:3001/api/categories${stringifiedQuery}&sort=name`)
    const categories = await data.json()

    return categories.docs
}
