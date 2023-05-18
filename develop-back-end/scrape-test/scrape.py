import requests
from bs4 import BeautifulSoup

req = requests.get("https://www.flexjobs.com/")

soup = BeautifulSoup(req.content,"html.parser")

jobs = soup.find_all('li', class_="clearfix job-bx wht-shd-bx")

for job in jobs:
        published_date = job.find('span', class_='sim-posted').span.text
        if 'few' in published_date:
            company_name = job.find('h3', class_='joblist-comp-name').text.replace(' ', '')
            skills = job.find('span', class_='srp-skills').text.replace(' ', '')
            more_info = job.header.h2.a['href']
            salary_element = job.find('span', class_='salary')
            if salary_element is not None:
                salary = salary_element.text.strip()
            else:
                salary = 'Not specified'
            print(f"Company name: {company_name.strip()}")
            print(f"Required skill: {skills.strip()}")
            print(f"Salary: {salary}")
            print(f"More info: {more_info}")
            print('')

print(jobs)