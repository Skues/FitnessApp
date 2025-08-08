// CREATE MODAL TO ALLOW THE USER TO INPUT AS MANY EXERCISES AS THEY WANT
// Also inside that modal/window it can have another modal which opens up and allows the user to input the exercise specifics, then submit to an array and keep doing this for as many times as they want.
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";



export default function Workout() {
    const [workout, setWorkout] = useState({});
    const [timeSpent, setTimeSpent] = useState("");
    const [date, setDate] = useState("");
    return (

        <View style={styles.view}>
            <Text>This is the workout page</Text>
            <TextInput
                style={styles.input}
                onChangeText={setWorkout}
                placeholder="Enter workout here..."
            />
            <TextInput
                style={styles.input}
                onChangeText={setTimeSpent}
                placeholder="Enter time spent..."
            />
            <TextInput
                style={styles.input}
                onChangeText={setDate}
                placeholder="Enter date (leave blank if todays date)..."
            />
            <Button

                onPress={onButtonSubmit}
                title="Submit Button"
            />
        </View>

    );
    async function onButtonSubmit() {
        const response = await fetch("http://localhost:5000/logWorkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "testing": "bob" }),
        });
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});



