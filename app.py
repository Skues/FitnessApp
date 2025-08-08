import json
import datetime as datetime

## TODO -
ACTIVITYLEVELS = {
    "none": 1.2,
    "little": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "high": 1.9,
}


# Fitness app
class FitnessApp:
    def __init__(self, gender: str, weight: float, height: float, age: int) -> None:
        self.info = {"gender": gender, "weight": weight, "height": height, "age": age}
        self.daily: float = 0

    def _bmrCalc(self, info: dict) -> float:
        # Basal Metabolic Rate - Harris-Benedict Equation
        bmr: float = 0
        match info["gender"].lower():
            case "male":
                bmr = (
                    (13.397 * info["weight"])
                    + (4.799 * info["height"])
                    - (5.677 * info["age"])
                ) + 88.362
            case "female":
                bmr = (
                    (9.247 * info["weight"])
                    + (3.098 * info["height"])
                    - (4.330 * info["age"])
                ) + 447.593
        return round(bmr, 2)

    def tdee(self, activity: str) -> float:
        # Total Daily Energy Expenditure
        multi = ACTIVITYLEVELS[activity]
        bmr = self._bmrCalc(self.info)
        print("BMR", bmr)
        return multi * bmr

    def setGoal(self, calories: float, goal: str):
        match goal:
            case "bulk":
                self.daily = calories + 500
            case "cut":
                self.daily = calories - 500
            case _:
                self.daily = calories

    def setMacros(self) -> dict:
        print(self.daily)
        poundBW = self.weightConvert(self.info["weight"], "lbs")
        proteins = round(poundBW)
        fats = 0.4 * poundBW
        print(fats)
        carbs = round((self.daily - (proteins * 4) - (fats * 9)) / 4)

        return {
            "proteins": [proteins, proteins * 4],
            "fats": [fats, fats * 9],
            "carbs": [carbs, carbs * 4],
        }

    def weightConvert(self, weight: float, convertTo: str) -> float:
        match convertTo:
            case "kg":
                return weight * 0.45359237
            case "lbs":
                return weight * 2.205
        return 0.0

    def trackFood(self, name: str, weight: float, calories: int):
        print(f"Eaten {name} and was {calories} calories.")
        self.daily = -calories
        receipt = json.dumps(
            {
                "datetime": "Add the current date here",
                "foodName": name,
                "quantity": weight,
                "calorieAmount": calories,
                "caloriesLeft": self.daily,
            }
        )
        with open("foodeaten.json", "a") as f:
            f.write(receipt)


app = FitnessApp("Male", 75, 178, 21)
calories = app.tdee("moderate")
print("TDEE", calories)
app.setGoal(calories, "bulk")
macros = app.setMacros()
print(macros)
app.trackFood("Chicken and chips", 1, 1000)
