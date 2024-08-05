'use client'

import './globals.css'

import { Inter, Poppins, Lato } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: '400' })

const inter = Inter({ subsets: ['latin'] })
const lato = Lato({ subsets: ['latin'], weight: '400' })


import Script from 'next/script'

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <head>
                <title>vision mind</title>
                <link rel="icon" href="my-favicon-32x32.png" type="image/x-icon"></link>
            </head>
            <body className={`${poppins.className} relative`}>
                <div className='bg-grid'>
                    <div className='gradient' />
                </div>

                

                <main className='relative z-10 max-w-7xl mx-auto sm:px-16 px-6'>
                    {children}
                </main>
            </body>
            
        </html>
    )
}
