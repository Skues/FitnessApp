import pandas as pd
from pandas._libs.hashtable import value_count
import plotly.express as px


data = {
    "exercise": "Bench Press",
    "unit": "kg",
    "progress": [
        {"date": "2025-07-01", "avg_weight": 60, "avg_reps": 10, "sets": 3},
        {"date": "2025-07-08", "avg_weight": 62.5, "avg_reps": 8, "sets": 3},
        {"date": "2025-07-15", "avg_weight": 62.5, "avg_reps": 9, "sets": 3},
        {"date": "2025-07-22", "avg_weight": 65, "avg_reps": 7, "sets": 3},
        {"date": "2025-07-29", "avg_weight": 65, "avg_reps": 9, "sets": 3},
        {"date": "2025-08-05", "avg_weight": 65, "avg_reps": 11, "sets": 3},
        {"date": "2025-08-12", "avg_weight": 67.5, "avg_reps": 9, "sets": 3},
    ],
}

df = pd.DataFrame(data["progress"])
df["date"] = pd.to_datetime(df["date"])
df["day"] = df["date"].dt.day
df["month"] = df["date"].dt.month
print(df)
print(df["month"].value_counts())


def monthFrequency(data):
    df = pd.DataFrame(data)
    df["date"] = pd.to_datetime(df["date"])
    df["day"] = df["date"].dt.day
    df["month"] = df["date"].dt.month
    # new = df["month"].value_counts()

    fig = px.bar(
        df["month"].value_counts(),
        title="Frequency of Workouts",
        labels={
            "month": "Month",
            "value": "Frequency",
        },
    )
    fig.show()
    return df["month"].value_counts()


def plotE1RM(data):

    df = pd.DataFrame(data)
    df["progress"] = df["avg_weight"] * (1 + (df["avg_reps"] / 30))
    new = df[["date", "progress"]].copy()
    fig = px.line(new, x="date", y="progress", title="Workout Progress Line Graph")
    fig.show()


monthFrequency(data["progress"])
# plotE1RM(data["progress"])
