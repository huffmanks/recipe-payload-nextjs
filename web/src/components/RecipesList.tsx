import Link from 'next/link'

import { Recipe } from '@cms-types'
import Image from './Image'

interface Props {
    recipes: Recipe[]
    isTopRated?: boolean
    isNew?: boolean
}

const RecipesList = ({ recipes, isTopRated, isNew }: Props) => {
    return (
        <>
            <section className='flex snap-x snap-mandatory scroll-px-8 gap-8 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary scrollbar-thumb-rounded-full'>
                {recipes.map((recipe: Recipe) => (
                    <article className={`mb-6 shrink-0 snap-center snap-always ${isNew ? 'w-96' : 'w-48'}`} key={recipe.id}>
                        <Link className='group outline-none' href={`/recipes/${recipe.slug}`}>
                            <div className='relative w-full after:absolute after:inset-0 after:h-full after:w-full after:rounded-2xl after:bg-[rgb(0_0_0_/_0.3)] after:opacity-0 after:transition-all after:duration-300 after:ease-in-out group-hover:after:scale-[.98] group-hover:after:opacity-100 group-focus:after:scale-[.98] group-focus:after:opacity-100'>
                                {recipe?.image && (
                                    <Image
                                        className='mb-2 h-72 w-full rounded-2xl transition-all duration-300 ease-in-out group-hover:scale-[.98] group-focus:scale-[.98]'
                                        src={recipe.image.sizes.hero.url}
                                        alt={recipe.image.alt}
                                    />
                                )}
                            </div>
                        </Link>
                        <h2 className='line-clamp-1 text-lg'>{recipe.title}</h2>
                        {isTopRated && <div className='text-sm text-type-muted'>{recipe.rating}</div>}
                        {isNew && <div className='text-sm text-type-muted'>By {recipe.author.name}</div>}
                    </article>
                ))}
            </section>
        </>
    )
}

export default RecipesList
