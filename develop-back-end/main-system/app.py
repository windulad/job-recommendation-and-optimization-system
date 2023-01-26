from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate

app = Flask(__name__,template_folder = 'template')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5433/accounts'
db = SQLAlchemy(app)
# migrate = Migrate(app, db)

class Account(db.Model):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(200), nullable = False)
    username = db.Column(db.String(50), nullable = False)
    password = db.Column(db.String(20), nullable = False)
    confirm_password = db.Column(db.String(20), nullable = False)

    def __init__(id, email, password, confirm_password):
        self.id = id
        self.email = email
        self.username = username
        self.password = password
        self.confirm_password = confirm_password
    
    def __repr__(self):
        return f"<Account {self.email}>"

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