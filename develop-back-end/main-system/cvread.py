from PyPDF2 import PdfReader

# Function to extract skills from user CV / Resume
def CVRead(filepath):
    reader = PdfReader(filepath)
    number_of_pages = len(reader.pages)
    page = reader.pages[0]
    text = page.extract_text()

    #print(text)

    dev = [
        "C",
        "C++",
        "C#",
        "Java",
        "Python",
        "PHP",
        "Go",
        "Rust",
        "Docker",
        "Kubernetes",
        "Git",
        "GitHub",
        "GitLab",
        "AWS",
        "Azure",
        "SQL",
        "MySQL",
        "MongoDB",
        "SQL Server",
        "PostgreSQL",
        "Oracle SQL",
        "Postman",
        "Twilio"
    ]

    web_dev = [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Typescript",
        "React JS",
        "Angular",
        "Node.Js",
        "ASP.NET Core",
        "Next.js",
        "Vue JS",
        "Flask",
        "Django",
        "Spring Boot",
        "WordPress"
    ]

    app_dev = [
        "Dart",
        "Flutter",
        "React Native",
        "Swift",
        "SwiftUI",
        "Kotlin",
        ".NET MAUI",
        "Android Jetpack",
        "Ionic",
        "Android Studio",
        "Xamarin",
        "Microsoft Power Apps"
    ]

    match_dev = [a for a in dev if a in text]
    match_web_dev = [b for b in web_dev if b in text]
    match_app_dev = [c for c in app_dev if c in text]

    return(match_dev + match_web_dev + match_app_dev)
