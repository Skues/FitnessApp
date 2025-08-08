import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";



export default function Workout() {
    const [workout, setWorkout] = useState({})
    return (

        <View style={styles.view}>
            <Text>This is the workout page</Text>
            <TextInput
                style={styles.input}
                onChangeText={setWorkout}
                placeholder="Enter workout here..."
            />
            <Button

                onPress={onButtonSubmit}
                title="Submit Button"
            />
        </View>

    );
    async function onButtonSubmit() {
        const response = await fetch("http://localhost:5000/workout", {
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



