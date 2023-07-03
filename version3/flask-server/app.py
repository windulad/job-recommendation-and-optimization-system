from flask import Flask, render_template, request, redirect, url_for, session 
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os
import sqlite3
import uuid
import cvread, manualread
from scrapersjob.jobs import Jobs
# from scraperslearn.learn import Learn

app = Flask(__name__,template_folder = 'template')
app.config['SECRET_KEY'] = 'xgyjnqbm'
app.config['UPLOAD_FOLDER'] = 'static/files'
DATABASE = 'database/user_data.db'

# Index -------------------------------------
@app.route('/')
def index():
    return render_template('index.html')

# Create account ----------------------------
@app.route('/createacc', methods=['POST','GET'])
def createacc():
    if request.method == 'POST':
        # Connect to 'user_data.db' database
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        # Get the data from user
        if(request.form['email']!="" and request.form['password']!=""):
            email = request.form['email']
            password = request.form['password']

            # Compare with stored data
            query = "SELECT email FROM users WHERE email='"+email+"'"
            cursor.execute(query)
            data = cursor.fetchone()

            if data:
                return render_template('createacc.html')
            else:
                # Insert the data into the table
                cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)",(email, password))
                connection.commit()
            
            # Get user id
            query = "SELECT userid FROM users WHERE email='"+email+"' and password= '"+password+"'"
            user_id = cursor.execute(query)
            data = cursor.fetchone()

            data = str(data)
            user_id = data[data.index('(')+1:data.index(',')]
            session['user_id'] = user_id
            print("userid: ",user_id," email: ",email," password: ",password)

        return render_template('enterskills.html')

    else: 
        request.method=='GET'
        return render_template('createacc.html')

# Log in ------------------------------------
@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'POST':
        # Connect to 'user_data.db' database
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        # Get the data from user 
        email = request.form['email']
        password = request.form['password']

        # Compare with stored data
        query = "SELECT userid FROM users WHERE email='"+email+"' and password= '"+password+"'"
        cursor.execute(query)
        data = cursor.fetchone()

        # Validation
        if data:
            data = str(data)
            user_id = data[data.index('(')+1:data.index(',')]
            print("userid: ",user_id," email: ",email," password: ",password)
            session['user_id'] = user_id

            return redirect(url_for('homepage'))
        else:
            return render_template('login.html')

    else:
        request.method=='GET'        
        return render_template('login.html')

# Enter CV ------------------------------------
class UploadFileForm(FlaskForm):
    file = FileField("File")
    submit = SubmitField("Upload File")

@app.route('/enter_cv', methods=['POST','GET'])
def enter_cv():
    form = UploadFileForm()

    user_id = session['user_id']

    # Upload and Validate
    if form.validate_on_submit():
        # Grab the file
        file = form.file.data    

        # Rename file with a random name   
        file.filename = str(uuid.uuid4())
        user_fileid = file.filename

        # Save the file
        file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))) 
        
        print("userid:",user_id,user_fileid, "File has been uploaded")

        # Connect to 'user_data.db' database
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        # Insert the data into the table
        cursor.execute("UPDATE users SET (fileid)=? WHERE (userid)=? ",(user_fileid,user_id))
        connection.commit()

        # Return skills extracted from CV
        rel_path = 'static/files/' + user_fileid
        user_skills,user_positions,user_miss_skills = cvread.CVRead(rel_path)

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

        return redirect(url_for('homepage'))

    else:
        return render_template('enter_cv.html', form=form)

# Enter Manual --------------------------------
@app.route('/enter_manual', methods=['POST','GET'])
def enter_manual():
    
    user_id = session['user_id']

    # Upload and Validate
    if request.method == 'POST':
        # Return skills extracted from html
        user_skills = request.form.getlist('enter_manual_checkbox')

        # Return other data
        user_positions,user_miss_skills = manualread.ManualRead(user_skills)

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

        return redirect(url_for('homepage'))

    else:
        return render_template("enter_manual.html")

# Homepage --------------------------------------
@app.route('/homepage', methods=['POST','GET'])
def homepage():
    
    user_id = session['user_id']

    if request.method == 'POST':
        # Connect to 'user_data.db' database
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        # Get the data from user
        if(request.form['position']!=""):
            position = request.form['position']
            location = request.form['location']

            record = Jobs(position, location)
            data_0 = record.jobs_jora() + record.jobs_simplyhired() + record.jobs_flexjobs()
            return render_template("homepage.html",data_0=data_0)

    else: 
        request.method=='GET'
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

        print('userid:',user_id)
        print('positions:',user_positions)

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

        return render_template("homepage.html",data_1=data_1,data_2=data_2,data_3=data_3,data_4=data_4,data_5=data_5,user_positions=user_positions)

