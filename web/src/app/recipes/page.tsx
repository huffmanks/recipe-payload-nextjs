import { getRecipesBySearch } from '@/services/recipes'
import RecipesList from '@/components/RecipesList'

const Recipes = async ({ searchParams }) => {
    const searchQuery = searchParams.query?.toString().toLowerCase()
    const recipes = await getRecipesBySearch(searchQuery)

    return (
        <>
            <div className='mx-6 my-10'>{recipes && <RecipesList recipes={recipes} />}</div>
        </>
    )
}

export default Recipes
