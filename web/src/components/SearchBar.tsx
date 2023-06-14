'use client'

import { useSearchParams } from 'next/navigation'

const SearchBar = ({ params }) => {
    const searchParam = useSearchParams()
    const query = searchParam.get('query')

    return (
        <>
            <form className='flex w-full md:w-96 mx-auto mt-4' action={`/recipes?${params.query}`}>
                <div className='relative flex w-full'>
                    <input
                        type='text'
                        autoComplete='off'
                        defaultValue={query}
                        name='query'
                        placeholder='Search...'
                        className='z-10 h-12 px-3 py-1 grow-[4] rounded-l-lg border-0 bg-gray-light text-alt-light placeholder:text-alt-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-alt-dark'
                    />

                    <button type='submit' className='w-30 grow-[1] rounded-r-lg bg-alt-dark px-4 py-2 hover:bg-primary-dark'>
                        Search
                    </button>
                </div>
            </form>
        </>
    )
}

export default SearchBar
