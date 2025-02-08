import io
import base64
from google import genai

# Initialize the Gemini client with your API key.
client = genai.Client(api_key="LALALALAL")  # Replace with your actual API key

def encode_image(pil_img):
    """
    Encodes a PIL image to a base64 string.
    """
    buffer = io.BytesIO()
    pil_img.save(buffer, format="JPEG")
    return base64.b64encode(buffer.getvalue()).decode('utf-8')

def ocr_receipt(pil_img, model="gemini-2.0-flash"):
    """
    Uses Google Gemini to analyze an image of a receipt and extract key details.
    
    The Gemini model is prompted (via a chat completion) to read the image and return
    details such as date, total amount, items, taxes, etc. The image is passed in as a 
    base64-encoded string embedded in a data URL.
    
    Expected output is a single JSON object containing the following keys:
      - date: "DDMMYYYY"
      - total_amount: number
      - items: list of item objects (each with name, quantity, price, etc.)
      - tax: number
      - tip: number
      - store_name: string
      - address: string
      - phone_number: string
      - store_type: string
      
    If some details are missing, the output may have an empty object or empty fields.
    """
    # Convert the PIL image to a base64-encoded string.
    base64_image = encode_image(pil_img)
    
    # Create the chat message containing both text instructions and the image.
    chat_completion = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "Read the attached image and return the information in JSON format. "
                            "Return only a single JSON object. If you cannot find the information, "
                            "return an empty object or leave fields empty. Do not add any additional text; "
                            "only output JSON. Do not write any extra receipt details.\n\n"
                            "Example output format:\n"
                            "{\n"
                            '    "date": "DDMMYYYY",\n'
                            '    "total_amount": 0.0,\n'
                            '    "items": [\n'
                            "        {\n"
                            '            "name": "Item Name",\n'
                            '            "quantity": 0,\n'
                            '            "price": 0.0,\n'
                            '            "category": "Item Category",\n'
                            '            "sub_category": "Item Sub Category",\n'
                            '            "is_healthy": true,\n'
                            '            "is_organic": true,\n'
                            '            "is_local": true,\n'
                            '            "is_sustainable": true\n'
                            "        }\n"
                            "    ],\n"
                            '    "tax": 0.0,\n'
                            '    "tip": 0.0,\n'
                            '    "store_name": "Store Name",\n'
                            '    "address": "Address",\n'
                            '    "phone_number": "Phone Number",\n'
                            '    "store_type": "Store Type"\n'
                            "}\n\n"
                            "Example output:\n"
                            '{\n'
                            '    "date": "07042017",\n'
                            '    "total_amount": 29.01,\n'
                            '    "items": [\n'
                            "        {\n"
                            '            "name": "Unknown Item",\n'
                            '            "quantity": 1,\n'
                            '            "price": 25.23\n'
                            "        }\n"
                            "    ],\n"
                            '    "tax": 3.78,\n'
                            '    "store_name": "Main Street Restaurant",\n'
                            '    "address": "6332 Business Drive Suite 528 Palo Alto California 94301",\n'
                            '    "phone_number": "575-1628095",\n'
                            '    "store_type": "Restaurant"\n'
                            "}"
                        )
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            # Pass the image as a base64 data URL.
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        },
                    },
                ],
            }
        ],
        temperature=0.1,  # Use a low temperature for deterministic output.
    )
    
    # Return the content of the first choice.
    return chat_completion.choices[0].message.content

# Example usage:
# from PIL import Image
# pil_img = Image.open("path_to_receipt_image.jpg")
# result = ocr_receipt(pil_img)
# print(result)
