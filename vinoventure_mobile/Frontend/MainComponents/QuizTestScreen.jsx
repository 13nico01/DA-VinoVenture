import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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
            smell: ['MARACUJA', 'JOHANNISBEERE'],
            taste: ['MARZIPAN', 'HASELNUSS'],
            acidity: 'HOCH',
            finish: 'MINERALISCH - FRISCH'
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
            <Text style={styles.title}>Sauvignon Blanc | Scharl Vulkanland 2022</Text>
            <Text style={styles.subtitle}>WEIN 3</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>GERUCH (wähle die 2 richtigen Antworten)</Text>
                {['MARACUJA', 'TOMATENRISPEN (STIELE)', 'PAPRIKA', 'JOHANNISBEERE'].map(answer =>
                    renderOption('smell', answer)
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>GESCHMACK (wähle die 2 richtigen Antworten)</Text>
                {['MARZIPAN', 'RAUCHIG', 'HASELNUSS', 'ROTE RÜBEN (ERDIG)'].map(answer =>
                    renderOption('taste', answer)
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>SÄURE (wähle die richtige Antwort)</Text>
                {['WENIG', 'HOCH'].map(answer => renderOption('acidity', answer))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ABGANG (wähle die richtige Antwort)</Text>
                {['VOLLMUNDIG - CREMIG', 'MINERALISCH - FRISCH'].map(answer => renderOption('finish', answer))}
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
