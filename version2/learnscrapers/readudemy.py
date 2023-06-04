import json
import sqlite3

# Store course_name values
f = open('udemy_names.json','r')
data = f.read()
f.close

responses = json.loads(data)

course_name = []

for i in range (0,399):
    x = str(i+1)
    course_name.append(responses[''+x]['course_name'])
#print(course_name)

# Store instructor values
f = open('udemy_instruct.json','r')
data = f.read()
f.close

responses = json.loads(data)

instructor = []

for i in range (0,399):
    x = str(i+1)
    instructor.append(responses[''+x]['instructor'])
#print(instructor)

# Store course url values
f = open('udemy_url.json','r')
data = f.read()
f.close

responses = json.loads(data)

course_url = []

for i in range (0,399):
    x = str(i+1)
    course_url.append(responses[''+x]['course url'])
#print(course_url)

# Connect to 'user_data.db' database
connection = sqlite3.connect('../user_data.db')
cursor = connection.cursor()

# Insert the data into the table
for i in range (0,399):
    cursor.execute("""INSERT INTO udemy (coursename,instruct,url) VALUES (?,?,?)""",(course_name[i],instructor[i],course_url[i]))
connection.commit()
