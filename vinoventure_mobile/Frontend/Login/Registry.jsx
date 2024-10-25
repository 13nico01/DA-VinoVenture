import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const Registry = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');  // Username hinzufügen
    const [choosenDate, setChoosenDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    // Funktion zum Handhaben des Datums und zum Verbergen des Pickers
    const handleConfirmDate = (event, selectedDate) => {
        if (selectedDate) {
            setChoosenDate(selectedDate); // Wähle das Datum
        }
        if (Platform.OS === 'android') {
            setShowPicker(false); // Android schließt den Dialog automatisch
        }
    };

    const showDatePicker = () => {
        setShowPicker(true); // Picker anzeigen
    };

    // Registrierungshandling
    const registerUser = async () => {
        if (password !== confirmPassword) {
            return Alert.alert("Fehler", "Passwörter stimmen nicht überein");
        }

        try {
            const response = await fetch("http://172.20.10.2:3000/api/users/signup", {  // Endpunkt anpassen, falls erforderlich
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    username,
                    password,
                    email,
                    birthdate: choosenDate.toISOString().substring(0, 10),
                }),
            });

            if (response.ok) {
                const data = await response.json();
                Alert.alert("Erfolg", data.message);
                navigation.navigate("Login"); // Navigiere zur Login-Seite
            } else {
                const errorData = await response.json();
                Alert.alert("Fehler", errorData.error || "Registrierung fehlgeschlagen");
            }
        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
            Alert.alert("Fehler", "Serverfehler. Bitte später erneut versuchen.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create new Account</Text>
            <TextInput
                style={styles.input}
                placeholder={'Vorname'}
                value={firstname}
                placeholderTextColor={'#bbb'}
                onChangeText={(text) => setFirstname(text)}
            />
            <TextInput
                style={styles.input}
                placeholder={'Nachname'}
                value={lastname}
                placeholderTextColor={'#bbb'}
                onChangeText={(text) => setLastname(text)}
            />
            <TextInput
                style={styles.input}
                placeholder={'Username'}
                value={username}
                placeholderTextColor={'#bbb'}
                onChangeText={(text) => setUsername(text)}
            />

            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>Geburtsdatum auswählen</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={choosenDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'default' : 'default'}
                    onChange={handleConfirmDate}
                    maximumDate={new Date()}
                    style={styles.datePicker}
                />
            )}
            <Text style={styles.dateText}>Geburtsdatum: {choosenDate.toISOString().substring(0, 10)}</Text>

            <TextInput
                style={styles.input}
                placeholder={'email@example.com'}
                value={email}
                placeholderTextColor={'#bbb'}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder={'password'}
                value={password}
                placeholderTextColor={'#bbb'}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder={'confirm password'}
                value={confirmPassword}
                placeholderTextColor={'#bbb'}
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
            />

            <TouchableOpacity onPress={registerUser} style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
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
    dateButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    dateButtonText: {
        color: 'white',
        fontSize: 16,
    },
    dateText: {
        fontSize: 16,
        marginTop: 10,
    },
    registerButton: {
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Registry;
