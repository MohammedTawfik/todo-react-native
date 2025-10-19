import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
    const { colors } = useTheme();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                    paddingTop: 10,
                    paddingBottom: 30,
                    height: 90,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 10,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="flash-off-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="settings-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
