import googlemaps
import json
import time

def search_nearby_similar_places(api_key, location, radius, place_type=None, keyword=None):

    client = googlemaps.Client(key=api_key)
    all_results = []
    
    # Perform the initial nearby search
    response = client.places_nearby(location=location, radius=radius, type=place_type, keyword=keyword)
    all_results.extend(response.get("results", []))
    
    # Google Maps may return a next_page_token if there are additional pages.
    while "next_page_token" in response:
        # Pause to allow the next page token to become active
        time.sleep(2)
        response = client.places_nearby(page_token=response["next_page_token"])
        all_results.extend(response.get("results", []))
    
    return all_results

if __name__ == "__main__":
    # Replace with your actual Google Maps API key.
    API_KEY = "YOUR_API_KEY_HERE"
    
    # Define the center location as a (latitude, longitude) tuple.
    # For example, this sample location is in San Francisco.
    location = (37.7749, -122.4194)
    
    # Define the search radius (in meters).
    radius = 1000  # 1 kilometer
    
    # Optionally, set the type of place to search for and a keyword.
    place_type = "Farmer Market"  # For example, restaurants
    keyword = "Farmer Market"  # To find similar places, e.g., Italian restaurants
    
    results = search_nearby_similar_places(API_KEY, location, radius, place_type, keyword)
    
    # Print the results in a readable JSON format
    print(json.dumps(results, indent=2))
