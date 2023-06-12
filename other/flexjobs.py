from bs4 import BeautifulSoup
import requests

def get_jobs(position, location):
    base_url = "http://api.scraperapi.com"

    payload = {
        'api_key': '07e923bd835f70e73964ac82785227dc', 
        'url': 'https://www.flexjobs.com/search?search={}&location={}'.format(position, location)
    }
    headers = {}

    response = requests.get(url=base_url, params=payload)
    return response

se_jobs = get_jobs('software engineer','chicago')


formatted_response = BeautifulSoup(se_jobs.text, 'html.parser')
cards = formatted_response.find_all('li', 'job')

count = len(cards)
print(count)

def get_record(card):
    #job_title
    try:
        job_title = card.find('a','job-title').text.strip()
    except AttributeError:
        job_title = ''
    
    #job_url
    try:
        job_url = 'https://www.flexjobs.com' + card.a.get('href')
    except AttributeError:
        job_url = ''

    #job_company
    job_company = ''
    # try:
    #     job_company = card.find('span','companyName').text.strip()
    # except AttributeError:
    #     job_company = ''

    #job_location
    try:
        job_location = card.find('div','job-locations').text.strip()
    except AttributeError:
        job_location = ''

    #job_summary
    try:
        job_summary = card.find('div','job-description').text.strip()
    except AttributeError:
        job_summary = ''

    #job_post_date
    try:
        job_post_date = card.find('div','job-age').text.strip()
    except AttributeError:
        job_post_date = ''

    #job_salary
    job_salary = ''
    # try:
    #     job_salary = card.find('div','salaryOnly').text.strip()
    # except AttributeError:
    #     job_salary = ''

    record = (job_title, job_url, job_company, job_location, job_summary, job_post_date, job_salary)
    return record

records = []

for card in cards:
    record = get_record(card)
    records.append(record)
    print(record)