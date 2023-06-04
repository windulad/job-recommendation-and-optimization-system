import requests
import json

# Retrieve data through API
def scrapejobs(position,file_path):
  txt = "https://indeed12.p.rapidapi.com/jobs/search?query={position}&location={location}"
  url = txt.format(position=position,location="chicago")

  payload = {}
  headers = {
    'X-RapidAPI-Key': '921f8e12e2msh5ed82987d5e34d4p12cca2jsnf0bc6b98bc82',
    'X-RapidAPI-Host': 'indeed12.p.rapidapi.com'
  }

  response = requests.request("GET", url, headers=headers, data=payload)

  # Write data to JSON file
  formatted_response = json.dumps(json.loads(response.text), indent=2)

  file = open(file_path,'a')
  file.write(formatted_response)
  file.close

scrapejobs('software engineer','indeed_se.json')
scrapejobs('front end engineer','indeed_fee.json')
scrapejobs('back end engineer','indeed_bee.json')
scrapejobs('android engineer','indeed_ae.json')
scrapejobs('ios engineer','indeed_ie.json')