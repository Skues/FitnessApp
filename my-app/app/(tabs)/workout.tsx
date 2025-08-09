// CREATE MODAL TO ALLOW THE USER TO INPUT AS MANY EXERCISES AS THEY WANT
// Also inside that modal/window it can have another modal which opens up and allows the user to input the exercise specifics, then submit to an array and keep doing this for as many times as they want.
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Modal, TouchableOpacity } from "react-native";



export default function Workout() {
    const [workout, setWorkout] = useState("");
    const [timeSpent, setTimeSpent] = useState("");
    const [date, setDate] = useState("");

    const [exerciseList, setExerciseList] = useState<ExerciseItem[]>([]);
    const [exercisesSet, setExercisesSet] = useState(false);
    type ExerciseItem = {
        name: string;
        weight: string;
        reps: string;
        sets: string;
    }
    const [exercise, setExercise] = useState("");
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");

    const isFormComplete = exercise.trim() !== ''
        && weight.trim() !== ''
        && reps.trim() !== ''
        && sets.trim() !== '';

    const [modalVisible, setModalVisible] = useState(false);

    const isWorkoutFormComplete = workout.trim() !== ''
        && timeSpent.trim() !== '';

    return (

        <View style={styles.view}>
            <Text>This is the workout page</Text>
            <TextInput
                style={styles.input}
                onChangeText={setWorkout}
                value={workout}
                placeholder="Enter workout here..."
                placeholderTextColor={"#888888"}
            />
            <TextInput
                style={styles.input}
                onChangeText={setTimeSpent}
                value={timeSpent}
                placeholder="Enter time spent..."
                placeholderTextColor={"#888888"}
            />
            <TextInput
                style={styles.input}
                onChangeText={setDate}
                value={date}
                placeholder="Enter date (leave blank if todays date)..."
                placeholderTextColor={"#888888"}
            />
            <TouchableOpacity
                style={[styles.button,
                !isWorkoutFormComplete && styles.buttonDisabled]}
                disabled={!isWorkoutFormComplete}
                onPress={() => { setModalVisible(true) }}
            >
                <Text style={styles.buttonText}>Confirm Workout</Text>
            </TouchableOpacity>
            <Text>
                {exerciseList.map((item, index) =>
                    `#${index + 1}: ${item.name} - ${item.reps} reps x ${item.sets} sets @ ${item.weight}\n`
                ).join('')}
            </Text>

            {exercisesSet && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={onButtonConfirm}
                >
                    <Text style={styles.buttonText}>Submit</Text>

                </TouchableOpacity>
            )}

            <Modal
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text> Add Exercise Details </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setExercise}
                            value={exercise}
                            placeholder="Enter name of exercise..."
                            placeholderTextColor={"#888888"}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setWeight}
                            value={weight}
                            placeholder="Enter weight ... "
                            placeholderTextColor={"#888888"}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setReps}
                            value={reps}
                            placeholder="Enter reps"
                            placeholderTextColor={"#888888"}
                            keyboardType="numeric"
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={setSets}
                            value={sets}
                            placeholder="Enter sets"
                            placeholderTextColor={"#888888"}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            style={[styles.button,
                            !isFormComplete && styles.buttonDisabled]}
                            disabled={!isFormComplete}
                            onPress={addExercise}
                        >
                            <Text style={styles.buttonText}>Add Exercise</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}
                            onPress={() => { setModalVisible(!modalVisible) }}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                setExercisesSet(true)
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                        {/* <Button */}
                        {/**/}
                        {/*     onPress={() => { setModalVisible(!modalVisible) }} */}
                        {/*     title="Close modal" */}
                        {/* /> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
    function onButtonConfirm() {

        const json = { workout, timeSpent, date, exerciseList }
        console.log(JSON.stringify(json));


    }
    function addExercise() {
        const newItem: ExerciseItem = { "name": exercise, "weight": weight, "reps": reps, "sets": sets }
        setExerciseList(prev => [...prev, newItem]);
        setExercise("");
        setWeight("");
        setReps("");
        setSets("");
    }
    // async function onButtonSubmit() {
    //     const response = await fetch("http://localhost:5000/logWorkout", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ "testing": "bob" }),
    //     });
    // }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        alignSelf: "center",
        color: "#000000",
        backgroundColor: "#ffffff",
        height: 40,
        margin: 12,
        width: "80%",
        borderWidth: 1,
        padding: 10,
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
    }
});



