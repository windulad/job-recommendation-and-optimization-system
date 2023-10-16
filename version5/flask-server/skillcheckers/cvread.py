from PyPDF2 import PdfReader

# Function to extract skills from user CV / Resume
def CVRead(filepath):
    reader = PdfReader(filepath)
    number_of_pages = len(reader.pages)
    page = reader.pages[0]
    text = page.extract_text()

    software_eng = [
        #Software Engineer
        "C",
        "C++",
        "C#",
        "Java",
        "Python",
        "PHP",
        "Go",
        "SQL",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "SQL Server",
        "Oracle SQL",
        "Git",
        "GitHub",
        "GitLab"
        "AWS",
        "Azure",
        "GCP",
        "Postman",
        "Twilio"
        "Docker",
        "Kubernetes"
    ]

    front_end_eng = [
        #Front end engineer
        "HTML",
        "CSS",
        "Bootstrap",
        "Tailwind",
        "JavaScript",
        "Typescript",
        "React",
        "Angular",
        "Vue"
    ]
    
    back_end_eng = [
        #Back end engineer
        "Node",
        "Django",
        "Flask",
        "Spring Boot",
        "Laravel",
        "Ruby on Rails",
        ".NET Core"
    ]

    android_eng = [
        #Android engineer
        "Dart",
        "Flutter",
        "React Native",
        "Kotlin",
        "Android Jetpack",
        "Android Studio"
    ]

    ios_eng = [
        #IOS engineer
        "Swift",
        "SwiftUI",
        "Ionic",
        "Xcode",
        "Xamarin"
    ]

    #Check the available skills
    match_software_eng = [skill1 for skill1 in software_eng if skill1 in text]
    match_front_end_eng = [skill2 for skill2 in front_end_eng if skill2 in text]
    match_back_end_eng = [skill3 for skill3 in back_end_eng if skill3 in text]
    match_android_eng = [skill4 for skill4 in android_eng if skill4 in text]
    match_ios_eng = [skill5 for skill5 in ios_eng if skill5 in text]

    skills = match_software_eng+match_front_end_eng+match_back_end_eng+match_android_eng+match_ios_eng

    #Check the positions can be applied, missing skills
    positions = []
    miss_skills = []

    miss_skills_software_eng = [skill1 for skill1 in software_eng if skill1 not in match_software_eng]
    miss_skills_front_end_eng = [skill1 for skill1 in front_end_eng if skill1 not in match_front_end_eng]
    miss_skills_back_end_eng = [skill1 for skill1 in back_end_eng if skill1 not in match_back_end_eng]
    miss_skills_android_eng = [skill1 for skill1 in android_eng if skill1 not in match_android_eng]
    miss_skills_ios_eng = [skill1 for skill1 in ios_eng if skill1 not in match_ios_eng]

    if match_software_eng:
        positions.append('software engineer')
        miss_skills = miss_skills + miss_skills_software_eng

    if match_front_end_eng:
        positions.append('front end engineer')
        miss_skills = miss_skills + miss_skills_front_end_eng

    if match_back_end_eng:
        positions.append('back end engineer')
        miss_skills = miss_skills + miss_skills_back_end_eng

    if match_android_eng:
        positions.append('android engineer')
        miss_skills = miss_skills + miss_skills_android_eng

    if match_ios_eng:
        positions.append('ios engineer')
        miss_skills = miss_skills + miss_skills_ios_eng
        
    #Return skills, positions
    return(skills,positions,miss_skills)


# import requests
# from bs4 import BeautifulSoup

# class Learn:
#     def __init__(self, skill):
#         self.skill = skill

#     def learn_futurelearn(self):
#         base_url = "http://api.scraperapi.com"

#         payload = {
#             'api_key': 'ce4f98dc5b76bc5a635534c73ef21745', 
#             'url': 'https://www.futurelearn.com/search?q={}'.format(self.skill)
#         }
#         headers = {}

#         response = requests.get(url=base_url, params=payload)
#         #return response
#         formatted_response = BeautifulSoup(response.text, 'html.parser')

#         # Find learn cards in HTML content
#         cards = formatted_response.find_all('li','m-link-list__item')
#         count = len(cards)

#         records_futurelearn = []

#         for card in cards:
#             #learn_platform
#             learn_platform = 'futurelearn'

#             #learn_skill
#             learn_skill = self.skill

#             #learn_title
#             try:
#                 learn_title = card.find('a','js-ahoy-track').text.strip()
#             except AttributeError:
#                 learn_title = ''

#             #learn_tutor
#             try:
#                 learn_tutor = card.find('a','js-ahoy-track').text.strip()
#             except AttributeError:
#                 learn_tutor = ''

#             #learn_url
#             try:
#                 learn_url = 'https://futurelearn.com' + card.div.h3.a.get('href')
#             except:
#                 learn_url = ''

#             record = (learn_platform, learn_skill, learn_title, learn_tutor, learn_url)
#             records_futurelearn.append(record)

#         return records_futurelearn