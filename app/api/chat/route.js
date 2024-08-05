

import { OpenAIStream } from '../../utils/OpenAIStream'

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API Key')
}

export const runtime = 'edge' 
export async function POST(request) {
    const { language, difficulty, topic, numQuestions } = await request.json()

    console.log(language, difficulty, topic, numQuestions)

    const prompt = `give me 10 multiple choice questions about ${topic} The questions should be at an ${difficulty} level. Return your answer entirely in the form of a JSON object. The JSON object should have a key named "questions" which is an array of the questions. Each quiz question should include the choices, the answer, and a brief explanation of why the answer is correct. Don't include anything other than the JSON. The JSON properties of each question should be "query" (which is the question), "choices", "answer", and "explanation". The choices shouldn't have any ordinal value like A, B, C, D or a number like 1, 2, 3, 4. The answer should be the 0-indexed number of the correct choice.`

    const payload = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 2048,
        stream: true,                         
        n: 1,
    }
    
    const stream = await OpenAIStream(payload)
    return new Response(stream)
}
