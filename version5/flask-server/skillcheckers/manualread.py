#from PyPDF2 import PdfReader

# Function to return positions and missing skills
def ManualRead(user_skills):
    software_eng = [
        #Software Engineer
        "C",
        "Cpp",
        "Csharp",
        "Java",
        "Python",
        "PHP",
        "Go",
        "SQL",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "SQL Server",
        "Oracle SQL",
        "Git",
        "GitHub",
        "GitLab",
        "AWS",
        "Azure",
        "GCP",
        "Postman",
        "Twilio",
        "Docker",
        "Kubernetes"
    ]

    front_end_eng = [
        #Front end engineer
        "HTML",
        "CSS",
        "Bootstrap",
        "Tailwind",
        "JavaScript",
        "Typescript",
        "React",
        "Angular",
        "Vue"
    ]
    
    back_end_eng = [
        #Back end engineer
        "Node",
        "Django",
        "Flask",
        "Spring Boot",
        "Laravel",
        "Ruby on Rails",
        ".NET Core"
    ]

    android_eng = [
        #Android engineer
        "Dart",
        "Flutter",
        "React Native",
        "Kotlin",
        "Android Jetpack",
        "Android Studio"
    ]

    ios_eng = [
        #IOS engineer
        "Swift",
        "SwiftUI",
        "Ionic",
        "Xcode",
        "Xamarin"
    ]

    #Check the available skills
    match_software_eng = [skill1 for skill1 in software_eng if skill1 in user_skills]
    match_front_end_eng = [skill2 for skill2 in front_end_eng if skill2 in user_skills]
    match_back_end_eng = [skill3 for skill3 in back_end_eng if skill3 in user_skills]
    match_android_eng = [skill4 for skill4 in android_eng if skill4 in user_skills]
    match_ios_eng = [skill5 for skill5 in ios_eng if skill5 in user_skills]

    #skills = match_software_eng+match_front_end_eng+match_back_end_eng+match_android_eng+match_ios_eng

    #Check the positions can be applied, missing skills
    # positions = []
    # miss_skills = []

    miss_skills_software_eng = [skill1 for skill1 in software_eng if skill1 not in match_software_eng]
    miss_skills_front_end_eng = [skill1 for skill1 in front_end_eng if skill1 not in match_front_end_eng]
    miss_skills_back_end_eng = [skill1 for skill1 in back_end_eng if skill1 not in match_back_end_eng]
    miss_skills_android_eng = [skill1 for skill1 in android_eng if skill1 not in match_android_eng]
    miss_skills_ios_eng = [skill1 for skill1 in ios_eng if skill1 not in match_ios_eng]

    # if match_software_eng:
    #     positions.append('software engineer')
    #     miss_skills = miss_skills + miss_skills_software_eng

    # if match_front_end_eng:
    #     positions.append('front end engineer')
    #     miss_skills = miss_skills + miss_skills_front_end_eng

    # if match_back_end_eng:
    #     positions.append('back end engineer')
    #     miss_skills = miss_skills + miss_skills_back_end_eng

    # if match_android_eng:
    #     positions.append('android engineer')
    #     miss_skills = miss_skills + miss_skills_android_eng

    # if match_ios_eng:
    #     positions.append('ios engineer')
    #     miss_skills = miss_skills + miss_skills_ios_eng
        
    #Return skills, positions
    # return(positions,miss_skills)
    return(match_software_eng, match_front_end_eng, match_back_end_eng, match_android_eng, match_ios_eng, miss_skills_software_eng, miss_skills_front_end_eng, miss_skills_back_end_eng, miss_skills_android_eng, miss_skills_ios_eng)
