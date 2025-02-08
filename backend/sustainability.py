import requests
import os
import json
from groq import Groq

# Your Groq API key
api_key = "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"

# Groq API endpoint (this may vary, so check their documentation)
client = Groq(
    api_key=api_key,
)
# Sample receipt JSON data
receipt_json = '''
{"date": "Unknown", "total_amount": 100.0, 
"items": [{"name": "PUB DICED TOMATOES", "quantity": 1, "price": 0.75, "category": "Canned Goods", "sub_category": "Tomatoes", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}, 
{"name": "PUBLIX TOM/PASTE", "quantity": 1, "price": 4.49, "category": "Canned Goods", "sub_category": "Tomato Paste", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}, 
{"name": "PF W/G WHEAT BREAD", "quantity": 1, "price": 3.89, "category": "Bakery", "sub_category": "Bread", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}, 
{"name": "PBX FNCY PARM SHRD", "quantity": 1, "price": 7.59, "category": "Dairy", "sub_category": "Cheese", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}, 
{"name": "IMPOSS BURG", "quantity": 1, "price": 12.18, "category": "Meat", "sub_category": "Burgers", "is_healthy": false, "is_organic": false, "is_local": false, "is_sustainable": false}, 
{"name": "BNLS CHICK BREAST", "quantity": 1, "price": 2.0, "category": "Meat", "sub_category": "Chicken", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}, 
{"name": "PUBLIX FF LT VANIL", "quantity": 1, "price": 2.0, "category": "Dairy", "sub_category": "Ice Cream", "is_healthy": false, "is_organic": false, "is_local": false, "is_sustainable": false}, 
{"name": "LIMES PERSIAN", "quantity": 1, "price": 1.74, "category": "Produce", "sub_category": "Limes", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}, 
{"name": "PAC BROTH CHCKN LS", "quantity": 1, "price": 5.99, "category": "Canned Goods", "sub_category": "Broth", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}, 
{"name": "JIF RFT CREAMY", "quantity": 1, "price": 5.75, "category": "Pantry", "sub_category": "Peanut Butter", "is_healthy": false, "is_organic": false, "is_local": false, "is_sustainable": false}, 
{"name": "PUBLIX GREEN BEANS", "quantity": 1, "price": 0.89, "category": "Produce", "sub_category": "Green Beans", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}, {"name": "HZ TOMATO KETCHUP", "quantity": 1, "price": 6.39, "category": "Pantry", "sub_category": "Ketchup", "is_healthy": false, "is_organic": false, "is_local": false, "is_sustainable": false}, {"name": "PEPPERS GREEN BELL", "quantity": 1, "price": 2.84, "category": "Produce", "sub_category": "Bell Peppers", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}, {"name": "BELL PEPPERS RED", "quantity": 1, "price": 2.19, "category": "Produce", "sub_category": "Bell Peppers", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}, {"name": "ORGANIC CARROTS", "quantity": 1, "price": 1.69, "category": "Produce", "sub_category": "Carrots", "is_healthy": true, "is_organic": true, "is_local": false, "is_sustainable": false}, {"name": "BANANA SHALLOTS", "quantity": 1, "price": 1.4, "category": "Produce", "sub_category": "Onions", "is_healthy": true, "is_organic": false, "is_local": false, "is_sustainable": false}], "tax": 0.0, "tip": 0.0, "store_name": "Publix", "address": "Unknown", "phone_number": "Unknown", "store_type": "Grocery Store"}
'''

# Load the receipt data
receipt_data = json.loads(receipt_json)

# Create a prompt for Groq's LLM to suggest sustainable alternatives
def sustainable_prompt(receipt_data):
    items = receipt_data["items"]
    
    # Create a prompt string for Groq
    prompt = "Given the following products from a receipt, suggest sustainable alternatives for 2-3 items. Consider categories, materials, and eco-friendly features. The receipt items are:\n\n"
    
    for item in items:
        prompt += f"Product: {item['name']}\nCategory: {item['category']}\nCategory: {item['category']}\nPrice: ${item['price']}\n\n"
    
    prompt += "Be brief and format the output in HTML"

    return prompt

# Function to call the Groq API and get the suggestion
def sustainable_recs(receipt_data):
    prompt = sustainable_prompt(receipt_data)
    print(prompt)
    # Make the API request to Groq
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="llama-3.3-70b-versatile",
    )

    return(chat_completion.choices[0].message.content)
    

# Get suggestions for the receipt
sustainable_suggestions = sustainable_recs(receipt_data)

# Print the suggestions
print("Sustainable Alternatives:\n")
print(sustainable_suggestions)
