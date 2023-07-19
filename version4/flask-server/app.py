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
    query = "SELECT email FROM users WHERE email='"+email+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    if data:
        # If present in db
        print('message: error-1: email already exists')
        return {'message':'error-1'}
    
    else:
        # If not present in db, Insert the data into the table
        cursor.execute("INSERT INTO users (email,password,fname,lname,phone,address,postalcode,country) VALUES (?,?,?,?,?,?,?,?)",(email, password,fname,lname,phone,address,postalcode,country))
        connection.commit()
    
        # Get user id
        query = "SELECT userid FROM users WHERE email='"+email+"' and password= '"+password+"'"
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
    query = "SELECT userid FROM users WHERE email='"+email+"' and password= '"+password+"'"
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
        print('message: error-2: log in data does not exists')
        return {'message':'error-2'}


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
        cursor.execute("UPDATE users SET (fileid)=? WHERE (userid)=? ",(user_fileid,user_id))
        connection.commit()

        # Return skills extracted from CV
        rel_path = 'static/files/' + user_fileid
        user_skills,user_positions,user_miss_skills = CVRead(rel_path)

        #Get element count
        size_user_skills = len(user_skills)
        size_user_positions = len(user_positions)
        size_user_miss_skills = len(user_miss_skills)

        print('userid:',user_id)
        print('skills count:',size_user_skills,'skills:',user_skills)
        print('position count:',size_user_positions,'positions:',user_positions)
        print('miss skill count:',size_user_miss_skills,'miss skills:',user_miss_skills)

        #Prepare for database input
        for skill in range(size_user_skills,50):
            user_skills.append('')

        for position in range(size_user_positions,5):
            user_positions.append('')

        for position in range(size_user_miss_skills,50):
            user_miss_skills.append('')

        # Unpack skills from user_skills list
        skill_1,skill_2,skill_3,skill_4,skill_5,skill_6,skill_7,skill_8,skill_9,skill_10,skill_11,skill_12,skill_13,skill_14,skill_15,skill_16,skill_17,skill_18,skill_19,skill_20,skill_21,skill_22,skill_23,skill_24,skill_25,skill_26,skill_27,skill_28,skill_29,skill_30,skill_31,skill_32,skill_33,skill_34,skill_35,skill_36,skill_37,skill_38,skill_39,skill_40,skill_41,skill_42,skill_43,skill_44,skill_45,skill_46,skill_47,skill_48,skill_49,skill_50 = user_skills

        #Unpack positions from user_positions list
        position_1,position_2,position_3,position_4,position_5 = user_positions

        #Unpack missing skills from user_miss_skills list
        miss_1,miss_2,miss_3,miss_4,miss_5,miss_6,miss_7,miss_8,miss_9,miss_10,miss_11,miss_12,miss_13,miss_14,miss_15,miss_16,miss_17,miss_18,miss_19,miss_20,miss_21,miss_22,miss_23,miss_24,miss_25,miss_26,miss_27,miss_28,miss_29,miss_30,miss_31,miss_32,miss_33,miss_34,miss_35,miss_36,miss_37,miss_38,miss_39,miss_40,miss_41,miss_42,miss_43,miss_44,miss_45,miss_46,miss_47,miss_48,miss_49,miss_50 = user_miss_skills

        # Connect to 'user_data.db' database
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        # Insert the data into the table skills
        cursor.execute("INSERT INTO skills (userid,skillcount) VALUES (?,?)",(user_id,size_user_skills))
        cursor.execute("UPDATE skills SET skill_1=?,skill_2=?,skill_3=?,skill_4=?,skill_5=?,skill_6=?,skill_7=?,skill_8=?,skill_9=?,skill_10=?,skill_11=?,skill_12=?,skill_13=?,skill_14=?,skill_15=?,skill_16=?,skill_17=?,skill_18=?,skill_19=?,skill_20=?,skill_21=?,skill_22=?,skill_23=?,skill_24=?,skill_25=?,skill_26=?,skill_27=?,skill_28=?,skill_29=?,skill_30=?,skill_31=?,skill_32=?,skill_33=?,skill_34=?,skill_35=?,skill_36=?,skill_37=?,skill_38=?,skill_39=?,skill_40=?,skill_41=?,skill_42=?,skill_43=?,skill_44=?,skill_45=?,skill_46=?,skill_47=?,skill_48=?,skill_49=?,skill_50=? WHERE userid=?",(skill_1,skill_2,skill_3,skill_4,skill_5,skill_6,skill_7,skill_8,skill_9,skill_10,skill_11,skill_12,skill_13,skill_14,skill_15,skill_16,skill_17,skill_18,skill_19,skill_20,skill_21,skill_22,skill_23,skill_24,skill_25,skill_26,skill_27,skill_28,skill_29,skill_30,skill_31,skill_32,skill_33,skill_34,skill_35,skill_36,skill_37,skill_38,skill_39,skill_40,skill_41,skill_42,skill_43,skill_44,skill_45,skill_46,skill_47,skill_48,skill_49,skill_50,user_id))

        # Insert the data into the table skills
        cursor.execute("INSERT INTO positions (userid,positioncount) VALUES (?,?)",(user_id,size_user_positions))
        cursor.execute("UPDATE positions SET position_1=?,position_2=?,position_3=?,position_4=?,position_5=? WHERE userid=?",(position_1,position_2,position_3,position_4,position_5,user_id))

        # Insert the data into the table skills
        cursor.execute("INSERT INTO miss (userid,missskillcount) VALUES (?,?)",(user_id,size_user_miss_skills))
        cursor.execute("UPDATE miss SET miss_1=?,miss_2=?,miss_3=?,miss_4=?,miss_5=?,miss_6=?,miss_7=?,miss_8=?,miss_9=?,miss_10=?,miss_11=?,miss_12=?,miss_13=?,miss_14=?,miss_15=?,miss_16=?,miss_17=?,miss_18=?,miss_19=?,miss_20=?,miss_21=?,miss_22=?,miss_23=?,miss_24=?,miss_25=?,miss_26=?,miss_27=?,miss_28=?,miss_29=?,miss_30=?,miss_31=?,miss_32=?,miss_33=?,miss_34=?,miss_35=?,miss_36=?,miss_37=?,miss_38=?,miss_39=?,miss_40=?,miss_41=?,miss_42=?,miss_43=?,miss_44=?,miss_45=?,miss_46=?,miss_47=?,miss_48=?,miss_49=?,miss_50=? WHERE userid=?",(miss_1,miss_2,miss_3,miss_4,miss_5,miss_6,miss_7,miss_8,miss_9,miss_10,miss_11,miss_12,miss_13,miss_14,miss_15,miss_16,miss_17,miss_18,miss_19,miss_20,miss_21,miss_22,miss_23,miss_24,miss_25,miss_26,miss_27,miss_28,miss_29,miss_30,miss_31,miss_32,miss_33,miss_34,miss_35,miss_36,miss_37,miss_38,miss_39,miss_40,miss_41,miss_42,miss_43,miss_44,miss_45,miss_46,miss_47,miss_48,miss_49,miss_50,user_id))
        
        # Disconnect from 'user_data.db' database
        connection.commit()

        print("userid:",user_id, user_fileid, "File has been uploaded")

        # Return a response to the client
        return {
            'message':'success-3',
            'session_value': user_id
        }

