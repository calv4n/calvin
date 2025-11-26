## run frontend

npm install
npm run dev

## run backend
cd /backend

python -m venv .venv

### on windows:
.venv/Scripts/activate
### on linux:
source .venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload --port 8000