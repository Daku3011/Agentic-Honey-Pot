import os
import google.generativeai as genai
from typing import List
from app.models.schemas import Message, RequestBody

class AgentManager:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash-latest')
        else:
            self.model = None

    async def get_response(self, payload: RequestBody) -> str:
        if not self.model:
            return "I'm sorry, I don't understand. Could you explain why my account is being blocked?"

        persona = """
        You are a believable, slightly gullible, and concerned human named 'Rahul'. 
        You have received a message that might be a scam. 
        Your goal is to:
        1. Maintain a believable human persona.
        2. Engage the scammer to keep them talking.
        3. Do NOT reveal that you suspect it's a scam.
        4. Ask clarifying questions that encourage the scammer to share more details (like payment IDs, links, or bank info).
        5. Be hesitant but cooperative enough to keep them interested.
        6. Keep responses brief and conversational (like an SMS or WhatsApp chat).
        """

        history_text = "\n".join([f"{m.sender}: {m.text}" for m in payload.conversationHistory])
        current_msg = f"scammer: {payload.message.text}"
        
        prompt = f"""
        {persona}

        Chat History:
        {history_text}
        
        Latest Message:
        {current_msg}

        Your Response as Rahul:
        """

        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Error in agent response: {e}")
            return "Why do I need to do this?"

agent_manager = AgentManager()
