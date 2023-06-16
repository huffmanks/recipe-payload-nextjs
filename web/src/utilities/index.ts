import { Recipe } from '@cms-types'

interface RecipeSortAndFilter {
    data: Recipe[]
    limit?: number
}

export const sortAndFilterByRating = ({ data, limit }: RecipeSortAndFilter) => {
    data.sort((a: Recipe, b: Recipe) => b.rating - a.rating)

    return data.slice(0, limit)
}

export const sortAndFilterByCreatedAt = ({ data, limit }: RecipeSortAndFilter) => {
    data.sort((a: Recipe, b: Recipe) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return data.slice(0, limit)
}
