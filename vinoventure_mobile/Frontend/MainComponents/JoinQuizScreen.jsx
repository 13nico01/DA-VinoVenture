import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const JoinQuiz = ({ navigation }) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>VinoVenture</Text>
            <View style={styles.bottomSection}>
                <Text style={styles.title3}>Gib den Code ein nachdem der Host das Quiz gestartet hat</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Code..."
                    placeholderTextColor="#bbb"
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />
                <TouchableOpacity style={styles.button} onPress={() => {/* Handle button logic */}}>
                    <Text style={styles.buttonText}>Quiz beitreten</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#222',
        paddingTop: 50,
    },
    title1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    bottomSection: {
        marginTop: 150,
        alignItems: 'center',
        width: '100%',
    },
    title3: {
        color: '#bbb',
        marginBottom: 16,
        textAlign: 'center',
        fontSize: 12,
    },
    input: {
        height: 50,
        width: '80%',
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        padding: 10,
        color: '#fff',
        backgroundColor: '#333',
    },
    button: {
        backgroundColor: '#109132',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default JoinQuiz;
