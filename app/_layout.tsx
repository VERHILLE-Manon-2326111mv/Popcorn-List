import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
      <Tabs>
        <Tabs.Screen
            name="home"
            options={{
              title: "Accueil",
              tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
              ),
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
              title: "Profil",
              tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person" color={color} size={size} />
              ),
            }}
        />
      </Tabs>
  );
}
