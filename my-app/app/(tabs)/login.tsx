import React from "react";
import { Link, Redirect, useRouter } from "expo-router";
import { View, Text, TextInput, StyleSheet, Button, Modal, TouchableOpacity, Keyboard } from "react-native";
import * as SecureStore from 'expo-secure-store';

const link = "http://192.168.1.239:5000"

const router = useRouter();
export default function Account() {

    const [loginActive, setLoginActive] = React.useState(false);
    const [signupActive, setSignupActive] = React.useState(false);
    return (
        <View
            style={styles.view}
        >
            {/* Change it so the modal and stuff is all inside the Login component  */}
            <Modal
                visible={loginActive}
            >
                <View
                    style={styles.modalContainer}
                >
                    <Login />
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            setLoginActive(false);
                        }}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                visible={signupActive}
            >
                <View
                    style={styles.modalContainer}>
                    <Signup />

                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            setSignupActive(false);
                        }}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                    setLoginActive(true);
                }}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                    setSignupActive(true);
                }}
            >
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={async () => {
                    try {

                        const token = await SecureStore.getItemAsync("token")
                        console.log(token)
                    } catch (error) {
                        console.log("Failed", error);
                    }
                }}
            >
                <Text> Test Token </Text>
            </TouchableOpacity>
        </View>


    );
}



function Login() {
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    return (


        <View
            style={styles.modalContent}>

            <Text> Login form </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Enter username..."
                placeholderTextColor={"#888888"}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Enter password..."
                placeholderTextColor={"#888888"}
                secureTextEntry={true}
            />
            <Button
                onPress={onButtonSubmit}
                title="Submit Button"
            />
        </View>
    );
    async function onButtonSubmit() {
        Keyboard.dismiss;
        const response = await fetch(link + "/login", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log("Waiting for data");
        if (response.ok) {
            console.log("Response is ok");
            await SecureStore.setItemAsync('token', data.token)

            console.log("Rerouting");
            router.replace("/(tabs)/dashboard");
        }
    }
}

function Signup() {

    const [signupUsername, setSignupUsername] = React.useState("");
    const [signupPassword, setSignupPassword] = React.useState("");
    return (


        <View
            style={styles.modalContent}>

            <Text>Signup Form</Text>
            <TextInput
                style={styles.input}
                onChangeText={setSignupUsername}
                value={signupUsername}
                placeholder="Enter username..."
                placeholderTextColor={"#888888"}
            />
            <TextInput
                style={styles.input}
                onChangeText={setSignupPassword}
                value={signupPassword}
                placeholder="Enter password..."
                placeholderTextColor={"#888888"}
                secureTextEntry={true}
            />
            <Button
                onPress={onButtonSubmit}
                title="Submit Button"
            />
        </View>
    );
    async function onButtonSubmit() {
        Keyboard.dismiss;
        const response = await fetch(link + "/signup", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "username": signupUsername, "password": signupPassword }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log("signup successful");

        } else {
            console.log("Signup not successful");
        }
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        paddingHorizontal: 20,
    },
    input: {
        color: "#000000",
        backgroundColor: "#ffffff",
        height: 40,
        marginHorizontal: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: "auto",
    },
    rowInputs: {
        flex: 1,
        color: "#000000",
        backgroundColor: "#ffffff",
        height: 40,
        marginHorizontal: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: "auto",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '85%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        alignSelf: "center",
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: "60%",
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonDisabled: {
        backgroundColor: "#cccccc",
    },
    row: {
        alignItems: "stretch",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
