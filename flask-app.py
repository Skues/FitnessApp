from flask import Flask, json, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
db.init_app(app)

CORS(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(50), nullable=False)


class AuthToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String, nullable=False)
    userID = db.Column(db.Integer, db.ForeignKey("User.id"), nullable=False)


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    workoutName = db.Column(db.String, nullable=False)
    timeSpent = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    # exercises = db.Column(Exercise[], nullable=False)


with app.app_context():
    db.create_all()

    print("Created database")


@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        data = request.get_json()
        print(data)
        new_user = User(username=data["username"], password=data["password"])
        # with open("users.json", "w") as f:
        #     json.dump(data, f)
        #     print("Writted to file")
    return "Attempted login"


@app.route("/logWorkout", methods=["POST"])
def logWorkout():
    if request.method == "POST":
        jsonExample = {
            "workout": "Chest Day",
            "lastedFor": 1.5,
            "date": "10-10-10",
            "exercises": [
                {"name": "benchpress", "weight": 80, "reps": 10, "sets": 3},
                {"name": "benchpress", "weight": 80, "reps": 10, "sets": 3},
            ],
        }

    return "bbo"
