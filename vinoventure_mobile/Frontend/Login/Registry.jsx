import React, { useState } from 'react';
import {View, Text, Button, TextInput, Alert, StyleSheet} from "react-native";

const Registry = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return(
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Registry;