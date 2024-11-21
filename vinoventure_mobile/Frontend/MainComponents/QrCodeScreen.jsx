import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function QrCodeScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [qrData, setQrData] = useState(null);

    let cameraRef = React.useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setQrData(data);
        alert(`QR Code gescannt! Type: ${type}, Data: ${data}`);
    };

    if (hasPermission === null) {
        return <Text>Warten auf Berechtigungen...</Text>;
    }

    if (hasPermission === false) {
        return <Text>Keine Berechtigung für Kamera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeScannerSettings={{
                    barCodeTypes: [Camera.Constants.BarCodeType.qr],
                }}
                ref={cameraRef}
            />
            {scanned && (
                <View style={styles.buttonContainer}>
                    <Button title={'Scan wiederholen'} onPress={() => setScanned(false)} />
                </View>
            )}
            {qrData && <Text style={styles.qrData}>QR Data: {qrData}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
    },
    qrData: {
        position: 'absolute',
        bottom: 100,
        color: 'white',
        fontSize: 16,
    },
});
