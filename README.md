## run frontend

npm install
npm run dev

## run backend
cd /api

python -m venv .venv

### on windows:
.venv/Scripts/activate
### on linux:
source .venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload --port 8000

Set `ALLOWED_ORIGINS` in `api/.env` (comma separated) to the frontend URL you are using, e.g. `http://localhost:3000` for local dev or your deployed site, so FastAPI sends the correct CORS headers.
