import Link from 'next/link'

import { Recipe } from '@cms-types'
import Image from './Image'

const RecipesList = ({ recipes }) => {
    return (
        <>
            <h1 className='mb-8 text-4xl'>Recipes</h1>

            <section className='flex snap-x snap-mandatory scroll-px-8 gap-8 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary scrollbar-thumb-rounded-full'>
                {recipes.map((recipe: Recipe) => (
                    <article className='mb-6 w-48 shrink-0 snap-center snap-always' key={recipe.id}>
                        <Link className='w-full' href={`/recipes/${recipe.slug}`}>
                            {recipe?.image && <Image className='mb-2 w-full rounded-2xl' src={recipe.image.sizes.portrait.url} alt={recipe.image.alt} />}
                        </Link>
                        <h2 className='line-clamp-1 text-lg'>{recipe.title}</h2>
                    </article>
                ))}
            </section>
        </>
    )
}

export default RecipesList
