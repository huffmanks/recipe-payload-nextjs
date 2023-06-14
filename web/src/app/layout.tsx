import { Inter } from 'next/font/google'

import SearchBar from '@/components/SearchBar'
import BottomNav from '@/components/BottomNav'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Recipe App',
    description: 'Find your recipes for your next meal.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
}

interface Props {
    params: { query: string }
    children: React.ReactNode
}

export default function RootLayout({ params, children }: Props) {
    return (
        <html lang='en'>
            <body className={`${inter.className} bg-main-dark text-main-light`}>
                <SearchBar params={params} />

                <main className='max-w-5xl mx-auto my-8 p-8 min-h-[200vh]'>{children}</main>

                <BottomNav />
            </body>
        </html>
    )
}
