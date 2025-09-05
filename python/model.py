# pull data from database
import pandas as pd
import numpy as np
from generate_data import multipleUsers

data = multipleUsers()
# print(data)
preCleandf = pd.DataFrame(data)
rows = []

for idx, row in preCleandf.iterrows():
    user_id = row["id"]
    sessions = row["data"]

    for session in sessions:
        sessionid = session["sessionid"]
        for workoutName, workouts in session["workouts"].items():
            for exercise in workouts:
                rows.append(
                    {
                        "user_id": user_id,
                        "session_id": sessionid,
                        "split": workoutName,
                        "exercise": exercise["name"],
                        "reps": exercise["reps"],
                        "sets": exercise["sets"],
                        "weight": exercise["weight"],
                        "estimate": exercise["estimate"],
                    }
                )
df = pd.DataFrame(rows)
df.sort_values(by=["user_id", "exercise", "session_id"], inplace=True)
df["estimateDiff"] = df.groupby(["user_id", "exercise"])["estimate"].diff().shift(-1)
train = df[df["session_id"] < 30]
test = df[df["session_id"] >= 30]
print(df)
# print(df.groupby(["user_id", "exercise"]))
# print(df)
