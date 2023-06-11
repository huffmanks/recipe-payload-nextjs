import { Fragment } from 'react'
import { Metadata, ResolvingMetadata } from 'next'

import RichText from '@/components/RichText'
import Image from '@/components/Image'

import { getRecipeBySlug } from '@/services/recipes'

export async function generateMetadata({ params }, parent?: ResolvingMetadata): Promise<Metadata> {
    const recipe = await getRecipeBySlug(params.slug)

    return {
        title: recipe.title,
        description: recipe.description,
        keywords: recipe.keywords,
        themeColor: '#15202e',
        twitter: {
            title: recipe.title,
            description: recipe.description,
            images: [recipe.image.url, recipe.image.sizes.thumbnail.url],
        },
        openGraph: {
            title: recipe.title,
            description: recipe.description,
            type: 'website',
            images: [recipe.image.url, recipe.image.sizes.thumbnail.url],
            url: `${process.env.NEXT_PUBLIC_URL}/recipes/${params.slug}`,
        },
    }
}

const Recipe = async ({ params }) => {
    const recipe = await getRecipeBySlug(params.slug)

    return (
        <>
            {recipe && (
                <>
                    {recipe?.recipeSchema && <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(recipe.recipeSchema) }} />}
                    <header>
                        <h1 className='text-4xl mb-2'>{recipe.title}</h1>
                        {recipe.image && <Image className='mb-4' src={recipe.image.url} alt={recipe.image.alt} />}
                    </header>
                    <div className='border-s-4 border-slate-600 mb-10 ps-4'>{recipe.description}</div>
                    <section className='mb-4'>
                        <div>{recipe.datePublished.split('T')[0]}</div>
                        <div>
                            <span>By </span>
                            {recipe.author.name}
                        </div>
                    </section>
                    <section className='mb-8'>
                        <h2 className='text-2xl font-bold'>Ingredients</h2>
                        {recipe.ingredients.map((ingredient) => (
                            <Fragment key={ingredient.id}>
                                {!ingredient?.unit ? (
                                    <div>
                                        <span>{ingredient.amount} </span>
                                        <span>{ingredient.item}</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>{ingredient.amount} </span>
                                        <span>{ingredient.unit} </span>
                                        <span>{ingredient.item}</span>
                                    </div>
                                )}
                            </Fragment>
                        ))}
                    </section>

                    <section>
                        <h2 className='text-2xl font-bold'>Instructions</h2>
                        <RichText content={recipe.instructions} />
                    </section>
                </>
            )}
        </>
    )
}

export default Recipe
