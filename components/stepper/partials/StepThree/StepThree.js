import React, { useState, useEffect } from 'react'
import { Ionicons, Feather } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';
import styles from './stepThree.style';
import { COLORS, SIZES, FONT, SHADOWS } from '../../../../constants/theme';

const StepThree = ({ setStep, onStepComplete }) => {

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, selected) => {
    if (selected) {
      setSurgery((prevData) => ({
        ...prevData,
        when: selected,
      }));
      setShowDatePicker(false);
    } else {
      setShowDatePicker(false);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const [allergies, setAllergies] = useState({
    none: false,
    medicine: false,
    food: false,
    pollen: false,
    insectBites: false,
  });

  const [medicalConditions, setMedicalConditions] = useState({
    none: false,
    heartCondition: false,
    hiccups: false,
    eyeProblem: false,
    asthma: false,
    hernia: false,
    others: false,
    otherDetails: '',
  });

  const [surgery, setSurgery] = useState({
    yes: false,
    causesReasons: '',
    no: false,
    when: selectedDate,
  });

  // useEffect(() => {
  //   console.log('Selected Allergies:', allergies);
  // }, [allergies]);

  // useEffect(() => {
  //   console.log('Selected Medical Conditions:', medicalConditions);
  // }, [medicalConditions]);

  // useEffect(() => {
  //   console.log('Selected Surgery:', surgery);
  // }, [surgery]);

  const handleCheckboxChange = (type, key) => {
    if (type === 'allergies') {
      setAllergies((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    } else if (type === 'medicalConditions') {
      setMedicalConditions((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    } else if (type === 'surgery') {
      setSurgery((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const handleOtherDetailsChange = (text) => {
    setMedicalConditions((prev) => ({
      ...prev,
      otherDetails: text,
    }));
  };

  const handleSurgeryDetailsChange = (text, key) => {
    setSurgery((prev) => ({
      ...prev,
      [key]: text,
    }));
  };

  const handleNext = () => {
    // Assuming you have a callback function to pass data back to the parent component
    const answers1to3 = {
      allergies,
      medicalConditions,
      surgery,
    };

    // Call the callback function to pass the data to the parent component (Stepper)
    onStepComplete('answers1to3', answers1to3);

    // Move to the next step
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>FIRST PART. PAST MEDICAL HISTORY AND CONDITION</Text>
        </View>

        {/* QUESTION 1 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Does your child have allergies?</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Checkbox
              status={allergies.none ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('allergies','none')}
            />
            <Text>NONE</Text>
          </View>
          <Text style={styles.questionText}>IF 'yes' put a check mark </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={allergies.medicine ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('allergies', 'medicine')}
            />
            <Text>Medicine</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={allergies.food ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('allergies', 'food')}
            />
            <Text>Food (e.g. egg, seafoods)</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={allergies.pollen ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('allergies', 'pollen')}
            />
            <Text>Pollen</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={allergies.insectBites ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('allergies', 'insectBites')}
            />
            <Text>Insect Bites</Text>
          </View>
        </View>

        {/* QUESTION 2 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Is your child has ongoing medical condition?</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Checkbox
              status={medicalConditions.none ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('medicalConditions', 'none')}
            />
            <Text>NONE</Text>
          </View>
          <Text style={styles.questionText}>IF 'yes' put a check mark and fill the blank if there is other problem</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={medicalConditions.heartCondition ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('medicalConditions', 'heartCondition')}
            />
            <Text>Heart Condition</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={medicalConditions.hiccups ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('medicalConditions', 'hiccups')}
            />
            <Text>Has Hiccups</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={medicalConditions.eyeProblem ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('medicalConditions', 'eyeProblem')}
            />
            <Text>Eye Problem</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={medicalConditions.asthma ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('medicalConditions', 'asthma')}
            />
            <Text>Asthma</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={medicalConditions.hernia ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('medicalConditions', 'hernia')}
            />
            <Text>Hernia</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={medicalConditions.others ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('medicalConditions', 'others')}
            />
            <Text>Others:</Text>
            {medicalConditions.others && (
              <TextInput
                placeholder="Specify other medical conditions"
                value={medicalConditions.otherDetails}
                onChangeText={handleOtherDetailsChange}
              />
            )}
          </View>
        </View>

        {/* QUESTION 3 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Has your child undergone surgery?</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={surgery.yes ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('surgery', 'yes')}
            />
            <Text>Yes</Text>
            {surgery.yes && (
              <View style={{ flexDirection: 'row', marginLeft: 20, gap: 10 }}>
                <TextInput
                  placeholder="Causes/Reasons"
                  value={surgery.causesReasons}
                  onChangeText={(text) => handleSurgeryDetailsChange(text, 'causesReasons')}
                />
                {/* <TextInput
                  placeholder="When"
                  value={surgery.when}
                  onChangeText={(text) => handleSurgeryDetailsChange(text, 'when')}
                /> */}
                <View style={{ width: '50%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={toggleDatePicker} style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: COLORS.white, flexDirection: "row", borderRadius: SIZES.small, alignItems: "center", justifyContent: 'center' }}>
                    <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.semi_small, marginRight: 'auto'}}>When: </Text>
                    <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.small }}>
                      {surgery.when.toLocaleDateString()}
                    </Text>
                    <Feather
                      name="calendar"
                      size={15}
                    />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={surgery.when}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                </View>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={surgery.no ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('surgery', 'no')}
            />
            <Text>No</Text>
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

export default StepThree