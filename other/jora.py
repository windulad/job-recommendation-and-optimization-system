import requests
from bs4 import BeautifulSoup
import sqlite3

def get_jobs(position, location):
    base_url = "http://api.scraperapi.com"

    payload = {
        'api_key': '07e923bd835f70e73964ac82785227dc', 
        'url': 'https://us.jora.com/j?q={}&l={}'.format(position, location)
    }
    headers = {}

    response = requests.get(url=base_url, params=payload)
    return response

se_jobs = get_jobs('software+engineer','')

soup = BeautifulSoup(se_jobs.text, 'html.parser')
#print(soup)

cards = soup.find_all('div','job-card')
count = len(cards)
print(count)

def get_record(card):
    #job_title
    try:
        job_title = card.find('a','job-link').text.strip()
    except AttributeError:
        job_title = ''
    
    #job_url
    try:
        job_url = 'https://us.jora.com' + card.h3.a.get('href')
    except AttributeError:
        job_url = ''

    #job_company
    try:
        job_company = card.find('span','job-company').text.strip()
    except AttributeError:
        job_company = ''

    #job_location
    try:
        job_location = card.find('a','job-location').text.strip()
    except AttributeError:
        job_location = ''

    #job_summary
    try:
        job_summary = card.find('div','job-abstract').text.strip()
    except AttributeError:
        job_summary = ''

    #job_post_date
    try:
        job_post_date = card.find('span','job-listed-date').text.strip()
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




# Database entry
# title = []
# url = []
# company = []
# location = []
# summary = []
# post_date = []
# salary = []

# for i in range (0,15):
#     title.append(records[i][0])
#     url.append(records[i][1])
#     company.append(records[i][2])
#     location.append(records[i][3])
#     summary.append(records[i][4])
#     post_date.append(records[i][5])
#     salary.append(records[i][6])

# # Connect to 'user_data.db' database
# connection = sqlite3.connect('../user_data.db')
# cursor = connection.cursor()

# # Insert the data into the table
# for i in range (0,15):
#     cursor.execute("""INSERT INTO indeed (position,title,url,company,location,summary,post_date,salary) VALUES (?,?,?,?,?,?,?,?)""",('software engineer',title[i],url[i],company[i],location[i],summary[i],post_date[i],salary[i]))
# connection.commit()

# print('Success!')