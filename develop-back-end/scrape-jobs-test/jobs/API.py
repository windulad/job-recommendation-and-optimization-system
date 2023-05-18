from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route('/scrape_jobs', methods=['POST'])
def scrape_jobs():
    url = request.json['url']
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'html.parser')
    jobs = soup.find_all('li', class_="clearfix job-bx wht-shd-bx")

    scraped_jobs = []

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
            
            scraped_job = {
                'company_name': company_name.strip(),
                'skills': skills.strip(),
                'salary': salary,
                'more_info': more_info
            }
            scraped_jobs.append(scraped_job)

    return jsonify(scraped_jobs)

if __name__ == '__main__':
    app.run()
