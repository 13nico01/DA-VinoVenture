// Diesen Scren brauchen wir warscheinlich nicht

import React from 'react';
import { View, Button, StyleSheet, Alert } from "react-native";

const StartScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button
                title="Quiz mit QR-Code starten"
                onPress={() => Alert.alert("Button 1 pressed")}
            />
            <View style={styles.spacer} />
            <Button
                title="mit Code Quiz beitreten"
                onPress={() => Alert.alert("Button 2 pressed")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Zentriert den Inhalt vertikal
        alignItems: 'center', // Zentriert den Inhalt horizontal
        backgroundColor: '#fff',
    },
    spacer: {
        height: 20, // Abstand zwischen den Buttons
    },
});

export default StartScreen;
