import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Fehler", "Bitte füllen Sie beide Felder aus.");
            return;
        }

        try {
            const response = await fetch('https://vino-venture.com/3000/api/user-login/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username, 
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Erfolg", "Login erfolgreich!");
                navigation.navigate('Quiz'); 
            } else {
                Alert.alert("Fehler", data.message || "Login fehlgeschlagen. Bitte überprüfe deine Daten.");
            }
        } catch (error) {
            Alert.alert("Fehler", "Es gab ein Problem beim Login. Bitte versuche es später erneut.");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>VinoVenture</Text>
            <Text style={styles.title2}>In deinen Account einloggen</Text>
            <Text style={styles.title3}>Gib deinen Benutzernamen und dein Passwort</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#bbb"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                placeholderTextColor="#bbb"
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
        backgroundColor: '#222', 
        paddingTop: 50,
    },
    title1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', 
        marginBottom: 16,
    },
    title2: {
        fontSize: 16,
        color: '#fff', 
        marginTop: 150,
        marginBottom: 16,
    },
    title3: {
        color: '#bbb', 
        marginBottom: 16,
        textAlign: 'center',
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
    spacer: {
        height: 20, 
    },
});


export default Login;
