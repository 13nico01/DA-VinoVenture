import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import Login from "./Frontend/Login/Login";
import Registry from "./Frontend/Login/Registry";
import QrCodeScreen from "./Frontend/MainComponents/QrCodeScreen";
import StartScreen from "./Frontend/MainComponents/StartScreen";
import QuizTestScreen from "./Frontend/MainComponents/QuizTestScreen";
import JoinQuizScreen from "./Frontend/MainComponents/JoinQuizScreen";
import QuizJsonTestScreen from "./Frontend/MainComponents/QuizJsonTestScreen";


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#109132' }, // Hintergrundfarbe der Navigationsleiste
                headerTintColor: '#fff', // Textfarbe der Navigationsleiste
                headerTitleStyle: { fontWeight: 'bold' }, // Textstil
            }}
        >
            <Stack.Screen name="Startscreen" component={StartScreen}/>
            <Stack.Screen name="JoinQuiz" component={JoinQuizScreen}/>
            {/*<Stack.Screen name="Test" component={QuizJsonTestScreen}/>*/}
            <Stack.Screen name= "Quiz" component={QuizTestScreen}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Registry" component={Registry}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;