import React from "react";
import { Link } from "expo-router";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default function Login() {
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    return (


        <View
            style={styles.view}>
            <Text>This is the login page</Text>
            <Link href="/">Go to index</Link>

            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Enter username..."
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Enter password..."
                secureTextEntry={true}
            />
            <Button
                onPress={onButtonSubmit}
                title="Submit Button"
            />
        </View>
    );
    async function onButtonSubmit() {
        const response = await fetch("http://localhost:5000/login", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }),
        });

        console.log(response.text)
        console.log("SUBMIT BUTTON PRESSED");
        console.log("USERNAME: " + username)
        console.log("Password: ", password)
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
