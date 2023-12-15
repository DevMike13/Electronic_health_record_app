import React from 'react'
import { Ionicons, Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home/Home';
import Questionnaire from './Questionnaire/Questionnaire';
import ExcelScreen from './Excel/ExcelScreen';
import List from './List/List';

import { COLORS, FONT, SIZES } from '../../constants/theme';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
        <Tab.Navigator 
          screenOptions={{
            tabBarStyle: {
              height: 90,
              paddingTop: 10,
              paddingBottom: 10,
              marginBottom: 30,
              marginHorizontal: 15,
              borderRadius: 100,
              position: 'absolute',
              backgroundColor: '#fbfaff'
            },
          }}
        >
            <Tab.Screen 
              name="Home" 
              component={Home} 
              options={{
                tabBarLabel: (tabInfo) => {
                  return (
                    <Text
                      style={{ 
                        color: tabInfo.focused ? COLORS.blue : '#fbfaff', 
                        fontFamily: tabInfo.focused ? FONT.bold : FONT.regular, 
                        fontSize: SIZES.xLarge
                      }}
                    >
                      •
                    </Text>
                  );
                },
                tabBarIcon: (iconInfo) => {
                  return (
                    <Feather
                      name={iconInfo.focused ? "home" : 'home'}
                      size={iconInfo.focused ? 30 : 24}
                      color={iconInfo.focused ? COLORS.blue : COLORS.gray4}
                      style={{marginBottom: -25}}
                    />
                  );
                },
                headerTitle: "",
                headerStyle:{
                  backgroundColor:COLORS.lightWhite,
                },
                headerShown: false,
                headerShadowVisible: false
              }}
            />

            <Tab.Screen 
              name="Questionnaire" 
              component={Questionnaire} 
              options={{
                tabBarLabel: (tabInfo) => {
                  return (
                    <Text
                      style={{ 
                        color: tabInfo.focused ? COLORS.blue : '#fbfaff', 
                        fontFamily: tabInfo.focused ? FONT.bold : FONT.regular,
                        fontSize: SIZES.xLarge
                      }}
                    >
                      •
                    </Text>
                  );
                },
                tabBarIcon: (iconInfo) => {
                  return (
                    <Feather
                      name={iconInfo.focused ? "clipboard" : 'clipboard'}
                      size={iconInfo.focused ? 30 : 24}
                      color={iconInfo.focused ? COLORS.blue : COLORS.gray4}
                      style={{marginBottom: -25}}
                    />
                  );
                },
                headerTitle: "",
                headerStyle:{
                  backgroundColor:COLORS.lightWhite,
                },
                headerShadowVisible: false,
                headerShown: false,
              }}
            />

            <Tab.Screen 
              name="Excel" 
              component={ExcelScreen} 
              options={{
                tabBarLabel: (tabInfo) => {
                  return (
                    <Text
                      style={{ 
                        color: tabInfo.focused ? COLORS.blue : '#fbfaff', 
                        fontFamily: tabInfo.focused ? FONT.bold : FONT.regular,
                        fontSize: SIZES.xLarge
                      }}
                    >
                      •
                    </Text>
                  );
                },
                tabBarIcon: (iconInfo) => {
                  return (
                    <Feather
                      name={iconInfo.focused ? "paperclip" : 'paperclip'}
                      size={iconInfo.focused ? 30 : 24}
                      color={iconInfo.focused ? COLORS.blue : COLORS.gray4}
                      style={{marginBottom: -25}}
                    />
                  );
                },
                headerTitle: "",
                headerStyle:{
                  backgroundColor:COLORS.lightWhite,
                },
                headerShadowVisible: false,
                headerShown: false,
              }}
            />

            <Tab.Screen 
              name="List" 
              component={List} 
              options={{
                tabBarLabel: (tabInfo) => {
                  return (
                    <Text
                      style={{ 
                        color: tabInfo.focused ? COLORS.blue : '#fbfaff', 
                        fontFamily: tabInfo.focused ? FONT.bold : FONT.regular,
                        fontSize: SIZES.xLarge
                      }}
                    >
                      •
                    </Text>
                  );
                },
                tabBarIcon: (iconInfo) => {
                  return (
                    <Feather
                      name={iconInfo.focused ? "archive" : 'archive'}
                      size={iconInfo.focused ? 30 : 24}
                      color={iconInfo.focused ? COLORS.blue : COLORS.gray4}
                      style={{marginBottom: -25}}
                    />
                  );
                },
                headerTitle: "",
                headerStyle:{
                  backgroundColor:COLORS.lightWhite,
                },
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
        </Tab.Navigator>
    </View>
  )
}

export default MainScreen