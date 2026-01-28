import os
from fastapi import FastAPI, Header, HTTPException, Depends
from dotenv import load_dotenv
from app.models.schemas import RequestBody, ResponseBody
from app.api.endpoints import router as api_router

load_dotenv()

app = FastAPI(title="Agentic Honey-Pot API")

SECRET_API_KEY = os.getenv("SECRET_API_KEY", "your-fallback-secret-key")

async def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != SECRET_API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return x_api_key

app.include_router(api_router, prefix="/api", dependencies=[Depends(verify_api_key)])

@app.get("/")
async def root():
    return {"message": "Agentic Honey-Pot is active"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
