# import requests
import os

# model = "llama-3.2-90b-vision-preview"

# api_key = os.environ.get("GROQ_API_KEY")
# url = "https://api.groq.com/openai/v1/models"

# headers = {
#     "Authorization": f"Bearer {api_key}",
#     "Content-Type": "application/json"
# }

# # response = requests.get(url, headers=headers)

# # print(response.json())

from groq import Groq
import base64

model = "llama-3.2-90b-vision-preview"

# Path to your image
test_image_path = "60c4199364474569561cba359d486e6c69ae8cba.jpeg"

# Getting the base64 string
# base64_image = encode_image(image_path)

client = Groq(
    # api_key=os.environ.get("GROQ_API_KEY"),
    api_key="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",
    # model=model,
)
# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

def ocr_reciept(image_path=test_image_path):
    base64_image = encode_image(image_path)
    # ocr_completion = client.ocr.completions.create(
    #     images=[{
    #     "image": {
    #         "base64": base64_image
    #     }
    #     }],
    #     model=model
    # )
    chat_completion = client.chat.completions.create(
        messages=[
            # {
            #     "role": "system",
            #     "content": "The user will uploaded an image. The image is a receipt. The user wants to know what is in the image. Read it and respond accordingly."
            # },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": """
                    Read the attached image and Return the information in json format.
                    Output the following information.
                    - Date: DDMMYYYY Format
                    - Total Amount 
                    - Items: List in format {Item Name, Quantity, Price} for each item
                    - Taxes
                    - Store Name
                    - Address
                    - Phone Number
                    - Store Type (Grocery, Restaurant, etc.)

                    
                    """},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                ],
            }
        ],
        model=model,
    )
    return chat_completion.choices[0].message.content


# chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "user",
#             "content": [
#                 {"type": "text", "text": "What's in this image?"},
#                 {
#                     "type": "image_url",
#                     "image_url": {
#                         "url": f"data:image/jpeg;base64,{base64_image}",
#                     },
#                 },
#             ],
#         }
#     ],
#     model=model,
# )

# print(chat_completion.choices[0].message.content)
if __name__ == "__main__":
    print(ocr_reciept())