import pandas as pd
import plotly.express as px


def plotE1RM(data):
    df = pd.DataFrame(data)
    df["progress"] = df["avg_weight"] * (1 + (df["avg_reps"] / 30))
    new = df[["date", "progress"]].copy()
    fig = px.line(new, x="date", y="progress", title="Workout Progress Line Graph")
    fig.show()


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

plotE1RM(data["progress"])
