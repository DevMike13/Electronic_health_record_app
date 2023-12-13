import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import styles from './stepOne.style';
import Toast from 'react-native-toast-message';
import { COLORS, SIZES, FONT, SHADOWS } from '../../../../constants/theme';


const StepOne = ({ onStepComplete, setStep }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gender, setGender] = useState('male');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    birthdate: selectedDate,
    gender: gender,
    address: '',
    school_name: '',
    grade: '',
    adviser_name: '',
  });

  const handleGenderChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  const handleDateChange = (event, selected) => {
    if (selected) {
      setFormData((prevData) => ({
        ...prevData,
        birthdate: selected,
      }));
      setShowDatePicker(false);
    } else {
      setShowDatePicker(false);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleStepComplete = () => {

    // Validate fields
    if (!formData.firstname || !formData.lastname || !formData.address || !formData.school_name || !formData.grade || !formData.adviser_name) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Validation Error',
        text2: 'All fields are required.',
        visibilityTime: 3000,
      });
      return;
    }

    onStepComplete('studentInfo', formData);
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inInput}
              placeholder='Firstname'
              value={formData.firstname}
              onChangeText={(text) => handleInputChange('firstname', text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inInput}
              placeholder='Lastname'
              value={formData.lastname}
              onChangeText={(text) => handleInputChange('lastname', text)}
            />
          </View>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={toggleDatePicker} style={{ backgroundColor: COLORS.white, paddingHorizontal: 50, paddingVertical: 15, flexDirection: "row", gap: 15, borderRadius: SIZES.small, alignItems: "center", justifyContent: 'center' }}>
            <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.medium, marginRight: 'auto'}}>Birthdate: </Text>
            <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.medium }}>
              {formData.birthdate.toLocaleDateString()}
            </Text>
            <Feather
              name="calendar"
              size={24}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.birthdate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.genderContainer}>
          <Text>Select gender: </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.gray2, paddingHorizontal: 10, borderRadius: 50 }}>
              <RadioButton
                value="male"
                status={formData.gender === 'male' ? 'checked' : 'unchecked'}
                onPress={() => handleGenderChange('male')}
              />
              <Text>Male</Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.gray2, paddingHorizontal: 10, borderRadius: 50 }}>
              <RadioButton
                value="female"
                status={formData.gender === 'female' ? 'checked' : 'unchecked'}
                onPress={() => handleGenderChange('female')}
              />
              <Text>Female</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inInput}
              placeholder='Address'
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
            />
          </View>
        </View>
      
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inInput}
              placeholder='School Name'
              value={formData.school_name}
              onChangeText={(text) => handleInputChange('school_name', text)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inInput}
              placeholder='Grade'
              value={formData.grade}
              onChangeText={(text) => handleInputChange('grade', text)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inInput}
              placeholder='Adviser Name'
              value={formData.adviser_name}
              onChangeText={(text) => handleInputChange('adviser_name', text)}
            />
          </View>
        </View>

        {/* Add a button to indicate completion of this step */}
        <TouchableOpacity style={styles.button} onPress={handleStepComplete}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default StepOne;