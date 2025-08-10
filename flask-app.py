# Auth token stuff ( creating, using and setting expiration/deletion of them
# Figure out adding multiple exercises to one workout
# then linking it back to the user
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
    workouts = db.relationship("Workout", backref="author", lazy=True)


class AuthToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String, nullable=False)
    userID = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    workoutName = db.Column(db.String, nullable=False)
    timeSpent = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    # exercises = db.Column(Exercise[], nullable=False)
    exercises = db.relationship("Exercise", backref="author", lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", nullable=False))


class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    sets = db.Column(db.Integer, nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey("workout.id", nullable=False))


with app.app_context():
    db.create_all()

    print("Created database")


@app.route("/signup", methods=["POST", "GET"])
def signup():
    if request.method == "POST":
        data = request.get_json()
        print(data)
        new_user = User(username=data["username"], password=data["password"])
        # with open("users.json", "w") as f:
        #     json.dump(data, f)
        #     print("Writted to file")
    return "Attempted login"


@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        data = request.get_json()
        print(data)
        user = User.query.filter_by(username=data["username"]).first()
        if user:
            # login, generate and return an auth token
            print("logged in")
    return "Attempted login"


@app.route("/logWorkout", methods=["POST"])
def logWorkout():
    if request.method == "POST":
        # Check the user's auth token
        data = request.get_json()
        jsonExample = {
            "workout": "Chest Day",
            "lastedFor": 1.5,
            "date": "10-10-10",
            "exercises": [
                {"name": "benchpress", "weight": 80, "reps": 10, "sets": 3},
                {"name": "benchpress", "weight": 80, "reps": 10, "sets": 3},
            ],
        }
        new_exercises = []
        for exercise in data["exercises"]:
            new_exercise = Exercise(
                name=data["name"],
                weight=data["weight"],
                reps=data["reps"],
                sets=data["sets"],
            )
            new_exercises.append(new_exercise)
        db.session.add_all(new_exercises)
    return "bbo"
