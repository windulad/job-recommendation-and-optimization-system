import requests
import json

# GET Udemy course names
url = "https://udemy-course-scrapper-api.p.rapidapi.com/course-names"

payload = {}
headers = {
  'X-RapidAPI-Key': 'fa0d12e07emsh6baa2c6d09bd625p10a38ajsnf6ef7df5547b',
  'X-RapidAPI-Host': 'udemy-course-scrapper-api.p.rapidapi.com'
}

response_names = requests.request("GET", url, headers=headers, data=payload)
formatted_response_names = json.dumps(json.loads(response_names.text), indent=2)

file = open('udemy_names.json','a')
file.write(formatted_response_names)
file.close

# GET Udemy course instructor
url = "https://udemy-course-scrapper-api.p.rapidapi.com/course-names/course-instructor"

payload = {}
headers = {
  'X-RapidAPI-Key': 'fa0d12e07emsh6baa2c6d09bd625p10a38ajsnf6ef7df5547b',
  'X-RapidAPI-Host': 'udemy-course-scrapper-api.p.rapidapi.com'
}

response_instruct = requests.request("GET", url, headers=headers, data=payload)
formatted_response_instruct = json.dumps(json.loads(response_instruct.text), indent=2)

file = open('udemy_instruct.json','a')
file.write(formatted_response_instruct)
file.close

# GET Udemy course URL
url = "https://udemy-course-scrapper-api.p.rapidapi.com/course-names/course-instructor/course-url"

payload = {}
headers = {
  'X-RapidAPI-Key': 'fa0d12e07emsh6baa2c6d09bd625p10a38ajsnf6ef7df5547b',
  'X-RapidAPI-Host': 'udemy-course-scrapper-api.p.rapidapi.com'
}

response_url = requests.request("GET", url, headers=headers, data=payload)
formatted_response_url = json.dumps(json.loads(response_url.text), indent=2)

file = open('udemy_url.json','a')
file.write(formatted_response_url)
file.close