from fastapi import APIRouter, HTTPException
from app.models.schemas import RequestBody, ResponseBody, EngagementMetrics
from app.services.scam_detector import scam_detector
from app.services.agent_manager import agent_manager
from app.services.intelligence_extractor import intelligence_extractor
from app.services.callback import callback_service

router = APIRouter()

# Simple in-memory session store (In a real app, use Redis or a DB)
sessions = {}

@router.post("/message", response_model=ResponseBody)
async def handle_message(payload: RequestBody):
    session_id = payload.sessionId
    
    # 1. Detect if it's a scam
    is_scam = await scam_detector.detect(payload.message.text, payload.conversationHistory)
    
    if not is_scam:
        return ResponseBody(
            status="success",
            scamDetected=False,
            agentNotes="No scam detected in the initial message."
        )

    # 2. Extract intelligence from the entire history + current message
    all_msgs = payload.conversationHistory + [payload.message]
    intelligence = await intelligence_extractor.extract(all_msgs)
    
    # 3. Get Agent's response
    agent_msg = await agent_manager.get_response(payload)
    
    # Update local session tracking (for metrics)
    if session_id not in sessions:
        sessions[session_id] = {
            "start_time": payload.message.timestamp,
            "msg_count": len(all_msgs) + 1 # +1 for the response we are about to send
        }
    else:
        sessions[session_id]["msg_count"] += 2 # User msg + Agent response
    
    # 4. Intelligence-based logic for finishing (simplified)
    # If we have extracted significant intelligence or conversation is long, send callback
    metrics = sessions[session_id]
    total_messages = metrics["msg_count"]
    duration = (payload.message.timestamp - metrics["start_time"]).total_seconds()
    
    engagement_metrics = EngagementMetrics(
        engagementDurationSeconds=int(duration),
        totalMessagesExchanged=total_messages
    )

    # For the sake of this hackathon, we'll send the callback if scam is detected
    # Ideally, we wait for the engagement to finish.
    # We can detect "finish" intent or just threshold messages.
    if total_messages >= 10: # Example threshold
        await callback_service.send_final_result(
            session_id=session_id,
            scam_detected=is_scam,
            total_messages=total_messages,
            intelligence=intelligence,
            agent_notes="Automated engagement completed."
        )

    return ResponseBody(
        status="success",
        scamDetected=is_scam,
        engagementMetrics=engagement_metrics,
        extractedIntelligence=intelligence,
        agentNotes="Agent is engaging the scammer.",
        response=agent_msg
    )
