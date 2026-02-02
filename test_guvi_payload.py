import requests
import json
import os
import datetime

# Configuration
BASE_URL = "http://localhost:8000" # Test locally first, then can switch to Render URL


# Exact payload from the user's log
payload = {
    "sessionId": "c8158a19-c047-411b-873f-81787e998d3c", 
    "message": {
        "sender": "scammer", 
        "text": "URGENT: Your SBI account has been compromised. Your account will be blocked in 2 hours. Share your account number and OTP immediately to verify your identity.", 
        "timestamp": 1770044328789  # The millisecond timestamp
    }, 
    "conversationHistory": [], 
    "metadata": {
        "channel": "SMS", 
        "language": "English", 
        "locale": "IN"
    }
}

headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY
}

try:
    print(f"Sending POST request to {BASE_URL}/api/message...")
    response = requests.post(f"{BASE_URL}/api/message", json=payload, headers=headers)
    
    print(f"Status Code: {response.status_code}")
    print("Response Headers:")
    for k, v in response.headers.items():
        print(f"  {k}: {v}")
        
    print("\nResponse Body:")
    print(response.text)
    
    if response.status_code == 200:
        data = response.json()
        print("\nSuccess! Parsed JSON:")
        print(json.dumps(data, indent=2))
    else:
        print("\nFailed request!")

except Exception as e:
    print(f"Error: {e}")
