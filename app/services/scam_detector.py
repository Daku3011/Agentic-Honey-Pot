import os
import google.generativeai as genai
from typing import List
from app.models.schemas import Message

class ScamDetector:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemma-3-4b-itpro')
        else:
            self.model = None

    async def detect(self, message: str, history: List[Message]) -> bool:
        if not self.model:
            print("DEBUG: Using Keyword Fallback (No Model)")
            # Fallback to simple keyword detection if no API key
            keywords = ["bank", "blocked", "verify", "upi", "urgent", "account", "suspended", "password", "otp", "lottery", "prize", "click", "link", "win", "winner"]
            return any(k in message.lower() for k in keywords)

        prompt = f"""
        Analyze the following message for scam intent. 
        A scam message usually involves:
        - Urgency (e.g., "account blocked", "verify immediately")
        - Requests for sensitive information (UPI, Bank details, OTP)
        - Phishing links
        - Fake offers or prizes (lottery, jobs, loans)

        Message: {message}
        
        Previous Conversation Context:
        {[m.text for m in history]}

        Respond with ONLY 'TRUE' if it is likely a scam, and 'FALSE' otherwise.
        """
        
        try:
            response = self.model.generate_content(prompt)
            print(f"DEBUG: Model Response: {response.text}")
            return "TRUE" in response.text.upper()
        except Exception as e:
            print(f"Error in scam detection: {e}")
            # Fallback on error
            keywords = ["bank", "blocked", "verify", "upi", "urgent", "account", "suspended", "password", "otp", "lottery", "prize", "click", "link", "win", "winner"]
            return any(k in message.lower() for k in keywords)

scam_detector = ScamDetector()
