import learn
import sqlite3
DATABASE = '../database/user_data.db'

connection = sqlite3.connect(DATABASE)
cursor = connection.cursor()

command1 = """DROP TABLE IF EXISTS learn"""

command2 = """CREATE TABLE IF NOT EXISTS learn(
                courseid INTEGER NOT NULL UNIQUE primary key autoincrement,
                platform TEXT,
                skill TEXT,
                title TEXT, 
                tutor TEXT, 
                url TEXT
            )"""

cursor.execute(command1)
cursor.execute(command2)

class StoreLearn:
    def __init__ (self, platform, skill, title, tutor, url):
        self.platform = platform
        self.skill = skill
        self.title = title
        self.tutor = tutor
        self.url = url

    def enterdb(self):
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        cursor.execute("""INSERT INTO learn (platform,skill,title,tutor,url) VALUES (?,?,?,?,?)""",(self.platform,self.skill,self.title,self.tutor,self.url))
        connection.commit()

# count = len(records1)

# for i in range(0,count):
#     record = StoreJobs(records1[i][0],records1[i][1],records1[i][2],records1[i][3],records1[i][4],records1[i][5],records1[i][6],records1[i][7],records1[i][8])
#     record.enterdb()

def inputdb(learn_list):
    count = len(learn_list)
    for i in range(0,count):
        record = StoreLearn(learn_list[i][0],learn_list[i][1],learn_list[i][2],learn_list[i][3],learn_list[i][4])
        record.enterdb()

#Software Engineer
c_learn = learn.Learn('C')
cpp_learn = learn.Learn('C++')
csharp_learn = learn.Learn('C#')
java_learn = learn.Learn('Java')
python_learn = learn.Learn('Python')
php_learn = learn.Learn('PHP')
go_learn = learn.Learn('Go')
sql_learn = learn.Learn('SQL')
mysql_learn = learn.Learn('MySQL')
postgresql_learn = learn.Learn('PostgreSQL')
mongodb_learn = learn.Learn('MongoDB')
sqlserver_learn = learn.Learn('SQLServer')
oraclesql_learn = learn.Learn('Oracle SQL')
git_learn = learn.Learn('Git')
github_learn = learn.Learn('GitHub')
gitlab_learn = learn.Learn('GitLab')
aws_learn = learn.Learn('AWS')
azure_learn = learn.Learn('Azure')
gcp_learn = learn.Learn('GCP')
postman_learn = learn.Learn('Postman')
twilio_learn = learn.Learn('Twilio')
docker_learn = learn.Learn('Docker')
kubernetes_learn = learn.Learn('Kubernetes')

#Front end engineer
html_learn = learn.Learn('HTML')
css_learn = learn.Learn('CSS')
bootstrap_learn = learn.Learn('Bootstrap')
tailwind_learn = learn.Learn('Tailwind')
javascript_learn = learn.Learn('JavaScript')
typescript_learn = learn.Learn('TypeScript')
react_learn = learn.Learn('React')
angular_learn = learn.Learn('Angular')
vue_learn = learn.Learn('Vue')

#Back end engineer
node_learn = learn.Learn('Node')
django_learn = learn.Learn('Django')
flask_learn = learn.Learn('Flask')
springboot_learn = learn.Learn('SpringBoot')
laravel_learn = learn.Learn('Laravel')
rubyonrails_learn = learn.Learn('RubyOnRails')
dotnetcore_learn = learn.Learn('.NETCore')

#Android engineer
dart_learn = learn.Learn('Dart')
flutter_learn = learn.Learn('Flutter')
reactnative_learn = learn.Learn('ReactNative')
kotlin_learn = learn.Learn('Kotlin')
androidjetpack_learn = learn.Learn('AndroidJetpack')
androidstudio_learn = learn.Learn('AndroidStudio')

#IOS engineer
swift_learn = learn.Learn('Swift')
swiftui_learn = learn.Learn('SwiftUI')
ionic_learn = learn.Learn('Ionic')
xcode_learn = learn.Learn('Xcode')
xamarin_learn = learn.Learn('Xamarin')


