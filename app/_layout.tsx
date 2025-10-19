import useTheme, { ThemeProvider } from '@/hooks/useTheme';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function RootLayoutContent() {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style={colors.statusBarStyle} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </ConvexProvider>
  );
}
