# Aijyotish Astrology App

A React astrology application with Kundali, Rashifal, Love Compatibility, and Numerology features in English and Gujarati.

## Features

- Kundali calculator with birth detail entry
- Rashifal horoscope based on zodiac sign
- Love compatibility score for couples
- Numerology life path and destiny numbers
- English and Gujarati bilingual interface

## Setup

### 1. Install dependencies:

```bash
npm install
```

### 2. Configure Groq API

The Rashifal feature uses Groq API to generate dynamic horoscope readings. You need to set up your API key:

1. Get your free API key from [Groq Console](https://console.groq.com/keys)
2. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Add your Groq API key to `.env.local`:
   ```
   VITE_GROQ_API_KEY=your_actual_api_key_here
   ```

### 3. Run locally:

```bash
npm run dev
```
```

Build for production:

```bash
npm run build
```

## Project structure

- `src/App.tsx` — main application layout and language switcher
- `src/features` — astrology feature screens and calculators
- `src/data/translations.ts` — English and Gujarati text content

Enjoy exploring astrology in both languages!

