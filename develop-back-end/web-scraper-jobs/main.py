from bs4 import BeautifulSoup
import requests
#chira
print("Put Some Skill That You Are Not Familiar With ")
unfamilliar_skill=input('>')
print(f'Filtering out {unfamilliar_skill}')

#def find_jobs():
html_text = requests.get("https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit&txtKeywords=python&txtLocation=").text
soup = BeautifulSoup(html_text, 'lxml')
jobs= soup.find_all('li', class_="clearfix job-bx wht-shd-bx")
for job in jobs:
    published_date = job.find('span', class_='sim-posted').span.text
    if 'few' in published_date:
        company_name=job.find('h3',class_ ='joblist-comp-name').text.replace(' ','')
        skills=job.find('span',class_ ='srp-skills').text.replace(' ','')
        more_info=job.header.h2.a['href']
        if unfamilliar_skill not in skills:
            print(f"Company Name :{company_name.strip()}")
            print(f"Required Skill:{skills.strip()}")
            print(f"More Info : {more_info}")
            print('')