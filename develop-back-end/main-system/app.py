from flask import Flask, render_template, request, redirect, url_for
import psycopg2
# from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__,template_folder = 'template')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5433/accounts'
# db = SQLAlchemy(app)

# Connect to 'flask_db' database------------------------
conn = psycopg2.connect(
        database="flask_db",
        user="postgres",
        password="admin",
        host="localhost",
        port="5433"
        )
# create a cursor to perform database operations
cur = conn.cursor()
# Create 'userdata' table
cur.execute('CREATE TABLE IF NOT EXISTS userdata ('
                'id serial PRIMARY KEY,'
                'email varchar (150) NOT NULL,'
                'username varchar (50) NOT NULL,'
                'password varchar (50) NOT NULL);'
                )
# Insert some data into the 'userdata' table
cur.execute('INSERT INTO userdata (email, username, password)'
                'VALUES (%s, %s, %s)',
                ('useremail1@gmail.com',
                'username1',
                'userpassword1')
                )
# commit the changes
conn.commit()
# close the cursor and connection
cur.close()
conn.close()

# Create an account-------------------------------------
@app.route('/createnewacc', methods=['POST'])
def createnewacc():
    # Connect to 'flask_db' database
    conn = psycopg2.connect(
            database="flask_db",
            user="postgres",
            password="admin",
            host="localhost",
            port="5433"
            )
    # create a cursor to perform database operations
    cur = conn.cursor()
    # Get the data from the form
    email = request.form['email']
    username = request.form['username']
    password = request.form['password']
    # Insert the data into the table
    cur.execute('INSERT INTO userdata (email, username, password)'
                'VALUES (%s, %s, %s)',
                (email, username, password)
                )
    # commit the changes
    conn.commit()
    # close the cursor and connection
    cur.close()
    conn.close()
    return render_template('enterskills.html')

# Log in---------------------------------------------
@app.route('/loginacc', methods=['POST'])
def loginacc():
    # Connect to 'flask_db' database
    conn = psycopg2.connect(
            database="flask_db",
            user="postgres",
            password="admin",
            host="localhost",
            port="5433"
            )
    # create a cursor to perform database operations
    cur = conn.cursor()
    # Get the data from the form
    email = request.form['email']
    password = request.form['password']
    # 

    # close the cursor and connection
    cur.close()
    conn.close()
    return render_template('enterskills.html')

# Main route of the application
@app.route('/')
def index():
    return render_template('index.html')

# Route to create an account page
@app.route('/createacc.html')
def createacc():
    return render_template('createacc.html')

# Route to login page
@app.route('/login.html')
def login():
    return render_template('login.html')

if __name__ == "__main__":
    app.run(debug = True)