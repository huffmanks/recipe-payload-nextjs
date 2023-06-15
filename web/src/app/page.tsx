import Link from 'next/link'

import SearchBar from '@/components/SearchBar'
import CategoriesList from '@/components/CategoriesList'

interface Props {
    params: { query: string }
}

const Home = ({ params }: Props) => {
    return (
        <>
            <div className='mx-6 my-10'>
                <div className='mb-4 flex items-center justify-between'>
                    <div>
                        <div className='mb-1 text-type-muted'>Hello, Anne</div>
                        {/*
                            // @ts-ignore */}
                        <h1 className='text-2xl font-semibold' style={{ textWrap: 'balance' }}>
                            What would you like to cook today?
                        </h1>
                    </div>
                    <div className='h-20 w-20'>
                        <img className='rounded-full object-cover' src='/memoji.png' alt='memoji' />
                    </div>
                </div>
                <div className='mb-8'>
                    <SearchBar params={params} />
                </div>

                <div className='mb-8'>
                    <CategoriesList />
                </div>
            </div>
        </>
    )
}

export default Home
