
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProgramList from "./ProgramList";
import ProgramDetail from "./ProgramDetail";
import store from "./store";
import Provider from "react-redux/lib/components/Provider";

const Stack = createStackNavigator();

function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="ProgramList" component={ProgramList}/>
                    <Stack.Screen name="ProgramDetail" component={ProgramDetail}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;
