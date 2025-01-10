import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const FIXED_WINE_ID = 3; // Feste ID für die Tests

const QuizTestScreen = () => {
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get(`https://vino-venture.com/3000/api/quiz/getAnswers/3`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.status === 200) {
                    setQuizData(response.data);
                }
                else if (response.status === 404) {
                    Alert.alert('Fehler', '404 not found');
                } else {
                    Alert.alert('Fehler', 'Quizdaten konnten nicht geladen werden.');
                }


            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Serververbindung fehlgeschlagen.';
                Alert.alert('Fehler', errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, []);

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
            <View>
                <Text style={styles.sectionTitle}>Smell:</Text>
                {Object.entries(quizData.quiz.smell).map(([key, value]) => (
                    <Text key={key} style={styles.item}>
                        {key}: {value ? 'Ja' : 'Nein'}
                    </Text>
                ))}
            </View>
            <View>
                <Text style={styles.sectionTitle}>Taste:</Text>
                {Object.entries(quizData.quiz.taste).map(([key, value]) => (
                    <Text key={key} style={styles.item}>
                        {key}: {value ? 'Ja' : 'Nein'}
                    </Text>
                ))}
            </View>
            {/* Füge weitere Abschnitte wie acidity und finish hinzu */}
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
    sectionTitle: {
        fontSize: 18,
        color: '#fff',
        marginTop: 16,
        marginBottom: 8,
    },
    item: {
        color: '#bbb',
        fontSize: 14,
        marginBottom: 4,
    },
});

export default QuizTestScreen;
