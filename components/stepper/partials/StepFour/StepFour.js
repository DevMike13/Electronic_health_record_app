import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'react-native-paper';
import styles from './stepFour.style';


const StepFour = ({ setStep, onStepComplete }) => {

  const [skinConditions, setSkinConditions] = useState({
    lice: false,
    tineaVersicolor: false,
    woundsOnFeetAndHands: false,
    unhealedWound: false,
    smallWounds: false,
    ringworm: false,
    skinAllergy: false,
    dandruff: false,
  });

  const [eyeEarConditions, setEyeEarConditions] = useState({
    excessiveSquinting: false,
    eyePainAndRedness: false,
    paleEyelids: false,
    squintEye: false,
    foulSmellingFluid: false,
    blockageInEar: false,
  });

  const [noseMouthConditions, setNoseMouthConditions] = useState({
    coughAndCold: false,
    dirtyTeeth: false,
    brokenTeeth: false,
    mouthSores: false,
    splitOrNotchInMouth: false,
    splitOrNotchInLips: false,
    toothache: false,
    swollenAndPainfulGums: false,
  });

  const [throatNeckConditions, setThroatNeckConditions] = useState({
    soreTonsils: false,
    painfulSoreThroat: false,
    swollenLymphNodes: false,
    growingNeckLump: false,
  });

  const [heartLungConditions, setHeartLungConditions] = useState({
    asthma: false,
    heartCondition: false,
    lungDisease: false,
  });

  const [otherDiseases, setOtherDiseases] = useState({
    epilepsy: false,
    dysmenorrhea: false,
    irregularMenstruation: false,
    kidneyDisease: false,
    otherDiseasesText: '',
  });

  const handleCheckboxChange = (condition) => {
    setSkinConditions((prevConditions) => ({
      ...prevConditions,
      [condition]: !prevConditions[condition],
    }));
  };

  const handleEyeEarCheckboxChange = (condition) => {
    setEyeEarConditions((prevConditions) => ({
      ...prevConditions,
      [condition]: !prevConditions[condition],
    }));
  };

  const handleNoseMouthCheckboxChange = (condition) => {
    setNoseMouthConditions((prevConditions) => ({
      ...prevConditions,
      [condition]: !prevConditions[condition],
    }));
  };

  const handleThroatNeckCheckboxChange = (condition) => {
    setThroatNeckConditions((prevConditions) => ({
      ...prevConditions,
      [condition]: !prevConditions[condition],
    }));
  };

  const handleHeartLungCheckboxChange = (condition) => {
    setHeartLungConditions((prevConditions) => ({
      ...prevConditions,
      [condition]: !prevConditions[condition],
    }));
  };

  const handleOtherDiseasesCheckboxChange = (condition) => {
    setOtherDiseases((prevConditions) => ({
      ...prevConditions,
      [condition]: !prevConditions[condition],
    }));
  };

  const handleOtherDiseasesTextChange = (text) => {
    setOtherDiseases((prevConditions) => ({
      ...prevConditions,
      otherDiseasesText: text,
    }));
  };

  const handleNext = () => {
    // Assuming you have a callback function to pass data back to the parent component
    const answers4to9 = {
      skinConditions,
      eyeEarConditions,
      noseMouthConditions,
      throatNeckConditions,
      heartLungConditions,
      otherDiseases
    };

    // Call the callback function to pass the data to the parent component (Stepper)
    onStepComplete('answers4to9', answers4to9);

    // Move to the next step
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>SECOND PART. PRESENT HEALTH CONDITION</Text>
          <Text style={styles.subHeaderText}>Put a check mark on the box if there is a current health problem that is being experienced by the children.</Text>
        </View>

        {/* QUESTION 4 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>A. Skin at Scalp</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={skinConditions.lice ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('lice')}
            />
            <Text>Lice in the hair and scalp</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={skinConditions.tineaVersicolor ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('tineaVersicolor')}
            />
            <Text>Tinea versicolored or common fungal skin infection</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={skinConditions.woundsOnFeetAndHands ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('woundsOnFeetAndHands')}
            />
            <Text>There are wounds on the feet and hands (skin problem)</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={skinConditions.unhealedWound ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('unhealedWound')}
            />
            <Text>Unhealed wound in the skin</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={skinConditions.smallWounds ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('smallWounds')}
            />
            <Text>Small wounds caused by cuts or burns</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={skinConditions.ringworm ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('ringworm')}
            />
            <Text>Ringworm</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={skinConditions.skinAllergy ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('skinAllergy')}
            />
            <Text>Have skin allergy</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={skinConditions.dandruff ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('dandruff')}
            />
            <Text>Have dandruff</Text>
          </View>
        </View>

        {/* QUESTION 5 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>B. Eyes and Ears</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={eyeEarConditions.excessiveSquinting ? 'checked' : 'unchecked'}
              onPress={() => handleEyeEarCheckboxChange('excessiveSquinting')}
            />
            <Text>With excessive squinting</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={eyeEarConditions.eyePainAndRedness ? 'checked' : 'unchecked'}
              onPress={() => handleEyeEarCheckboxChange('eyePainAndRedness')}
            />
            <Text>Eye pain and redness</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={eyeEarConditions.paleEyelids ? 'checked' : 'unchecked'}
              onPress={() => handleEyeEarCheckboxChange('paleEyelids')}
            />
            <Text>Pale eyelids</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={eyeEarConditions.squintEye ? 'checked' : 'unchecked'}
              onPress={() => handleEyeEarCheckboxChange('squintEye')}
            />
            <Text>Squint eye or looking in two opposite directions</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={eyeEarConditions.foulSmellingFluid ? 'checked' : 'unchecked'}
              onPress={() => handleEyeEarCheckboxChange('foulSmellingFluid')}
            />
            <Text>Foul-smelling fluid coming out of the ear</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={eyeEarConditions.blockageInEar ? 'checked' : 'unchecked'}
              onPress={() => handleEyeEarCheckboxChange('blockageInEar')}
            />
            <Text>There is a blockage of circumcision or dirt inside the ear</Text>
          </View>
        </View>

        {/* QUESTION 6 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>C. Nose and Mouth</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={noseMouthConditions.coughAndCold ? 'checked' : 'unchecked'}
              onPress={() => handleNoseMouthCheckboxChange('coughAndCold')}
            />
            <Text>Have cough and cold</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={noseMouthConditions.dirtyTeeth ? 'checked' : 'unchecked'}
              onPress={() => handleNoseMouthCheckboxChange('dirtyTeeth')}
            />
            <Text>Has dirty teeth</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={noseMouthConditions.brokenTeeth ? 'checked' : 'unchecked'}
              onPress={() => handleNoseMouthCheckboxChange('brokenTeeth')}
            />
            <Text>Broken teeth</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={noseMouthConditions.mouthSores ? 'checked' : 'unchecked'}
              onPress={() => handleNoseMouthCheckboxChange('mouthSores')}
            />
            <Text>Has mouth sores</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={noseMouthConditions.splitOrNotchInMouth ? 'checked' : 'unchecked'}
              onPress={() => handleNoseMouthCheckboxChange('splitOrNotchInMouth')}
            />
            <Text>There is a split or notch in the mouth</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={noseMouthConditions.toothache ? 'checked' : 'unchecked'}
              onPress={() => handleNoseMouthCheckboxChange('toothache')}
            />
            <Text>Have a toothache</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={noseMouthConditions.swollenAndPainfulGums ? 'checked' : 'unchecked'}
              onPress={() => handleNoseMouthCheckboxChange('swollenAndPainfulGums')}
            />
            <Text>Have swollen and painful gums</Text>
          </View>
        </View>

        {/* QUESTION 7 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>D. Throat and Neck</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={throatNeckConditions.soreTonsils ? 'checked' : 'unchecked'}
              onPress={() => handleThroatNeckCheckboxChange('soreTonsils')}
            />
            <Text>Sore tonsils</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={throatNeckConditions.painfulSoreThroat ? 'checked' : 'unchecked'}
              onPress={() => handleThroatNeckCheckboxChange('painfulSoreThroat')}
            />
            <Text>Have painful sore throat</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={throatNeckConditions.swollenLymphNodes ? 'checked' : 'unchecked'}
              onPress={() => handleThroatNeckCheckboxChange('swollenLymphNodes')}
            />
            <Text>Swollen lymph nodes on neck</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={throatNeckConditions.growingNeckLump ? 'checked' : 'unchecked'}
              onPress={() => handleThroatNeckCheckboxChange('growingNeckLump')}
            />
            <Text>Growing neck lump</Text>
          </View>
        </View>

        {/* QUESTION 8 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>E. Heart and Lungs</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={heartLungConditions.asthma ? 'checked' : 'unchecked'}
              onPress={() => handleHeartLungCheckboxChange('asthma')}
            />
            <Text>Have asthma</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={heartLungConditions.heartCondition ? 'checked' : 'unchecked'}
              onPress={() => handleHeartLungCheckboxChange('heartCondition')}
            />
            <Text>Heart Condition (Congenital)</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={heartLungConditions.lungDisease ? 'checked' : 'unchecked'}
              onPress={() => handleHeartLungCheckboxChange('lungDisease')}
            />
            <Text>Have lung disease</Text>
          </View>
        </View>

        {/* QUESTION 9 */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>F. Other Diseases</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={otherDiseases.epilepsy ? 'checked' : 'unchecked'}
              onPress={() => handleOtherDiseasesCheckboxChange('epilepsy')}
            />
            <Text>Has epilepsy</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={otherDiseases.dysmenorrhea ? 'checked' : 'unchecked'}
              onPress={() => handleOtherDiseasesCheckboxChange('dysmenorrhea')}
            />
            <Text>Have dysmenorrhea</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={otherDiseases.irregularMenstruation ? 'checked' : 'unchecked'}
              onPress={() => handleOtherDiseasesCheckboxChange('irregularMenstruation')}
            />
            <Text>Irregular menstruation</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={otherDiseases.kidneyDisease ? 'checked' : 'unchecked'}
              onPress={() => handleOtherDiseasesCheckboxChange('kidneyDisease')}
            />
            <Text>Have kidney disease</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={otherDiseases.otherDiseasesText ? 'checked' : 'unchecked'}
              onPress={() => handleOtherDiseasesCheckboxChange('otherDiseasesText')}
            />
            <Text>Other diseases that can be written:</Text>
            {
              otherDiseases.otherDiseasesText && (
              <TextInput
                style={{ marginLeft: 10 }}
                placeholder='Other Diseases'
                value={otherDiseases.otherDiseasesText}
                onChangeText={handleOtherDiseasesTextChange}
              />
              )
            }
            
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

export default StepFour