# se_jobs_list = inputdb(se_jobs.jobs_jora())
c_learn_list = inputdb(c_learn.learn_futurelearn() + c_learn.learn_classcentral())
cpp_learn_list = inputdb(cpp_learn.learn_futurelearn() + cpp_learn.learn_classcentral())
csharp_learn_list = inputdb(csharp_learn.learn_futurelearn() + csharp_learn.learn_classcentral())
java_learn_list = inputdb(java_learn.learn_futurelearn() + java_learn.learn_classcentral())
python_learn_list = inputdb(python_learn.learn_futurelearn() + python_learn.learn_classcentral())
php_learn_list = inputdb(php_learn.learn_futurelearn() + php_learn.learn_classcentral())
go_learn_list = inputdb(go_learn.learn_futurelearn() + go_learn.learn_classcentral())
sql_learn_list = inputdb(sql_learn.learn_futurelearn() + sql_learn.learn_classcentral())
mysql_learn_list = inputdb(mysql_learn.learn_futurelearn() + mysql_learn.learn_classcentral())
postgresql_learn_list = inputdb(postgresql_learn.learn_futurelearn() + postgresql_learn.learn_classcentral())
mongodb_learn_list = inputdb(mongodb_learn.learn_futurelearn() + mongodb_learn.learn_classcentral())
sqlserver_learn_list = inputdb(sqlserver_learn.learn_futurelearn() + sqlserver_learn.learn_classcentral())
oraclesql_learn_list = inputdb(oraclesql_learn.learn_futurelearn() + oraclesql_learn.learn_classcentral())
git_learn_list = inputdb(git_learn.learn_futurelearn() + git_learn.learn_classcentral())
github_learn_list = inputdb(github_learn.learn_futurelearn() + github_learn.learn_classcentral())
gitlab_learn_list = inputdb(gitlab_learn.learn_futurelearn() + gitlab_learn.learn_classcentral())
aws_learn_list = inputdb(aws_learn.learn_futurelearn() + aws_learn.learn_classcentral())
azure_learn_list = inputdb(azure_learn.learn_futurelearn() + azure_learn.learn_classcentral())
gcp_learn_list = inputdb(gcp_learn.learn_futurelearn() + gcp_learn.learn_classcentral())
postman_learn_list = inputdb(postman_learn.learn_futurelearn() + postman_learn.learn_classcentral())
twilio_learn_list = inputdb(twilio_learn.learn_futurelearn() + twilio_learn.learn_classcentral())
docker_learn_list = inputdb(docker_learn.learn_futurelearn() + docker_learn.learn_classcentral())
kubernetes_learn_list = inputdb(kubernetes_learn.learn_futurelearn() + kubernetes_learn.learn_classcentral())

html_learn = inputdb(html_learn.learn_futurelearn() + html_learn.learn_classcentral())
css_learn = inputdb(css_learn.learn_futurelearn() + css_learn.learn_classcentral())
bootstrap_learn = inputdb(bootstrap_learn.learn_futurelearn() + bootstrap_learn.learn_classcentral())
tailwind_learn = inputdb(tailwind_learn.learn_futurelearn() + tailwind_learn.learn_classcentral())
javascript_learn = inputdb(javascript_learn.learn_futurelearn() + javascript_learn.learn_classcentral())
typescript_learn = inputdb(typescript_learn.learn_futurelearn() + typescript_learn.learn_classcentral())
react_learn = inputdb(react_learn.learn_futurelearn() + react_learn.learn_classcentral())
angular_learn = inputdb(angular_learn.learn_futurelearn() + angular_learn.learn_classcentral())
vue_learn = inputdb(vue_learn.learn_futurelearn() + vue_learn.learn_classcentral())

node_learn = inputdb(node_learn.learn_futurelearn() + node_learn.learn_classcentral())
django_learn = inputdb(django_learn.learn_futurelearn() + django_learn.learn_classcentral())
flask_learn = inputdb(flask_learn.learn_futurelearn() + flask_learn.learn_classcentral())
springboot_learn = inputdb(springboot_learn.learn_futurelearn() + springboot_learn.learn_classcentral())
laravel_learn = inputdb(laravel_learn.learn_futurelearn() + laravel_learn.learn_classcentral())
rubyonrails_learn = inputdb(rubyonrails_learn.learn_futurelearn() + rubyonrails_learn.learn_classcentral())
dotnetcore_learn = inputdb(dotnetcore_learn.learn_futurelearn() + dotnetcore_learn.learn_classcentral())

dart_learn = inputdb(dart_learn.learn_futurelearn() + dart_learn.learn_classcentral())
flutter_learn = inputdb(flutter_learn.learn_futurelearn() + flutter_learn.learn_classcentral())
reactnative_learn = inputdb(reactnative_learn.learn_futurelearn() + reactnative_learn.learn_classcentral())
kotlin_learn = inputdb(kotlin_learn.learn_futurelearn() + kotlin_learn.learn_classcentral())
androidjetpack_learn = inputdb(androidjetpack_learn.learn_futurelearn() + androidjetpack_learn.learn_classcentral())
androidstudio_learn = inputdb(androidstudio_learn.learn_futurelearn() + androidstudio_learn.learn_classcentral())

swift_learn = inputdb(swift_learn.learn_futurelearn() + swift_learn.learn_classcentral())
swiftui_learn = inputdb(swiftui_learn.learn_futurelearn() + swiftui_learn.learn_classcentral())
ionic_learn = inputdb(ionic_learn.learn_futurelearn() + ionic_learn.learn_classcentral())
xcode_learn = inputdb(xcode_learn.learn_futurelearn() + xcode_learn.learn_classcentral())
xamarin_learn = inputdb(xamarin_learn.learn_futurelearn() + xamarin_learn.learn_classcentral())