import requests
from bs4 import BeautifulSoup

class Jobs:
    def __init__(self, position, location):
        self.position = position
        self.location = location

    def jobs_jora(self):
        base_url = "http://api.scraperapi.com"

        payload = {
            'api_key': 'ce4f98dc5b76bc5a635534c73ef21745', 
            'url': 'https://us.jora.com/j?q={}&l={}'.format(self.position, self.location)
        }
        headers = {}

        response = requests.get(url=base_url, params=payload)
        #return response
        formatted_response = BeautifulSoup(response.text, 'html.parser')

        # Find job cards in HTML content
        cards = formatted_response.find_all('div','job-card')
        count = len(cards)
        
        records_jora = []

        for card in cards:
            #job_platform
            job_platform = 'jora'

            #job_position
            job_position = self.position

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

            record = (job_platform, job_position, job_title, job_url, job_company, job_location, job_summary, job_post_date, job_salary)
            records_jora.append(record)
            
        return records_jora
    
    def jobs_simplyhired(self):
        base_url = "http://api.scraperapi.com"

        payload = {
            'api_key': 'ce4f98dc5b76bc5a635534c73ef21745',
            'url': 'https://www.simplyhired.com/search?q={}&l={}'.format(self.position, self.location)
        }
        headers = {}

        response = requests.get(url=base_url, params=payload)
        #return response
        formatted_response = BeautifulSoup(response.text, 'html.parser')

        # Find job cards in HTML content
        cards = formatted_response.find_all('div','css-f8dtpc')
        count = len(cards)

        records_simplyhired = []

        for card in cards:
            #job_platform
            job_platform = 'simplyhired'

            #job_position
            job_position = self.position

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

            record = (job_platform, job_position, job_title, job_url, job_company, job_location, job_summary, job_post_date, job_salary)
            records_simplyhired.append(record)
            
        return records_simplyhired
    
    def jobs_flexjobs(self):
        base_url = "http://api.scraperapi.com"

        payload = {
            'api_key': 'ce4f98dc5b76bc5a635534c73ef21745',
            'url': 'https://www.flexjobs.com/search?search={}&location={}'.format(self.position, self.location)        
        }
        headers = {}

        response = requests.get(url=base_url, params=payload)
        #return response
        formatted_response = BeautifulSoup(response.text, 'html.parser')

        # Find job cards in HTML content
        cards = formatted_response.find_all('li', 'job')
        count = len(cards)

        records_flexjobs = []

        for card in cards:
            #job_platform
            job_platform = 'flexjobs'

            #job_position
            job_position = self.position

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


            record = (job_platform, job_position, job_title, job_url, job_company, job_location, job_summary, job_post_date, job_salary)
            records_flexjobs.append(record)
            
        return records_flexjobs
    