import { createHomeStyles } from '@/assets/styles/home.style';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

const AddTodo = () => {
    const { colors } = useTheme();
    const styles = createHomeStyles(colors);
    const [title, setTitle] = useState('');
    const addTodoMutation = useMutation(api.todos.createTodo);

    const handleAddTodo = async () => {
        try {
            await addTodoMutation({ title: title.trim() });
            setTitle('');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to add todo');
        }
    };

    return (
        <View style={styles.inputSection}>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Add a new todo"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholderTextColor={colors.textMuted}
                    onSubmitEditing={handleAddTodo}
                />
                <TouchableOpacity
                    onPress={handleAddTodo}
                    activeOpacity={0.8}
                    style={[styles.addButton, !title.trim() && styles.addButtonDisabled]}
                    disabled={!title.trim()}
                >
                    <LinearGradient
                        colors={!title.trim() ? colors.gradients.muted : colors.gradients.primary}
                        style={[styles.addButton, !title.trim() && styles.addButtonDisabled]}
                    >
                        <Ionicons
                            name="add"
                            size={24}
                            color={colors.text}
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddTodo;