# Learnpage --------------------------------------
@app.route('/learnpage', methods=['POST','GET'])
def learnpage():
    
    user_id = session['user_id']
    
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

    return render_template("learnpage.html",learn_1=learn_1,learn_2=learn_2,learn_3=learn_3,learn_4=learn_4,learn_5=learn_5,learn_6=learn_6,learn_7=learn_7,learn_8=learn_8,learn_9=learn_9,learn_10=learn_10,learn_11=learn_11,learn_12=learn_12,learn_13=learn_13,learn_14=learn_14,learn_15=learn_15,learn_16=learn_16,learn_17=learn_17,learn_18=learn_18,learn_19=learn_19,learn_20=learn_20,learn_21=learn_21,learn_22=learn_22,learn_23=learn_23,learn_24=learn_24,learn_25=learn_25,learn_26=learn_26,learn_27=learn_27,learn_28=learn_28,learn_29=learn_29,learn_30=learn_30,learn_31=learn_31,learn_32=learn_32,learn_33=learn_33,learn_34=learn_34,learn_35=learn_35,learn_36=learn_36,learn_37=learn_37,learn_38=learn_38,learn_39=learn_39,learn_40=learn_40,learn_41=learn_41,learn_42=learn_42,learn_43=learn_43,learn_44=learn_44,learn_45=learn_45,learn_46=learn_46,learn_47=learn_47,learn_48=learn_48,learn_49=learn_49,learn_50=learn_50)

# Profile --------------------------------------
@app.route('/profile', methods=['POST','GET'])
def profile():
    
    user_id = session['user_id']
    
    # Connect to 'user_data.db' database
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    # Retrieve stored data from 'users' table
    query = "SELECT * FROM users WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    email = data[1]
    username = data[4]
    phone = data[5]
    address = data[6]
    country = data[7]
    postalcode = data[8]

    # Retrieve stored data from 'skills' table
    query = "SELECT * FROM skills WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    skill_count = int(data[1])
    user_skills = []
    for i in range(2,skill_count+2):
        user_skills.append(data[i])

    print('user data:',user_id, email, username, phone, address, country, postalcode)
    print('user skill count:',skill_count)
    print('user skills:',user_skills)

    # Handle the edit user data form
    if request.method == 'POST':
        # Connect to 'user_data.db' database
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        # Get the data from user
        email = request.form['email']
        username = request.form['username']
        phone = request.form['phone']
        address = request.form['address']
        country = request.form['country']
        postalcode = request.form['postalcode']

        # Insert the data into the table
        cursor.execute("UPDATE users SET email=?,username=?,phone=?,address=?,country=?,postalcode=? WHERE (userid)=? ",(email,username,phone,address,country,postalcode,user_id))
        connection.commit()

        return render_template("profile.html",email=email,username=username,phone=phone,address=address,country=country,postalcode=postalcode,skill_count=skill_count,user_skills=user_skills)

    return render_template("profile.html",email=email,username=username,phone=phone,address=address,country=country,postalcode=postalcode,skill_count=skill_count,user_skills=user_skills)


# Settings --------------------------------------
@app.route('/settings', methods=['POST','GET'])
def settings():
    
    user_id = session['user_id']

    # Handle the edit user data form
    if request.method == 'POST':
        # Connect to 'user_data.db' database
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()

        # Get the data from user
        if(request.form['email']!=""):
            email = request.form['email']

        if(request.form['username']!=""):
            username = request.form['username']

        if(request.form['phone']!=""):
            phone = request.form['phone']

        if(request.form['address']!=""):
            address = request.form['address']

        if(request.form['country']!=""):
            country = request.form['country']

        if(request.form['postalcode']!=""):
            postalcode = request.form['postalcode']

        # Insert the data into the table
        cursor.execute("UPDATE users SET email=?,username=?,phone=?,address=?,country=?,postalcode=? WHERE (userid)=? ",(email,username,phone,address,country,postalcode,user_id))
        connection.commit()

    return render_template("settings.html")

# Log Out ---------------------------------------
@app.route('/logout')
def logout():
    session.pop('user_id',None)

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug = True)