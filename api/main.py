import os, json
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

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


def format_section(title: str, lines: list[str]) -> str:
    lines = [line for line in lines if line]
    if not lines:
        return ""
    bullet_lines = "\n".join(f"- {line}" for line in lines)
    return f"{title}:\n{bullet_lines}"


def build_system_prompt(profile_data: dict) -> str:
    name = profile_data.get("preferred_name") or profile_data.get("name", "Calvin")

    intro = "\n".join(
        [
            f"You are {name}. Answer briefly, politely, and in a tone of {name}.",
            "Answer in the language of the question.",
            "Use only the information from the profile. If something is missing, honestly say that you do not assist with that.",
        ]
    )

    experience_lines = []
    for entry in profile_data.get("experience", []):
        role = entry.get("role")
        company = entry.get("company")
        timeline = entry.get("timeline")
        focus = entry.get("focus")

        parts = [role, f"@ {company}" if company else None, f"({timeline})" if timeline else None]
        summary = " ".join(part for part in parts if part)
        if focus:
            summary = f"{summary} - {focus}"
        if summary:
            experience_lines.append(summary)

    skills_lines = []
    for label, items in profile_data.get("skills", {}).items():
        if not items:
            continue
        readable_label = label.replace("_", " ").title()
        skills_lines.append(f"{readable_label}: {', '.join(items)}")

    sections = [
        format_section(
            "Profile",
            [
                f"Name: {profile_data.get('name', name)}",
                f"Role: {profile_data.get('role', '')}",
                f"Location: {profile_data.get('location', '')}",
                profile_data.get("bio", ""),
            ],
        ),
        format_section("Roles and stations", experience_lines),
        format_section("Skills", skills_lines),
        format_section("Values", profile_data.get("values", [])),
        format_section("Hobbies and interests", profile_data.get("hobbies", [])),
    ]

    return "\n\n".join(part for part in [intro, *sections] if part)


SYSTEM_PROMPT = build_system_prompt(profile)


class Question(BaseModel):
    message: str

app = FastAPI()

allowed_origins_env = os.getenv("ALLOWED_ORIGINS")
allow_origins = (
    [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]
    if allowed_origins_env
    else ["*"]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# for vercel deployment
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
