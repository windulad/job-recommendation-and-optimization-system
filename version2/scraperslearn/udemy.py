import requests
from bs4 import BeautifulSoup
import sqlite3

def get_courses(skill):
    base_url = "http://api.scraperapi.com"

    payload = {
        'api_key': '07e923bd835f70e73964ac82785227dc', 
        'url': 'https://www.edx.org/search?q={}&tab=course'.format(skill)
    }
    headers = {}

    response = requests.get(url=base_url, params=payload)
    return response

courses = get_courses('java')

soup = BeautifulSoup(courses.text, 'html.parser')
print(soup)

cards = soup.find_all('div','base-card-wrapper')
count = len(cards)
print(count)

# def get_record(card):
#     #job_title
#     try:
#         job_title = card.find('a','job-link').text.strip()
#     except AttributeError:
#         job_title = ''
    
#     #job_url
#     try:
#         job_url = 'https://us.jora.com' + card.h3.a.get('href')
#     except AttributeError:
#         job_url = ''

#     #job_tutor
#     try:
#         job_company = card.find('span','job-company').text.strip()
#     except AttributeError:
#         job_company = ''

#     #job_post_date
#     try:
#         job_post_date = card.find('span','job-listed-date').text.strip()
#     except AttributeError:
#         job_post_date = ''


#     record = (job_title, job_url, job_company, job_location, job_summary, job_post_date, job_salary)
#     return record

# records = []

# for card in cards:
#     record = get_record(card)
#     records.append(record)
#     print(record)
