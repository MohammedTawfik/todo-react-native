import { createHomeStyles } from "@/assets/styles/home.style";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors, toggleDarkMode } = useTheme();
  const styles = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >

      <SafeAreaView
        style={styles.safeArea}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={toggleDarkMode}
        >
          <Text>Add Todo</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
