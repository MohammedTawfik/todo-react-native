import { createSettingsStyles } from '@/assets/styles/settings.style';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

const Stats = () => {
    const { colors } = useTheme();
    const styles = createSettingsStyles(colors);

    const todos = useQuery(api.todos.getTodos);
    const completedTodos = todos?.filter((todo) => todo.completed);
    const totalTodos = todos?.length ?? 0;
    const totalCompletedTodos = completedTodos?.length ?? 0;
    const totalIncompletedTodos = totalTodos - totalCompletedTodos;

    return (
        <LinearGradient
            colors={colors.gradients.surface}
            style={styles.section}
        >
            <Text style={styles.sectionTitle}>Progress Stats</Text>

            <View style={styles.statsContainer}>
                <LinearGradient
                    colors={colors.gradients.background}
                    style={[styles.statCard, { borderLeftColor: colors.primary }]}
                >
                    <View style={styles.statIconContainer}>
                        <LinearGradient
                            colors={colors.gradients.primary}
                            style={styles.statIcon}
                        >
                            <Ionicons
                                name="list"
                                size={24}
                                color="#fff"
                            />
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={styles.statNumber}>{totalTodos}</Text>
                        <Text style={styles.statLabel}>Total Tasks</Text>
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={colors.gradients.background}
                    style={[styles.statCard, { borderLeftColor: colors.success }]}
                >
                    <View style={styles.statIconContainer}>
                        <LinearGradient
                            colors={colors.gradients.success}
                            style={styles.statIcon}
                        >
                            <Ionicons
                                name="checkmark-circle"
                                size={24}
                                color="#fff"
                            />
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={styles.statNumber}>{totalCompletedTodos}</Text>
                        <Text style={styles.statLabel}>Total Completed</Text>
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={colors.gradients.background}
                    style={[styles.statCard, { borderLeftColor: colors.warning }]}
                >
                    <View style={styles.statIconContainer}>
                        <LinearGradient
                            colors={colors.gradients.warning}
                            style={styles.statIcon}
                        >
                            <Ionicons
                                name="time"
                                size={24}
                                color="#fff"
                            />
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={styles.statNumber}>{totalIncompletedTodos}</Text>
                        <Text style={styles.statLabel}>Total Active</Text>
                    </View>
                </LinearGradient>
            </View>
        </LinearGradient>
    );
};

export default Stats;
