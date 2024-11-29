import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>VinoVenture</Text>
            <Text style={styles.title2}>In deinen Account einloggen</Text>
            <Text style={styles.title3}>Gib deine email und dein Passwort</Text>
            <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor="#bbb"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                secureTextEntry
                value={password}
                placeholderTextColor="#bbb"
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={() => {/* Handle login logic */}}>
                <Text style={styles.buttonText}>Einloggen</Text>
            </TouchableOpacity>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registry')}>
                <Text style={styles.buttonText}>Noch keinen Account?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#222', // Dunkler Hintergrund
        paddingTop: 50,
    },
    title1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Weiße Schrift
        marginBottom: 16,
    },
    title2: {
        fontSize: 16,
        color: '#fff', // Weiße Schrift
        marginTop: 150,
        marginBottom: 16,
    },
    title3: {
        color: '#bbb', // Hellere Schrift
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 50,
        width: '80%',
        borderColor: '#555', // Anpassung an dunkles Thema
        borderWidth: 1,
        borderRadius: 8, // Abgerundete Ecken
        marginBottom: 16,
        padding: 10,
        color: '#fff', // Weiße Eingabetextfarbe
        backgroundColor: '#333', // Dunkler Hintergrund für das Eingabefeld
    },
    button: {
        backgroundColor: '#109132', // Grüner Button
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // Weiße Schrift
        fontSize: 16,
        fontWeight: 'bold',
    },
    spacer: {
        height: 20, // Abstand zwischen den Buttons
    },
});

export default Login;
