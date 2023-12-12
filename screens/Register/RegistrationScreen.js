import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import styles from './registration.style';
import { COLORS, FONT } from '../../constants/theme';

import { createUserTable, insertUser } from '../../utils/DatabaseHelper';

const RegistrationScreen = ({ navigation }) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [userList, setUserList] = useState([]);

    const handleRegister = () => {
        // Validation checks
        if (!firstname || !lastname || !username || !password) {
          // Show a toast message for empty fields
          Toast.show({
            type: 'error',
            text1: 'All fields are required',
            visibilityTime: 3000,
            autoHide: true,
          });
          return;
        }
      
        if (password !== confirmPassword) {
          // Show a toast message for password mismatch
          Toast.show({
            type: 'error',
            text1: 'Passwords do not match',
            visibilityTime: 3000,
            autoHide: true,
          });
          return;
        }
      
        // Initialize the database table (call this only once)
        createUserTable();
      
        // Insert user into the database
        insertUser(firstname, lastname, username, password);
      
        // Reset form fields
        setFirstname('');
        setLastname('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      
        // Show a toast message indicating successful registration
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          visibilityTime: 3000,
          autoHide: true,
        });
      };

      const handleLogin = () => {
        navigation.navigate('Login');
      };
      
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.appTitle}>EHR</Text>
            </View>
            <Text style={styles.appSubTitle}>Register Now!</Text>
        </View>
        <View style={{ width: "90%", marginVertical: 20, paddingLeft: 10, justifyContent: "center", alignItems: "center" }}>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.inInput}
                        placeholder='Firstname'
                        value={firstname}
                        onChangeText={(value) => setFirstname(value)}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.inInput}
                        placeholder='Lastname'
                        value={lastname}
                        onChangeText={(value) => setLastname(value)}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.inInput}
                        placeholder='Username'
                        value={username}
                        onChangeText={(value) => setUsername(value)}
                        
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.inInput}
                        placeholder='Password'
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry={true}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.inInput}
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                        secureTextEntry={true}
                    />
                </View>
            </View>
            
                <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
                    <Text style={styles.loginBtnText}>Register</Text>
                </TouchableOpacity>
          
                <Text style={{ textAlign: "center", alignItems: "center", fontFamily: FONT.regular }}>
                    Already a member?{' '}
                  <Text style={{ textDecorationLine: 'underline', color: "#277df8", fontFamily: FONT.regular }} onPress={handleLogin}>Login</Text>{' '}
              </Text>
        </View>
        <Toast position="top"/>
    </SafeAreaView>
  )
}

export default RegistrationScreen