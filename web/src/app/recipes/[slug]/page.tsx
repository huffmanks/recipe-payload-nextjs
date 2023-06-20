import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'

import { getRecipeBySlug } from '@/services/recipes'

import RichText from '@/components/RichText'
import Image from '@/components/Image'

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

                    <header className='relative'>
                        {recipe.image && <Image src={recipe.image.sizes.hero.url} alt={recipe.image.alt} />}
                        <Link href='/' className='absolute left-4 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-surface-light pb-0.5 text-xl leading-none'>
                            &larr;
                        </Link>
                    </header>

                    <section className='relative bg-surface-light'>
                        <div className='absolute -top-4 h-8 w-full rounded-t-2xl bg-surface-light'>
                            <span className='absolute left-1/2 top-1/2 h-1.5 w-16 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-surface-muted'></span>
                        </div>
                        <div className='mx-6 pb-4 pt-6'>
                            <div className='mb-3 flex items-center justify-between'>
                                <div>
                                    <h1 className='text-xl font-semibold'>{recipe.title}</h1>
                                    <div className='text-xs text-type-muted'>By {recipe.author.name}</div>
                                </div>
                                <div className='font-semibold'>{recipe.rating}</div>
                            </div>
                            <div className='mb-5 flex gap-4 text-xs text-type-muted'>
                                <div>{recipe.cookTime.minutes}m</div>
                                <div>Easy</div>
                                <div>512 kcal</div>
                            </div>
                            <div className='mb-5'>
                                <h2 className='mb-1.5 text-lg font-semibold'>Description</h2>
                                <div className='text-sm text-type-muted'>{recipe.description}</div>
                            </div>
                            <div className='mb-8'>
                                <h2 className='mb-4 text-lg font-semibold'>Ingredients</h2>
                                <div className='grid gap-4'>
                                    {recipe.ingredients.map((ing) => (
                                        <div className='flex w-full gap-4'>
                                            <img className='h-8 w-8 rounded-lg object-cover' src='/memoji.png' alt='memoji' />
                                            <div className='w-full text-type-muted'>{ing.name}</div>
                                            <div className='inline-flex justify-end'>
                                                {ing.quantity}
                                                {ing.unit}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className='mb-4 text-lg font-semibold'>Instructions</h2>
                                <RichText content={recipe.instructions} />
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    )
}

export default Recipe
