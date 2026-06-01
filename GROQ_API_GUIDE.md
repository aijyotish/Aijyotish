# Groq API Integration Guide

This document explains how the app uses Groq API and how to extend it to other features.

## Current Setup

- **Model**: `llama-3.3-70b-versatile`
- **Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
- **API Key**: Environment variable `VITE_GROQ_API_KEY`

## Using the Groq API in Your Components

The app provides a reusable `callGroqAPI` function in `src/utils/groqApi.ts` for making API calls.

### Example Usage

```typescript
import { callGroqAPI } from '../utils/groqApi'

// In your component
const response = await callGroqAPI([
  {
    role: 'system',
    content: 'You are a helpful assistant.'
  },
  {
    role: 'user',
    content: 'Your user message here'
  }
])

console.log(response) // The AI response string
```

### Error Handling

The function throws errors if:
- `VITE_GROQ_API_KEY` is not set
- The API request fails
- No response content is returned

Always wrap calls in try-catch blocks:

```typescript
try {
  const response = await callGroqAPI(messages)
  // Handle response
} catch (error) {
  console.error('API error:', error)
  // Show error to user
}
```

## Integrating with Other Features

To use Groq API with other astrology features:

1. **Kundali**: Generate personalized birth chart interpretations
2. **Love Compatibility**: Provide AI-enhanced compatibility analysis
3. **Numerology**: Generate in-depth numerology readings

### Example: Kundali Enhancement

```typescript
const prompt = `Provide astrological insights for someone born on ${date} at ${time} in ${place}`
const response = await callGroqAPI([
  {
    role: 'system',
    content: 'You are an expert Vedic astrologer.'
  },
  {
    role: 'user',
    content: prompt
  }
])
```

## API Rate Limiting

The Groq API has rate limits. Check your API key quota at [console.groq.com](https://console.groq.com).

## Troubleshooting

### "VITE_GROQ_API_KEY environment variable is not set"
- Create `.env.local` file with your API key
- Restart the dev server after adding the key

### API errors or 401 responses
- Verify your API key is correct
- Check it's not expired at [console.groq.com](https://console.groq.com/keys)
- Ensure `.env.local` is in the project root directory

### Slow responses
- This is normal for the first request
- Groq usually responds faster on subsequent requests
- The free tier has rate limits

## Configuration

To modify the API parameters, edit `src/utils/groqApi.ts`:

```typescript
body: JSON.stringify({
  model: MODEL,
  messages: messages,
  temperature: 0.7,  // Lower = more deterministic, Higher = more creative
  max_tokens: 1024   // Increase for longer responses
})
```
