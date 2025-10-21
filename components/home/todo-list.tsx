import { createHomeStyles } from '@/assets/styles/home.style';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
    Alert,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import EmptyTodoList from './empty-todo-list';
import Loading from './loading';

type Todo = Doc<'todos'>;

const TodoList = () => {
    const { colors } = useTheme();
    const styles = createHomeStyles(colors);

    const [isEditing, setIsEditing] = useState(false);
    const [selectedTodoTitle, setSelectedTodoTitle] = useState('');
    const [editTodoId, setEditTodoId] = useState<Id<'todos'> | null>(null);

    const todos = useQuery(api.todos.getTodos);
    const toggleTodoCompletedMutation = useMutation(
        api.todos.toggleTodoCompleted
    );
    const deleteTodoMutation = useMutation(api.todos.deleteTodo);
    const updateTodoMutation = useMutation(api.todos.updateTodo);
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

        const handleEditTodo = () => {
            setSelectedTodoTitle(item.title);
            setEditTodoId(item._id);
            setIsEditing(true);
        };
        const handleSaveEdit = async () => {
            try {
                await updateTodoMutation({ id: item._id, title: selectedTodoTitle });
                setEditTodoId(null);
                setIsEditing(false);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to update todo');
            }
        };
        const handleCancelEdit = () => {
            setSelectedTodoTitle('');
            setIsEditing(false);
        };
        const handleDeleteTodo = async () => {
            Alert.alert('Delete todo', 'Are you sure you want to delete this todo?', [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteTodoMutation({ id: item._id });
                        } catch (error) {
                            console.error(error);
                            Alert.alert('Error', 'Failed to delete todo');
                        }
                    },
                },
            ]);
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

                    {isEditing && editTodoId === item._id ? (
                        <View style={styles.editContainer}>
                            <TextInput
                                value={selectedTodoTitle}
                                onChangeText={(text) => setSelectedTodoTitle(text)}
                                multiline
                                placeholder="Edit todo"
                                placeholderTextColor={colors.textMuted}
                                returnKeyType="done"
                                autoFocus
                                style={styles.editInput}
                            />
                            <View style={styles.editButtons}>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    activeOpacity={0.8}
                                    onPress={handleSaveEdit}
                                >
                                    <LinearGradient
                                        colors={colors.gradients.success}
                                        style={styles.editButton}
                                    >
                                        <Ionicons name="checkmark" size={18} color="#fff" />
                                        <Text style={styles.editButtonText}>Save</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    activeOpacity={0.8}
                                    onPress={handleCancelEdit}
                                >
                                    <LinearGradient
                                        colors={colors.gradients.danger}
                                        style={styles.editButton}
                                    >
                                        <Ionicons name="close" size={18} color="#fff" />
                                        <Text style={styles.editButtonText}>Cancel</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
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
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    activeOpacity={0.8}
                                    onPress={handleEditTodo}
                                >
                                    <LinearGradient
                                        colors={colors.gradients.warning}
                                        style={styles.actionButton}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Ionicons
                                            name="pencil-outline"
                                            size={18}
                                            color="#fff"
                                        />
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    activeOpacity={0.8}
                                    onPress={handleDeleteTodo}
                                >
                                    <LinearGradient
                                        colors={colors.gradients.danger}
                                        style={styles.actionButton}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Ionicons
                                            name="trash-outline"
                                            size={18}
                                            color="#fff"
                                        />
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
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
