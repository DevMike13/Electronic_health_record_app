import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'react-native-paper';
import styles from './stepFive.style';


const StepFive = ({ setStep, onStepComplete }) => {

  const [mentalHealthConditions, setMentalHealthConditions] = useState({
    excessiveStress: false,
    excessiveDreadOrFear: false,
    anxiety: false,
    experiencingDepression: false,
    troubleSleeping: false,
    lackOfInterest: false,
    lossOfAttention: false,
    thinkingAboutHurtingHimself: false,
  });

  // useEffect(() => {
  //   console.log('Mental Health Conditions:', mentalHealthConditions);
  // }, [mentalHealthConditions]);
  
  const handleCheckboxChange = (condition) => {
    setMentalHealthConditions((prevConditions) => ({
      ...prevConditions,
      [condition]: !prevConditions[condition],
    }));
  };

  const handleNext = () => {
    // Assuming you have a callback function to pass data back to the parent component
    const answersTo10 = {
      mentalHealthConditions
    };

    // Call the callback function to pass the data to the parent component (Stepper)
    onStepComplete('answersTo10', answersTo10);

    // Move to the next step
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>THIRD PART. PAST MENTAL HEALTH</Text>
          <Text style={styles.subHeaderText}>Check the box if your children experience the following:</Text>
        </View>

        {/* QUESTION 10 */}
        <View style={styles.questionContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={mentalHealthConditions.excessiveStress ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('excessiveStress')}
            />
            <Text>Excessive stress</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={mentalHealthConditions.excessiveDreadOrFear ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('excessiveDreadOrFear')}
            />
            <Text>Excessive dread or fear</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={mentalHealthConditions.anxiety ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('anxiety')}
            />
            <Text>Anxiety</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={mentalHealthConditions.experiencingDepression ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('experiencingDepression')}
            />
            <Text>Experiencing depression</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={mentalHealthConditions.troubleSleeping ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('troubleSleeping')}
            />
            <Text>Trouble sleeping</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={mentalHealthConditions.lackOfInterest ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('lackOfInterest')}
            />
            <Text>Lack of interest in studies or work</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={mentalHealthConditions.lossOfAttention ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('lossOfAttention')}
            />
            <Text>Loss of attention or focus on the task</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={mentalHealthConditions.thinkingAboutHurtingHimself ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('thinkingAboutHurtingHimself')}
            />
            <Text>Thinking about hurting himself</Text>
          </View>
        </View>

         {/* Add a button to indicate completion of this step */}
         <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default StepFive