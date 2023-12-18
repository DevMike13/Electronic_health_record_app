import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, TextInput, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import styles from './stepOne.style';
import Toast from 'react-native-toast-message';
import { COLORS, SIZES, FONT, SHADOWS } from '../../../../constants/theme';
import { SelectList } from 'react-native-dropdown-select-list';

import { getLocations } from '../../../../utils/DatabaseHelper';

const StepOne = ({ onStepComplete, setStep }) => {

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gender, setGender] = useState('male');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    DOA: selectedDate,
    gender: gender,
    address: '',
    school_name: '',
    grade: '',
    LRN: '',
    location_id: selectedLocation
  });

  useEffect(() => {
    
    getLocations((locationsData) => {
      // Handle the locationsData here
      setLocations(locationsData);
    });

  }, []); 
  
  const barangays = {
    '1' : [
      {key: '1', value: 'Brgy. Zone 1, Agdangan Quezon'},
      {key: '2', value: 'Brgy. Zone 2, Agdangan Quezon'},
      {key: '3', value: 'Brgy. Zone 3, Agdangan Quezon'}
    ],
    '2' : [
      {key: '1', value: 'Brgy. Mamala 1, Plaridel Quezon'},
      {key: '2', value: 'Brgy. Mamala 2, Plaridel Quezon'},
      {key: '3', value: 'Brgy. Mamala 3, Plaridel Quezon'}
    ]
  }

  const schools = {
    '1' : [
      {key: '1', value: 'Agdangan National Elementary School'},
      {key: '2', value: 'Del Carmen Elementary School'},
      {key: '3', value: 'St. Jude Elementary School'}
    ],
    '2' : [
      {key: '1', value: 'Plaridel National Elementary School'},
      {key: '2', value: 'Sto. Domingo Elementary School'},
      {key: '3', value: 'Integrated Elementary School'}
    ]
  }
  
  const grades = [
    {key: '1', value: '1'},
    {key: '2', value: '2'},
    {key: '3', value: '3'},
    {key: '4', value: '4'},
    {key: '5', value: '5'},
    {key: '6', value: '6'},
  ]
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
        DOA: selected,
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
    if (!formData.firstname || !formData.lastname || !formData.address || !formData.school_name || !formData.grade || !formData.LRN) {
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
            <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.medium, marginRight: 'auto'}}>Date of Assessment: </Text>
            <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.medium }}>
              {formData.DOA.toLocaleDateString()}
            </Text>
            <Feather
              name="calendar"
              size={24}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.DOA}
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

        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
          <SelectList
            setSelected={(selectedValue) => {
              // Log the selected ID here
              const selectedId = parseInt(selectedValue);
              setSelectedLocation(selectedId);
              setFormData((prevData) => ({
                ...prevData,
                location_id: selectedId,
              }));
            }}
            placeholder='Select District'
            data={locations.map(location => ({ key: location.id.toString(), value: location.name }))}
            save="key"
          />
        </View> 

        <View style={{ position: 'relative', width: '90%', alignSelf: 'center', marginTop: 20 }}>
          {/* SelectList */}
          <SelectList
            setSelected={(value) => {
              setSelectedBarangay(value);
              setFormData((prevData) => ({
                ...prevData,
                address: value,
              }));
            }}
            placeholder='Select Address'
            data={barangays[selectedLocation]}
            save="value"
          />
          
          {/* Transparent overlay */}
          {selectedLocation === '' && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(128, 128, 128, 0.5)', // Adjust the background color as needed
                borderRadius: 10,
                zIndex: 2, // Ensure it's above the SelectList
              }}
            />
          )}
        </View>


        <View style={{ position: 'relative', width: '90%', alignSelf: 'center', marginTop: 20 }}>
          <SelectList
            setSelected={(value) => {
              setSelectedSchool(value);
              setFormData((prevData) => ({
                ...prevData,
                school_name: value,
              }));
            }}
            placeholder='Select School'
            data={schools[selectedLocation]}
            save="value"
          />
          {/* Transparent overlay */}
          {selectedLocation === '' && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(128, 128, 128, 0.5)', // Adjust the background color as needed
                borderRadius: 10,
                zIndex: 2, // Ensure it's above the SelectList
              }}
            />
          )}
        </View>  
        
        <View style={{ width: '90%' , alignSelf: 'center', marginTop: 20 }}>
          <SelectList
            setSelected={(value) => {
              setSelectedGrade(value);
              setFormData((prevData) => ({
                ...prevData,
                grade: value,
              }));
            }}
            placeholder='Select Grade'
            data={grades}
            save="value"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inInput}
              placeholder='LRN'
              value={formData.LRN}
              onChangeText={(text) => handleInputChange('LRN', text)}
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