import { createHomeStyles } from '@/assets/styles/home.style';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

const Header = () => {
    const { colors } = useTheme();
    const styles = createHomeStyles(colors);
    const todos = useQuery(api.todos.getTodos);
    const completedTodos = todos?.filter((todo) => todo.completed);
    const totalTodos = todos?.length ?? 0;
    const completedPercentage = ((completedTodos?.length ?? 0) / totalTodos) * 100;

    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <LinearGradient
                    colors={colors.gradients.primary}
                    style={styles.iconContainer}
                >
                    <Ionicons name="flash-off-outline" size={24} color="white" />
                </LinearGradient>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.title}>Today&apos;s Tasks </Text>
                    <Text style={styles.subtitle}>{completedTodos?.length ?? 0} of {totalTodos} completed</Text>
                </View>
            </View>
            {true && (
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBar}>
                            <LinearGradient
                                colors={colors.gradients.success}
                                style={[styles.progressFill, { width: `${completedPercentage}%` }]}
                            />
                        </View>
                        <Text style={styles.progressText}>{completedPercentage}%</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Header;
