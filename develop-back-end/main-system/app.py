from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__,template_folder = 'template')

# Application routing-------------------------------------
@app.route('/')
def index():
    return render_template('index.html')

# Create account
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

# Log in
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

if __name__ == "__main__":
    app.run(debug = True)