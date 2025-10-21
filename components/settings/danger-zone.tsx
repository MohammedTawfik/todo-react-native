import { createSettingsStyles } from '@/assets/styles/settings.style';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const DangerZone = () => {
    const { colors } = useTheme();
    const styles = createSettingsStyles(colors);
    const deleteAllTodosMutation = useMutation(api.todos.deleteAllTodos);

    const handleDeleteAllTodos = async () => {
        Alert.alert(
            'Reset App',
            ' ⚠️ This action will reset the app and delete all todos. This action is irreversible.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const deletedCount = await deleteAllTodosMutation();
                            if (deletedCount?.deletedCount && deletedCount.deletedCount > 0) {
                                Alert.alert('Success', 'All todos have been deleted');
                            } else {
                                Alert.alert('Error', 'Failed to delete all todos');
                            }
                        } catch (error) {
                            console.error(error);
                            Alert.alert('Error', 'Failed to delete all todos');
                        }
                    },
                },
            ]
        );

    };
    return (
        <LinearGradient
            colors={colors.gradients.surface}
            style={styles.section}
        >
            <Text style={styles.sectionTitleDanger}>Danger Zone</Text>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleDeleteAllTodos}
                style={[styles.actionButton, { borderBottomWidth: 0 }]}
            >
                <View style={styles.actionLeft}>
                    <LinearGradient
                        colors={colors.gradients.danger}
                        style={styles.actionIcon}
                    >
                        <Ionicons name="trash" size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={styles.actionTextDanger}>Reset App</Text>
                </View>
            </TouchableOpacity>
        </LinearGradient>
    );
};
export default DangerZone;
