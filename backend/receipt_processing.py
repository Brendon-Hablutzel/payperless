import hashlib
import os
from groq import Groq
import base64
from dotenv import load_dotenv
import json
from io import BytesIO
from PIL import Image

load_dotenv()


def encode_image(pil_img, format="JPEG"):
    buffered = BytesIO()
    pil_img.save(buffered, format=format)
    img_bytes = buffered.getvalue()
    encoded = base64.b64encode(img_bytes).decode("utf-8")
    return encoded


model = "llama-3.2-90b-vision-preview"


def ocr_reciept(pil_img, model=model):
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
        # model=model,
    )
    base64_image = encode_image(pil_img)
    # ocr_completion = client.ocr.completions.create(
    #     images=[{
    #     "image": {
    #         "base64": base64_image
    #     }
    #     }],
    #     model=model
    # )

    # Output the following information.
    # - Date: DDMMYYYY Format
    # - Total Amount
    # - Items: List in format {Item Name, Quantity, Price} for each item
    # - Taxes
    # - Store Name
    # - Address
    # - Phone Number
    # - Store Type (Grocery, Restaurant, etc.)

    chat_completion = client.chat.completions.create(
        messages=[
            # Cant use system message along with images in other messages for some reason.
            # {
            #     "role": "system",
            #     "content": "The user will uploaded an image. The image is a receipt. The user wants to know what is in the image. Read it and respond accordingly."
            # },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": """
                    Read the attached image and Return the information in json format.
                    Return only a single json object.
                    If you Cant find the information, return an empty object or leave fields empty.
                    Do not add any additional text to the output.
                    Only print JSON. Do not write reciept details.

                    Example:

                    Output format:
                        JSON Object:
                        {
                            "date": "DD-MM-YYYY",
                            "total_amount": 0.0,
                            "items": [
                                {
                                    "name": "Item Name",
                                    "quantity": 0,
                                    "price": 0.0,
                                    "category": "Item Category",
                                    "sub_category": "Item Sub Category",
                                    "is_heathly": true,
                                    "is_organic": true,
                                    "is_local": true,
                                    "is_sustainable": true,


                                }
                            ],
                            "tax": 0.0,
                            "tip": 0.0,
                            "store_name": "Store Name",
                            "address": "Address",
                            "phone_number": "Phone Number",
                            "store_type": "Store Type"
                        }

                    Example Output: 

                    ```{
                        "date": "07-04-2017",
                        "total_amount": 29.01,
                        "items": [
                            {
                                "name": "Unknown Item",
                                "quantity": 1,
                                "price": 25.23
                            }
                        ],
                        "tax": 3.78,
                        "store_name": "Main Street Restaurant",
                        "address": "6332 Business Drive Suite 528 Palo Alto California 94301",                        
                        "phone_number": "575-1628095",
                        "store_type": "Restaurant"
                    }```
                    
                    """,
                    },
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
        temperature=0.1,
    )
    # print(chat_completion.choices[0].message.content)
    return chat_completion.choices[0].message.content


def llm_resp_to_json(llm_resp):
    json_output = ""

    # jsonRegex = r"(```)?(json)?\n?(.*?)\n?(```)?"
    # match = re.search(jsonRegex, llm_resp, re.DOTALL)
    # if match:
    #     json_output = match.group(1)

    curly_brace_count = 0
    output_json = ""
    for char in llm_resp:
        if char == "{":
            curly_brace_count += 1
        elif char == "}":
            curly_brace_count -= 1
        if curly_brace_count > 0:
            output_json += char

    output_json = output_json + "}"
    json_output = output_json

    output_json = json.loads(json_output)
    return output_json


def calculate_sha256(pil_img, format="PNG"):
    """
    Calculate the SHA256 hash of a PIL image.

    Parameters:
        pil_img (PIL.Image.Image): The image to hash.
        format (str): The format to use when saving the image to bytes.
                      Using a lossless format like 'PNG' is recommended.

    Returns:
        str: The hexadecimal SHA256 hash of the image.
    """
    # Create an in-memory bytes buffer
    buffer = BytesIO()
    # Save the PIL image to the buffer in the specified format
    pil_img.save(buffer, format=format)
    # Retrieve the byte data from the buffer
    image_bytes = buffer.getvalue()
    # Compute the SHA256 hash of the byte data
    sha256_hash = hashlib.sha256(image_bytes).hexdigest()
    return sha256_hash


def process_receipt(pil_img):
    image_hash = calculate_sha256(pil_img)
    # if exist llm_responses/receipt_{image_hash}.json return that
    # create_dir =
    if not os.path.exists("llm_responses"):
        os.mkdir("llm_responses")
    if not os.path.exists("llm_responses/texts"):
        os.mkdir("llm_responses/texts")
    if os.path.exists(f"llm_responses/receipt_{image_hash}.json"):
        with open(f"llm_responses/receipt_{image_hash}.json", "r") as f:
            print("Returning from cache")
            return json.load(f)

    final_json = {}
    for i in range(1):
        try:
            llm_resp = ocr_reciept(pil_img)
            # print(llm_resp)
            with open(f"llm_responses/texts/llm_resp_{image_hash}.txt", "w+") as f:
                f.write(llm_resp)
            final_json = llm_resp_to_json(llm_resp)
            with open(f"llm_responses/receipt_{image_hash}.json", "w+") as f:
                json.dump(final_json, f)
            break
        except Exception as e:
            print(e)
            print("Error: Retrying")
            continue

    # if final_json == {}:
    #     raise Exception("Error: Could not process receipt")
    #     return None
    return final_json
    # return llm_resp_to_json()


def generate_insights(reciept_json):
    prompt = """
    Generate insights from reciept data. Tell me what you can infer from this reciept.
    Patterns you observe, any interesting insights, etc.
    Good Choices, Bad Choices, etc.
    """
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
        # model=model,
    )
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt + json.dumps(reciept_json),
                    }
                ],
            }
        ],
        model=model,
        temperature=0.1,
    )
    return chat_completion.choices[0].message.content


def get_receipt_json(image_path):
    with Image.open(image_path) as img:
        receipt_json = process_receipt(img)
        return receipt_json
