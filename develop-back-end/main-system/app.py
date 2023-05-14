from flask import Flask, render_template, request, redirect, url_for, session 
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os
import sqlite3
import uuid
import cvread

app = Flask(__name__,template_folder = 'template')
app.config['SECRET_KEY'] = 'xgyjnqbm'
app.config['UPLOAD_FOLDER'] = 'static/files'

# Index -------------------------------------
@app.route('/')
def index():
    return render_template('index.html')

# Create account ----------------------------
@app.route('/createacc', methods=['POST','GET'])
def createacc():
    if request.method == 'POST':
        # Connect to 'user_data.db' database
        connection = sqlite3.connect('user_data.db')
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
        connection = sqlite3.connect('user_data.db')
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
        connection = sqlite3.connect('user_data.db')
        cursor = connection.cursor()

        # Insert the data into the table
        cursor.execute("UPDATE users SET (fileid)=? WHERE (userid)=? ",(user_fileid,user_id))
        connection.commit()

        # Return skills extracted from CV
        rel_path = 'static/files/' + user_fileid
        user_skills = cvread.CVRead(rel_path)

        size_user_skills = len(user_skills)

        for skill in range(size_user_skills,20):
            user_skills.append('')

        print('userid:',user_id,'skills:',user_skills)

        # Unpack skills from user_skills list
        skill_1,skill_2,skill_3,skill_4,skill_5,skill_6,skill_7,skill_8,skill_9,skill_10,skill_11,skill_12,skill_13,skill_14,skill_15,skill_16,skill_17,skill_18,skill_19,skill_20 = user_skills

        # Connect to 'user_data.db' database
        connection = sqlite3.connect('user_data.db')
        cursor = connection.cursor()

        # Insert the data into the table skills
        cursor.execute("INSERT INTO skills (userid,skillcount) VALUES (?,?)",(user_id,size_user_skills))
        cursor.execute("UPDATE skills SET skill_1=?,skill_2=?,skill_3=?,skill_4=?,skill_5=?,skill_6=?,skill_7=?,skill_8=?,skill_9=?,skill_10=?,skill_11=?,skill_12=?,skill_13=?,skill_14=?,skill_15=?,skill_16=?,skill_17=?,skill_18=?,skill_19=?,skill_20=? WHERE userid=?",(skill_1,skill_2,skill_3,skill_4,skill_5,skill_6,skill_7,skill_8,skill_9,skill_10,skill_11,skill_12,skill_13,skill_14,skill_15,skill_16,skill_17,skill_18,skill_19,skill_20,user_id))
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
        user_skills = request.form.getlist('enter_manual_checkbox')
        
        size_user_skills = len(user_skills)

        for skill in range(size_user_skills,20):
            user_skills.append('')

        print('userid:',user_id,'skills:',user_skills)

        # Unpack skills from user_skills list
        skill_1,skill_2,skill_3,skill_4,skill_5,skill_6,skill_7,skill_8,skill_9,skill_10,skill_11,skill_12,skill_13,skill_14,skill_15,skill_16,skill_17,skill_18,skill_19,skill_20 = user_skills

        # Connect to 'user_data.db' database
        connection = sqlite3.connect('user_data.db')
        cursor = connection.cursor()

        # Insert the data into the table skills
        cursor.execute("INSERT INTO skills (userid,skillcount) VALUES (?,?)",(user_id,size_user_skills))
        cursor.execute("UPDATE skills SET skill_1=?,skill_2=?,skill_3=?,skill_4=?,skill_5=?,skill_6=?,skill_7=?,skill_8=?,skill_9=?,skill_10=?,skill_11=?,skill_12=?,skill_13=?,skill_14=?,skill_15=?,skill_16=?,skill_17=?,skill_18=?,skill_19=?,skill_20=? WHERE userid=?",(skill_1,skill_2,skill_3,skill_4,skill_5,skill_6,skill_7,skill_8,skill_9,skill_10,skill_11,skill_12,skill_13,skill_14,skill_15,skill_16,skill_17,skill_18,skill_19,skill_20,user_id))
        connection.commit()

        return redirect(url_for('homepage'))

    else:
        return render_template("enter_manual.html")

# Homepage --------------------------------------
@app.route('/homepage', methods=['POST','GET'])
def homepage():
    
    user_id = session['user_id']
    
    # Connect to 'user_data.db' database
    connection = sqlite3.connect('user_data.db')
    cursor = connection.cursor()

    # Retrieve stored data
    query = "SELECT * FROM skills WHERE userid='"+user_id+"'"
    cursor.execute(query)
    data = cursor.fetchone()

    skill_count = int(data[1])
    user_skills = []
    for i in range(2,skill_count+2):
        user_skills.append(data[i])

    print('userid:',user_id,'skills:',user_skills)
    
    return render_template("homepage.html", user_skills=user_skills)

# Log Out ---------------------------------------
@app.route('/logout')
def logout():
    session.pop('user_id',None)

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug = True)