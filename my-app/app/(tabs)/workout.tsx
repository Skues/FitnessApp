// CREATE MODAL TO ALLOW THE USER TO INPUT AS MANY EXERCISES AS THEY WANT
// Also inside that modal/window it can have another modal which opens up and allows the user to input the exercise specifics, then submit to an array and keep doing this for as many times as they want.
//
//Set it so when they type on keyboard and they click off, it closes.
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Modal, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TimerPicker } from 'react-native-timer-picker';

export default function Workout() {
    const [workout, setWorkout] = useState("");
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState("0");
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

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
        && hours.trim() !== '0'
        && minutes.trim() !== "0";

    const onChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setOpen(false); // close picker on Android
        }

        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const showPicker = () => {
        console.log(open);
        setOpen(true);
    };

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.view}>
                <Text>This is the workout page</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setWorkout}
                    value={workout}
                    placeholder="Enter workout here..."
                    placeholderTextColor={"#888888"}
                />
                <View style={styles.row}>
                    <TextInput
                        style={styles.rowInputs}
                        keyboardType="numeric"
                        onChangeText={setHours}
                        placeholder="Enter hours spent..."
                        placeholderTextColor={"#888888"}
                    />
                    <TextInput
                        style={styles.rowInputs}
                        keyboardType="numeric"
                        onChangeText={setMinutes}
                        placeholder="Enter minutes spent..."
                        placeholderTextColor={"#888888"}
                    />
                </View>
                {open && (
                    <View style={{ alignSelf: "center", alignItems: "stretch" }} >
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    </View>
                )}
                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
                        padding: 10,
                        borderRadius: 5,
                        marginHorizontal: 5,
                        marginVertical: 5,
                    }}
                    onPress={() => setOpen(!open)}
                >
                    <Text style={{ color: 'white' }}>
                        {date.toDateString()}
                    </Text>
                </TouchableOpacity>

                {/* <TextInput */}
                {/*     style={styles.input} */}
                {/*     onChangeText={setDate} */}
                {/*     value={date} */}
                {/*     placeholder="Enter date (leave blank if todays date)..." */}
                {/*     placeholderTextColor={"#888888"} */}
                {/* /> */}
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
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
    async function onButtonConfirm() {
        const timeSpent = Number(hours) + Number(minutes) / 60

        const json = { workout, timeSpent, date, exerciseList }
        console.log(JSON.stringify(json));

        const response = await fetch("http://localhost:5000/logWorkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });

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



