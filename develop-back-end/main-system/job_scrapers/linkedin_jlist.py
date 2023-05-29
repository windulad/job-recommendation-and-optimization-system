import requests
import json

url = "https://linkedin-jobs-search.p.rapidapi.com/"

payload = json.dumps({
  "search_terms": "python programmer",
  "location": "Chicago, IL",
  "page": "1"
})
headers = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': 'fa0d12e07emsh6baa2c6d09bd625p10a38ajsnf6ef7df5547b',
  'X-RapidAPI-Host': 'linkedin-jobs-search.p.rapidapi.com'
}

response = requests.request("POST", url, headers=headers, data=payload)

#print(response.text)

json_data = response.text

json_object = json.loads(json_data)

json_formatted_str = json.dumps(json_object, indent=2)

print(json_formatted_str)