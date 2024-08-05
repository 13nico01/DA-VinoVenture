import React, { useState } from 'react';
import {View, Text, Button, TextInput, Alert, StyleSheet} from "react-native";

const Registry = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Registrierung</Text>
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
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder={'confirm password'}
                value={password}
                placeholderTextColor={'#bbb'}
                onChangeText={(text) => setPassword(text)}
            />
        </View>
    );
}

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
});

export default Registry;