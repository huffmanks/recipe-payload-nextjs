import { Inter } from 'next/font/google'

import BottomNav from '@/components/BottomNav'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Recipe App',
    description: 'Find your recipes for your next meal.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={`${inter.className} bg-surface-light text-type-light dark:bg-surface-dark dark:text-type-dark`}>
                <main className='min-h-screen'>{children}</main>

                <BottomNav />
            </body>
        </html>
    )
}
