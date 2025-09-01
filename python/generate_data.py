import json


def generate_data():
    counter = 50
    betweenWorkout = 4
    progressionRate = 1.01
    workouts = {
        "Push Day": [
            {
                "name": "Incline DB Press",
                "sets": 3,
                "weight": 30,
                "reps": 8,
                "estimate": estimate1RM(30, 8),
            },
            {
                "name": "Tricep Pushdown",
                "sets": 3,
                "weight": 50,
                "reps": 8,
                "estimate": estimate1RM(50, 8),
            },
            {
                "name": "Pec Fly",
                "sets": 3,
                "weight": 70,
                "reps": 8,
                "estimate": estimate1RM(70, 8),
            },
            {
                "name": "Tricep ISO",
                "sets": 3,
                "weight": 12,
                "reps": 8,
                "estimate": estimate1RM(12, 8),
            },
        ],
        "Pull Day": [
            {
                "name": "Lat Pulldown",
                "sets": 3,
                "weight": 65,
                "reps": 8,
                "estimate": estimate1RM(65, 8),
            },
            {
                "name": "Preacher Curl",
                "sets": 3,
                "weight": 15,
                "reps": 8,
                "estimate": estimate1RM(15, 8),
            },
            {
                "name": "Lat Row",
                "sets": 3,
                "weight": 45,
                "reps": 8,
                "estimate": estimate1RM(45, 8),
            },
            {
                "name": "Incline DB Curl",
                "sets": 3,
                "weight": 10,
                "reps": 8,
                "estimate": estimate1RM(10, 8),
            },
        ],
        "Leg Day": [
            {
                "name": "Hamstring Curl",
                "sets": 3,
                "weight": 50,
                "reps": 8,
                "estimate": estimate1RM(50, 8),
            },
            {
                "name": "Leg Press",
                "sets": 3,
                "weight": 100,
                "reps": 8,
                "estimate": estimate1RM(100, 8),
            },
            {
                "name": "Shoulder Press",
                "sets": 3,
                "weight": 40,
                "reps": 8,
                "estimate": estimate1RM(40, 8),
            },
            {
                "name": "Leg Extension",
                "sets": 3,
                "weight": 70,
                "reps": 8,
                "estimate": estimate1RM(70, 8),
            },
            {
                "name": "Lat Raises",
                "sets": 3,
                "weight": 8,
                "reps": 8,
                "estimate": estimate1RM(8, 8),
            },
        ],
    }
    progress = []
    progress.append(workouts)
    for i in range(counter):
        workouts = progress[-1]
        newWorkout = {}
        for day, workout in workouts.items():
            newWorkout[day] = []
            for exercise in workout:
                estimate = exercise["estimate"] * progressionRate

                result = reverse_e1RM(estimate, exercise["weight"], exercise["reps"])
                newWorkout[day].append(
                    {
                        "name": exercise["name"],
                        "weight": result[1],
                        "reps": result[2],
                        "sets": exercise["sets"],
                        "estimate": estimate,
                    }
                )
            progress.append(newWorkout)
            with open("testingData.json", "w") as f:
                json.dump(progress, f)

    # print(progress)


def estimate1RM(weight: float, reps: int) -> float:
    estimate = weight * (1 + (reps / 30))
    return estimate
    print("blob")


def reverse_e1RM(e1RM, oldWeight, oldReps):
    possibleValues = []
    repRanges = range(6, 13)
    result = {}
    for reps in repRanges:
        weight = reverse_weight(e1RM, oldReps)
        rounded_weight = roundNearest(weight, increment=2.5)
        actual = estimate1RM(rounded_weight, reps)
        diff = abs(e1RM - actual)
        possibleValues.append((diff, rounded_weight, reps))
    return min(possibleValues, key=lambda x: x[0])


def roundNearest(weight, increment):
    return round(weight / increment) * increment


def reverse_reps(e1RM, weight):
    reps = 30 * ((e1RM / weight) - 1)
    return reps


def reverse_weight(e1RM, reps):
    weight = e1RM / (1 + (reps / 30))
    return weight


# print(e1RM(80, 8))

generate_data()
