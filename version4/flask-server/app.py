from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
import json
import os
import sqlite3
import uuid
from skillcheckers.cvread import CVRead
from skillcheckers.manualread import ManualRead
from scrapersjob.jobs import Jobs
from flask_cors import CORS, cross_origin

app = Flask(__name__,template_folder = 'template')
app.config['SECRET_KEY'] = 'bwiohgo@uw#dmcd/hjoigbwoi'
app.config['UPLOAD_FOLDER'] = 'static/files'
DATABASE = 'database/user_data.db'
CORS(app, origins=['http://localhost:3000'], supports_credentials=True)

# jwt = JWTManager(app)

# Index -------------------------------------
@app.route('/')
def index():
    # return render_template('index.html')
    return 1

# Create account ----------------------------
@app.route('/createacc', methods=['POST','GET'])
def createacc():
    json_data = request.get_json('data')

    # Get the data from user
    email = json_data['email']
    password = json_data['password']
    fname = json_data['fname']
    lname = json_data['lname']
    phone = json_data['phone']
    address = json_data['address']
    postalcode = json_data['postalcode']
    country = json_data['country']

    # print(email,password,fname,lname,phone,address,postalcode,country)

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Compare with stored data
    query = "SELECT email FROM users_biodata WHERE email='"+email+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    if data:
        # If present in db
        print('message: error-1')
        return {'message':'Email already exists'}
    
    else:
        # If not present in db, Insert the data into the table
        cursor.execute("INSERT INTO users_biodata (email,password,fname,lname,phone,address,country,postalcode) VALUES (?,?,?,?,?,?,?,?)",(email, password,fname,lname,phone,address,country,postalcode))
        connection.commit()
    
        # Get user id
        query = "SELECT userid FROM users_biodata WHERE email='"+email+"' and password= '"+password+"'"
        cursor.execute(query)
        data = cursor.fetchone()

        data = str(data)
        user_id = data[data.index('(')+1:data.index(',')]
        session['session_value'] = user_id

        print("userid: ",session.get('session_value')," email: ",email," password: ",password)
        return {
            'message':'success-1',
            'session_value': session.get('session_value')
        }

# Log in ------------------------------------
@app.route('/login', methods=['POST','GET'])
def login():
    json_data = request.get_json('data')

    # Get the data from user
    email = json_data['email']
    password = json_data['password']

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Compare with stored data
    query = "SELECT userid FROM users_biodata WHERE email='"+email+"' and password= '"+password+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    # Validation
    if data:
        data = str(data)
        user_id = data[data.index('(')+1:data.index(',')]
        session['session_value'] = user_id

        print("userid: ",session.get('session_value')," email: ",email," password: ",password)
        # return redirect(url_for('homepage'))
        return {
            'message':'success-2',
            'session_value': session.get('session_value')
        }
    
    else:
        # return render_template('login.html')
        print('message: error-2')
        return {'message':'Username password does not match'}


# Enter CV ------------------------------------
@app.route('/enter_cv', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def enter_cv():
    # Get the data from user
    file = request.files['file']
    user_id = request.form['message']

    if 'file' not in request.files:
        return {'message':'error-3'}

    else:
        # Process the uploaded file here
        file = request.files['file']

        # Rename file with a random name   
        file.filename = str(uuid.uuid4())
        user_fileid = file.filename

        # Save the file
        file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))) 

        # Connect to 'user_data.db' database
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        # Insert the data into the table
        cursor.execute("UPDATE users_biodata SET (fileid)=? WHERE (userid)=? ",(user_fileid,user_id))
        connection.commit()

        # Return skills extracted from CV
        rel_path = 'static/files/' + user_fileid
        user_skills,user_positions,user_miss_skills = CVRead(rel_path)

        #Get element count
        size_user_skills = len(user_skills)
    
        print('userid:',user_id)
        print('skills count:',size_user_skills,'skills:',user_skills)
        
        # Initialize values
        qualify_1=qualify_1_syear=qualify_1_eyear=qualify_1_notes=qualify_2=qualify_2_syear=qualify_2_eyear=qualify_2_notes=qualify_3=qualify_3_syear=qualify_3_eyear=qualify_3_notes=""
        project_1_title=project_1_desc=project_2_title=project_2_desc=project_3_title=project_3_desc=""
        job_1=job_1_syear=job_1_eyear=job_1_notes=job_2=job_2_syear=job_2_eyear=job_2_notes=job_3=job_3_syear=job_3_eyear=job_3_notes=""
        skill1=skill2=skill3=skill4=skill5=skill6=skill7=skill8=skill9=skill10=skill11=skill12=skill13=skill14=skill15=skill16=skill17=skill18=skill19=skill20=skill21=skill22=skill23=skill24=skill25=skill26=skill27=skill28=skill29=skill30=skill31=skill32=skill33=skill34=skill35=skill36=skill37=skill38=skill39=skill40=skill41=skill42=skill43=skill44=skill45=skill46=skill47=skill48=skill49=skill50=False

        if 'C' in user_skills:
            skill1 = 'True'
        else:
            skill1 = 'False'

        if 'C++' in user_skills:
            skill2 = 'True'
        else:
            skill2 = 'False'

        if 'C#' in user_skills:
            skill3 = 'True'
        else:
            skill3 = 'False'

        if 'Java' in user_skills:
            skill4 = 'True'
        else:
            skill4 = 'False'

        if 'Python' in user_skills:
            skill5 = 'True'
        else:
            skill5 = 'False'

        if 'PHP' in user_skills:
            skill6 = 'True'
        else:
            skill6 = 'False'

        if 'Go' in user_skills:
            skill7 = 'True'
        else:
            skill7 = 'False'

        if 'SQL' in user_skills:
            skill8 = 'True'
        else:
            skill8 = 'False'

        if 'MySQL' in user_skills:
            skill9 = 'True'
        else:
            skill9 = 'False'

        if 'PostgreSQL' in user_skills:
            skill10 = 'True'
        else:
            skill10 = 'False'

        if 'MongoDB' in user_skills:
            skill11 = 'True'
        else:
            skill11 = 'False'

        if 'SQL Server' in user_skills:
            skill12 = 'True'
        else:
            skill12 = 'False'

        if 'Oracle SQL' in user_skills:
            skill13 = 'True'
        else:
            skill13 = 'False'

        if 'Git' in user_skills:
            skill14 = 'True'
        else:
            skill14 = 'False'

        if 'GitHub' in user_skills:
            skill15 = 'True'
        else:
            skill15 = 'False'

        if 'GitLab' in user_skills:
            skill16 = 'True'
        else:
            skill16 = 'False'

        if 'AWS' in user_skills:
            skill17 = 'True'
        else:
            skill17 = 'False'

        if 'Azure' in user_skills:
            skill18 = 'True'
        else:
            skill18 = 'False'

        if 'GCP' in user_skills:
            skill19 = 'True'
        else:
            skill19 = 'False'

        if 'Postman' in user_skills:
            skill20 = 'True'
        else:
            skill20 = 'False'

        if 'Twilio' in user_skills:
            skill21 = 'True'
        else:
            skill21 = 'False'

        if 'Docker' in user_skills:
            skill22 = 'True'
        else:
            skill22 = 'False'

        if 'Kubernetes' in user_skills:
            skill23 = 'True'
        else:
            skill23 = 'False'

        if 'HTML' in user_skills:
            skill24 = 'True'
        else:
            skill24 = 'False'

        if 'CSS' in user_skills:
            skill25 = 'True'
        else:
            skill25 = 'False'

        if 'Bootstrap' in user_skills:
            skill26 = 'True'
        else:
            skill26 = 'False'

        if 'Tailwind' in user_skills:
            skill27 = 'True'
        else:
            skill27 = 'False'

        if 'JavaScript' in user_skills:
            skill28 = 'True'
        else:
            skill28 = 'False'

        if 'Typescript' in user_skills:
            skill29 = 'True'
        else:
            skill29 = 'False'

        if 'React' in user_skills:
            skill30 = 'True'
        else:
            skill30 = 'False'

        if 'Angular' in user_skills:
            skill31 = 'True'
        else:
            skill31 = 'False'

        if 'Vue' in user_skills:
            skill32 = 'True'
        else:
            skill32 = 'False'

        if 'Node' in user_skills:
            skill33 = 'True'
        else:
            skill33 = 'False'
        
        if 'Django' in user_skills:
            skill34 = 'True'
        else:
            skill34 = 'False'

        if 'Flask' in user_skills:
            skill35 = 'True'
        else:
            skill35 = 'False'

        if 'Spring Boot' in user_skills:
            skill36 = 'True'
        else:
            skill36 = 'False'

        if 'Laravel' in user_skills:
            skill37 = 'True'
        else:
            skill37 = 'False'

        if 'Ruby on Rails' in user_skills:
            skill38 = 'True'
        else:
            skill38 = 'False'

        if '.NET Core' in user_skills:
            skill39 = 'True'
        else:
            skill39 = 'False'

        if 'Dart' in user_skills:
            skill40 = 'True'
        else:
            skill40 = 'False'

        if 'Flutter' in user_skills:
            skill41 = 'True'
        else:
            skill41 = 'False'

        if 'React Native' in user_skills:
            skill42 = 'True'
        else:
            skill42 = 'False'

        if 'Kotlin' in user_skills:
            skill43 = 'True'
        else:
            skill43 = 'False'

        if 'Android Jetpack' in user_skills:
            skill44 = 'True'
        else:
            skill44 = 'False'

        if 'Android Studio' in user_skills:
            skill45 = 'True'
        else:
            skill45 = 'False'

        if 'Swift' in user_skills:
            skill46 = 'True'
        else:
            skill46 = 'False'

        if 'SwiftUI' in user_skills:
            skill47 = 'True'
        else:
            skill47 = 'False'

        if 'Ionic' in user_skills:
            skill48 = 'True'
        else:
            skill48 = 'False'

        if 'Xcode' in user_skills:
            skill49 = 'True'
        else:
            skill49 = 'False'

        if 'Xamarin' in user_skills:
            skill50 = 'True'
        else:
            skill50 = 'False'


        # #Prepare for database input
        # for skill in range(size_user_skills,50):
        #     user_skills.append('')

        # # Unpack skills from user_skills list
        # skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11, skill12, skill13, skill14, skill15, skill16, skill17, skill18, skill19, skill20, skill21, skill22, skill23, skill24, skill25, skill26, skill27, skill28, skill29, skill30, skill31, skill32, skill33, skill34, skill35, skill36, skill37, skill38, skill39, skill40, skill41, skill42, skill43, skill44, skill45, skill46, skill47, skill48, skill49, skill50 = user_skills


        # Connect to 'user_data.db' database
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        # Insert the data into the table 'users_cvdata'
        cursor.execute("INSERT INTO users_cvdata (userid, qualify_1, qualify_1_syear, qualify_1_eyear, qualify_1_notes, qualify_2, qualify_2_syear, qualify_2_eyear, qualify_2_notes, qualify_3, qualify_3_syear, qualify_3_eyear, qualify_3_notes, project_1_title, project_1_desc, project_2_title, project_2_desc, project_3_title, project_3_desc, job_1, job_1_syear, job_1_eyear, job_1_notes, job_2, job_2_syear, job_2_eyear, job_2_notes, job_3, job_3_syear, job_3_eyear, job_3_notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",(user_id, qualify_1, qualify_1_syear, qualify_1_eyear, qualify_1_notes, qualify_2, qualify_2_syear, qualify_2_eyear, qualify_2_notes, qualify_3, qualify_3_syear, qualify_3_eyear, qualify_3_notes, project_1_title, project_1_desc, project_2_title, project_2_desc, project_3_title, project_3_desc, job_1, job_1_syear, job_1_eyear, job_1_notes, job_2, job_2_syear, job_2_eyear, job_2_notes, job_3, job_3_syear, job_3_eyear, job_3_notes))
        # Insert the data into the table 'users_skilldata'
        cursor.execute("INSERT INTO users_skilldata (userid, skill_1, skill_2, skill_3, skill_4, skill_5, skill_6, skill_7, skill_8, skill_9, skill_10, skill_11, skill_12, skill_13, skill_14, skill_15, skill_16, skill_17, skill_18, skill_19, skill_20, skill_21, skill_22, skill_23, skill_24, skill_25, skill_26, skill_27, skill_28, skill_29, skill_30, skill_31, skill_32, skill_33, skill_34, skill_35, skill_36, skill_37, skill_38, skill_39, skill_40, skill_41, skill_42, skill_43, skill_44, skill_45, skill_46, skill_47, skill_48, skill_49, skill_50) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",(user_id, skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11, skill12, skill13, skill14, skill15, skill16, skill17, skill18, skill19, skill20, skill21, skill22, skill23, skill24, skill25, skill26, skill27, skill28, skill29, skill30, skill31, skill32, skill33, skill34, skill35, skill36, skill37, skill38, skill39, skill40, skill41, skill42, skill43, skill44, skill45, skill46, skill47, skill48, skill49, skill50))
        
        # Disconnect from 'user_data.db' database
        connection.commit()

        print("userid:",user_id, user_fileid, "File has been uploaded")

        # Return a response to the client
        return {
            'message':'success-3',
            'session_value': user_id
        }

