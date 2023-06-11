import { getRecipesByCuisine } from '@/services/recipes'
import Link from 'next/link'

const Home = async ({ params, searchParams }: { params: { cuisine: string }; searchParams: { [key: string]: string | string[] | undefined } }) => {
    const searchQuery = searchParams.query?.toString().toLowerCase()
    console.log('*** Search Params ***', searchParams)
    const recipes = await getRecipesByCuisine(searchParams.query.toString())

    console.log(recipes)

    return (
        <>
            <h1>Home</h1>
            <form className='flex w-full' action={`/?${params.cuisine}`}>
                <div className='relative flex w-full'>
                    <input
                        type='text'
                        autoComplete='off'
                        defaultValue={searchQuery?.toString()}
                        name='query'
                        placeholder='SEO...'
                        className='z-10 h-12 grow-[4] rounded-l-lg border-0 bg-gray-900 text-gray-100 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400'
                    />
                    <div className='absolute -inset-0.5 -z-10 animate-tilt rounded-lg bg-gradient-to-r from-cyan-300 to-sky-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200'></div>
                    <button type='submit' className='w-30 grow-[1] rounded-r-lg bg-gray-950 px-4 py-2 text-white hover:bg-gray-900'>
                        Search
                    </button>
                </div>
            </form>
            <Link href='/recipes'>Recipes</Link>

            {recipes &&
                recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <div>{recipe.title}</div>
                        <div>{recipe.cuisine.name}</div>
                    </div>
                ))}
        </>
    )
}

export default Home
