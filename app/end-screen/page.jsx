'use client'

import { useState, useEffect } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'

import { pickRandom } from '../utils'

import { endMessages } from '../constants/endMessages'

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import { gifs } from '../constants/gifs'

const EndScreen = () => {

    const router = useRouter()
    const params = useSearchParams()

    const score = Number(params.get('score'))

    const [message, setMessage] = useState('')
    const [gif, setGif] = useState('')


    const { width, height } = useWindowSize()

    const handlePlayAgain = () => {
        router.push('/')
    }

    useEffect(() => {
        let grade = ''
        if (score === 1) {
            grade = 'perfect'
        } else if (score >= 0.7) {
            grade = 'good'
        } else {
            grade = 'bad'
        }

        let randomMessage = pickRandom(endMessages[grade])
        setMessage(randomMessage)


        let randomGif = pickRandom(gifs[grade])
        setGif(randomGif)
    }, [])

    return (
        <div className='min-h-screen grid place-items-center '>

            {score >= 0.8 && <Confetti width={width} height={height} className='overflow-hidden'/>}

            <div className='max-w-3xl flex flex-col items-center z-10'>
                <h2 className='text-7xl'>Score: {score * 100}%</h2>
                <iframe
                    src={gif}
                    width='480'
                    height='269'
                    // frameBorder='0'
                    className='giphy-embed mt-16'
                    allowFullScreen
                ></iframe>

                <p className='text-3xl mt-12 text-center'>{message}</p>

                <button
                    // className='border border-white px-6 py-3 rounded mt-12 text-lg'
                    className='inline-block border-2 border-emerald-400 rounded text-emerald-400 text-center uppercase text-lg font-semibold mx-auto mt-8 px-6 py-2 hover:bg-emerald-400/40 hover:border-emerald-400 hover:text-white duration-75 active:bg-emerald-600'
                    onClick={handlePlayAgain}
                >
                    Back to home
                </button>
            </div>
        </div>
    )
}
export default EndScreen