# Enter Manual GET --------------------------------
@app.route('/enter_manual/get', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def enter_manual_get():
    # Get the data from user
    json_data = request.get_json('data')
    
    # Get the data from user
    user_id = json_data['value']

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Retrieve data
    query = "SELECT * FROM users_biodata WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    # Personal data
    fname = data[4]
    lname = data[5]
    email = data[1]
    phone = data[6]
    address = data[7]
    country = data[8]
    postalcode = data[9]

    # Return a response to the client
    data = []

    data.append({
        'message':'success-5',
        'session_value': user_id,
        'fname': fname,
        'lname': lname,
        'email': email,
        'phone': phone,
        'address': address,
        'country': country,
        'postalcode': postalcode
    })

    json_data = json.dumps(data, indent=4)

    # return render_template
    return json_data

# Enter Manual POST --------------------------------
@app.route('/enter_manual/post', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def enter_manual_post():
    # Get the data from user
    json_data = request.get_json('data')
    
    # Get the data from user
    user_id = json_data['value']

    print(json_data)

    # Initialize values
    qualify_1=qualify_1_syear=qualify_1_eyear=qualify_1_notes=qualify_2=qualify_2_syear=qualify_2_eyear=qualify_2_notes=qualify_3=qualify_3_syear=qualify_3_eyear=qualify_3_notes=""
    project_1_title=project_1_desc=project_2_title=project_2_desc=project_3_title=project_3_desc=""
    job_1=job_1_syear=job_1_eyear=job_1_notes=job_2=job_2_syear=job_2_eyear=job_2_notes=job_3=job_3_syear=job_3_eyear=job_3_notes=""
    skill1=skill2=skill3=skill4=skill5=skill6=skill7=skill8=skill9=skill10=skill11=skill12=skill13=skill14=skill15=skill16=skill17=skill18=skill19=skill20=skill21=skill22=skill23=skill24=skill25=skill26=skill27=skill28=skill29=skill30=skill31=skill32=skill33=skill34=skill35=skill36=skill37=skill38=skill39=skill40=skill41=skill42=skill43=skill44=skill45=skill46=skill47=skill48=skill49=skill50=False
    
    # Educational data (Max 3)
    qualify_1 = json_data['qualify_1']
    qualify_1_syear = json_data['qualify_1_syear']
    qualify_1_eyear = json_data['qualify_1_eyear']
    qualify_1_notes = json_data['qualify_1_notes']

    qualify_2 = json_data['qualify_2']
    qualify_2_syear = json_data['qualify_2_syear']
    qualify_2_eyear = json_data['qualify_2_eyear']
    qualify_2_notes = json_data['qualify_2_notes']

    qualify_3 = json_data['qualify_3']
    qualify_3_syear = json_data['qualify_3_syear']
    qualify_3_eyear = json_data['qualify_3_eyear']
    qualify_3_notes = json_data['qualify_3_notes']

    # Project data (Max 3)
    project_1_title = json_data['project_1_title']
    project_1_desc = json_data['project_1_desc']

    project_2_title = json_data['project_2_title']
    project_2_desc = json_data['project_2_desc']

    project_3_title = json_data['project_3_title']
    project_3_desc = json_data['project_3_desc']

    # Past experience (Max 3)
    job_1 = json_data['job_1']
    job_1_syear = json_data['job_1_syear']
    job_1_eyear = json_data['job_1_eyear']
    job_1_notes = json_data['job_1_notes']

    job_2 = json_data['job_2']
    job_2_syear = json_data['job_2_syear']
    job_2_eyear = json_data['job_2_eyear']
    job_2_notes = json_data['job_2_notes']

    job_3 = json_data['job_3']
    job_3_syear = json_data['job_3_syear']
    job_3_eyear = json_data['job_3_eyear']
    job_3_notes = json_data['job_3_notes']

    # Technologies 
    # skillCount = int(json_data['count'])
    # remainCount = 50 - skillCount

    # jsonSkillData = []

    # for i in range (skillCount):
    #     skill = json_data['boxContent'][i]['id']
    #     jsonSkillData.append(skill)

    # for i in range (remainCount):
    #     jsonSkillData.append("")

    # print(jsonSkillData)

    skill1 = str(json_data['skill1'])
    skill2 = str(json_data['skill2'])    
    skill3 = str(json_data['skill3'])    
    skill4 = str(json_data['skill4'])    
    skill5 = str(json_data['skill5'])    
    skill6 = str(json_data['skill6'])    
    skill7 = str(json_data['skill7'])    
    skill8 = str(json_data['skill8'])    
    skill9 = str(json_data['skill9'])    
    skill10 = str(json_data['skill10'])
    skill11 = str(json_data['skill11'])
    skill12 = str(json_data['skill12'])
    skill13 = str(json_data['skill13'])
    skill14 = str(json_data['skill14'])
    skill15 = str(json_data['skill15'])
    skill16 = str(json_data['skill16'])
    skill17 = str(json_data['skill17'])
    skill18 = str(json_data['skill18'])
    skill19 = str(json_data['skill19'])
    skill20 = str(json_data['skill20'])
    skill21 = str(json_data['skill21'])
    skill22 = str(json_data['skill22'])
    skill23 = str(json_data['skill23'])
    skill24 = str(json_data['skill24'])
    skill25 = str(json_data['skill25'])
    skill26 = str(json_data['skill26'])
    skill27 = str(json_data['skill27'])
    skill28 = str(json_data['skill28'])
    skill29 = str(json_data['skill29'])
    skill30 = str(json_data['skill30'])
    skill31 = str(json_data['skill31'])
    skill32 = str(json_data['skill32'])
    skill33 = str(json_data['skill33'])
    skill34 = str(json_data['skill34'])
    skill35 = str(json_data['skill35'])
    skill36 = str(json_data['skill36'])
    skill37 = str(json_data['skill37'])
    skill38 = str(json_data['skill38'])
    skill39 = str(json_data['skill39'])
    skill40 = str(json_data['skill40'])
    skill41 = str(json_data['skill41'])
    skill42 = str(json_data['skill42'])
    skill43 = str(json_data['skill43'])
    skill44 = str(json_data['skill44'])
    skill45 = str(json_data['skill45'])
    skill46 = str(json_data['skill46'])
    skill47 = str(json_data['skill47'])
    skill48 = str(json_data['skill48'])
    skill49 = str(json_data['skill49'])
    skill50 = str(json_data['skill50'])

    print(skill50)

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Insert the data into the table 'users_cvdata'
    cursor.execute("INSERT INTO users_cvdata (userid, qualify_1, qualify_1_syear, qualify_1_eyear, qualify_1_notes, qualify_2, qualify_2_syear, qualify_2_eyear, qualify_2_notes, qualify_3, qualify_3_syear, qualify_3_eyear, qualify_3_notes, project_1_title, project_1_desc, project_2_title, project_2_desc, project_3_title, project_3_desc, job_1, job_1_syear, job_1_eyear, job_1_notes, job_2, job_2_syear, job_2_eyear, job_2_notes, job_3, job_3_syear, job_3_eyear, job_3_notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",(user_id, qualify_1, qualify_1_syear, qualify_1_eyear, qualify_1_notes, qualify_2, qualify_2_syear, qualify_2_eyear, qualify_2_notes, qualify_3, qualify_3_syear, qualify_3_eyear, qualify_3_notes, project_1_title, project_1_desc, project_2_title, project_2_desc, project_3_title, project_3_desc, job_1, job_1_syear, job_1_eyear, job_1_notes, job_2, job_2_syear, job_2_eyear, job_2_notes, job_3, job_3_syear, job_3_eyear, job_3_notes))
    # Insert the data into the table 'users_skilldata'
    cursor.execute("INSERT INTO users_skilldata (userid, skill_1, skill_2, skill_3, skill_4, skill_5, skill_6, skill_7, skill_8, skill_9, skill_10, skill_11, skill_12, skill_13, skill_14, skill_15, skill_16, skill_17, skill_18, skill_19, skill_20, skill_21, skill_22, skill_23, skill_24, skill_25, skill_26, skill_27, skill_28, skill_29, skill_30, skill_31, skill_32, skill_33, skill_34, skill_35, skill_36, skill_37, skill_38, skill_39, skill_40, skill_41, skill_42, skill_43, skill_44, skill_45, skill_46, skill_47, skill_48, skill_49, skill_50) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",(user_id, skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11, skill12, skill13, skill14, skill15, skill16, skill17, skill18, skill19, skill20, skill21, skill22, skill23, skill24, skill25, skill26, skill27, skill28, skill29, skill30, skill31, skill32, skill33, skill34, skill35, skill36, skill37, skill38, skill39, skill40, skill41, skill42, skill43, skill44, skill45, skill46, skill47, skill48, skill49, skill50))
    
    # Disconnect from 'user_data.db' database
    connection.commit()

    # Return a response to the client
    return {
        'message':'success-5',
        'session_value': user_id
    }

# CrossCheck GET -----------------------------------
@app.route('/crosscheck/get', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def crosscheck_get():
    # Get the data from user
    json_data = request.get_json('data')
    
    # Get the data from user
    user_id = json_data['value']

    print(json_data)

    # Initialize values
    qualify_1=qualify_1_syear=qualify_1_eyear=qualify_1_notes=qualify_2=qualify_2_syear=qualify_2_eyear=qualify_2_notes=qualify_3=qualify_3_syear=qualify_3_eyear=qualify_3_notes=""
    project_1_title=project_1_desc=project_2_title=project_2_desc=project_3_title=project_3_desc=""
    job_1=job_1_syear=job_1_eyear=job_1_notes=job_2=job_2_syear=job_2_eyear=job_2_notes=job_3=job_3_syear=job_3_eyear=job_3_notes=""
    skill1=skill2=skill3=skill4=skill5=skill6=skill7=skill8=skill9=skill10=skill11=skill12=skill13=skill14=skill15=skill16=skill17=skill18=skill19=skill20=skill21=skill22=skill23=skill24=skill25=skill26=skill27=skill28=skill29=skill30=skill31=skill32=skill33=skill34=skill35=skill36=skill37=skill38=skill39=skill40=skill41=skill42=skill43=skill44=skill45=skill46=skill47=skill48=skill49=skill50=False

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Retrieve users_biodata
    query = "SELECT * FROM users_biodata WHERE userid='"+user_id+"'"
    cursor.execute(query)
    users_biodata = cursor.fetchone()

    print(users_biodata)

    # Retrieve users_cvdata
    query = "SELECT * FROM users_cvdata WHERE userid='"+user_id+"'"
    cursor.execute(query)
    users_cvdata = cursor.fetchone()

    print(users_cvdata)

    # Retrieve users_biodata
    query = "SELECT * FROM users_skilldata WHERE userid='"+user_id+"'"
    cursor.execute(query)
    users_skilldata = cursor.fetchone()

    print(users_skilldata)

    # Personal data
    fname = users_biodata[4]
    lname = users_biodata[5]
    email = users_biodata[1]
    phone = users_biodata[6]
    address = users_biodata[7]
    country = users_biodata[8]
    postalcode = users_biodata[9]

    # Educational data (Max 3)
    qualify_1 = users_cvdata[1]
    qualify_1_syear = users_cvdata[2]
    qualify_1_eyear = users_cvdata[3]

    qualify_2 = users_cvdata[5]
    qualify_2_syear = users_cvdata[6]
    qualify_2_eyear = users_cvdata[7]

    qualify_3 = users_cvdata[9]
    qualify_3_syear = users_cvdata[10]
    qualify_3_eyear = users_cvdata[11]

    # Project data (Max 3)
    project_1_title = users_cvdata[13]

    project_2_title = users_cvdata[15]

    project_3_title = users_cvdata[17]

    # Past experience (Max 3)
    job_1 = users_cvdata[19]
    job_1_syear = users_cvdata[20]
    job_1_eyear = users_cvdata[21]

    job_2 = users_cvdata[23]
    job_2_syear = users_cvdata[24]
    job_2_eyear = users_cvdata[25]

    job_3 = users_cvdata[27]
    job_3_syear = users_cvdata[28]
    job_3_eyear = users_cvdata[29]

    # Skill data
    skill1 = eval(users_skilldata[1])
    skill2 = eval(users_skilldata[2])    
    skill3 = eval(users_skilldata[3])    
    skill4 = eval(users_skilldata[4])    
    skill5 = eval(users_skilldata[5])    
    skill6 = eval(users_skilldata[6])    
    skill7 = eval(users_skilldata[7])    
    skill8 = eval(users_skilldata[8])    
    skill9 = eval(users_skilldata[9])    
    skill10 = eval(users_skilldata[10])
    skill11 = eval(users_skilldata[11])
    skill12 = eval(users_skilldata[12])
    skill13 = eval(users_skilldata[13])
    skill14 = eval(users_skilldata[14])
    skill15 = eval(users_skilldata[15])
    skill16 = eval(users_skilldata[16])
    skill17 = eval(users_skilldata[17])
    skill18 = eval(users_skilldata[18])
    skill19 = eval(users_skilldata[19])
    skill20 = eval(users_skilldata[20])
    skill21 = eval(users_skilldata[21])
    skill22 = eval(users_skilldata[22])
    skill23 = eval(users_skilldata[23])
    skill24 = eval(users_skilldata[24])
    skill25 = eval(users_skilldata[25])
    skill26 = eval(users_skilldata[26])
    skill27 = eval(users_skilldata[27])
    skill28 = eval(users_skilldata[28])
    skill29 = eval(users_skilldata[29])
    skill30 = eval(users_skilldata[30])
    skill31 = eval(users_skilldata[31])
    skill32 = eval(users_skilldata[32])
    skill33 = eval(users_skilldata[33])
    skill34 = eval(users_skilldata[34])
    skill35 = eval(users_skilldata[35])
    skill36 = eval(users_skilldata[36])
    skill37 = eval(users_skilldata[37])
    skill38 = eval(users_skilldata[38])
    skill39 = eval(users_skilldata[39])
    skill40 = eval(users_skilldata[40])
    skill41 = eval(users_skilldata[41])
    skill42 = eval(users_skilldata[42])
    skill43 = eval(users_skilldata[43])
    skill44 = eval(users_skilldata[44])
    skill45 = eval(users_skilldata[45])
    skill46 = eval(users_skilldata[46])
    skill47 = eval(users_skilldata[47])
    skill48 = eval(users_skilldata[48])
    skill49 = eval(users_skilldata[49])
    skill50 = eval(users_skilldata[50])

    # Return a response to the client
    data = []

    data.append({
        'message':'success-9',
        'session_value': user_id,
        'fname': fname,
        'lname': lname,
        'email': email,
        'phone': phone,
        'address': address,
        'country': country,
        'postalcode': postalcode,
        'qualify_1': qualify_1,
        'qualify_1_syear': qualify_1_syear,
        'qualify_1_eyear': qualify_1_eyear,
        'qualify_2': qualify_2,
        'qualify_2_syear': qualify_2_syear,
        'qualify_2_eyear': qualify_2_eyear,
        'qualify_3': qualify_3,
        'qualify_3_syear': qualify_3_syear,
        'qualify_3_eyear': qualify_3_eyear,
        'project_1_title': project_1_title,
        'project_2_title': project_2_title,
        'project_3_title': project_3_title,
        'job_1': job_1,
        'job_1_syear': job_1_syear,
        'job_1_eyear': job_1_eyear,
        'job_2': job_2,
        'job_2_syear': job_2_syear,
        'job_2_eyear': job_2_eyear,
        'job_3': job_3,
        'job_3_syear': job_3_syear,
        'job_3_eyear': job_3_eyear,
        'skill1': skill1,
        'skill2': skill2,
        'skill3': skill3,
        'skill4': skill4,
        'skill5': skill5,
        'skill6': skill6,
        'skill7': skill7,
        'skill8': skill8,
        'skill9': skill9,
        'skill10': skill10,
        'skill11': skill11,
        'skill12': skill12,
        'skill13': skill13,
        'skill14': skill14,
        'skill15': skill15,
        'skill16': skill16,
        'skill17': skill17,
        'skill18': skill18,
        'skill19': skill19,
        'skill20': skill20,
        'skill21': skill21,
        'skill22': skill22,
        'skill23': skill23,
        'skill24': skill24,
        'skill25': skill25,
        'skill26': skill26,
        'skill27': skill27,
        'skill28': skill28,
        'skill29': skill29,
        'skill30': skill30,
        'skill31': skill31,
        'skill32': skill32,
        'skill33': skill33,
        'skill34': skill34,
        'skill35': skill35,
        'skill36': skill36,
        'skill37': skill37,
        'skill38': skill38,
        'skill39': skill39,
        'skill40': skill40,
        'skill41': skill41,
        'skill42': skill42,
        'skill43': skill43,
        'skill44': skill44,
        'skill45': skill45,
        'skill46': skill46,
        'skill47': skill47,
        'skill48': skill48,
        'skill49': skill49,
        'skill50': skill50,
    })

    json_data = json.dumps(data, indent=4)

    # return render_template
    return json_data


# CrossCheck POST -----------------------------------
@app.route('/crosscheck/post', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def crosscheck_post():
    # Get the data from user
    json_data = request.get_json('data')
    
    # Get the data from user
    user_id = json_data['value']

    # print(json_data)

    # Initialize values
    qualify_1=qualify_1_syear=qualify_1_eyear=qualify_2=qualify_2_syear=qualify_2_eyear=qualify_3=qualify_3_syear=qualify_3_eyear=""
    project_1_title=project_2_title=project_3_title=""
    job_1=job_1_syear=job_1_eyear=job_2=job_2_syear=job_2_eyear=job_3=job_3_syear=job_3_eyear=""
    skill1=skill2=skill3=skill4=skill5=skill6=skill7=skill8=skill9=skill10=skill11=skill12=skill13=skill14=skill15=skill16=skill17=skill18=skill19=skill20=skill21=skill22=skill23=skill24=skill25=skill26=skill27=skill28=skill29=skill30=skill31=skill32=skill33=skill34=skill35=skill36=skill37=skill38=skill39=skill40=skill41=skill42=skill43=skill44=skill45=skill46=skill47=skill48=skill49=skill50=False

    # Educational data (Max 3)
    qualify_1 = json_data['qualify_1']
    qualify_1_syear = json_data['qualify_1_syear']
    qualify_1_eyear = json_data['qualify_1_eyear']

    qualify_2 = json_data['qualify_2']
    qualify_2_syear = json_data['qualify_2_syear']
    qualify_2_eyear = json_data['qualify_2_eyear']

    qualify_3 = json_data['qualify_3']
    qualify_3_syear = json_data['qualify_3_syear']
    qualify_3_eyear = json_data['qualify_3_eyear']

    # Project data (Max 3)
    project_1_title = json_data['project_1_title']
    project_2_title = json_data['project_2_title']
    project_3_title = json_data['project_3_title']

    # Past experience (Max 3)
    job_1 = json_data['job_1']
    job_1_syear = json_data['job_1_syear']
    job_1_eyear = json_data['job_1_eyear']

    job_2 = json_data['job_2']
    job_2_syear = json_data['job_2_syear']
    job_2_eyear = json_data['job_2_eyear']

    job_3 = json_data['job_3']
    job_3_syear = json_data['job_3_syear']
    job_3_eyear = json_data['job_3_eyear']

    skill1 = str(json_data['skill1'])
    skill2 = str(json_data['skill2'])    
    skill3 = str(json_data['skill3'])    
    skill4 = str(json_data['skill4'])    
    skill5 = str(json_data['skill5'])    
    skill6 = str(json_data['skill6'])    
    skill7 = str(json_data['skill7'])    
    skill8 = str(json_data['skill8'])    
    skill9 = str(json_data['skill9'])    
    skill10 = str(json_data['skill10'])
    skill11 = str(json_data['skill11'])
    skill12 = str(json_data['skill12'])
    skill13 = str(json_data['skill13'])
    skill14 = str(json_data['skill14'])
    skill15 = str(json_data['skill15'])
    skill16 = str(json_data['skill16'])
    skill17 = str(json_data['skill17'])
    skill18 = str(json_data['skill18'])
    skill19 = str(json_data['skill19'])
    skill20 = str(json_data['skill20'])
    skill21 = str(json_data['skill21'])
    skill22 = str(json_data['skill22'])
    skill23 = str(json_data['skill23'])
    skill24 = str(json_data['skill24'])
    skill25 = str(json_data['skill25'])
    skill26 = str(json_data['skill26'])
    skill27 = str(json_data['skill27'])
    skill28 = str(json_data['skill28'])
    skill29 = str(json_data['skill29'])
    skill30 = str(json_data['skill30'])
    skill31 = str(json_data['skill31'])
    skill32 = str(json_data['skill32'])
    skill33 = str(json_data['skill33'])
    skill34 = str(json_data['skill34'])
    skill35 = str(json_data['skill35'])
    skill36 = str(json_data['skill36'])
    skill37 = str(json_data['skill37'])
    skill38 = str(json_data['skill38'])
    skill39 = str(json_data['skill39'])
    skill40 = str(json_data['skill40'])
    skill41 = str(json_data['skill41'])
    skill42 = str(json_data['skill42'])
    skill43 = str(json_data['skill43'])
    skill44 = str(json_data['skill44'])
    skill45 = str(json_data['skill45'])
    skill46 = str(json_data['skill46'])
    skill47 = str(json_data['skill47'])
    skill48 = str(json_data['skill48'])
    skill49 = str(json_data['skill49'])
    skill50 = str(json_data['skill50'])

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Update the data into the table 'users_cvdata'
    cursor.execute("UPDATE users_cvdata SET qualify_1=?, qualify_1_syear=?, qualify_1_eyear=?, qualify_2=?, qualify_2_syear=?, qualify_2_eyear=?, qualify_3=?, qualify_3_syear=?, qualify_3_eyear=?, project_1_title=?, project_2_title=?, project_3_title=?, job_1=?, job_1_syear=?, job_1_eyear=?, job_2=?, job_2_syear=?, job_2_eyear=?, job_3=?, job_3_syear=?, job_3_eyear=? WHERE userid=?",(qualify_1, qualify_1_syear, qualify_1_eyear, qualify_2, qualify_2_syear, qualify_2_eyear, qualify_3, qualify_3_syear, qualify_3_eyear, project_1_title, project_2_title, project_3_title, job_1, job_1_syear, job_1_eyear, job_2, job_2_syear, job_2_eyear, job_3, job_3_syear, job_3_eyear, user_id))
    
    # Update the data into the table 'users_skilldata'
    cursor.execute("UPDATE users_skilldata SET skill_1=?, skill_2=?, skill_3=?, skill_4=?, skill_5=?, skill_6=?, skill_7=?, skill_8=?, skill_9=?, skill_10=?, skill_11=?, skill_12=?, skill_13=?, skill_14=?, skill_15=?, skill_16=?, skill_17=?, skill_18=?, skill_19=?, skill_20=?, skill_21=?, skill_22=?, skill_23=?, skill_24=?, skill_25=?, skill_26=?, skill_27=?, skill_28=?, skill_29=?, skill_30=?, skill_31=?, skill_32=?, skill_33=?, skill_34=?, skill_35=?, skill_36=?, skill_37=?, skill_38=?, skill_39=?, skill_40=?, skill_41=?, skill_42=?, skill_43=?, skill_44=?, skill_45=?, skill_46=?, skill_47=?, skill_48=?, skill_49=?, skill_50=? WHERE userid=?",(skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11, skill12, skill13, skill14, skill15, skill16, skill17, skill18, skill19, skill20, skill21, skill22, skill23, skill24, skill25, skill26, skill27, skill28, skill29, skill30, skill31, skill32, skill33, skill34, skill35, skill36, skill37, skill38, skill39, skill40, skill41, skill42, skill43, skill44, skill45, skill46, skill47, skill48, skill49, skill50, user_id))
    
    # Disconnect from 'user_data.db' database
    connection.commit()

    # # # POSITION ELIGIBILITY CALCULATION -------------------------
    # # Retrieve users_cvdata
    # query = "SELECT * FROM users_cvdata WHERE userid='"+user_id+"'"

    # calculate score_qualify_1
    if (qualify_1 == 'High school'):
        score_qualify_1 = 10
    elif (qualify_1 == 'Vocational qualification'):
        score_qualify_1 = 15
    elif (qualify_1 == "Bachelor's degree"):
        score_qualify_1 = 20
    elif (qualify_1 == "Master's degree"):
        score_qualify_1 = 22
    elif (qualify_1 == "Doctorate or higher"):
        score_qualify_1 = 25
    else:
        score_qualify_1 = 0

    # calculate score_qualify_2
    if (qualify_2 == 'High school'):
        score_qualify_2 = 10
    elif (qualify_2 == 'Vocational qualification'):
        score_qualify_2 = 15
    elif (qualify_2 == "Bachelor's degree"):
        score_qualify_2 = 20
    elif (qualify_2 == "Master's degree"):
        score_qualify_2 = 22
    elif (qualify_2 == "Doctorate or higher"):
        score_qualify_2 = 25
    else:
        score_qualify_2 = 0

    # calculate score_qualify_3
    if (qualify_3 == 'High school'):
        score_qualify_3 = 10
    elif (qualify_3 == 'Vocational qualification'):
        score_qualify_3 = 15
    elif (qualify_3 == "Bachelor's degree"):
        score_qualify_3 = 20
    elif (qualify_3 == "Master's degree"):
        score_qualify_3 = 22
    elif (qualify_3 == "Doctorate or higher"):
        score_qualify_3 = 25
    else:
        score_qualify_3 = 0
    
    max_score_qualify = max(score_qualify_1, score_qualify_2, score_qualify_3)

    # Calculate score_project_1
    if (project_1_title != ""):
        score_project_1 = 10
    else:
        score_project_1 = 0

    # Calculate score_project_2
    if (project_2_title != ""):
        score_project_2 = 10
    else:
        score_project_2 = 0

    # Calculate score_project_1
    if (project_3_title != ""):
        score_project_3 = 10
    else:
        score_project_3 = 0

    sum_score_project = score_project_1 + score_project_2 + score_project_3

    # Calculate score_job
    if job_1 != "" or job_2 != "" or job_3 != "":
        score_job = 10
    else:
        score_job = 0

    # Calculate score_cvData (Max 65)
    score_usersCvData_final = float(max_score_qualify + sum_score_project + score_job)
    score_usersCvData = round(score_usersCvData_final, 2)

    # Retrieve users_skilldata
    # query = "SELECT * FROM users_skilldata WHERE userid='"+user_id+"'"
    # cursor.execute(query)
    # users_skilldata = cursor.fetchone()

    # print(users_skilldata)

    # Get element count
    # count_user_skills = usersSkillData[1]

    # Get user_skills
    user_skills = []

    if (skill1 == 'True'):
        user_skills.append('C')
    if (skill2 == 'True'):
        user_skills.append('Cpp')
    if (skill3 == 'True'):
        user_skills.append('Csharp')
    if (skill4 == 'True'):
        user_skills.append('Java')
    if (skill5 == 'True'):
        user_skills.append('Python')
    if (skill6 == 'True'):
        user_skills.append('PHP')
    if (skill7 == 'True'):
        user_skills.append('Go')
    if (skill8 == 'True'):
        user_skills.append('SQL')
    if (skill9 == 'True'):
        user_skills.append('MySQL')
    if (skill10 == 'True'):
        user_skills.append('PostgreSQL')
    if (skill11 == 'True'):
        user_skills.append('MongoDB')
    if (skill12 == 'True'):
        user_skills.append('SQL Server')
    if (skill13 == 'True'):
        user_skills.append('Oracle SQL')
    if (skill14 == 'True'):
        user_skills.append('Git')
    if (skill15 == 'True'):
        user_skills.append('GitHub')
    if (skill16 == 'True'):
        user_skills.append('GitLab')
    if (skill17 == 'True'):
        user_skills.append('AWS')
    if (skill18 == 'True'):
        user_skills.append('Azure')
    if (skill19 == 'True'):
        user_skills.append('GCP')
    if (skill20 == 'True'):
        user_skills.append('Postman')
    if (skill21 == 'True'):
        user_skills.append('Twilio')
    if (skill22 == 'True'):
        user_skills.append('Docker')
    if (skill23 == 'True'):
        user_skills.append('Kubernetes')
    if (skill24 == 'True'):
        user_skills.append('HTML')
    if (skill25 == 'True'):
        user_skills.append('CSS')
    if (skill26 == 'True'):
        user_skills.append('Bootstrap')
    if (skill27 == 'True'):
        user_skills.append('Tailwind')
    if (skill28 == 'True'):
        user_skills.append('JavaScript')
    if (skill29 == 'True'):
        user_skills.append('TypeScript')
    if (skill30 == 'True'):
        user_skills.append('React')
    if (skill31 == 'True'):
        user_skills.append('Angular')
    if (skill32 == 'True'):
        user_skills.append('Vue')
    if (skill33 == 'True'):
        user_skills.append('Node')
    if (skill34 == 'True'):
        user_skills.append('Django')
    if (skill35 == 'True'):
        user_skills.append('Flask')
    if (skill36 == 'True'):
        user_skills.append('Spring Boot')
    if (skill37 == 'True'):
        user_skills.append('Laravel')
    if (skill38 == 'True'):
        user_skills.append('Ruby on Rails')
    if (skill39 == 'True'):
        user_skills.append('.NET Core')
    if (skill40 == 'True'):
        user_skills.append('Dart')
    if (skill41 == 'True'):
        user_skills.append('Flutter')
    if (skill42 == 'True'):
        user_skills.append('React Native')
    if (skill43 == 'True'):
        user_skills.append('Kotlin')
    if (skill44 == 'True'):
        user_skills.append('Android Jetpack')
    if (skill45 == 'True'):
        user_skills.append('Android Studio')
    if (skill46 == 'True'):
        user_skills.append('Swift')
    if (skill47 == 'True'):
        user_skills.append('SwiftUI')
    if (skill48 == 'True'):
        user_skills.append('Ionic')
    if (skill49 == 'True'):
        user_skills.append('Xcode')
    if (skill50 == 'True'):
        user_skills.append('Xamarin')

    print(user_skills)
    count_user_skills = len(user_skills)

    # Calculate score_usersSkillData
    score_usersSkillData_final = float((count_user_skills / 50) * 35)
    score_usersSkillData = round(score_usersSkillData_final, 2)

    # Calculate TOTAL USER SCORE ----------
    totalUserScore = round((score_usersCvData + score_usersSkillData), 2)

    # Return ManualRead data
    match_software_eng, match_front_end_eng, match_back_end_eng, match_android_eng, match_ios_eng, miss_skills_software_eng, miss_skills_front_end_eng, miss_skills_back_end_eng, miss_skills_android_eng, miss_skills_ios_eng = ManualRead(user_skills)

    # List of skills user have for each position
    print(match_software_eng)
    print(match_front_end_eng)
    print(match_back_end_eng)
    print(match_android_eng)
    print(match_ios_eng)

    # List of skills user miss for each position
    print(miss_skills_software_eng)
    print(miss_skills_front_end_eng)
    print(miss_skills_back_end_eng)
    print(miss_skills_android_eng)
    print(miss_skills_ios_eng)

    # Count of skills user have for each position
    size_match_software_eng = len(match_software_eng)
    size_match_front_end_eng = len(match_front_end_eng)
    size_match_back_end_eng = len(match_back_end_eng)
    size_match_android_eng = len(match_android_eng)
    size_match_ios_eng = len(match_ios_eng)

    # Count of skills user miss for each position
    size_miss_skills_software_eng = len(miss_skills_software_eng)
    size_miss_skills_front_end_eng = len(miss_skills_front_end_eng)
    size_miss_skills_back_end_eng = len(miss_skills_back_end_eng)
    size_miss_skills_android_eng = len(miss_skills_android_eng)
    size_miss_skills_ios_eng = len(miss_skills_ios_eng)

    # Calculate position matching score
    score_software_eng_float = float(size_match_software_eng / 23)
    score_software_eng = round(score_software_eng_float, 2)

    score_front_end_eng_float = float(size_match_front_end_eng / 9)
    score_front_end_eng = round(score_front_end_eng_float, 2)

    score_back_end_eng_float = float(size_match_back_end_eng / 7)
    score_back_end_eng = round(score_back_end_eng_float, 2)

    score_android_eng_float = float(size_match_android_eng / 6)
    score_android_eng = round(score_android_eng_float, 2)

    score_ios_eng_float = float(size_match_ios_eng / 5)
    score_ios_eng = round(score_ios_eng_float, 2)

    #Prepare for database input
    for skill in range(size_miss_skills_software_eng,23):
        miss_skills_software_eng.append('')

    for skill in range(size_miss_skills_front_end_eng,9):
        miss_skills_front_end_eng.append('')

    for skill in range(size_miss_skills_back_end_eng,7):
        miss_skills_back_end_eng.append('')

    for skill in range(size_miss_skills_android_eng,6):
        miss_skills_android_eng.append('')

    for skill in range(size_miss_skills_ios_eng,5):
        miss_skills_ios_eng.append('')

    # Unpack skills from miss_skills_software_eng list
    software_eng_miss_1,software_eng_miss_2,software_eng_miss_3,software_eng_miss_4,software_eng_miss_5,software_eng_miss_6,software_eng_miss_7,software_eng_miss_8,software_eng_miss_9,software_eng_miss_10,software_eng_miss_11,software_eng_miss_12,software_eng_miss_13,software_eng_miss_14,software_eng_miss_15,software_eng_miss_16,software_eng_miss_17,software_eng_miss_18,software_eng_miss_19,software_eng_miss_20,software_eng_miss_21,software_eng_miss_22,software_eng_miss_23 = miss_skills_software_eng


    # Unpack skills from miss_skills_front_end_eng list
    front_end_eng_miss_1,front_end_eng_miss_2,front_end_eng_miss_3,front_end_eng_miss_4,front_end_eng_miss_5,front_end_eng_miss_6,front_end_eng_miss_7,front_end_eng_miss_8,front_end_eng_miss_9 = miss_skills_front_end_eng

    # Unpack skills from miss_skills_back_end_eng list
    back_end_eng_miss_1,back_end_eng_miss_2,back_end_eng_miss_3,back_end_eng_miss_4,back_end_eng_miss_5,back_end_eng_miss_6,back_end_eng_miss_7 = miss_skills_back_end_eng

    # Unpack skills from miss_skills_android_eng list
    android_eng_miss_1,android_eng_miss_2,android_eng_miss_3,android_eng_miss_4,android_eng_miss_5,android_eng_miss_6 = miss_skills_android_eng

    # Unpack skills from miss_skills_ios_eng list
    ios_eng_miss_1,ios_eng_miss_2,ios_eng_miss_3,ios_eng_miss_4,ios_eng_miss_5 = miss_skills_ios_eng

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Insert the data into the table user_positions
    cursor.execute("INSERT INTO user_positions (userid,user_score,score_software_eng,score_front_end_eng,score_back_end_eng,score_android_eng,score_ios_eng,software_eng_miss_1,software_eng_miss_2,software_eng_miss_3,software_eng_miss_4,software_eng_miss_5,software_eng_miss_6,software_eng_miss_7,software_eng_miss_8,software_eng_miss_9,software_eng_miss_10,software_eng_miss_11,software_eng_miss_12,software_eng_miss_13,software_eng_miss_14,software_eng_miss_15,software_eng_miss_16,software_eng_miss_17,software_eng_miss_18,software_eng_miss_19,software_eng_miss_20,software_eng_miss_21,software_eng_miss_22,software_eng_miss_23,front_end_eng_miss_1,front_end_eng_miss_2,front_end_eng_miss_3,front_end_eng_miss_4,front_end_eng_miss_5,front_end_eng_miss_6,front_end_eng_miss_7,front_end_eng_miss_8,front_end_eng_miss_9,back_end_eng_miss_1,back_end_eng_miss_2,back_end_eng_miss_3,back_end_eng_miss_4,back_end_eng_miss_5,back_end_eng_miss_6,back_end_eng_miss_7,android_eng_miss_1,android_eng_miss_2,android_eng_miss_3,android_eng_miss_4,android_eng_miss_5,android_eng_miss_6,ios_eng_miss_1,ios_eng_miss_2,ios_eng_miss_3,ios_eng_miss_4,ios_eng_miss_5) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",(user_id,totalUserScore,score_software_eng,score_front_end_eng,score_back_end_eng,score_android_eng,score_ios_eng,software_eng_miss_1,software_eng_miss_2,software_eng_miss_3,software_eng_miss_4,software_eng_miss_5,software_eng_miss_6,software_eng_miss_7,software_eng_miss_8,software_eng_miss_9,software_eng_miss_10,software_eng_miss_11,software_eng_miss_12,software_eng_miss_13,software_eng_miss_14,software_eng_miss_15,software_eng_miss_16,software_eng_miss_17,software_eng_miss_18,software_eng_miss_19,software_eng_miss_20,software_eng_miss_21,software_eng_miss_22,software_eng_miss_23,front_end_eng_miss_1,front_end_eng_miss_2,front_end_eng_miss_3,front_end_eng_miss_4,front_end_eng_miss_5,front_end_eng_miss_6,front_end_eng_miss_7,front_end_eng_miss_8,front_end_eng_miss_9,back_end_eng_miss_1,back_end_eng_miss_2,back_end_eng_miss_3,back_end_eng_miss_4,back_end_eng_miss_5,back_end_eng_miss_6,back_end_eng_miss_7,android_eng_miss_1,android_eng_miss_2,android_eng_miss_3,android_eng_miss_4,android_eng_miss_5,android_eng_miss_6,ios_eng_miss_1,ios_eng_miss_2,ios_eng_miss_3,ios_eng_miss_4,ios_eng_miss_5))
   
    # Disconnect from 'user_data.db' database
    connection.commit()

    # Return a response to the client
    return {
        'message':'success-9',
        'session_value': user_id
    }

# Homepage --------------------------------------
@app.route('/homepage', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def homepage():
    json_data = request.get_json('data')

    # Get the data from user
    user_id = json_data['value']

    # Unpack skills from miss_skills_software_eng list
    software_eng_miss_1=software_eng_miss_2=software_eng_miss_3=software_eng_miss_4=software_eng_miss_5=software_eng_miss_6=software_eng_miss_7=software_eng_miss_8=software_eng_miss_9=software_eng_miss_10=software_eng_miss_11=software_eng_miss_12=software_eng_miss_13=software_eng_miss_14=software_eng_miss_15=software_eng_miss_16=software_eng_miss_17=software_eng_miss_18=software_eng_miss_19=software_eng_miss_20=software_eng_miss_21=software_eng_miss_22=software_eng_miss_23 = ''
    front_end_eng_miss_1=front_end_eng_miss_2=front_end_eng_miss_3=front_end_eng_miss_4=front_end_eng_miss_5=front_end_eng_miss_6=front_end_eng_miss_7=front_end_eng_miss_8=front_end_eng_miss_9 = ''
    back_end_eng_miss_1=back_end_eng_miss_2=back_end_eng_miss_3=back_end_eng_miss_4=back_end_eng_miss_5=back_end_eng_miss_6=back_end_eng_miss_7 = ''
    android_eng_miss_1=android_eng_miss_2=android_eng_miss_3=android_eng_miss_4=android_eng_miss_5=android_eng_miss_6 = ''
    ios_eng_miss_1=ios_eng_miss_2=ios_eng_miss_3=ios_eng_miss_4=ios_eng_miss_5 = ''


    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Retrieve stored data from 'positions' table
    query = "SELECT * FROM users_biodata WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    fname = data[4]

    # Retrieve stored data from 'positions' table
    query = "SELECT * FROM user_positions WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    user_score = data[1]
    score_software_eng = round(data[2] * 100, 2)
    score_front_end_eng = round(data[3] * 100, 2) 
    score_back_end_eng = round(data[4] * 100, 2) 
    score_android_eng = round(data[5] * 100, 2) 
    score_ios_eng = round(data[6] * 100, 2) 

    software_eng_miss_1 = data[7]
    software_eng_miss_2 = data[8] 
    software_eng_miss_3 = data[9] 
    software_eng_miss_4 = data[10] 
    software_eng_miss_5 = data[11] 
    software_eng_miss_6 = data[12] 
    software_eng_miss_7 = data[13] 
    software_eng_miss_8 = data[14] 
    software_eng_miss_9 = data[15] 
    software_eng_miss_10 = data[16] 
    software_eng_miss_11 = data[17] 
    software_eng_miss_12 = data[18] 
    software_eng_miss_13 = data[19] 
    software_eng_miss_14 = data[20] 
    software_eng_miss_15 = data[21] 
    software_eng_miss_16 = data[22] 
    software_eng_miss_17 = data[23] 
    software_eng_miss_18 = data[24] 
    software_eng_miss_19 = data[25] 
    software_eng_miss_20 = data[26] 
    software_eng_miss_21 = data[27] 
    software_eng_miss_22 = data[28] 
    software_eng_miss_23 = data[29] 

    front_end_eng_miss_1 = data[30]
    front_end_eng_miss_2 = data[31]
    front_end_eng_miss_3 = data[32]
    front_end_eng_miss_4 = data[33]
    front_end_eng_miss_5 = data[34]
    front_end_eng_miss_6 = data[35]
    front_end_eng_miss_7 = data[36]
    front_end_eng_miss_8 = data[37]
    front_end_eng_miss_9 = data[38]

    back_end_eng_miss_1 = data[39]
    back_end_eng_miss_2 = data[40]
    back_end_eng_miss_3 = data[41]
    back_end_eng_miss_4 = data[42]
    back_end_eng_miss_5 = data[43]
    back_end_eng_miss_6 = data[44]
    back_end_eng_miss_7 = data[45]

    android_eng_miss_1 = data[46]
    android_eng_miss_2 = data[47]
    android_eng_miss_3 = data[48]
    android_eng_miss_4 = data[49]
    android_eng_miss_5 = data[50]
    android_eng_miss_6 = data[51]

    ios_eng_miss_1 = data[52]
    ios_eng_miss_2 = data[53]
    ios_eng_miss_3 = data[54]
    ios_eng_miss_4 = data[55]
    ios_eng_miss_5 = data[56]

    software_eng_miss = [software_eng_miss_1,software_eng_miss_2,software_eng_miss_3,software_eng_miss_4,software_eng_miss_5,software_eng_miss_6,software_eng_miss_7,software_eng_miss_8,software_eng_miss_9,software_eng_miss_10,software_eng_miss_11,software_eng_miss_12,software_eng_miss_13,software_eng_miss_14,software_eng_miss_15,software_eng_miss_16,software_eng_miss_17,software_eng_miss_18,software_eng_miss_19,software_eng_miss_20,software_eng_miss_21,software_eng_miss_22,software_eng_miss_23]
    print(software_eng_miss)
    
    software_eng_miss_final = ' '.join(software_eng_miss).split()
    software_eng_miss_count = len(software_eng_miss_final)

    front_end_eng_miss = [front_end_eng_miss_1,front_end_eng_miss_2,front_end_eng_miss_3,front_end_eng_miss_4,front_end_eng_miss_5,front_end_eng_miss_6,front_end_eng_miss_7,front_end_eng_miss_8,front_end_eng_miss_9]
    front_end_eng_miss_final = ' '.join(front_end_eng_miss).split()
    front_end_eng_miss_count = len(front_end_eng_miss_final)

    back_end_eng_miss = [back_end_eng_miss_1,back_end_eng_miss_2,back_end_eng_miss_3,back_end_eng_miss_4,back_end_eng_miss_5,back_end_eng_miss_6,back_end_eng_miss_7]
    back_end_eng_miss_final = ' '.join(back_end_eng_miss).split()
    back_end_eng_miss_count = len(back_end_eng_miss_final)

    android_eng_miss = [android_eng_miss_1,android_eng_miss_2,android_eng_miss_3,android_eng_miss_4,android_eng_miss_5,android_eng_miss_6]
    android_eng_miss_final = ' '.join(android_eng_miss).split()
    android_eng_miss_count = len(android_eng_miss_final)

    ios_eng_miss = [ios_eng_miss_1,ios_eng_miss_2,ios_eng_miss_3,ios_eng_miss_4,ios_eng_miss_5]
    ios_eng_miss_final = ' '.join(ios_eng_miss).split()
    ios_eng_miss_count = len(ios_eng_miss_final)

    # Prepare position data
    if (score_software_eng != 0.0):
        job_1_title = 'Software Engineer'
        job_1_score = score_software_eng
        job_1_miss_count = software_eng_miss_count
        job_1_miss = software_eng_miss_final
        job_1 = [job_1_title, job_1_score, job_1_miss_count, job_1_miss]
    else:
        job_1 = ''
    #print(job_1)

    if (score_front_end_eng != 0.0):
        job_2_title = 'Front-End Engineer'
        job_2_score = score_front_end_eng
        job_2_miss_count = front_end_eng_miss_count
        job_2_miss = front_end_eng_miss_final
        job_2 = [job_2_title, job_2_score, job_2_miss_count, job_2_miss]
    else:
        job_2 = ''
    #print(job_2)

    if (score_back_end_eng != 0.0):
        job_3_title = 'Back-End Engineer'
        job_3_score = score_back_end_eng
        job_3_miss_count = back_end_eng_miss_count
        job_3_miss = back_end_eng_miss_final
        job_3 = [job_3_title, job_3_score, job_3_miss_count, job_3_miss]
    else:
        job_3 = ''
    #print(job_3)

    if (score_android_eng != 0.0):
        job_4_title = 'Android Engineer'
        job_4_score = score_android_eng
        job_4_miss_count = android_eng_miss_count
        job_4_miss = android_eng_miss_final
        job_4 = [job_4_title, job_4_score, job_4_miss_count, job_4_miss]
    else:
        job_4 = ''
    #print(job_4)

    if (score_ios_eng != 0.0):
        job_5_title = 'IOS Engineer'
        job_5_score = score_ios_eng
        job_5_miss_count = ios_eng_miss_count
        job_5_miss = ios_eng_miss_final
        job_5 = [job_5_title, job_5_score, job_5_miss_count, job_5_miss]
    else:
        job_5 = ''
    #print(job_5)



    # Retrieve stored data from table
    if (score_software_eng != 0.0):
        query = "SELECT * FROM jobs WHERE position='software engineer'"
        cursor.execute(query)
        data_1 = cursor.fetchall()
    else:
        data_1 = ''
        #print(data_1)

    if(score_front_end_eng != 0.0):
        query = "SELECT * FROM jobs WHERE position='front end engineer'"
        cursor.execute(query)
        data_2 = cursor.fetchall()
    else:
        data_2 = ''
        #print(data_2)

    if(score_back_end_eng != 0.0):
        query = "SELECT * FROM jobs WHERE position='back end engineer'"
        cursor.execute(query)
        data_3 = cursor.fetchall()
    else:
        data_3 = ''
        #print(data_3)

    if (score_android_eng != 0.0):
        query = "SELECT * FROM jobs WHERE position='android engineer'"
        cursor.execute(query)
        data_4 = cursor.fetchall()
    else:
        data_4 = ''
        #print(data_4)

    if (score_ios_eng != 0.0):
        query = "SELECT * FROM jobs WHERE position='ios engineer'"
        cursor.execute(query)
        data_5 = cursor.fetchall()
    else:
        data_5 = ''
        #print(data_5)

    combined_data = []

    combined_data.extend(data_1)
    combined_data.extend(data_2)
    combined_data.extend(data_3)
    combined_data.extend(data_4)
    combined_data.extend(data_5)

    # print(combined_data)
    data = []

    data.append({
        'message':'success-4',
        'session_value': user_id,
        'fname': fname,
        'user_score': user_score,
        'job_1': job_1,
        'job_2': job_2,
        'job_3': job_3,
        'job_4': job_4,
        'job_5': job_5
    })

    for combined_data_1 in combined_data:
        position_id, platform, position, title, url, company, location, summary, post_date, salary = combined_data_1
        record = {
            'position_id': position_id,
            'platform': platform,
            'position': position,
            'title': title,
            'url': url,
            'company': company,
            'location': location,
            'summary': summary,
            'post_date': post_date,
            'salary': salary
        }
        data.append(record)

    json_data = json.dumps(data, indent=4)

    # return render_template("homepage.html",data_1=data_1,data_2=data_2,data_3=data_3,data_4=data_4,data_5=data_5,user_positions=user_positions)
    return json_data


# Learnpage --------------------------------------
@app.route('/learnpage', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def learnpage():
    json_data = request.get_json('data')

    # Get the data from user
    user_id = json_data['value']
    
    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Retrieve stored data from 'positions' table
    query = "SELECT * FROM users_biodata WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    fname = data[4]

    # Retrieve stored data from 'positions' table
    query = "SELECT * FROM user_positions WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    #user_score = data[1]
    #score_software_eng = data[2]
    #score_front_end_eng = data[3]
    #score_back_end_eng = data[4]
    #score_android_eng = data[5]
    #score_ios_eng = data[6]

    software_eng_miss_1 = data[7]
    software_eng_miss_2 = data[8] 
    software_eng_miss_3 = data[9] 
    software_eng_miss_4 = data[10] 
    software_eng_miss_5 = data[11] 
    software_eng_miss_6 = data[12] 
    software_eng_miss_7 = data[13] 
    software_eng_miss_8 = data[14] 
    software_eng_miss_9 = data[15] 
    software_eng_miss_10 = data[16] 
    software_eng_miss_11 = data[17] 
    software_eng_miss_12 = data[18] 
    software_eng_miss_13 = data[19] 
    software_eng_miss_14 = data[20] 
    software_eng_miss_15 = data[21] 
    software_eng_miss_16 = data[22] 
    software_eng_miss_17 = data[23] 
    software_eng_miss_18 = data[24] 
    software_eng_miss_19 = data[25] 
    software_eng_miss_20 = data[26] 
    software_eng_miss_21 = data[27] 
    software_eng_miss_22 = data[28] 
    software_eng_miss_23 = data[29] 

    front_end_eng_miss_1 = data[30]
    front_end_eng_miss_2 = data[31]
    front_end_eng_miss_3 = data[32]
    front_end_eng_miss_4 = data[33]
    front_end_eng_miss_5 = data[34]
    front_end_eng_miss_6 = data[35]
    front_end_eng_miss_7 = data[36]
    front_end_eng_miss_8 = data[37]
    front_end_eng_miss_9 = data[38]

    back_end_eng_miss_1 = data[39]
    back_end_eng_miss_2 = data[40]
    back_end_eng_miss_3 = data[41]
    back_end_eng_miss_4 = data[42]
    back_end_eng_miss_5 = data[43]
    back_end_eng_miss_6 = data[44]
    back_end_eng_miss_7 = data[45]

    android_eng_miss_1 = data[46]
    android_eng_miss_2 = data[47]
    android_eng_miss_3 = data[48]
    android_eng_miss_4 = data[49]
    android_eng_miss_5 = data[50]
    android_eng_miss_6 = data[51]

    ios_eng_miss_1 = data[52]
    ios_eng_miss_2 = data[53]
    ios_eng_miss_3 = data[54]
    ios_eng_miss_4 = data[55]
    ios_eng_miss_5 = data[56]

    software_eng_miss = [software_eng_miss_1,software_eng_miss_2,software_eng_miss_3,software_eng_miss_4,software_eng_miss_5,software_eng_miss_6,software_eng_miss_7,software_eng_miss_8,software_eng_miss_9,software_eng_miss_10,software_eng_miss_11,software_eng_miss_12,software_eng_miss_13,software_eng_miss_14,software_eng_miss_15,software_eng_miss_16,software_eng_miss_17,software_eng_miss_18,software_eng_miss_19,software_eng_miss_20,software_eng_miss_21,software_eng_miss_22,software_eng_miss_23]
    #software_eng_miss_final = ' '.join(software_eng_miss).split()
    #software_eng_miss_count = len(software_eng_miss_final)

    front_end_eng_miss = [front_end_eng_miss_1,front_end_eng_miss_2,front_end_eng_miss_3,front_end_eng_miss_4,front_end_eng_miss_5,front_end_eng_miss_6,front_end_eng_miss_7,front_end_eng_miss_8,front_end_eng_miss_9]
    #front_end_eng_miss_final = ' '.join(front_end_eng_miss).split()
    #front_end_eng_miss_count = len(front_end_eng_miss_final)

    back_end_eng_miss = [back_end_eng_miss_1,back_end_eng_miss_2,back_end_eng_miss_3,back_end_eng_miss_4,back_end_eng_miss_5,back_end_eng_miss_6,back_end_eng_miss_7]
    #back_end_eng_miss_final = ' '.join(back_end_eng_miss).split()
    #back_end_eng_miss_count = len(back_end_eng_miss_final)

    android_eng_miss = [android_eng_miss_1,android_eng_miss_2,android_eng_miss_3,android_eng_miss_4,android_eng_miss_5,android_eng_miss_6]
    #android_eng_miss_final = ' '.join(android_eng_miss).split()
    #android_eng_miss_count = len(android_eng_miss_final)

    ios_eng_miss = [ios_eng_miss_1,ios_eng_miss_2,ios_eng_miss_3,ios_eng_miss_4,ios_eng_miss_5]
    #ios_eng_miss_final = ' '.join(ios_eng_miss).split()
    #ios_eng_miss_count = len(ios_eng_miss_final)


    # # Retrieve stored data from 'miss' table
    # query = "SELECT * FROM miss WHERE userid='"+user_id+"'"
    # cursor.execute(query)
    # data = cursor.fetchone()

    # miss_skill_count = int(data[1])
    user_miss = []
    # for i in range(2,miss_skill_count+2):
    #     user_miss.append(data[i])

    # print('userid:',user_id)
    # print('Missing skills:',user_miss)

    # # Retrieve stored data from 'learn' table
    # query = "SELECT * FROM learn"
    # cursor.execute(query)
    # course = cursor.fetchall()
    # print(course)

    # Connect to 'user_data.db' database
    # connection = sqlite3.connect(DATABASE)
    # cursor = connection.cursor()

    # #Prepare for database input
    # for skill in range(miss_skill_count,50):
    #     user_miss.append('')

    user_miss.extend(software_eng_miss)
    user_miss.extend(front_end_eng_miss)
    user_miss.extend(back_end_eng_miss)
    user_miss.extend(android_eng_miss)
    user_miss.extend(ios_eng_miss)

    user_miss_final = ' '.join(user_miss).split()
    print(user_miss_final)

    miss_1,miss_2,miss_3,miss_4,miss_5,miss_6,miss_7,miss_8,miss_9,miss_10,miss_11,miss_12,miss_13,miss_14,miss_15,miss_16,miss_17,miss_18,miss_19,miss_20,miss_21,miss_22,miss_23,miss_24,miss_25,miss_26,miss_27,miss_28,miss_29,miss_30,miss_31,miss_32,miss_33,miss_34,miss_35,miss_36,miss_37,miss_38,miss_39,miss_40,miss_41,miss_42,miss_43,miss_44,miss_45,miss_46,miss_47,miss_48,miss_49,miss_50 = user_miss

    # Retrieve stored data from table
    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_1+"'")
    learn_1 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_2+"'")
    learn_2 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_3+"'")
    learn_3 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_4+"'")
    learn_4 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_5+"'")
    learn_5 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_6+"'")
    learn_6 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_7+"'")
    learn_7 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_8+"'")
    learn_8 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_9+"'")
    learn_9 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_10+"'")
    learn_10 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_11+"'")
    learn_11 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_12+"'")
    learn_12 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_13+"'")
    learn_13 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_14+"'")
    learn_14 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_15+"'")
    learn_15 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_16+"'")
    learn_16 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_17+"'")
    learn_17 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_18+"'")
    learn_18 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_19+"'")
    learn_19 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_20+"'")
    learn_20 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_21+"'")
    learn_21 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_22+"'")
    learn_22 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_23+"'")
    learn_23 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_24+"'")
    learn_24 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_25+"'")
    learn_25 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_26+"'")
    learn_26 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_27+"'")
    learn_27 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_28+"'")
    learn_28 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_29+"'")
    learn_29 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_30+"'")
    learn_30 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_31+"'")
    learn_31 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_32+"'")
    learn_32 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_33+"'")
    learn_33 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_34+"'")
    learn_34 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_35+"'")
    learn_35 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_36+"'")
    learn_36 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_37+"'")
    learn_37 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_38+"'")
    learn_38 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_39+"'")
    learn_39 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_40+"'")
    learn_40 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_41+"'")
    learn_41 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_42+"'")
    learn_42 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_43+"'")
    learn_43 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_44+"'")
    learn_44 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_45+"'")
    learn_45 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_46+"'")
    learn_46 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_47+"'")
    learn_47 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_48+"'")
    learn_48 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_49+"'")
    learn_49 = cursor.fetchall()

    cursor.execute("SELECT * FROM learn WHERE skill ='"+miss_50+"'")
    learn_50 = cursor.fetchall()

    combined_data = []

    combined_data.extend(learn_1)
    combined_data.extend(learn_2)
    combined_data.extend(learn_3)
    combined_data.extend(learn_4)
    combined_data.extend(learn_5)
    combined_data.extend(learn_6)
    combined_data.extend(learn_7)
    combined_data.extend(learn_8)
    combined_data.extend(learn_9)
    combined_data.extend(learn_10)
    combined_data.extend(learn_11)
    combined_data.extend(learn_12)
    combined_data.extend(learn_13)
    combined_data.extend(learn_14)
    combined_data.extend(learn_15)
    combined_data.extend(learn_16)
    combined_data.extend(learn_17)
    combined_data.extend(learn_18)
    combined_data.extend(learn_19)
    combined_data.extend(learn_20)
    combined_data.extend(learn_21)
    combined_data.extend(learn_22)
    combined_data.extend(learn_23)
    combined_data.extend(learn_24)
    combined_data.extend(learn_25)
    combined_data.extend(learn_26)
    combined_data.extend(learn_27)
    combined_data.extend(learn_28)
    combined_data.extend(learn_29)
    combined_data.extend(learn_30)
    combined_data.extend(learn_31)
    combined_data.extend(learn_32)
    combined_data.extend(learn_33)
    combined_data.extend(learn_34)
    combined_data.extend(learn_35)
    combined_data.extend(learn_36)
    combined_data.extend(learn_37)
    combined_data.extend(learn_38)
    combined_data.extend(learn_39)
    combined_data.extend(learn_40)
    combined_data.extend(learn_41)
    combined_data.extend(learn_42)
    combined_data.extend(learn_43)
    combined_data.extend(learn_44)
    combined_data.extend(learn_45)
    combined_data.extend(learn_46)
    combined_data.extend(learn_47)
    combined_data.extend(learn_48)
    combined_data.extend(learn_49)
    combined_data.extend(learn_50)

    #print(combined_data)
    data = []

    data.append({
        'message':'success-6',
        'session_value': user_id,
        'fname': fname,
        'user_miss': user_miss_final
    })

    for combined_data_1 in combined_data:
        courseid, platform, skill, title, tutor, url = combined_data_1
        record = {
            'courseid': courseid,
            'platform': platform,
            'skill': skill,
            'title': title,
            'tutor': tutor,
            'url': url
        }
        data.append(record)

    json_data = json.dumps(data, indent=4)

    # return render_template("learnpage.html",learn_1=learn_1,learn_2=learn_2,learn_3=learn_3,learn_4=learn_4,learn_5=learn_5,learn_6=learn_6,learn_7=learn_7,learn_8=learn_8,learn_9=learn_9,learn_10=learn_10,learn_11=learn_11,learn_12=learn_12,learn_13=learn_13,learn_14=learn_14,learn_15=learn_15,learn_16=learn_16,learn_17=learn_17,learn_18=learn_18,learn_19=learn_19,learn_20=learn_20,learn_21=learn_21,learn_22=learn_22,learn_23=learn_23,learn_24=learn_24,learn_25=learn_25,learn_26=learn_26,learn_27=learn_27,learn_28=learn_28,learn_29=learn_29,learn_30=learn_30,learn_31=learn_31,learn_32=learn_32,learn_33=learn_33,learn_34=learn_34,learn_35=learn_35,learn_36=learn_36,learn_37=learn_37,learn_38=learn_38,learn_39=learn_39,learn_40=learn_40,learn_41=learn_41,learn_42=learn_42,learn_43=learn_43,learn_44=learn_44,learn_45=learn_45,learn_46=learn_46,learn_47=learn_47,learn_48=learn_48,learn_49=learn_49,learn_50=learn_50)
    return json_data
    # Return a response to the client
    


