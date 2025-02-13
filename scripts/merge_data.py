import pandas as pd
import json
import glob

country_df = pd.read_excel('../data/Country-Code.xlsx')

with open('../data/zomato.json', 'r', encoding='utf-8') as file:
    zomato_data = json.load(file)

image_urls = []

for file_path in sorted(glob.glob('../data/file[1-5].json')):
    with open(file_path, 'r', encoding='utf-8') as file:
        file_data = json.load(file)
        
        for entry in file_data:
            if 'restaurants' in entry:
                for restaurant in entry['restaurants']:
                    image_url = restaurant.get('restaurant', {}).get('featured_image')
                    if image_url:
                        image_urls.append(image_url)

print("✅ Sample Image URLs:", image_urls[:10])

for i, restaurant in enumerate(zomato_data):
    country_name = country_df.loc[country_df['Country Code'] == restaurant['Country Code'], 'Country'].values
    restaurant['Country Name'] = country_name[0] if len(country_name) > 0 else 'Unknown'
    
    if i < len(image_urls):
        restaurant['image_url'] = image_urls[i]
    else:
        restaurant['image_url'] = None

with open('../data/final_zomato.json', 'w', encoding='utf-8') as file:
    json.dump(zomato_data, file, indent=4)

print('Merging complete! Check final_zomato.json')