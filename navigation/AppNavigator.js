import React, { useEffect, useState, useRef }from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../constants/theme';

import LoginScreen from '../screens/Login/LoginScreen';
import MainScreen from '../screens/Tabs/MainScreen';
import RegistrationScreen from '../screens/Register/RegistrationScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen 
                    name="Main" 
                    component={MainScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }}
                />
                
                <Stack.Screen 
                    name="Register" 
                    component={RegistrationScreen} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
