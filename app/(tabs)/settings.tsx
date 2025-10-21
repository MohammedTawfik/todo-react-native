import { createSettingsStyles } from '@/assets/styles/settings.style';
import DangerZone from '@/components/settings/danger-zone';
import Preferences from '@/components/settings/preferences';
import Stats from '@/components/settings/stats';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
    const { colors } = useTheme();
    const styles = createSettingsStyles(colors);
    return (
        <LinearGradient
            colors={colors.gradients.background}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <LinearGradient
                            colors={colors.gradients.primary}
                            style={styles.iconContainer}
                        >
                            <Ionicons
                                name="settings-outline"
                                size={24}
                                color="white"
                            />
                        </LinearGradient>
                        <Text style={styles.title}>Settings </Text>
                    </View>
                </View>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.content}
                >
                    <Stats />
                    <Preferences />
                    <DangerZone />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Settings;
