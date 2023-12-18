import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'react-native-paper';
import styles from './stepFive.style';
import Toast from 'react-native-toast-message';
import { getLocations, storeStudentInfo, storeAnswers1to3, storeAnswers4to9, storeAnswersTo10, updateLocation,listTables, createStudentsTable, createAnswersTable } from '../../../../utils/DatabaseHelper';

const StepFive = ({ studentInfo, answers1to3, answers4to9, answersTo10, setStep, onStepComplete }) => {

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

  const onSubmit = async () => {
    const answersTo10 = {
      mentalHealthConditions
    }
    onStepComplete('answersTo10', answersTo10);
    try {
    
      // Step One: Insert Student Information
      const studentId = await storeStudentInfo(studentInfo);

      // Step Three: Insert Answers for Questions 1-3
      await storeAnswers1to3(studentId, answers1to3);

      // Step Four: Insert Answers for Questions 4-9
      await storeAnswers4to9(studentId, answers4to9);

      // Optional: Insert Answers for Question 10
      // if (Object.keys(mentalHealthConditions).length > 0) {
        await storeAnswersTo10(studentId, answersTo10);
      // }

      // Final Step: Update Location
      // await updateLocation(studentId, selectedLocation);

      // Navigate to the next screen or perform any other actions upon successful submission
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success!',
        text2: 'Added record succesfully',
        visibilityTime: 3000,
      });

      setTimeout(() => {
        setStep(1);
      }, 3500);
      
      console.log('insert success');
      console.log('Student ID:', studentId);

    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle errors appropriately, e.g., show an error message to the user
    }
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

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <Toast />
      </ScrollView>
    </View>
  )
}

export default StepFive