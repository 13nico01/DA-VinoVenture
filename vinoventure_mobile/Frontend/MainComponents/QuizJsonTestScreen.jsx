import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import quizData from './QuizTest.json'; // Importiere die Daten aus Test.json

const QuizTestScreen = () => {
    const [selectedAnswers, setSelectedAnswers] = useState({
        smell: [],
        taste: [],
        acidity: '',
        finish: ''
    });

    const [showPoints, setShowPoints] = useState(false);
    const [points, setPoints] = useState(0);

    const toggleAnswer = (category, answer) => {
        if (showPoints) return; // Blockiert Änderungen nach Punkteberechnung

        setSelectedAnswers(prev => {
            if (category === 'smell' || category === 'taste') {
                const currentAnswers = prev[category];
                const isSelected = currentAnswers.includes(answer);
                if (isSelected) {
                    return {
                        ...prev,
                        [category]: currentAnswers.filter(a => a !== answer)
                    };
                } else if (currentAnswers.length < 2) {
                    return {
                        ...prev,
                        [category]: [...currentAnswers, answer]
                    };
                }
            } else {
                return { ...prev, [category]: answer };
            }
            return prev;
        });
    };

    const calculatePoints = (answers) => {
        const correctAnswers = {
            smell: Object.entries(quizData.quiz.smell)
                .filter(([key, value]) => value)
                .map(([key]) => key),
            taste: Object.entries(quizData.quiz.taste)
                .filter(([key, value]) => value)
                .map(([key]) => key),
            acidity: Object.entries(quizData.quiz.acidity)
                .find(([key, value]) => value)?.[0],
            finish: Object.entries(quizData.quiz.finish)
                .find(([key, value]) => value)?.[0]
        };

        let points = 0;

        if (JSON.stringify(answers.smell.sort()) === JSON.stringify(correctAnswers.smell.sort())) {
            points += 2;
        }
        if (JSON.stringify(answers.taste.sort()) === JSON.stringify(correctAnswers.taste.sort())) {
            points += 2;
        }
        if (answers.acidity === correctAnswers.acidity) {
            points += 1;
        }
        if (answers.finish === correctAnswers.finish) {
            points += 1;
        }

        return points;
    };

    const handleCalculatePoints = () => {
        const calculatedPoints = calculatePoints(selectedAnswers);
        setPoints(calculatedPoints);
        setShowPoints(true); // Sperrt Änderungen

        // JSON generieren und in der Konsole ausgeben
        generateQuizJSON(selectedAnswers, calculatedPoints);
    };

    const generateQuizJSON = (answers, points) => {
        const quizData = {
            answers,
            points
        };
        console.log(JSON.stringify(quizData, null, 2)); // JSON in der Konsole ausgeben
    };

    const renderOption = (category, answer) => (
        <TouchableOpacity
            key={answer}
            style={[
                styles.option,
                selectedAnswers[category]?.includes(answer) || selectedAnswers[category] === answer
                    ? styles.selectedOption
                    : null
            ]}
            onPress={() => toggleAnswer(category, answer)}
        >
            <Text style={styles.optionText}>{answer}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{quizData.wineName}</Text>
            <Text style={styles.subtitle}>WEIN {quizData.wineId}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>GERUCH (wähle die 2 richtigen Antworten)</Text>
                {Object.keys(quizData.quiz.smell).map(answer =>
                    renderOption('smell', answer)
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>GESCHMACK (wähle die 2 richtigen Antworten)</Text>
                {Object.keys(quizData.quiz.taste).map(answer =>
                    renderOption('taste', answer)
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>SÄURE (wähle die richtige Antwort)</Text>
                {Object.keys(quizData.quiz.acidity).map(answer => renderOption('acidity', answer))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ABGANG (wähle die richtige Antwort)</Text>
                {Object.keys(quizData.quiz.finish).map(answer => renderOption('finish', answer))}
            </View>
            <View>
                <Text style={styles.footer}>(antworten sind nach dem berechnen nicht mehr änderbar)</Text>

                <TouchableOpacity style={styles.calculateButton} onPress={handleCalculatePoints}>
                    <Text style={styles.calculateButtonText}>Punkte berechnen</Text>
                </TouchableOpacity>
                {showPoints && (
                    <Text style={styles.footer}>Punkteanzahl: {points}</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        padding: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
        color: '#fff',
    },
    section: {
        marginBottom: 16
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
    },
    option: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 8,
        alignItems: 'center'
    },
    selectedOption: {
        backgroundColor: '#109132',
        borderColor: '#109132'
    },
    optionText: {
        color: '#fff',
        fontSize: 14
    },
    calculateButton: {
        backgroundColor: '#109132',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    calculateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        color: '#fff',
    }
});

export default QuizTestScreen;
