import json
import sqlite3

def outputjobs(filepath,job_position):
    f = open(filepath,'r')
    data = f.read()
    f.close

    responses = json.loads(data)

    count = responses['count']

    position = []
    title = []
    formatted_relative_time = []
    company_name = []
    location = []
    link = []

    for i in range (0,15):
        position.append(job_position)
        title.append(responses['hits'][i]['title'])
        formatted_relative_time.append(responses['hits'][i]['formatted_relative_time'])
        company_name.append(responses['hits'][i]['company_name'])
        location.append(responses['hits'][i]['location'])
        link.append(responses['hits'][i]['link'])

    # Connect to 'user_data.db' database
    connection = sqlite3.connect('../user_data.db')
    cursor = connection.cursor()

    # Insert the data into the table
    for i in range (0,15):
        cursor.execute("""INSERT INTO indeed (position,title,formatted_relative_time,company_name,location,link) VALUES (?,?,?,?,?,?)""",(position[i],title[i],formatted_relative_time[i],company_name[i],location[i],link[i]))
    connection.commit()

outputjobs('indeed_se.json','software_eng')
outputjobs('indeed_fee.json','front_end_eng')
outputjobs('indeed_bee.json','back_end_eng')
outputjobs('indeed_ae.json','android_eng')
outputjobs('indeed_ie.json','ios_eng')