import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './stepTwo.style';
import { FONT } from '../../../../constants/theme';


const StepTwo = ({ setStep }) => {
  const handleNext = () => {
    // Move to the next step
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ width: '100%', height: '100%', gap: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: FONT.regular, fontSize: 16 }}><Text style={{ fontFamily: FONT.bold, fontSize: 16 }}>Instruction: </Text>
          For selected DepEd school nurses check (/) the boxes if the following common health problems are present in the child's body. All information written on this paper will remain private. Be honest in marking. 
        </Text>

        <Text style={{ fontFamily: FONT.regular, fontSize: 16 }}><Text style={{ fontFamily: FONT.bold, fontSize: 16 }}>Purpose: </Text>
          The collected information can be used by the School Health Section of the Department of Education to create a corresponding health program according to the common health problems experienced by our students.
        </Text>
        {/* Add a button to indicate completion of this step */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default StepTwo