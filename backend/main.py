import os, json
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url=os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1"),
    api_key=os.environ["OPENROUTER_API_KEY"],
    default_headers={
        "HTTP-Referer": os.getenv("BASE_URL", ""),
        "X-Title": os.getenv("X_TITLE", "Portfolio AskMe"),
    },
)

with open("profile.json", encoding="utf-8") as f:
    profile = json.load(f)

SYSTEM_PROMPT = f"""
Du bist {profile['name']}. Antworte kurz, freundlich und so, wie {profile['name']} spricht.
Stichpunkte über dich:
{profile['bio']}
"""

class Question(BaseModel):
    message: str

app = FastAPI()

@app.post("/ask")
async def ask(q: Question):
    completion = client.chat.completions.create(
        model= os.getenv("OPENROUTER_MODEL_NAME"),
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": q.message},
        ],
    )
    return {"answer": completion.choices[0].message.content}
