import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {TodoProvider} from "@/context/TodoContext";

export default function Layout() {
    return (
        <TodoProvider>
            <Tabs>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Accueil",
                        headerShown : false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profileScreen"
                    options={{
                        headerShown : false,
                        title: "Profil",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" color={color} size={size} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="movie/[id]"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
            </Tabs>
        </TodoProvider>
    );
}
