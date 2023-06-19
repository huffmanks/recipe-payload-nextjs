import qs from 'qs'
import { Category } from '@cms-types'

export const getCategories = async (): Promise<Category[]> => {
    const data = await fetch('http://localhost:3001/api/categories')
    const recipes = await data.json()

    return recipes.docs
}

// NEED TO REFACTOR
// export const getCategories = async (): Promise<Category[]> => {
//     const query = {
//         recipes: {
//             greater_than: 1,
//         },
//     }

//     const stringifiedQuery = qs.stringify({ where: query }, { addQueryPrefix: true })

//     const data = await fetch(`http://localhost:3001/api/categories${stringifiedQuery}&sort=name`)
//     const categories = await data.json()

//     return categories.docs
// }
