import json
import numpy as np


def generate_data(progressionRate=1.01, plateauRate=0.2, skippingRate=0.1):
    """
    Generates synthetic training data for prediction model.

    Args:
        progressionRate (float): Rate of progression for the user.
        plateauRate (float): Chance that the user will plateau that workout.
        skippingRate (float): Chance that the user will skip the week of workout.

    Returns:
        dictionary: Contains all the newly generated data.
    """
    counter = 50

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
    progress.append({"sessionid": 0, "workouts": workouts})
    for i in range(1, counter):
        if np.random.rand() < skippingRate:
            print("user skipped this weeks workouts")
            continue
        workouts = progress[-1]["workouts"]
        newWorkout = {}
        # newWorkout["id"] = i
        for day, workout in workouts.items():
            newWorkout[day] = []
            for exercise in workout:
                if np.random.rand() < plateauRate:
                    newWorkout[day].append(
                        {
                            "name": exercise["name"],
                            "weight": exercise["weight"],
                            "reps": exercise["reps"],
                            "sets": exercise["sets"],
                            "estimate": exercise["estimate"],
                        }
                    )
                    continue
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
            progress.append({"sessionid": i, "workouts": newWorkout})
    return progress

    # print(progress)


def multipleUsers():
    users = [
        {
            "id": "U1",
            "stats": {
                "progressionRate": 1.01,
                "plateauRate": 0.2,
                "skippingRate": 0.02,
            },
        },
        {
            "id": "U2",
            "stats": {
                "progressionRate": 1.015,
                "plateauRate": 0.4,
                "skippingRate": 0.05,
            },
        },
        {
            "id": "U3",
            "stats": {
                "progressionRate": 1.005,
                "plateauRate": 0.3,
                "skippingRate": 0.08,
            },
        },
    ]
    data = []
    for user in users:
        data.append({"id": user["id"], "data": generate_data(**user["stats"])})
    with open("testingData.json", "w") as f:
        json.dump(data, f, indent=4)


def estimate1RM(weight: float, reps: int) -> float:
    estimate = weight * (1 + (reps / 30))
    return estimate


def reverse_e1RM(e1RM, oldWeight, oldReps):
    possibleValues = []
    repRanges = range(6, 13)
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


multipleUsers()
