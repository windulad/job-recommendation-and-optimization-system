import sqlite3

connection = sqlite3.connect("user_data.db")
cursor = connection.cursor()

command1 = """CREATE TABLE IF NOT EXISTS users(
                userid INTEGER NOT NULL UNIQUE primary key autoincrement,
                email TEXT UNIQUE, 
                password TEXT, 
                fileid TEXT UNIQUE
            )"""

command2 = """CREATE TABLE IF NOT EXISTS skills(
                userid INTEGER NOT NULL UNIQUE primary key autoincrement,
                skillcount INTEGER,
                skill_1 TEXT,
                skill_2 TEXT,
                skill_3 TEXT,
                skill_4 TEXT,
                skill_5 TEXT,
                skill_6 TEXT,
                skill_7 TEXT,
                skill_8 TEXT,
                skill_9 TEXT,
                skill_10 TEXT,
                skill_11 TEXT,
                skill_12 TEXT,
                skill_13 TEXT,
                skill_14 TEXT,
                skill_15 TEXT,
                skill_16 TEXT,
                skill_17 TEXT,
                skill_18 TEXT,
                skill_19 TEXT,
                skill_20 TEXT,
                foreign key (userid) REFERENCES users(userid)
            )"""

cursor.execute(command1)
cursor.execute(command2)