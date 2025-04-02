import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MovieProvider } from "@/context/MovieContext";
import { StyleSheet, View } from "react-native";

export default function Layout() {
    return (
        <MovieProvider>
            <Tabs
                screenOptions={{
                    tabBarStyle: styles.tabBar,
                    tabBarActiveTintColor: '#FF6347', // Orange-red color matching your buttons
                    tabBarInactiveTintColor: '#8E8E8E',
                    tabBarLabelStyle: styles.tabBarLabel,
                    tabBarItemStyle: styles.tabBarItem,
                    tabBarShowLabel: true,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Accueil",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profileScreen"
                    options={{
                        headerShown: false,
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
                <Tabs.Screen
                    name="PersonalMovies"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="Statistics"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
            </Tabs>
        </MovieProvider>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#1E1E1E',
        borderTopColor: '#2a2a2a',
        borderTopWidth: 1,
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 3,
    },
    tabBarItem: {
        padding: 5,
    }
});