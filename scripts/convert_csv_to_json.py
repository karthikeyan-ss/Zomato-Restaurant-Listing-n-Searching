import pandas as pd

df = pd.read_csv('../data/zomato.csv', encoding='ISO-8859-1')
df.to_json('../data/zomato.json', orient='records', indent=4)

print('Conversion complete! Check data/zomato.json')