import Link from 'next/link'

import Image from '@/components/Image'
import { getRecipes } from '@/services/recipes'

const Recipes = async () => {
    const recipes = await getRecipes()

    return (
        <>
            <h1 className='text-4xl mb-8'>Recipes</h1>

            <section className='flex gap-8 overflow-x-auto snap-x snap-proximity scroll-px-8 scrollbar scrollbar-inline'>
                {recipes.map((recipe) => (
                    <article className='shrink-0 w-48 mb-6 snap-center' key={recipe.id}>
                        <div className='w-full'>
                            <Link href={`/recipes/${recipe.slug}`}>{recipe?.image && <Image className='mb-2  rounded-2xl' src={recipe.image.sizes.portrait.url} alt={recipe.image.alt} />}</Link>
                            <h2 className='text-lg line-clamp-1'>{recipe.title}</h2>
                        </div>
                    </article>
                ))}
            </section>
        </>
    )
}

export default Recipes
