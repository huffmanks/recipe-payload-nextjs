import Link from 'next/link'

import { Recipe } from '@cms-types'
import Image from './Image'

const RecipesList = ({ recipes }) => {
    return (
        <>
            <section className='grid grid-cols-2 gap-4 pb-8'>
                {recipes.map((recipe: Recipe) => (
                    <article key={recipe.id}>
                        <h2 className='line-clamp-1 text-lg'>{recipe.title}</h2>
                        <Link className='group outline-none' href={`/recipes/${recipe.slug}`}>
                            <div className='relative w-full after:absolute after:inset-0 after:h-full after:w-full after:rounded-2xl after:bg-[rgb(0_0_0_/_0.3)] after:opacity-0 after:transition-all after:duration-300 after:ease-in-out group-hover:after:scale-[.98] group-hover:after:opacity-100 group-focus:after:scale-[.98] group-focus:after:opacity-100'>
                                {recipe?.image && (
                                    <Image
                                        className='w-full rounded-lg transition-all duration-300 ease-in-out group-hover:scale-[.98] group-focus:scale-[.98]'
                                        src={recipe.image.sizes.thumbnail.url}
                                        alt={recipe.image.alt}
                                    />
                                )}
                            </div>
                        </Link>
                    </article>
                ))}
            </section>
        </>
    )
}

export default RecipesList
