def generate_data():
    counter = 100
    workoutType = ("Push Day", "Pull Day", "Leg Day")
    workouts = {
        "Push Day": [{"name": "Incline DB Press", "sets": 3, "weight": 30, "reps": 8}]
    }
    pushDay = {
        "Push Day": {("Incline DB Press", "Tricep Pushdown", "Pec Fly", "Tricep ISO")}
    }
    backDay = {
        "Pull Day": {("Lat Pulldown", "Preacher Curl", "Lat Row", "Incline DB Curl")}
    }

    legDay = {
        "Leg Day": {
            (
                "Hamstring Curl",
                "Leg Extension",
                "Shoudler Press",
                "Leg Press",
                "Cable Lat Raises",
            )
        }
    }
    for i in range(counter):
        print(i)
