import jobs
import sqlite3
DATABASE = '../database/user_data.db'

connection = sqlite3.connect(DATABASE)
cursor = connection.cursor()

command1 = """DROP TABLE IF EXISTS jobs"""

command2 = """CREATE TABLE IF NOT EXISTS jobs(
                positionid INTEGER NOT NULL UNIQUE primary key autoincrement,
                platform TEXT,
                position TEXT,
                title TEXT, 
                url TEXT,
                company TEXT,
                location TEXT,
                summary TEXT,
                post_date TEXT,
                salary TEXT
            )"""

cursor.execute(command1)
cursor.execute(command2)

class StoreJobs:
    def __init__ (self, platform, position, title, url, company, location, summary, post_date, salary):
        self.platform = platform
        self.position = position
        self.title = title
        self.url = url
        self.company = company
        self.location = location
        self.summary = summary
        self.post_date = post_date
        self.salary = salary

    def enterdb(self):
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        cursor.execute("""INSERT INTO jobs (platform,position,title,url,company,location,summary,post_date,salary) VALUES (?,?,?,?,?,?,?,?,?)""",(self.platform,self.position,self.title,self.url,self.company,self.location,self.summary,self.post_date,self.salary))
        connection.commit()

# count = len(records1)

# for i in range(0,count):
#     record = StoreJobs(records1[i][0],records1[i][1],records1[i][2],records1[i][3],records1[i][4],records1[i][5],records1[i][6],records1[i][7],records1[i][8])
#     record.enterdb()

def inputdb(job_list):
    count = len(job_list)
    for i in range(0,count):
        record = StoreJobs(job_list[i][0],job_list[i][1],job_list[i][2],job_list[i][3],job_list[i][4],job_list[i][5],job_list[i][6],job_list[i][7],job_list[i][8])
        record.enterdb()

se_jobs = jobs.Jobs('software engineer','')
fee_jobs = jobs.Jobs('front end engineer', '')
bee_jobs = jobs.Jobs('back end engineer', '')
ae_jobs = jobs.Jobs('android engineer', '')
ie_jobs = jobs.Jobs('ios engineer', '')

se_jobs_list = inputdb(se_jobs.jobs_jora() + se_jobs.jobs_simplyhired() + se_jobs.jobs_flexjobs())
fee_jobs_list = inputdb(fee_jobs.jobs_jora() + fee_jobs.jobs_simplyhired() + fee_jobs.jobs_flexjobs())
bee_jobs_list = inputdb(bee_jobs.jobs_jora() + bee_jobs.jobs_simplyhired() + bee_jobs.jobs_flexjobs())
ae_jobs = inputdb(ae_jobs.jobs_jora() + ae_jobs.jobs_simplyhired() + ae_jobs.jobs_flexjobs())
ie_jobs = inputdb(ie_jobs.jobs_jora() + ie_jobs.jobs_simplyhired() + ie_jobs.jobs_flexjobs())

# se_jobs_list = inputdb(se_jobs.jobs_jora())