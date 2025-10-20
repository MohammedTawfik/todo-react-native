import { createHomeStyles } from "@/assets/styles/home.style";
import AddTodo from "@/components/home/add-todo";
import Header from "@/components/home/header";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >

      <SafeAreaView
        style={styles.safeArea}
      >
        <Header />
        <AddTodo />
      </SafeAreaView>
    </LinearGradient>
  );
}
