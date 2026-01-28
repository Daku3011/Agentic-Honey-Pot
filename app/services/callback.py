import requests
import os
from typing import Dict, Any
from app.models.schemas import ExtractedIntelligence

class CallbackService:
    def __init__(self):
        self.url = "https://hackathon.guvi.in/api/updateHoneyPotFinalResult"

    async def send_final_result(self, session_id: str, scam_detected: bool, total_messages: int, intelligence: ExtractedIntelligence, agent_notes: str):
        payload = {
            "sessionId": session_id,
            "scamDetected": scam_detected,
            "totalMessagesExchanged": total_messages,
            "extractedIntelligence": {
                "bankAccounts": intelligence.bankAccounts,
                "upiIds": intelligence.upiIds,
                "phishingLinks": intelligence.phishingLinks,
                "phoneNumbers": intelligence.phoneNumbers,
                "suspiciousKeywords": intelligence.suspiciousKeywords
            },
            "agentNotes": agent_notes
        }

        try:
            response = requests.post(self.url, json=payload, timeout=10)
            response.raise_for_status()
            print(f"Successfully sent callback for session {session_id}")
            return True
        except Exception as e:
            print(f"Error sending callback for session {session_id}: {e}")
            return False

callback_service = CallbackService()
