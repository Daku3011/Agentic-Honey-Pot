import os
import google.generativeai as genai
import json
from typing import List
from app.models.schemas import Message, ExtractedIntelligence

class IntelligenceExtractor:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemma-3-4b-it')
        else:
            self.model = None

    async def extract(self, history: List[Message]) -> ExtractedIntelligence:
        if not self.model or not history:
            return ExtractedIntelligence()

        conversation_text = "\n".join([f"{m.sender}: {m.text}" for m in history])
        
        prompt = f"""
        Analyze the following conversation and extract any scam-related intelligence.
        Look for:
        - Bank account numbers
        - UPI IDs (e.g., xxx@upi)
        - Phishing links (URLs)
        - Phone numbers
        - Suspicious keywords used by the scammer

        Conversation:
        {conversation_text}

        Return the result in ONLY the following JSON format:
        {{
            "bankAccounts": [],
            "upiIds": [],
            "phishingLinks": [],
            "phoneNumbers": [],
            "suspiciousKeywords": []
        }}
        """

        try:
            response = self.model.generate_content(prompt)
            # Find JSON in response
            text = response.text
            start = text.find('{')
            end = text.rfind('}') + 1
            if start != -1 and end != -1:
                json_data = json.loads(text[start:end])
                return ExtractedIntelligence(**json_data)
        except Exception as e:
            print(f"Error in intelligence extraction: {e}")
        
        return ExtractedIntelligence()

intelligence_extractor = IntelligenceExtractor()
