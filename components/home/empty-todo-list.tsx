import { createHomeStyles } from '@/assets/styles/home.style';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

const EmptyTodoList = () => {
    const { colors } = useTheme();
    const styles = createHomeStyles(colors);
    return (
        <View style={styles.emptyContainer}>
            <LinearGradient
                colors={colors.gradients.empty}
                style={styles.emptyIconContainer}
            >
                <Ionicons name="flash-off-outline" size={24} color="white" />
            </LinearGradient>
            <Text style={styles.emptyText}>No todos found</Text>
            <Text style={styles.emptySubtext}>Add a new todo to get started</Text>
        </View>
    )
}

export default EmptyTodoList