import React, {useState} from 'react';
import {View, Text, Button, TextInput, Alert, StyleSheet} from "react-native";

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>VinoVenture</Text>
            <Text style={styles.title2}>Log into your Account</Text>
            <Text style={styles.title3}>Fill in the credentials to log into your account</Text>
            <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor = {'#bbb'}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                secureTextEntry
                value={password}
                placeholderTextColor = {'#bbb'}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Login"/>
            <Button title="No Account?" onPress={() => navigation.navigate('Registry')}/>
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
    title2:{
        marginTop: 150,
      fontSize: 16,
      marginBottom: 16,
    },
    title3:{
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