import Link from 'next/link'

import { Category } from '@cms-types'
import { getCategories } from '@/services/categories'

const CategoriesList = async () => {
    const categories = await getCategories()

    return (
        <>
            <section className='flex snap-x snap-proximity scroll-px-8 gap-4 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary scrollbar-thumb-rounded-full'>
                {categories.map((category: Category) => (
                    <>
                        <Link
                            href={`/recipes?query=${category.name.toLowerCase()}`}
                            aria-label={`search for ${category.name} recipes`}
                            className='group mb-6 flex h-20 w-20 shrink-0 cursor-pointer snap-center flex-col items-center justify-center gap-2 rounded-lg bg-surface-muted text-xl outline-none transition-colors duration-300 ease-in-out hover:bg-primary focus:bg-primary'
                            key={category.id}>
                            <svg
                                className='fill-primary transition-colors duration-300 ease-in-out group-hover:fill-type-dark group-focus:fill-type-dark'
                                stroke-width='0'
                                viewBox='0 0 24 24'
                                height='1em'
                                width='1em'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path fill='none' d='M0 0h24v24H0V0z'></path>
                                <path d='M4 19h16v2H4zM20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2a2 2 0 002-2V5c0-1.11-.89-2-2-2zm-4 10c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V5h10v8zm4-5h-2V5h2v3z'></path>
                            </svg>
                            <h4 className='text-sm text-type-muted transition-colors duration-300 ease-in-out group-hover:text-type-dark group-focus:text-type-dark'>{category.name}</h4>
                        </Link>
                    </>
                ))}
            </section>
        </>
    )
}

export default CategoriesList
