import dotenv from 'dotenv'
import OpenAI from 'openai'
dotenv.config()

const client = new OpenAI({
  apiKey: process.env.OPEN_IA_API_KEY,
})

client.chat.completions
  .create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'user',
        content: 'Escreva uma frase sobre automações n8n',
      },
    ],
  })
  .then((completions) => {
    console.log(completions.choices[0].message.content)
  })

// const response = await client.responses.create({
//   model: 'gpt-4.1',
//   input: 'Write a one-sentence bedtime story about a unicorn.',
// })

// console.log('API Key', process.env.OPEN_IA_API_KEY)
