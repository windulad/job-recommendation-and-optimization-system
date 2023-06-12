import requests
from bs4 import BeautifulSoup
import sqlite3

# Indeed API
def get_jobs(position, location):
    base_url = "http://api.scraperapi.com"

    payload = {
        'api_key': '07e923bd835f70e73964ac82785227dc',
        'url': 'https://www.simplyhired.com/search?q={}&l={}'.format(position, location)
    }
    headers = {}

    response = requests.get(url=base_url, params=payload)
    return response

se_jobs = get_jobs('software+engineer','')

soup = BeautifulSoup(se_jobs.text, 'html.parser')
# print(soup)

cards = soup.find_all('div','css-f8dtpc')

count = len(cards)
print(count)

for card in cards:
# def get_record(card):
    #job_title
    try:
        job_title = card.find('a','chakra-button').text.strip()
    except AttributeError:
        job_title = ''

    #job_url
    try:
        job_url = 'https://www.simplyhired.com/' + card.h3.a.get('href')
    except AttributeError:
        job_url = ''

    #job_company
    try:
        job_company = card.find('span','css-lvyu5j').text.strip()
    except AttributeError:
        job_company = ''

    #job_location
    try:
        job_location = card.find('span','css-1t92pv').text.strip()
    except AttributeError:
        job_location = ''

    #job_summary
    try:
        job_summary = card.find('p','chakra-text css-jhqp7z').text.strip()
    except AttributeError:
        job_summary = ''

    #job_post_date
    try:
        job_post_date = card.find('p','chakra-text css-5yilgw').text.strip()
    except AttributeError:
        job_post_date = ''

    #job_salary
    try:
        job_salary = card.find('p','chakra-text css-1ejkpji').text.strip()
    except AttributeError:
        job_salary = ''


    print(job_title)
    print(job_url)
    print(job_company)
    print(job_location)
    print(job_summary)
    print(job_post_date)
    print(job_salary)
#     record = (job_title, job_url, job_company, job_location, job_summary, job_post_date, job_salary)
#     return record

# records = []

# for card in cards:
#     record = get_record(card)
#     records.append(record)
#     #print(record)
