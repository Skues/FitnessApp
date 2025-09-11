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
print(df.describe())
train = []
test = []
print(df)
for user_id, user_df in df.groupby("user_id"):
    n = len(user_df)
    split = int(n * 0.8)
    train.append(user_df.iloc[:split])
    test.append(user_df.iloc[split:])

    # print(user_id, user_df)

train_df = pd.concat(train).reset_index(drop=True)
print(train_df)
test_df = pd.concat(test).reset_index(drop=True)
# print(df.groupby(["user_id", "exercise"]))
# print(df)
