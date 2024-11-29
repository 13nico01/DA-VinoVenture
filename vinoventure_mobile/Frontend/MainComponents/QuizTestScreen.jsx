import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';

const QuizTestScreen = ({ route }) => {
    const { wineId } = route.params; // Wine-ID aus Navigation
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch(`http://vinoventure-frontend.s3-website.eu-north-1.amazonaws.com/getQuizData/${wineId}`);
                const data = await response.json();
                if (response.ok) {
                    setQuizData(data);
                } else {
                    Alert.alert('Fehler', 'Quizdaten konnten nicht geladen werden.');
                }
            } catch (error) {
                Alert.alert('Fehler', 'Serververbindung fehlgeschlagen.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [wineId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#109132" />
                <Text style={styles.loadingText}>Laden...</Text>
            </View>
        );
    }

    if (!quizData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Keine Daten verfügbar</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{quizData.wineName}</Text>
            {/* Dein existierender Code für Quizfragen */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    loadingText: {
        marginTop: 8,
        color: '#fff',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    errorText: {
        color: '#fff',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#fff',
    },
});

export default QuizTestScreen;
