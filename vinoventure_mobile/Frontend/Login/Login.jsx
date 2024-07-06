import React, {useState} from 'react';
import {View, Text, Button, TextInput, Alert, StyleSheet} from "react-native";

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor = {'#bbb'}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                placeholderTextColor = {'#bbb'}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Login"/>
            <Button title="Noch keinen Account?" onPress={() => navigation.navigate('Registry')}/>
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
});

export default Login;