# Enter Manual --------------------------------
@app.route('/enter_manual', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def enter_manual():
    # Get the data from user
    json_data = request.get_json('data')
    
    # Get the data from user
    user_id = json_data['session_value']

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Retrieve data
    query = "SELECT * FROM positions WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    fname = data[4]
    lname = data[5]
    email = data[1]
    phone = data[6]
    address = data[7]
    country = data[8]
    postalcode = data[9]













    # modify keys
    modified_data = {}

    key_replacements = {
        "Cpp": "C++",
        "Csharp": "C#"
    }

    for key, value in json_data.items():
        if key in key_replacements:
            modified_data[key_replacements[key]] = value
        else:
            modified_data[key] = value
        
    # Get user_skills
    user_skills = [key for key, value in modified_data.items() if value is True]
    
    #Get element count
    size_user_skills = len(user_skills)
    
    # Return other data
    user_positions,user_miss_skills = ManualRead(user_skills)

    size_user_positions = len(user_positions)
    size_user_miss_skills = len(user_miss_skills)

    print('userid:',user_id)
    print('skills count:',size_user_skills,'skills:',user_skills)
    print('position count:',size_user_positions,'positions:',user_positions)
    print('miss skill count:',size_user_miss_skills,'miss skills:',user_miss_skills)

    #Prepare for database input
    for skill in range(size_user_skills,50):
        user_skills.append('')

    for position in range(size_user_positions,5):
        user_positions.append('')

    for position in range(size_user_miss_skills,50):
        user_miss_skills.append('')

    # Unpack skills from user_skills list
    skill_1,skill_2,skill_3,skill_4,skill_5,skill_6,skill_7,skill_8,skill_9,skill_10,skill_11,skill_12,skill_13,skill_14,skill_15,skill_16,skill_17,skill_18,skill_19,skill_20,skill_21,skill_22,skill_23,skill_24,skill_25,skill_26,skill_27,skill_28,skill_29,skill_30,skill_31,skill_32,skill_33,skill_34,skill_35,skill_36,skill_37,skill_38,skill_39,skill_40,skill_41,skill_42,skill_43,skill_44,skill_45,skill_46,skill_47,skill_48,skill_49,skill_50 = user_skills

    #Unpack positions from user_positions list
    position_1,position_2,position_3,position_4,position_5 = user_positions

    #Unpack missing skills from user_miss_skills list
    miss_1,miss_2,miss_3,miss_4,miss_5,miss_6,miss_7,miss_8,miss_9,miss_10,miss_11,miss_12,miss_13,miss_14,miss_15,miss_16,miss_17,miss_18,miss_19,miss_20,miss_21,miss_22,miss_23,miss_24,miss_25,miss_26,miss_27,miss_28,miss_29,miss_30,miss_31,miss_32,miss_33,miss_34,miss_35,miss_36,miss_37,miss_38,miss_39,miss_40,miss_41,miss_42,miss_43,miss_44,miss_45,miss_46,miss_47,miss_48,miss_49,miss_50 = user_miss_skills

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Insert the data into the table skills
    cursor.execute("INSERT INTO skills (userid,skillcount) VALUES (?,?)",(user_id,size_user_skills))
    cursor.execute("UPDATE skills SET skill_1=?,skill_2=?,skill_3=?,skill_4=?,skill_5=?,skill_6=?,skill_7=?,skill_8=?,skill_9=?,skill_10=?,skill_11=?,skill_12=?,skill_13=?,skill_14=?,skill_15=?,skill_16=?,skill_17=?,skill_18=?,skill_19=?,skill_20=?,skill_21=?,skill_22=?,skill_23=?,skill_24=?,skill_25=?,skill_26=?,skill_27=?,skill_28=?,skill_29=?,skill_30=?,skill_31=?,skill_32=?,skill_33=?,skill_34=?,skill_35=?,skill_36=?,skill_37=?,skill_38=?,skill_39=?,skill_40=?,skill_41=?,skill_42=?,skill_43=?,skill_44=?,skill_45=?,skill_46=?,skill_47=?,skill_48=?,skill_49=?,skill_50=? WHERE userid=?",(skill_1,skill_2,skill_3,skill_4,skill_5,skill_6,skill_7,skill_8,skill_9,skill_10,skill_11,skill_12,skill_13,skill_14,skill_15,skill_16,skill_17,skill_18,skill_19,skill_20,skill_21,skill_22,skill_23,skill_24,skill_25,skill_26,skill_27,skill_28,skill_29,skill_30,skill_31,skill_32,skill_33,skill_34,skill_35,skill_36,skill_37,skill_38,skill_39,skill_40,skill_41,skill_42,skill_43,skill_44,skill_45,skill_46,skill_47,skill_48,skill_49,skill_50,user_id))

    # Insert the data into the table skills
    cursor.execute("INSERT INTO positions (userid,positioncount) VALUES (?,?)",(user_id,size_user_positions))
    cursor.execute("UPDATE positions SET position_1=?,position_2=?,position_3=?,position_4=?,position_5=? WHERE userid=?",(position_1,position_2,position_3,position_4,position_5,user_id))

    # Insert the data into the table skills
    cursor.execute("INSERT INTO miss (userid,missskillcount) VALUES (?,?)",(user_id,size_user_miss_skills))
    cursor.execute("UPDATE miss SET miss_1=?,miss_2=?,miss_3=?,miss_4=?,miss_5=?,miss_6=?,miss_7=?,miss_8=?,miss_9=?,miss_10=?,miss_11=?,miss_12=?,miss_13=?,miss_14=?,miss_15=?,miss_16=?,miss_17=?,miss_18=?,miss_19=?,miss_20=?,miss_21=?,miss_22=?,miss_23=?,miss_24=?,miss_25=?,miss_26=?,miss_27=?,miss_28=?,miss_29=?,miss_30=?,miss_31=?,miss_32=?,miss_33=?,miss_34=?,miss_35=?,miss_36=?,miss_37=?,miss_38=?,miss_39=?,miss_40=?,miss_41=?,miss_42=?,miss_43=?,miss_44=?,miss_45=?,miss_46=?,miss_47=?,miss_48=?,miss_49=?,miss_50=? WHERE userid=?",(miss_1,miss_2,miss_3,miss_4,miss_5,miss_6,miss_7,miss_8,miss_9,miss_10,miss_11,miss_12,miss_13,miss_14,miss_15,miss_16,miss_17,miss_18,miss_19,miss_20,miss_21,miss_22,miss_23,miss_24,miss_25,miss_26,miss_27,miss_28,miss_29,miss_30,miss_31,miss_32,miss_33,miss_34,miss_35,miss_36,miss_37,miss_38,miss_39,miss_40,miss_41,miss_42,miss_43,miss_44,miss_45,miss_46,miss_47,miss_48,miss_49,miss_50,user_id))
    
    # Disconnect from 'user_data.db' database
    connection.commit()

    # Return a response to the client
    return {
        'message':'success-5',
        'session_value': user_id
    }

# Homepage --------------------------------------
@app.route('/homepage', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def homepage():
    json_data = request.get_json('data')

    # Get the data from user
    user_id = json_data['value']

    # if request.method == 'POST':
    #     # Connect to 'user_data.db' database
    #     connection = sqlite3.connect(DATABASE)
    #     cursor = connection.cursor()

    #     # Get the data from user
    #     if(request.form['position']!=""):
    #         position = request.form['position']
    #         location = request.form['location']

    #         record = Jobs(position, location)
    #         data_0 = record.jobs_jora() + record.jobs_simplyhired() + record.jobs_flexjobs()
    #         return render_template("homepage.html",data_0=data_0)

    # else: 
        # request.method=='GET'

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Retrieve stored data from 'positions' table
    query = "SELECT * FROM positions WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    position_count = int(data[1])
    user_positions = []
    for i in range(2,position_count+2):
        user_positions.append(data[i])

    print('userid:',user_id, 'positions:',user_positions)

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    #Prepare for database input
    for skill in range(position_count,5):
        user_positions.append('')

    position_1,position_2,position_3,position_4,position_5 = user_positions

    # Retrieve stored data from table
    query = "SELECT * FROM jobs WHERE position='"+position_1+"'"
    cursor.execute(query)
    data_1 = cursor.fetchall()
    #print(data_1)

    query = "SELECT * FROM jobs WHERE position='"+position_2+"'"
    cursor.execute(query)
    data_2 = cursor.fetchall()
    #print(data_2)

    query = "SELECT * FROM jobs WHERE position='"+position_3+"'"
    cursor.execute(query)
    data_3 = cursor.fetchall()
    #print(data_3)

    query = "SELECT * FROM jobs WHERE position='"+position_4+"'"
    cursor.execute(query)
    data_4 = cursor.fetchall()
    #print(data_4)

    query = "SELECT * FROM jobs WHERE position='"+position_5+"'"
    cursor.execute(query)
    data_5 = cursor.fetchall()
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
        'session_value': user_id
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

    # Retrieve stored data from 'miss' table
    query = "SELECT * FROM miss WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    miss_skill_count = int(data[1])
    user_miss = []
    for i in range(2,miss_skill_count+2):
        user_miss.append(data[i])

    print('userid:',user_id)
    print('Missing skills:',user_miss)

    # # Retrieve stored data from 'learn' table
    # query = "SELECT * FROM learn"
    # cursor.execute(query)
    # course = cursor.fetchall()
    # print(course)

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    #Prepare for database input
    for skill in range(miss_skill_count,50):
        user_miss.append('')

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

    # print(combined_data)
    data = []

    data.append({
        'message':'success-6',
        'session_value': user_id
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
    


# Profile --------------------------------------
@app.route('/profile', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def profile():
    json_data = request.get_json('data')

    # Get the data from user
    user_id = json_data['value']

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Retrieve stored data from 'users' table
    query = "SELECT * FROM users WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    connection.commit()

    email = data[1]
    password = data[2]
    username = data[4]
    phone = data[5]
    address = data[6]
    country = data[7]
    postalcode = data[8]

    print('user data:',user_id, email, password, username, phone, address, country, postalcode)
    
    # Return a response to the client
    return {
        'message':'sucess-7',
        'session_value': user_id,
        'email': email, 
        'password': password,
        'username': username, 
        'phone': phone, 
        'address': address, 
        'country': country, 
        'postalcode': postalcode
    }


# Profile Submit --------------------------------------
@app.route('/profilesubmit', methods=['POST','GET'])
@cross_origin(supports_credentials=True)
def profilesubmit():
    json_data = request.get_json('data')

    # Get the data from user
    user_id = json_data['value']
    email = json_data['email']
    password = json_data['password']
    username = json_data['username']
    phone = json_data['phone']
    address = json_data['address']
    country = json_data['country']
    postalcode = json_data['postalcode']

    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Update table
    cursor.execute("UPDATE users SET email=?,password=?,username=?,phone=?,address=?,country=?,postalcode=? WHERE (userid)=? ",(email,password,username,phone,address,country,postalcode,user_id))
    
    # Retrieve stored data from 'users' table
    query = "SELECT * FROM users WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    connection.commit()

    email = data[1]
    password = data[2]
    username = data[4]
    phone = data[5]
    address = data[6]
    country = data[7]
    postalcode = data[8]

    print('user data:',user_id, email, password, username, phone, address, country, postalcode)
    
    # Return a response to the client
    return {
        'message':'sucess-8',
        'session_value': user_id,
        'email': email, 
        'password': password,
        'username': username, 
        'phone': phone, 
        'address': address, 
        'country': country, 
        'postalcode': postalcode
    }


# Log Out ---------------------------------------
@app.route('/logout')
def logout():
    #session.pop('user_id',None)
    #return render_template("index.html")
    return 0

if __name__ == "__main__":
    app.run(debug = True)