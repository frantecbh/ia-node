import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'

import { z } from 'zod'
dotenv.config()

const app = express()

app.use(express.json())

const client = new OpenAI({
  apiKey: process.env.OPEN_IA_API_KEY,
})
const produtosSchema = z.object({
  produtos: z.array(z.string()),
})
app.post('/generate', async (request: Request, response: Response) => {
  try {
    const completions = await client.beta.chat.completions.parse({
      model: 'gpt-4o-mini-2024-07-18',
      max_tokens: 100,
      temperature: 0.2,
      // response_format: { type: 'json_object' },
      response_format: zodResponseFormat(produtosSchema, 'produtos_schema'),
      messages: [
        {
          role: 'developer', // developer, assistent
          content:
            // 'Liste três produtos que atendam a necessidade do usuário. Responda em JSON no formato {produtos: string[]}',
            'Liste três produtos que atendam a necessidade do usuário,',
        },
        {
          role: 'user', // developer, assistent
          content: request.body.message,
        },
      ],
    })
    response.status(200).json(completions.choices[0].message.parsed?.produtos)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Internal server error' })
  }

  // const output = JSON.parse(completions.choices[0].message.content ?? '')

  // const schemaOutput = z.object({
  //   produtos: z.array(z.string()),
  // })

  // const result = schemaOutput.safeParse(output)

  // if (result.error) {
  //   return response.status(500).end()
  // }
})

export { app }
