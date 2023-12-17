import React from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, Image, StatusBar } from 'react-native';
import { COLORS } from '../../constants/theme';
import styles from './header.style';

const HeaderTab = ({ userInfo }) => {
  return (
    <View style={[styles.container, { marginTop: -StatusBar.currentHeight }]}>
        <View style={styles.profileImageContainer}>
            <Image
                source={require('../../assets/profiles/nurse.png')}
                resizeMode='cover'
                style={{ width : 60, height: 60 }}
            />
        </View>
        <View style={{ marginLeft: 10 }}>
            <Text style={styles.headerText}>Welcome, back!</Text>
            {/* <Text style={styles.headerTextName}>{userInfo.firstname} {userInfo.lastname}</Text> */}
        </View>
        <TouchableOpacity style={styles.menuContainer}>
            <View>
                <Feather
                    name="menu"
                    size={20}
                    color={COLORS.lightWhite}
                />
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default HeaderTab