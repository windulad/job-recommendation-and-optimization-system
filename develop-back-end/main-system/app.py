from flask import Flask, render_template, request, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os
import sqlite3
import cvread

app = Flask(__name__,template_folder = 'template')
app.config['SECRET_KEY'] = 'supersecretkey'
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

            print(email, password)

            # Insert the data into the table
            cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)",(email, password))
            connection.commit()

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
        query = "SELECT email,password FROM users WHERE email='"+email+"' and password= '"+password+"'"
        cursor.execute(query)

        results = cursor.fetchone()

        # Validation
        if not results:
            return render_template('login.html')
        else:
            return render_template('enterskills.html')

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

    # Upload and Validate
    if form.validate_on_submit():
        file = form.file.data       # First grab the file
        file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))) # Then save the file
        
        print( "File has been uploaded")

        # Return skills extracted from CV
        print(cvread.CVRead('static/files/resume1.pdf'))

        return render_template('homepage.html')

    else:
        return render_template('enter_cv.html', form=form)

if __name__ == "__main__":
    app.run(debug = True)