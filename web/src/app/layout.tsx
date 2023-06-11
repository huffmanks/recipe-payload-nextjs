import { Inter } from 'next/font/google'
import BottomNav from '@/components/BottomNav'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Recipe App',
    description: 'Find your recipes for your next meal.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={`${inter.className} bg-main-dark text-main-light`}>
                <main className='max-w-5xl mx-auto my-8 p-8 min-h-[200vh]'>{children}</main>
                <BottomNav />
            </body>
        </html>
    )
}
