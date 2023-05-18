import requests
from bs4 import BeautifulSoup
import time

# ...

resp = requests.get(target_url, headers=head)
print(resp.status_code)
time.sleep(1)  # Add a delay of 1 second before making the next request


head = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Connection": "keep-alive",
    "Accept-Language": "en-US,en;q=0.9,lt;q=0.8,et;q=0.7,de;q=0.6",
    "Referer": "https://www.google.com"  # Add the Referer header
}



l = []
o = {}

target_url = "https://www.indeed.com/jobs?q=python&l=New+York%2C+NY&vjk=8bf2e735050604df"
head = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Connection": "keep-alive",
    "Accept-Language": "en-US,en;q=0.9,lt;q=0.8,et;q=0.7,de;q=0.6",
}

resp = requests.get(target_url, headers=head)
print(resp.status_code)
soup = BeautifulSoup(resp.text, 'html.parser')

allData = soup.find("ul", {"class": "jobsearch-ResultsList css-0"})
if allData is not None:
    alllitags = allData.find_all("div", {"class": "cardOutline"})
    print(len(alllitags))
    for i in range(0, len(alllitags)):
        try:
            o["name-of-the-job"] = alllitags[i].find("a", {"class": "jcs-JobTitle css-jspxzf eu4oa1w0"}).text
        except:
            o["name-of-the-job"] = None

        try:
            company_info = alllitags[i].find("div", {"class": "companyInfo"})
            if company_info is not None:
                o["name-of-the-company"] = company_info.find("span", {"class": "companyName"}).text
            else:
                o["name-of-the-company"] = None
        except:
            o["name-of-the-company"] = None

        try:
            company_info = alllitags[i].find("div", {"class": "companyInfo"})
            if company_info is not None:
                o["rating"] = company_info.find("span", {"class": "ratingsDisplay"}).text
            else:
                o["rating"] = None
        except:
            o["rating"] = None

        try:
            o["salary"] = alllitags[i].find("div", {"class": "salary-snippet-container"}).text
        except:
            o["salary"] = None

        try:
            metadata = alllitags[i].find("div", {"class": "metadata taxoAttributes-container"})
            if metadata is not None:
                o["job-details"] = metadata.find("ul").text
            else:
                o["job-details"] = None
        except:
            o["job-details"] = None

        l.append(o)
        o = {}

print(l)
