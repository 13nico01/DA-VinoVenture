import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const StartScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Quiz mit Code Hosten</Text>
            </TouchableOpacity>
            <View style={styles.spacer} />
            <TouchableOpacity
                style={styles.button}
                onPress={() => Alert.alert("Quiz beitreten")}
            >
                <Text style={styles.buttonText}>Quiz beitreten</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Zentriert den Inhalt vertikal
        alignItems: 'center', // Zentriert den Inhalt horizontal
        backgroundColor: '#222',
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
    spacer: {
        height: 20, // Abstand zwischen den Buttons
    },
});

export default StartScreen;
