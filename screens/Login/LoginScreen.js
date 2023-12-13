import { useState, useEffect, createContext, useContext } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, Modal  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import styles from './login.style';
import { FONT } from '../../constants/theme';

import { getUserByUsernameAndPassword } from '../../utils/LoginHelper';
import { useUser } from '../../UserContext';

const LoginScreen = () => {

  const navigation = useNavigation();
  const { setUserData } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const errorToast = () => {
    //function to make Toast With Duration
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: 'Please check your username and password.',
      visibilityTime: 3000,
    });
  };

  const handleLogin = () => {
    // Validation checks
    if (!username || !password) {
      // Show a toast message for empty fields
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    // Check if the user exists in the database
    getUserByUsernameAndPassword(username, password, (users) => {
      if (users.length > 0) {
        // User exists, navigate to the main screen
        setUserData(users[0]);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        // User does not exist, show an error toast
        errorToast();
      }
    });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Image
              style={{ width: 70, height: 70}}
              source={require('../../assets/fortopicon.png')}
            /> */}
             <Text style={styles.appTitle}>Welcome Back!</Text>
          </View>
          <Text style={styles.appSubTitle}>Please enter your account here</Text>
        </View>
        <View style={styles.contentContainer}>
            <View style={{ width: "90%"}}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.inInput}
                          placeholder='Username'
                          value={username}
                          onChangeText={setUsername}
                          keyboardType="email-address"
                          textContentType='emailAddress'
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.inInput}
                          placeholder='Password'
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry={true}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "90%"}}>
              <Text style={{ justifyContent: "center", alignItems: "center", fontFamily: FONT.regular}}>Forgot password? </Text>
              <TouchableOpacity style={{ justifyContent: "center", alignItems: "center"}} ><Text style={{ justifyContent: "center", alignItems: "center", textDecorationLine: "underline", color: "#277df8", fontFamily: FONT.regular }}>Reset it here</Text></TouchableOpacity>
            </View>
            <View style={styles.divider}>
                <View style={styles.dividerLineLeft}>

                </View>
                <Text style={styles.dividerLineText}>Or sign in with</Text>
                <View style={styles.dividerLineRight}>

                </View>
            </View>
            <View style={{ width: "90%"}}>
                <View style={styles.regContainer}>
                    <View style={styles.regWrapper}>
                        <Text style={styles.regText}>I don't have an account?</Text>
                    </View>
                    <TouchableOpacity style={styles.regBtn} onPress={handleRegister}>
                        <Text style={styles.regBtnText}>Register Now!</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: "70%" }}>
              <Text style={{ textAlign: "center", alignItems: "center", fontFamily: FONT.regular }}>
                  By signing up you accept the{' '}
                  <Text style={{ textDecorationLine: 'underline', color: "#277df8", fontFamily: FONT.regular }} >Terms of Use</Text>{' '}
                  and Privacy Policy
              </Text>
          </View>
        </View>
        <Toast position="top"/>
    </SafeAreaView>
  )
}

export default LoginScreen