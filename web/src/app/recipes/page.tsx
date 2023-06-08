import Link from 'next/link'

import Image from '@/components/Image'
import { getRecipes } from '@/services/recipes'

const Recipes = async () => {
    const recipes = await getRecipes()

    return (
        <>
            {recipes.map((recipe) => (
                <article className='mb-10' key={recipe.id}>
                    <Link href={`/recipes/${recipe.slug}`}>
                        <header>
                            <h1 className='text-4xl mb-2'>{recipe.title}</h1>

                            {recipe?.image && <Image className='mb-4' src={recipe.image.url} alt={recipe.image.alt} />}
                        </header>
                        <div className='border-s-4 border-alt-dark text-alt-light mb-10 ps-4'>{recipe.description}</div>
                        <section className='mb-4'>
                            <div>{recipe.datePublished.split('T')[0]}</div>
                            <div>
                                <span>By </span>
                                {recipe.author.name}
                            </div>
                        </section>
                    </Link>
                </article>
            ))}
        </>
    )
}

export default Recipes
