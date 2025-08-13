# Auth token stuff ( creating, using and setting expiration/deletion of them
# Figure out adding multiple exercises to one workout
# then linking it back to the user
# add hashing to passwords

from functools import wraps
import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    create_access_token,
    JWTManager,
    jwt_required,
    get_jwt_identity,
)
from flask_cors import CORS
from sqlalchemy.orm import DeclarativeBase
import jwt
import pandas as pd
import bcrypt


SECRET_KEY = "blehblegblug"

salt = bcrypt.gensalt()


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config["JWT_SECRET_KEY"] = "superblegggg"
db.init_app(app)

jwt = JWTManager(app)


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
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)


class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    sets = db.Column(db.Integer, nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey("workout.id"), nullable=False)


with app.app_context():
    db.create_all()

    print("Created database")


@app.route("/signup", methods=["POST", "GET"])
def signup():
    if request.method == "POST":
        data = request.get_json()
        print(data)
        bytes = data["password"].encode("utf-8")
        hash = bcrypt.hashpw(bytes, salt)
        new_user = User(username=data["username"], password=hash)
        # with open("users.json", "w") as f:
        #     json.dump(data, f)
        #     print("Writted to file")

        # Redirect to login screen?
    return "Attempted login"


@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        data = request.get_json()
        print(data)
        user = User.query.filter_by(username=data["username"]).first()
        if user and bcrypt.checkpw(data["password"].encode("utf-8"), user.password):

            access_token = create_access_token(identity=user.username)
            return jsonify(token=access_token), 200
            print("logged in")

        else:
            return jsonify(error="Invalid username or password"), 401
    return "Attempted login"


@app.route("/logWorkout", methods=["POST"])
@jwt_required()
def logWorkout():

    if request.method == "POST":
        data = request.get_json()
        userIdentity = get_jwt_identity()
        user = User.query.filter_by(username=userIdentity).first()
        # Check the user's auth token
        jsonExample = {
            "workout": "Chest Day",
            "lastedFor": 1.5,
            "date": "10-10-10",
            "exercises": [
                {"name": "benchpress", "weight": 80, "reps": 10, "sets": 3},
                {"name": "benchpress", "weight": 80, "reps": 10, "sets": 3},
            ],
        }
        workout = Workout(
            workoutName=data["name"],
            timeSpent=data["lastedFor"],
            date=data["date"],
            user_id=user.id,
        )
        db.session.add(workout)
        db.session.flush()

        new_exercises = []
        for exercise in data["exercises"]:
            new_exercise = Exercise(
                name=exercise["name"],
                weight=exercise["weight"],
                reps=exercise["reps"],
                sets=exercise["sets"],
                workout_id=workout.id,
            )
            new_exercises.append(new_exercise)
        db.session.add_all(new_exercises)
        db.session.commit()
    return "bbo"


def plotData():

    # takes a workout name as an input
    workout = {"name": "bench"}
    # then searches through all the users stored workouts of this type and creates a graph oh progress
    data = {
        "exercise": "Bench Press",
        "unit": "kg",
        "progress": [
            {"date": "2025-07-01", "avg_weight": 60, "avg_reps": 10, "sets": 3},
            {"date": "2025-07-08", "avg_weight": 62.5, "avg_reps": 10, "sets": 3},
            {"date": "2025-07-15", "avg_weight": 65, "avg_reps": 9, "sets": 3},
            {"date": "2025-07-22", "avg_weight": 67.5, "avg_reps": 8, "sets": 3},
            {"date": "2025-07-29", "avg_weight": 70, "avg_reps": 8, "sets": 3},
            {"date": "2025-08-05", "avg_weight": 72.5, "avg_reps": 7, "sets": 3},
            {"date": "2025-08-12", "avg_weight": 75, "avg_reps": 6, "sets": 3},
        ],
    }
    df = pd.DataFrame(data["progress"])

    return data
