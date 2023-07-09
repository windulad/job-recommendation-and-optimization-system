import sqlite3

connection = sqlite3.connect("user_data.db")
cursor = connection.cursor()

command1 = """DROP TABLE IF EXISTS jobs"""

command2 = """DROP TABLE IF EXISTS miss"""

command3 = """DROP TABLE IF EXISTS positions"""

command4 = """DROP TABLE IF EXISTS skills"""

command5 = """DROP TABLE IF EXISTS udemy"""

command6 = """DROP TABLE IF EXISTS users"""

cursor.execute(command1)
cursor.execute(command2)
cursor.execute(command3)
cursor.execute(command4)
cursor.execute(command5)
cursor.execute(command6)