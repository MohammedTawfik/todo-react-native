import { createSettingsStyles } from '@/assets/styles/settings.style'
import useTheme from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Switch, Text, View } from 'react-native'

const Preferences = () => {
    const { colors, isDarkMode, toggleDarkMode } = useTheme();
    const styles = createSettingsStyles(colors);

    const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
    const [notificationEnabled, setNotificationEnabled] = useState(true);
    return (
        <LinearGradient
            colors={colors.gradients.surface}
            style={styles.section}
        >
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.success}
                        style={styles.settingIcon}
                    >
                        <Ionicons name="sync" size={24} color="#fff" />
                    </LinearGradient>
                    <Text style={styles.settingText}>Auto Sync</Text>
                </View>
                <Switch
                    value={autoSyncEnabled}
                    onValueChange={setAutoSyncEnabled}
                    trackColor={{ true: colors.success, false: colors.border }}
                    thumbColor="#fff"
                    ios_backgroundColor={colors.success}
                />
            </View>

            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.warning}
                        style={styles.settingIcon}
                    >
                        <Ionicons name="notifications" size={24} color="#fff" />
                    </LinearGradient>
                    <Text style={styles.settingText}>Notifications</Text>
                </View>
                <Switch
                    value={notificationEnabled}
                    onValueChange={setNotificationEnabled}
                    trackColor={{ true: colors.warning, false: colors.border }}
                    thumbColor="#fff"
                    ios_backgroundColor={colors.warning}
                />
            </View>

            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.primary}
                        style={styles.settingIcon}
                    >
                        <Ionicons name="moon" size={24} color="#fff" />
                    </LinearGradient>
                    <Text style={styles.settingText}>Dark Mode</Text>
                </View>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{ true: colors.primary, false: colors.border }}
                    thumbColor="#fff"
                    ios_backgroundColor={colors.border}
                />
            </View>
        </LinearGradient>
    )
}

export default Preferences 