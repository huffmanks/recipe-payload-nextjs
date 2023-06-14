import { getRecipes, getRecipesBySearch } from '@/services/recipes'
import RecipesList from '@/components/RecipesList'

const Recipes = async ({ searchParams }) => {
    const searchQuery = searchParams.query?.toString().toLowerCase()
    const recipes = await getRecipesBySearch(searchQuery)

    // const recipes = await getRecipes()

    return (
        <>
            <h1 className='text-4xl mb-8'>Recipes</h1>

            {recipes && <RecipesList recipes={recipes} />}
        </>
    )
}

export default Recipes
