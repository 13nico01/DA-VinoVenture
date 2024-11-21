import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Registry = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [choosenDate, setChoosenDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Funktion zum Handhaben des Datums und zum Verbergen des Pickers
  const handleConfirmDate = (event, selectedDate) => {
    if (selectedDate) {
      setChoosenDate(selectedDate); // Wähle das Datum
    }
    if (Platform.OS === "android") {
      setShowPicker(false); // Android schließt den Dialog automatisch
    }
  };

  const showDatePicker = () => {
    setShowPicker(true); // Picker anzeigen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new Account</Text>
      <TextInput
        style={styles.input}
        placeholder={"Vorname"}
        value={firstname}
        placeholderTextColor={"#bbb"}
        onChangeText={(text) => setFirstname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={"Nachname"}
        value={lastname}
        placeholderTextColor={"#bbb"}
        onChangeText={(text) => setLastname(text)}
      />

      {/* Date Picker Button */}
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>Geburtsdatum auswählen</Text>
      </TouchableOpacity>
      {/* DateTimePicker - nur anzeigen, wenn showPicker true ist */}
      {showPicker && (
        <DateTimePicker
          value={choosenDate}
          mode="date"
          display={Platform.OS === "ios" ? "default" : "default"} // Standardanzeige für iOS und Android
          onChange={handleConfirmDate}
          maximumDate={new Date()} // Optional: Maximaldatum auf heute setzen (z.B. für Geburtstagsauswahl)
          style={styles.datePicker} // Picker mit Stil
        />
      )}
      <Text style={styles.dateText}>
        Geburtsdatum: {choosenDate.toISOString().substring(0, 10)}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={"email@example.com"}
        value={email}
        placeholderTextColor={"#bbb"}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={"password"}
        value={password}
        placeholderTextColor={"#bbb"}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={"confirm password"}
        value={confirmPassword}
        placeholderTextColor={"#bbb"}
        onChangeText={(text) => setConfirmPassword(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Weiße Hintergrundfarbe
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  dateButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  dateButtonText: {
    color: "white",
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    marginTop: 10,
  },
  datePicker: {
    backgroundColor: "#fff", // Hintergrundfarbe für den Picker festlegen
    width: "100%",
  },
});

export default Registry;
