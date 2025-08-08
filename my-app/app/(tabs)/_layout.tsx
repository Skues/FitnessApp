import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index"
                options={{ tabBarLabel: "Index" }} />
            <Tabs.Screen name="login"
                options={{ tabBarLabel: "Login" }} />
            <Tabs.Screen name="workout"
                options={{ tabBarLabel: "Workout" }} />
        </Tabs>
    );
}

