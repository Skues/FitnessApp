import { useState, useEffect, useCallback } from "react";
import { Link, Redirect, useFocusEffect } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store';

export default function Index() {
    return (
        <View style={styles.view}
        >
            <Text>Recent Workouts</Text>
            <Workouts />
        </View>
    );
}
function Workouts() {
    const [data, setData] = useState([]);

    async function getWorkouts() {

        try {
            const token = await SecureStore.getItemAsync("token");
            if (!token) {
                console.log("you need to login");
            }
            const response = await fetch("http://192.168.1.239:5000/workout", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,

                }
            });
            if (response.ok) {

                const responseData = await response.json();
                return (responseData)
            }
            else {

                console.log("Token is invalid or expired, logging out");
                await SecureStore.deleteItemAsync("token");
                return <Redirect href="/login" />
            }
        } catch (error) {
            console.error("Error retreiving workout data, ", error);
        }
    }
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const workoutData = await getWorkouts();
                if (workoutData) {

                    // console.log(workoutData);
                    setData(workoutData);
                    // console.log(data);
                }
            };
            fetchData();


        }, [])
    );
    return ( // Properly show the workout with their own text box and the exercises inside of it 
        <View style={styles.view}>
            {data.map(workout => (
                <View key={workout.id} style={styles.workoutContainer}>
                    <Text style={styles.workoutText}>
                        {workout.workout} - {formatDate(new Date(workout.date))} | {workout.timeSpent} hours
                    </Text>
                    <ExpandableExercise exercises={workout.exercises} />
                    {/* {workout.exercises.map(exercise => ( */}
                    {/**/}
                    {/*     <Text key={`${workout.id}-${exercise.id}`} style={styles.exerciseText}> */}
                    {/*         - {exercise.name} , Weight: {exercise.weight}, Reps: {exercise.reps}, Sets: {exercise.sets} */}
                    {/*     </Text> */}
                    {/* ))} */}
                </View>
            ))}
        </View>
    );
    function formatDate(date: Date) {
        console.log(date.getDay(), date.getDate(), date.getMonth())
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    }
}
const ExpandableExercise = ({ exercises = [] }) => {

    const [expanded, setExpanded] = useState(false)
    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    return (

        <TouchableOpacity onPress={toggleExpand}>
            <View style={styles.workoutContainer}>
                {!expanded && (
                    <Text> Click to expand</Text>
                )}
                {expanded && (

                    exercises.map(exercise => (
                        <View key={exercise.id}>
                            <Text style={styles.exerciseText} >- {exercise.name}  </Text>
                            <Text style={styles.exerciseText}> Weight: {exercise.weight} Reps: {exercise.reps} Sets: {exercise.sets}</Text>
                        </View>
                    ))

                )
                }
            </View>
        </TouchableOpacity >
    );

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
    workoutContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // for Android shadow
    },
    workoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    exerciseText: {
        fontSize: 14,
        color: '#555',
        paddingLeft: 10,
        marginBottom: 4,
    },
});



