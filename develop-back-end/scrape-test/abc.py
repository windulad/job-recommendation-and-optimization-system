import requests
import bs4
from bs4 import BeautifulSoup

import pandas as pandas
import time

URL = "https://www.indeed.com/jobs?q=software%20engineer%20python&l=New%20York%2C%20NY&from=searchOnHP"

#conducting a request of the stated URL above:
page = requests.get(URL)

#specifying a desired format of “page” using the html parser
soup = BeautifulSoup(page.text, "html.parser")

#printing soup in a more structured tree format
#print(soup.prettify())

def extract_job_title_from_result(soup): 
    jobs = []
    for div in soup.find_all(name="div", attrs={"class":"row"}):
        for a in div.find_all(name="a", attrs={"data-tn-element":"jobTitle"}):
            jobs.append(a["title"])
    print(jobs) 

extract_job_title_from_result(soup)