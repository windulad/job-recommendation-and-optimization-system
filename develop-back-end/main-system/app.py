from flask import Flask, render_template, url_for

app = Flask(__name__,template_folder = 'template')

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