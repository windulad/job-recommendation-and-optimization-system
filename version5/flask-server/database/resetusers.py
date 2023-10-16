import sqlite3

connection = sqlite3.connect("user_data.db")
cursor = connection.cursor()

command1 = """DROP TABLE IF EXISTS users_biodata"""

command12 = """DROP TABLE IF EXISTS users_cvdata"""

command2 = """DROP TABLE IF EXISTS miss"""

command3 = """DROP TABLE IF EXISTS positions"""

command4 = """DROP TABLE IF EXISTS skills"""

command5 = """CREATE TABLE IF NOT EXISTS users_biodata(
                userid INTEGER NOT NULL UNIQUE primary key autoincrement,
                email TEXT UNIQUE, 
                password TEXT, 
                fileid TEXT UNIQUE,
                fname TEXT,
                lname TEXT,
                phone TEXT,
                address TEXT,
                country TEXT,
                postalcode TEXT
            )"""

command6 = """CREATE TABLE IF NOT EXISTS users_cvdata(
                userid INTEGER NOT NULL UNIQUE primary key autoincrement,
                qualify_1 TEXT,
                qualify_1_syear INTEGER,
                qualify_1_eyear INTEGER,
                qualify_1_notes TEXT,
                qualify_2 TEXT,
                qualify_2_syear INTEGER,
                qualify_2_eyear INTEGER,
                qualify_2_notes TEXT,
                qualify_3 TEXT,
                qualify_3_syear INTEGER,
                qualify_3_eyear INTEGER,
                qualify_3_notes TEXT,
                project_1_title TEXT,
                project_1_desc TEXT,
                project_2_title TEXT,
                project_2_desc TEXT,
                project_3_title TEXT,
                project_3_desc TEXT,
                job_1 TEXT,
                job_1_syear INTEGER,
                job_1_eyear INTEGER,
                job_1_notes TEXT,
                job_2 TEXT,
                job_2_syear INTEGER,
                job_2_eyear INTEGER,
                job_2_notes TEXT,
                job_3 TEXT,
                job_3_syear INTEGER,
                job_3_eyear INTEGER,
                job_3_notes TEXT
            )"""

command7 = """CREATE TABLE IF NOT EXISTS miss(
                userid INTEGER NOT NULL UNIQUE primary key autoincrement,
                missskillcount INTEGER,
                miss_1 TEXT,
                miss_2 TEXT,
                miss_3 TEXT,
                miss_4 TEXT,
                miss_5 TEXT,
                miss_6 TEXT,
                miss_7 TEXT,
                miss_8 TEXT,
                miss_9 TEXT,
                miss_10 TEXT,
                miss_11 TEXT,
                miss_12 TEXT,
                miss_13 TEXT,
                miss_14 TEXT,
                miss_15 TEXT,
                miss_16 TEXT,
                miss_17 TEXT,
                miss_18 TEXT,
                miss_19 TEXT,
                miss_20 TEXT,
                miss_21 TEXT,
                miss_22 TEXT,
                miss_23 TEXT,
                miss_24 TEXT,
                miss_25 TEXT,
                miss_26 TEXT,
                miss_27 TEXT,
                miss_28 TEXT,
                miss_29 TEXT,
                miss_30 TEXT,
                miss_31 TEXT,
                miss_32 TEXT,
                miss_33 TEXT,
                miss_34 TEXT,
                miss_35 TEXT,
                miss_36 TEXT,
                miss_37 TEXT,
                miss_38 TEXT,
                miss_39 TEXT,
                miss_40 TEXT,
                miss_41 TEXT,
                miss_42 TEXT,
                miss_43 TEXT,
                miss_44 TEXT,
                miss_45 TEXT,
                miss_46 TEXT,
                miss_47 TEXT,
                miss_48 TEXT,
                miss_49 TEXT,
                miss_50 TEXT,
                foreign key (userid) REFERENCES users(userid)
            )"""


command8 = """CREATE TABLE IF NOT EXISTS positions(
                userid INTEGER NOT NULL UNIQUE primary key autoincrement,
                positioncount INTEGER,
                position_1 TEXT,
                position_2 TEXT,
                position_3 TEXT,
                position_4 TEXT,
                position_5 TEXT,
                foreign key (userid) REFERENCES users(userid)
            )"""


command9 = """CREATE TABLE IF NOT EXISTS skills(
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
                skill_21 TEXT,
                skill_22 TEXT,
                skill_23 TEXT,
                skill_24 TEXT,
                skill_25 TEXT,
                skill_26 TEXT,
                skill_27 TEXT,
                skill_28 TEXT,
                skill_29 TEXT,
                skill_30 TEXT,
                skill_31 TEXT,
                skill_32 TEXT,
                skill_33 TEXT,
                skill_34 TEXT,
                skill_35 TEXT,
                skill_36 TEXT,
                skill_37 TEXT,
                skill_38 TEXT,
                skill_39 TEXT,
                skill_40 TEXT,
                skill_41 TEXT,
                skill_42 TEXT,
                skill_43 TEXT,
                skill_44 TEXT,
                skill_45 TEXT,
                skill_46 TEXT,
                skill_47 TEXT,
                skill_48 TEXT,
                skill_49 TEXT,
                skill_50 TEXT,
                foreign key (userid) REFERENCES users(userid)
            )"""



cursor.execute(command1)
cursor.execute(command12)
cursor.execute(command2)
cursor.execute(command3)
cursor.execute(command4)
cursor.execute(command5)
cursor.execute(command6)
cursor.execute(command7)
cursor.execute(command8)
cursor.execute(command9)

connection.commit()