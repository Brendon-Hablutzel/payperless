import requests
import base64
from pprint import pprint
import json 


def search_shutterstock_noapi(query):
    return
    query_no_space = query.replace(" ", "-")
    url = f"https://www.shutterstock.com/_next/data/2f912d81699/en/search/{query_no_space}.json?term={query_no_space}"
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"API request failed: {response.status_code} - {response.text}")
    data = response.json()
    for images in data['pageProps']['assets']:
        # print(images['description'])
        print(images['url'])
        print("\n")

def search_shutterstock_images(query, per_page=10, page=1, api_key=None, api_secret=None):
    """
    Searches Shutterstock for images matching the given query and returns a list of image metadata.
    
    Parameters:
        query (str): The search query (e.g., "sunset", "mountains").
        per_page (int): Number of images to return per page.
        page (int): Page number for pagination.
        api_key (str): Your Shutterstock API key.
        api_secret (str): Your Shutterstock API secret.
    
    Returns:
        list: A list of image objects (dictionaries) returned by the API.
    """
    if not api_key or not api_secret:
        raise ValueError("Both API key and API secret must be provided.")

    # Create the credentials string and encode it in base64 for Basic Authentication.
    credentials = f"{api_key}:{api_secret}"
    encoded_credentials = base64.b64encode(credentials.encode('utf-8')).decode('utf-8')
    
    headers = {
        "Authorization": f"Basic {encoded_credentials}"
    }
    
    # Define the API endpoint and parameters.
    url = "https://api.shutterstock.com/v2/images/search"
    params = {
        "query": query,
        "per_page": per_page,
        "page": page
    }
    
    # Make the GET request to the Shutterstock API.
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code != 200:
        raise Exception(f"API request failed: {response.status_code} - {response.text}")
    
    # Parse the JSON response.
    data = response.json()
    
    # The returned JSON typically contains a "data" key that holds the list of images.
    image_list = data.get("data", [])
    
    return image_list


def searchShutterstock(searhQuery="pizza"):
    API_KEY = "IyOvZLGy1GedgTnmqfMEyHVJnYwAkk1b"
    API_SECRET = "pqiYGAX7kCH38qE6"
    while True:
        try:
            images = search_shutterstock_images(query=searhQuery, per_page=5, page=1,
                                                api_key=API_KEY, api_secret=API_SECRET)

            print(f"Found {len(images)} images:")
            # with open("shutterstock.json", "w") as f:
            #     f.write(json.dumps(images, indent=2))
            # input("Press Enter to continue...")
            # Print out the title and URL of the preview asset for each image.
            image_links = []
            for img in images:
                title = img.get("description", "No Description")
                # The preview URL is nested under "assets" (this structure might vary; see the API docs).
                assets = img.get("assets", {})
                # print(assets)
                # for asset in assets:
                #     print("Asset: ", asset)
                #     # print(asset)
                # preview = assets[::-1]
                # print(len(assets))
                # print()
                image_links.append(assets[list(assets.keys())[-1]]['url'])
                
            
                # print(f"Title: {title}\nPreview URL: {preview_url}\n")

            break
        except Exception as e:
            print("Error:", e)
    return image_links



# Example usage:
if __name__ == "__main__":
    # search_shutterstock_noapi("pineapple pizza")
    # Replace these with your actual Shutterstock API credentials.
    print(searchShutterstock("pizza pineapple"))
    
    
    