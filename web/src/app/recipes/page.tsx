import { getRecipesBySearch } from '@/services/recipes'

import RecipesCard from '@/components/RecipesCard'
import SearchBar from '@/components/SearchBar'
import BottomNav from '@/components/BottomNav'

const Recipes = async ({ params, searchParams }) => {
    const searchQuery = searchParams.query?.toString().toLowerCase()
    const recipes = await getRecipesBySearch(searchQuery)

    return (
        <>
            <div className='mx-6 my-10'>
                <h1 className='mb-8 text-4xl'>Recipes</h1>
                <div className='mb-8'>
                    <SearchBar params={params} />
                </div>
                {recipes && <RecipesCard recipes={recipes} />}
            </div>
            <BottomNav />
        </>
    )
}

export default Recipes
