'use client'

import { useSearchParams } from 'next/navigation'

const SearchBar = ({ params }) => {
    const searchParam = useSearchParams()
    const query = searchParam.get('query')

    return (
        <>
            <form className='flex w-full' action={`/recipes?${params.query}`}>
                <div className='search-bar flex w-full items-center rounded-full bg-surface-muted text-sm shadow-sm  focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary'>
                    <input type='text' autoComplete='off' defaultValue={query} name='query' placeholder='Search any recipes' className='grow rounded-l-full bg-transparent px-6 py-4 outline-none' />

                    <div className='search-divider h-3/5 w-0.5 bg-type-muted transition-colors duration-1000 ease-in-out'></div>

                    <button
                        type='submit'
                        className='search-btn group flex h-full items-center justify-center rounded-r-full pl-3 pr-4 text-3xl outline-none transition-colors duration-300 ease-in-out hover:bg-primary focus:bg-primary'>
                        <svg
                            className='fill-primary transition-colors duration-300 ease-in-out group-hover:fill-type-dark group-focus:fill-type-dark'
                            strokeWidth='0'
                            viewBox='0 0 24 24'
                            height='1em'
                            width='1em'
                            xmlns='http://www.w3.org/2000/svg'>
                            <g>
                                <path fill='none' d='M0 0h24v24H0z'></path>
                                <path d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z'></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </form>
        </>
    )
}

export default SearchBar
