import requests


url = "http://localhost:5000/"


def clearUsers():
    response = requests.get(url + "clearUsers")
    print(response.json())
    return "users cleared"


def clearWorkouts():
    response = requests.get(url + "clearWorkouts")
    print(response.json())
    return "users cleared"


def clearExercises():
    response = requests.get(url + "clearExercises")
    print(response.json())
    return "users cleared"


clearExercises()
clearWorkouts()
