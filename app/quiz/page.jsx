'use client'

import { useEffect, useState } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'

import { motion, useSpring } from 'framer-motion'

import LoadingScreen from '../components/LoadingScreen'
import Question from '../components/Question'


import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'

const QuizPage = () => {
    const params = useSearchParams()
    const router = useRouter()

    const language = params.get('language')
    const difficulty = params.get('difficulty')
    const topic = params.get('topic')
    const numQuestions = Number(params.get('numQuestions'))

    const [quiz, setQuiz] = useState([]) // array of questions
    const [isLoading, setIsLoading] = useState(false)

    const [numSubmitted, setNumSubmitted] = useState(0)
    const [numCorrect, setNumCorrect] = useState(0)

    const [progress, setProgress] = useState(0)

    const [responseStream, setResponseStream] = useState('')

    const scaleX = useSpring(progress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.002,
    })

    useEffect(() => {
        const generateQuestions = async () => {
            console.log('loading...')
            setIsLoading(true)

            let responseText = ''

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        language,
                        difficulty,
                        topic,
                        numQuestions,
                    }),
                })


                if (!response.ok) {
                    throw new Error('Failed to fetch data', response.statusText)
                }

                const data = response.body
                if (!data) {
                    return
                }

                const reader = data.getReader()
                const decoder = new TextDecoder()

                let done = false

                while (!done) {

                    const { value, done: doneReading } = await reader.read()

                    // console.log('doneReading', doneReading)

                    done = doneReading
                    const chunkValue = decoder.decode(value)

                    responseText += chunkValue

                    setResponseStream((prev) => prev + chunkValue)
                }

                // streaming way
                let cleanedResponse = responseText.replace(/\n/g, '')
                let jsonResponse = JSON.parse(cleanedResponse)
                setQuiz(jsonResponse.questions)

            } catch (err) {
                console.log('Quiz Page:', err)
            } finally {
                setIsLoading(false) 
            }
        }
        generateQuestions()
    }, [])

    useEffect(() => {
        hljs.highlightAll()
    }, [quiz])

    useEffect(() => {
        setProgress(numSubmitted / numQuestions)

        if (numSubmitted === numQuestions && numQuestions !== 0) {
            const score = numCorrect / numSubmitted
            router.push(`/end-screen?score=${score}`)
        }
    }, [numSubmitted])

    useEffect(() => {
        scaleX.set(progress)
    }, [progress])

    return (
        <div>

            <motion.div className='progress-bar' style={{ scaleX }} />
            {isLoading ? (
                <>
                    <LoadingScreen responseStream={responseStream} />
                </>
            ) : (
                <div className='pt-12'>
                    {quiz?.map((question, index) => (
                        
                        <div className='mb-12' key={index}>
                            <Question
                                question={question}
                                id={index}
                                key={index}
                                setNumSubmitted={setNumSubmitted}
                                setNumCorrect={setNumCorrect}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default QuizPage
