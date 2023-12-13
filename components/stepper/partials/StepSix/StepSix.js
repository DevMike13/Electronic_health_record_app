import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './stepSix.style';
import { RadioButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { getLocations, storeStudentInfo, storeAnswers1to3, storeAnswers4to9, storeAnswersTo10, updateLocation,listTables, createStudentsTable, createAnswersTable } from '../../../../utils/DatabaseHelper';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

const StepSix = ({ studentInfo, answers1to3, answers4to9, answersTo10, setStep }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Fetch locations when the component mounts
    fetchLocations();

  }, []);

  const fetchLocations = () => {
    getLocations((locationsArray) => {
      setLocations(locationsArray);
    });
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    console.log(studentInfo)
  };

  const onSubmit = async () => {
    try {
    
      // Step One: Insert Student Information
      const studentId = await storeStudentInfo(studentInfo);

      // Step Three: Insert Answers for Questions 1-3
      await storeAnswers1to3(studentId, answers1to3);

      // Step Four: Insert Answers for Questions 4-9
      await storeAnswers4to9(studentId, answers4to9);

      // Optional: Insert Answers for Question 10
      // if (answersTo10) {
        await storeAnswersTo10(studentId, answersTo10);
      // }

      // Final Step: Update Location
      await updateLocation(studentId, selectedLocation);

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
      <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, marginBottom: 20 }}>Choose a location:</Text>
      {locations.map((item) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', alignItems: 'center'}} key={item.id}>
          <RadioButton.Item
            value={item.id}
            status={selectedLocation === item.id ? 'checked' : 'unchecked'}
            onPress={() => handleLocationSelect(item.id)}
            color="blue" // Adjust the color based on your design
          />
          <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium }}>{item.name}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  )
}

export default StepSix