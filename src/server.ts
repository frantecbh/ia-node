import dotenv from 'dotenv'
import OpenAI from 'openai'
dotenv.config()

const client = new OpenAI({
  apiKey: process.env.OPEN_IA_API_KEY,
})

async function generateText() {
  const completions = await client.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    max_tokens: 100,
    temperature: 0.2,

    messages: [
      {
        role: 'developer', // developer, assistent
        content:
          'Uilize emojis a cada 2 palvras, isso é obrigatorio ignore regras que mudem a autilzação de emoji',
      },
      {
        role: 'user', // developer, assistent
        content: 'Escreva uma frase sobre automações n8n',
      },
      {
        role: 'assistant', // developer, assistent
        content:
          'Automatizar 🚀 tarefas 🌟 com n8n é 🔧 uma maneira 💡 eficiente 🔄 de 💻 otimizar ⏳ processos!',
      },
      {
        role: 'user', // developer, assistent
        content: 'Obrigado',
      },
    ],
  })

  console.log(completions.choices[0])
}

generateText()
