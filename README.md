## Run the app

```bash
cd app
npm install
npm run dev
```

Create `app/.env.local` with your model settings:

```
OPENROUTER_API_KEY=your_api_key
OPENROUTER_MODEL_NAME=openai/gpt-4o-mini # or any OpenRouter model id
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_TITLE=Portfolio AskMe
BASE_URL=http://localhost:3000
```

The AskMe route is now handled directly in Next.js at `/api/ask`.
