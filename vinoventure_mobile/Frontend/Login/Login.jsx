import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from "react-native";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch("http://172.20.10.2:3000/api/user-login/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Erfolg", data.message);
                // Weiterleitung oder Navigation nach erfolgreichem Login
            } else {
                Alert.alert("Fehler", data.error || "Login fehlgeschlagen");
            }
        } catch (error) {
            console.error("Fehler beim Login:", error);
            Alert.alert("Fehler", "Es gab ein Problem mit der Verbindung.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>VinoVenture</Text>
            <Text style={styles.title2}>Log into your Account</Text>
            <Text style={styles.title3}>Fill in the credentials to log into your account</Text>
            <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor={'#bbb'}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                secureTextEntry
                value={password}
                placeholderTextColor={'#bbb'}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="No Account?" onPress={() => navigation.navigate('Registry')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    title1: {
        fontSize: 24,
        marginBottom: 16,
    },
    title2: {
        marginTop: 150,
        fontSize: 16,
        marginBottom: 16,
    },
    title3: {
        marginBottom: 16,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
});

export default Login;
