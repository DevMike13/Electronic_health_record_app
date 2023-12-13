import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './stepper.style';

import { getAllStudents, getAllAnswers, deleteAllStudents, deleteAllAnswers, addDateAnsweredColumn } from '../../utils/DatabaseHelper';

import StepOne from './partials/StepOne/StepOne';
import StepTwo from './partials/StepTwo/StepTwo';
import StepThree from './partials/StepThree/StepThree';
import StepFour from './partials/StepFour/StepFour';
import StepFive from './partials/StepFive/StepFive';
import StepSix from './partials/StepSix/StepSix';
import { COLORS } from '../../constants/theme';

const Stepper = ({ navigation }) => {

  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [studentInfo, setStudentInfo] = useState({});
  const [answers1to3, setAnswers1to3] = useState({});
  const [answers4to9, setAnswers4to9] = useState({});
  const [answersTo10, setAnswersTo10] = useState({});
  
  const handleNext = () => {
      setStep(step + 1);
  };

  const handlePrevious = () => {
      setStep(step - 1);
  };

  const handleStepComplete = (stepName, data) => {
    // Update the state based on the stepName
    if (stepName === 'studentInfo') {
      setStudentInfo(data);
     
    }

    else if (stepName === 'answers1to3') {
      setAnswers1to3(data);
      
    }

    else if (stepName === 'answers4to9') {
      setAnswers4to9(data);
      
    }

    else if (stepName === 'answersTo10') {
      setAnswersTo10(data);
      
    }
    // ... (handle other steps similarly)
  };

  // useEffect(() => {
  //   deleteAllAnswers(() => {
  //     console.log('deleted');
  //   })   
  // }, []);  

  // const [answersData, setAnswersData] = useState([]);
  // const [studentsData, setStudentsData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const answers = await new Promise((resolve) => {
  //         getAllAnswers((result) => {
  //           resolve(result);
  //         });
  //       });
  //       setAnswersData(answers);
  //       console.log('All Answers:', answers);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const students = await new Promise((resolve) => {
  //         getAllStudents((result) => {
  //           resolve(result);
  //         });
  //       }); 
  //       setStudentsData(students);
  //       console.log('All Students:', students);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }; 

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   addDateAnsweredColumn(() => {
  //     console.log('added');
  //   })
  // })

  return ( 
    <View style={styles.container}>
      
      <View style={styles.stepContainer}>
        {step === 1 && <StepOne onStepComplete={handleStepComplete} setStep={setStep} />}
        {step === 2 && <StepTwo setStep={setStep} />}
        {step === 3 && <StepThree onStepComplete={handleStepComplete} setStep={setStep} />}
        {step === 4 && <StepFour onStepComplete={handleStepComplete} setStep={setStep} />}
        {step === 5 && <StepFive onStepComplete={handleStepComplete} setStep={setStep} />}
        {step === 6 && <StepSix 
          studentInfo={studentInfo}
          answers1to3={answers1to3}
          answers4to9={answers4to9}
          answersTo10={answersTo10}
          setStep={setStep}
        />}
      </View>
    </View>
  )
}

export default Stepper