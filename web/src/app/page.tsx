import { getRecipes } from '@/services/recipes'
import { sortAndFilterByRating, sortAndFilterByCreatedAt } from '@/utilities'

import SearchBar from '@/components/SearchBar'
import CategoriesList from '@/components/CategoriesList'
import RecipesList from '@/components/RecipesList'
import BottomNav from '@/components/BottomNav'

interface Props {
    params: { query: string }
}

const Home = async ({ params }: Props) => {
    const recipes = await getRecipes()

    const recommendedRecipes = sortAndFilterByRating({ data: recipes, limit: 5 })
    const newRecipes = sortAndFilterByCreatedAt({ data: recipes, limit: 5 })

    return (
        <>
            <div className='mx-6 my-10'>
                <div className='mb-4 flex items-center justify-between'>
                    <div>
                        <div className='mb-1 text-type-muted'>Hello, Anne</div>
                        {/*
                            // @ts-ignore */}
                        <h1 className='text-2xl font-semibold' style={{ textWrap: 'balance' }}>
                            What would you like to cook today?
                        </h1>
                    </div>
                    <div className='h-20 w-20'>
                        <img className='rounded-full object-cover' src='/memoji.png' alt='memoji' />
                    </div>
                </div>
                <div className='mb-8'>
                    <SearchBar params={params} />
                </div>

                <div className='mb-12'>
                    <h2 className='mb-4 text-xl font-semibold'>Categories</h2>
                    <CategoriesList />
                </div>

                <div className='mb-12'>
                    <h2 className='mb-4 text-xl font-semibold'>Recommendations</h2>
                    <RecipesList recipes={recommendedRecipes} isTopRated />
                </div>

                <div className='mb-12'>
                    <h2 className='mb-4 text-xl font-semibold'>Recipes of the Week</h2>
                    <RecipesList recipes={newRecipes} isNew />
                </div>

                <div className='h-96'></div>
            </div>
            <BottomNav />
        </>
    )
}

export default Home
