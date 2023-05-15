from bs4 import BeautifulSoup
import requests


def scrape_jobs(url):
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'html.parser')
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


print("Enter a job you're interested in:")
search = input(">")


# Scraping from FlexJobs
flexjobs_url = f"https://www.flexjobs.com/search?search={search}&location= "
print("\nFlexJobs:")
scrape_jobs(flexjobs_url)


# Scraping from TimesJobs
timesjobs_url = f"https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit" \
                f"&txtKeywords={search}&txtLocation= "
print("TimesJobs:")
scrape_jobs(timesjobs_url)
