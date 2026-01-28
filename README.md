# Agentic Honey-Pot Run Guide

Follow these steps to get the system up and running.

## 1. Prerequisites

- Python 3.8+
- Node.js & npm
- Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

## 2. Environment Setup

Create a `.env` file in the root directory and add your credentials:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
SECRET_API_KEY=your_custom_api_key_for_auth
```

## 3. Run the Backend (FastAPI)

The backend handles scam detection and the autonomous agent logic.

```bash
# Create a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

The backend will be running at `http://localhost:8000`.

## 4. Run the Frontend Dashboard (React)

The dashboard provides a visual interface for monitoring active honey-pot sessions.

```bash
cd dashboard

# Install dependencies
npm install

# Run the dev server
npm run dev
```

The dashboard will be running at `http://localhost:5173`.

## 5. Testing the API

You can use the provided smoke test script to simulate a scam message:

```bash
# In a new terminal (with venv activated)
python test_api.py
```

### Example API Call (cURL)

```bash
curl -X POST "http://localhost:8000/api/message" \
     -H "x-api-key: your_custom_api_key" \
     -H "Content-Type: application/json" \
     -d '{
       "sessionId": "test-session-001",
       "message": {
         "sender": "scammer",
         "text": "Your account is blocked. Verify now: http://scam.cc",
         "timestamp": "2026-01-27T22:30:00Z"
       },
       "conversationHistory": []
     }'
```
