import requests
from bs4 import BeautifulSoup

class Learn:
    def __init__(self, skill):
        self.skill = skill

    def learn_futurelearn(self):
        base_url = "http://api.scraperapi.com"

        payload = {
            'api_key': 'ce4f98dc5b76bc5a635534c73ef21745', 
            'url': 'https://www.futurelearn.com/search?q={}'.format(self.skill)
        }
        headers = {}

        response = requests.get(url=base_url, params=payload)
        #return response
        formatted_response = BeautifulSoup(response.text, 'html.parser')

        # Find learn cards in HTML content
        cards = formatted_response.find_all('li','m-link-list__item')
        count = len(cards)

        records_futurelearn = []

        for card in cards:
            #learn_platform
            learn_platform = 'futurelearn'

            #learn_skill
            learn_skill = self.skill

            #learn_title
            try:
                learn_title = card.find('a','js-ahoy-track').text.strip()
            except AttributeError:
                learn_title = ''

            #learn_tutor
            try:
                learn_tutor = card.find('a','js-ahoy-track').text.strip()
            except AttributeError:
                learn_tutor = ''

            #learn_url
            try:
                learn_url = 'https://futurelearn.com' + card.div.h3.a.get('href')
            except:
                learn_url = ''

            record = (learn_platform, learn_skill, learn_title, learn_tutor, learn_url)
            records_futurelearn.append(record)

        return records_futurelearn
    

    def learn_classcentral(self):
        base_url = "http://api.scraperapi.com"

        payload = {
            'api_key': 'ce4f98dc5b76bc5a635534c73ef21745', 
            'url': 'https://www.classcentral.com/search?q={}'.format(self.skill)
        }
        headers = {}

        response = requests.get(url=base_url, params=payload)
        #return response
        formatted_response = BeautifulSoup(response.text, 'html.parser')

        # Find learn cards in HTML content
        cards = formatted_response.find_all('li','course-list-course')
        count = len(cards)

        records_classcentral = []

        for card in cards:
            #learn_platform
            learn_platform = 'classcentral'

            #learn_skill
            learn_skill = self.skill

            #learn_title
            try:
                learn_title = card.find('a','js-ahoy-track').text.strip()
            except AttributeError:
                learn_title = ''

            #learn_tutor
            try:
                learn_tutor = card.find('h2','text-1 weight-semi line-tight margin-bottom-xxsmall').text.strip()
            except AttributeError:
                learn_tutor = ''

            #learn_url
            try:
                learn_url = 'https://futurelearn.com' + card.div.div.div.a.get('href')
            except:
                learn_url = ''

            record = (learn_platform, learn_skill, learn_title, learn_tutor, learn_url)
            records_classcentral.append(record)

        return records_classcentral




# learn1 = Learn('Java')
# print(learn1.learn_futurelearn())
# print(learn1.learn_classcentral())

