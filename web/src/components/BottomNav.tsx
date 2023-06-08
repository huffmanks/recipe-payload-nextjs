import Link from 'next/link'

const BottomNav = () => {
    return (
        <nav className='fixed bottom-0 left-0 z-50 w-full h-16 bg-primary-dark border-t border-gray-light'>
            <div className='grid h-full max-w-lg grid-cols-4 mx-auto font-medium'>
                <button type='button' className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-dark group'>
                    <Link href='/'>
                        <svg className='w-6 h-6 mb-1 text-primary-light group-hover:text-main-light' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                            <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'></path>
                        </svg>
                    </Link>
                </button>
                <button type='button' className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-dark group'>
                    <svg className='w-6 h-6 mb-1 text-primary-light group-hover:text-main-light' fill='currentColor' viewBox='0 -960 960 960' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                        <path d='M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z' />
                    </svg>
                    {/* <svg className='w-6 h-6 mb-1 text-primary-light group-hover:text-main-light' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                        <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z'></path>
                        <path
                            clipRule='evenodd'
                            fillRule='evenodd'
                            d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'></path>
                    </svg> */}
                </button>
                <button type='button' className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-dark group'>
                    <svg className='w-6 h-6 mb-1 text-primary-light group-hover:text-main-light' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                        <path d='M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z'></path>
                    </svg>
                </button>
                <button type='button' className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-dark group'>
                    <svg className='w-6 h-6 mb-1 text-primary-light group-hover:text-main-light' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                        <path
                            clipRule='evenodd'
                            fillRule='evenodd'
                            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'></path>
                    </svg>
                </button>
            </div>
        </nav>
    )
}

export default BottomNav
