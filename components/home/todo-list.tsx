import { createHomeStyles } from '@/assets/styles/home.style';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import EmptyTodoList from './empty-todo-list';
import Loading from './loading';

type Todo = Doc<'todos'>;

const TodoList = () => {
    const { colors } = useTheme();
    const styles = createHomeStyles(colors);

    const todos = useQuery(api.todos.getTodos);
    const toggleTodoCompletedMutation = useMutation(
        api.todos.toggleTodoCompleted
    );

    if (!todos) {
        return <Loading />;
    }

    const renderTodoItem = ({ item }: { item: Todo }) => {
        const toggleTodoCompletion = async () => {
            try {
                await toggleTodoCompletedMutation({ id: item._id });
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to toggle todo completion');
            }
        };
        return (
            <View style={styles.todoItemWrapper}>
                <LinearGradient
                    colors={colors.gradients.surface}
                    style={styles.todoItem}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={toggleTodoCompletion}
                    >
                        <LinearGradient
                            colors={
                                item.completed
                                    ? colors.gradients.success
                                    : colors.gradients.muted
                            }
                            style={[
                                styles.checkboxInner,
                                { borderColor: item.completed ? 'transparent' : colors.border },
                            ]}
                        >
                            {item.completed && (
                                <Ionicons
                                    name="checkmark"
                                    size={18}
                                    color="#fff"
                                />
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.todoTextContainer}>
                        <Text
                            style={[
                                styles.todoText,
                                item.completed && {
                                    textDecorationLine: 'line-through',
                                    color: colors.textMuted,
                                    opacity: 0.5,
                                },
                            ]}
                        >
                            {item.title}
                        </Text>


                        <View style={styles.todoActions}>
                            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8} onPress={() => {
                                console.log('Edit todo');
                            }}>
                                <LinearGradient
                                    colors={colors.gradients.warning}
                                    style={styles.actionButton}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Ionicons name="pencil-outline" size={18} color="#fff" />
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8} onPress={() => {
                                console.log('Delete todo');
                            }}>
                                <LinearGradient
                                    colors={colors.gradients.danger}
                                    style={styles.actionButton}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Ionicons name="trash-outline" size={18} color="#fff" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    };
    return (
        <FlatList
            data={todos}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item._id.toString()}
            style={styles.todoList}
            contentContainerStyle={styles.todoListContent}
            ListEmptyComponent={<EmptyTodoList />}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default TodoList;