# Profile GET --------------------------------------
@app.route('/profile/get', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def profile_get():
    # Get the data from user
    json_data = request.get_json('data')
    
    # Get the data from user
    user_id = json_data['value']

    print(json_data)

    # Initialize values
    qualify_1=qualify_1_syear=qualify_1_eyear=qualify_1_notes=qualify_2=qualify_2_syear=qualify_2_eyear=qualify_2_notes=qualify_3=qualify_3_syear=qualify_3_eyear=qualify_3_notes=""
    project_1_title=project_1_desc=project_2_title=project_2_desc=project_3_title=project_3_desc=""
    job_1=job_1_syear=job_1_eyear=job_1_notes=job_2=job_2_syear=job_2_eyear=job_2_notes=job_3=job_3_syear=job_3_eyear=job_3_notes=""
    skill1=skill2=skill3=skill4=skill5=skill6=skill7=skill8=skill9=skill10=skill11=skill12=skill13=skill14=skill15=skill16=skill17=skill18=skill19=skill20=skill21=skill22=skill23=skill24=skill25=skill26=skill27=skill28=skill29=skill30=skill31=skill32=skill33=skill34=skill35=skill36=skill37=skill38=skill39=skill40=skill41=skill42=skill43=skill44=skill45=skill46=skill47=skill48=skill49=skill50=False

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Retrieve users_biodata
    query = "SELECT * FROM users_biodata WHERE userid='"+user_id+"'"
    cursor.execute(query)
    users_biodata = cursor.fetchone()

    print(users_biodata)

    # Retrieve users_cvdata
    query = "SELECT * FROM users_cvdata WHERE userid='"+user_id+"'"
    cursor.execute(query)
    users_cvdata = cursor.fetchone()

    print(users_cvdata)

    # Retrieve users_biodata
    query = "SELECT * FROM users_skilldata WHERE userid='"+user_id+"'"
    cursor.execute(query)
    users_skilldata = cursor.fetchone()

    print(users_skilldata)

    # Personal data
    fname = users_biodata[4]
    lname = users_biodata[5]
    email = users_biodata[1]
    phone = users_biodata[6]
    address = users_biodata[7]
    country = users_biodata[8]
    postalcode = users_biodata[9]

    # Educational data (Max 3)
    qualify_1 = users_cvdata[1]
    qualify_1_syear = users_cvdata[2]
    qualify_1_eyear = users_cvdata[3]

    qualify_2 = users_cvdata[5]
    qualify_2_syear = users_cvdata[6]
    qualify_2_eyear = users_cvdata[7]

    qualify_3 = users_cvdata[9]
    qualify_3_syear = users_cvdata[10]
    qualify_3_eyear = users_cvdata[11]

    # Project data (Max 3)
    project_1_title = users_cvdata[13]

    project_2_title = users_cvdata[15]

    project_3_title = users_cvdata[17]

    # Past experience (Max 3)
    job_1 = users_cvdata[19]
    job_1_syear = users_cvdata[20]
    job_1_eyear = users_cvdata[21]

    job_2 = users_cvdata[23]
    job_2_syear = users_cvdata[24]
    job_2_eyear = users_cvdata[25]

    job_3 = users_cvdata[27]
    job_3_syear = users_cvdata[28]
    job_3_eyear = users_cvdata[29]

    # Return a response to the client
    data = []

    data.append({
        'message':'success-9',
        'session_value': user_id,
        'fname': fname,
        'lname': lname,
        'email': email,
        'phone': phone,
        'address': address,
        'country': country,
        'postalcode': postalcode,
        'qualify_1': qualify_1,
        'qualify_1_syear': qualify_1_syear,
        'qualify_1_eyear': qualify_1_eyear,
        'qualify_2': qualify_2,
        'qualify_2_syear': qualify_2_syear,
        'qualify_2_eyear': qualify_2_eyear,
        'qualify_3': qualify_3,
        'qualify_3_syear': qualify_3_syear,
        'qualify_3_eyear': qualify_3_eyear,
        'project_1_title': project_1_title,
        'project_2_title': project_2_title,
        'project_3_title': project_3_title,
        'job_1': job_1,
        'job_1_syear': job_1_syear,
        'job_1_eyear': job_1_eyear,
        'job_2': job_2,
        'job_2_syear': job_2_syear,
        'job_2_eyear': job_2_eyear,
        'job_3': job_3,
        'job_3_syear': job_3_syear,
        'job_3_eyear': job_3_eyear,
    })

    json_data = json.dumps(data, indent=4)

    # return render_template
    return json_data


# Log Out ---------------------------------------
@app.route('/logout')
def logout():
    #session.pop('user_id',None)
    #return render_template("index.html")
    return 0

if __name__ == "__main__":
    app.run(debug = True)