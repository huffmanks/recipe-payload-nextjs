'use client'

import SearchBar from '@/components/SearchBar'
import CategoriesList from '@/components/CategoriesList'
import RecipesList from '@/components/RecipesList'
import { sortAndFilterByRating } from '@/utilities'
import { useRecipes } from '@/services/context'

interface Props {
    params: { query: string }
}

const Home = ({ params }: Props) => {
    const { recipes, categories } = useRecipes()

    const recommendedRecipes = sortAndFilterByRating({ data: recipes, limit: 5 })

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

                <div className='mb-8'>
                    <h2 className='mb-4 text-xl font-semibold'>Categories</h2>
                    <CategoriesList categories={categories} />
                </div>

                <div className='mb-8'>
                    <h2 className='mb-4 text-xl font-semibold'>Recommendations</h2>
                    <RecipesList recipes={recommendedRecipes} />
                </div>
            </div>
        </>
    )
}

export default Home
