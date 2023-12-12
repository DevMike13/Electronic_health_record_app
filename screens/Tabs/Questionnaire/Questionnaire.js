import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'react-native-paper';
import styles from './questionnaire.style';

import HeaderTab from '../../../components/header/HeaderTab';
import Stepper from '../../../components/stepper/Stepper';

import { useUser } from '../../../UserContext';
import { COLORS } from '../../../constants/theme';

const Questionnaire = ({ navigation }) => {

  const { user } = useUser();

  return (
    <View style={styles.container}>
      <HeaderTab userInfo={user}/>
      <Stepper />
    </View>
  )
}

export default Questionnaire