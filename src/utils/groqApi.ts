const GROQ_API_KEY = (import.meta as any).env?.VITE_GROQ_API_KEY
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

interface GroqMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export async function callGroqAPI(messages: GroqMessage[]): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('VITE_GROQ_API_KEY environment variable is not set')
  }

  try {
    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Groq API error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const data = (await response.json()) as GroqResponse
    const content = data.choices[0]?.message?.content
    
    if (!content) {
      throw new Error('No response content from Groq API')
    }

    return content
  } catch (error) {
    console.error('Error calling Groq API:', error)
    throw error
  }
}
