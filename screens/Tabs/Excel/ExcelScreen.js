import React, { useState, useEffect } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, ScrollView, Share, Modal } from 'react-native';
import styles from './excel.style';
import { COLORS, FONT, SHADOWS, SIZES } from '../../../constants/theme';
import XLSX from 'xlsx';
import { BlurView } from 'expo-blur';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import HeaderTab from '../../../components/header/HeaderTab';
import RecentRecordCard from '../../../components/common/cards/recent/RecentRecordCard';
import AllRecordCard from '../../../components/common/cards/all/AllRecordCard';

import { getAllStudents, getLocations, getStudents, isExceledUpdate } from '../../../utils/DatabaseHelper';

import { useUser } from '../../../UserContext';

const ExcelScreen = ({ navigation }) => {
 
    const [locations, setLocations] = useState([]);
    const [activeLocation, setActiveLocation] = useState({
        id: null,
        name: null,
    });
    const [students, setStudents] = useState([]);
    const { user } = useUser();
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);

    useEffect(() => {
        // Fetch locations when the component mounts
        fetchLocations();
      }, []);
    
      const fetchLocations = () => {
        getLocations((locationsArray) => {
          setLocations(locationsArray);
          // Set the first location as active when locations are fetched
          if (locationsArray.length > 0 && !activeLocation.id) {
            setActiveLocation({
              id: locationsArray[0].id,
              name: locationsArray[0].name,
            });

            // Fetch students for the first location
            fetchStudentsForLocation(locationsArray[0].id);
          }
        });
      };
    
      const fetchStudentsForLocation = (locationId) => {
        getStudents(
          locationId,
          (studentsArray) => {
            setStudents(studentsArray);
            console.log(studentsArray); // Log students here
          },
          (error) => {
            console.error('Error fetching students:', error);
          }
        );
      };
    
      const handleLocationPress = (location) => {
        setActiveLocation({
          id: location.id,
          name: location.name,
        });
        fetchStudentsForLocation(location.id);
      };

      const questionLabels = [
        "Does your child have allergies?",
        "Is your child has ongoing medical condition?",
        "Has your child undergone surgery?",
        "A. Skin and Scalp",
        "B. Eyes and Ears",
        "C. Nose and Mouth",
        "D. Throat and Neck",
        "E. Heart and Lungs",
        "F. Other diseases. Other diseases that can be written",
        "MENTAL HEALTH",
      ];

      const specialCases = {
        "Does your child have allergies?": {
          none: "NONE",
          medicine: "Medicine",
          food: "Food",
          pollen: "Pollen",
          insectBites: "Insect Bites",
          // Add other cases as needed
        },
        "Is your child has ongoing medical condition?": {
          none: "NONE",
          heartCondition: "Heart Condition",
          hiccups: "Hiccups",
          eyeProblem: "Eye Problem",
          asthma: "Asthma",
          hernia: "Hernia",
          // Add other cases as needed
        },
        "Has your child undergone surgery?": {
          yes: "Yes",
          causesReasons: "Causes/Reasons", // Modify as needed
          no: "No",
          when: "When", // Modify as needed
          // Add other cases as needed
        },
        "A. Skin and Scalp": {
          lice: "Lice",
          tineaVersicolor: "Tinea Versicolor",
          woundsOnFeetAndHands: "Wounds on Feet and Hands",
          unhealedWound: "Unhealed Wound",
          smallWounds: "Small Wounds",
          ringworm: "Ringworm",
          skinAllergy: "Skin Allergy",
          dandruff: "Dandruff",
          // Add other cases as needed
        },
        "B. Eyes and Ears": {
          excessiveSquinting: "Excessive Squinting",
          eyePainAndRedness: "Eye Pain and Redness",
          paleEyelids: "Pale Eyelids",
          squintEye: "Squint Eye",
          foulSmellingFluid: "Foul Smelling Fluid",
          blockageInEar: "Blockage in Ear",
          // Add other cases as needed
        },
        "C. Nose and Mouth": {
          coughAndCold: "Cough and Cold",
          dirtyTeeth: "Dirty Teeth",
          brokenTeeth: "Broken Teeth",
          mouthSores: "Mouth Sores",
          splitOrNotchInMouth: "Split or Notch in Mouth",
          splitOrNotchInLips: "Split or Notch in Lips",
          toothache: "Toothache",
          swollenAndPainfulGums: "Swollen and Painful Gums",
          // Add other cases as needed
        },
        "D. Throat and Neck": {
          soreTonsils: "Sore Tonsils",
          painfulSoreThroat: "Painful Sore Throat",
          swollenLymphNodes: "Swollen Lymph Nodes",
          growingNeckLump: "Growing Neck Lump",
          // Add other cases as needed
        },
        "E. Heart and Lungs": {
          asthma: "Asthma",
          heartCondition: "Heart Condition",
          lungDisease: "Lung Disease",
          // Add other cases as needed
        },
        "F. Other diseases. Other diseases that can be written": {
          epilepsy: "Epilepsy",
          dysmenorrhea: "Dysmenorrhea",
          irregularMenstruation: "Irregular Menstruation",
          kidneyDisease: "Kidney Disease",
          // Add other cases as needed
        },      
        "MENTAL HEALTH": {
          excessiveStress: "Excessive Stress",
          excessiveDreadOrFear: "Excessive Dread or Fear",
          anxiety: "Anxiety",
          experiencingDepression: "Experiencing Depression",
          troubleSleeping: "Trouble Sleeping",
          lackOfInterest: "Lack of Interest",
          lossOfAttention: "Loss of Attention",
          thinkingAboutHurtingHimself: "Thinking About Hurting Himself",
          // Add other cases as needed
        },
      };

      const autoSizeColumns = (worksheet) => {
        const colWidths = [];
        for (let i = 0; i < worksheet.length; i++) {
          const row = worksheet[i];
          for (let j = 0; j < row.length; j++) {
            const cellValue = row[j]?.v || '';
            colWidths[j] = colWidths[j] || 0;
            const contentLength = cellValue.toString().length;
            colWidths[j] = Math.max(colWidths[j], contentLength + 2);
          }
        }
    
        for (let i = 0; i < colWidths.length; i++) {
          worksheet['!cols'] = worksheet['!cols'] || [];
          worksheet['!cols'][i] = { wch: colWidths[i] };
        }
      };
      
      const generateExcelFile = async () => {
        if (students.length === 0) {
          console.warn('No student data to export.');
          return;
        }

        const modifiedStudents = students.map((student) => {
          const updatedStudent = { ...student };
        
          for (let i = 0; i < questionLabels.length; i++) {
            const questionLabel = questionLabels[i];
            const questionKey = `question_${i + 1}`;
            const questionValue = student[questionKey];
        
            if (questionValue) {
              const parsedQuestion = JSON.parse(questionValue);
              const trueValues = Object.keys(parsedQuestion).filter((key) => parsedQuestion[key] === true);
        
              // Check for special cases
              if (specialCases[questionLabel]) {
                updatedStudent[questionLabel] =
                  trueValues.length > 0
                    ? trueValues.map((value) => specialCases[questionLabel][value] || value).join(', ')
                    : 'NONE';
        
                if (questionLabel === "Has your child undergone surgery?" && parsedQuestion["yes"]) {
                  updatedStudent[questionLabel] = `${parsedQuestion["causesReasons"]} / ${parsedQuestion["when"]}`;
                }

                // Handle special case for "Is your child has ongoing medical condition?"
                if (questionLabel === "Is your child has ongoing medical condition?") {
                  if (parsedQuestion["others"]) {
                    const includedValues = [];
                    for (const key in parsedQuestion) {
                      if (key !== "others" && key !== "otherDetails" && parsedQuestion[key]) {
                        includedValues.push(specialCases[questionLabel][key] || key);
                      }
                    }
                    if (parsedQuestion["otherDetails"]) {
                      includedValues.push(parsedQuestion["otherDetails"]);
                    }
                    updatedStudent[questionLabel] = includedValues.length > 0 ? includedValues.join(', ') : 'NONE';
                  } else {
                    updatedStudent[questionLabel] =
                      trueValues.length > 0
                        ? trueValues.map((value) => specialCases[questionLabel][value] || value).join(', ')
                        : 'NONE';
                  }
                }


                if (questionLabel === "F. Other diseases. Other diseases that can be written") {
                  if (parsedQuestion["others"]) {
                    const includedValues = [];
                    for (const key in parsedQuestion) {
                      if (key !== "otherDiseasesText" && key !== "others" && parsedQuestion[key]) {
                        includedValues.push(specialCases[questionLabel][key] || key);
                      }
                    }
                    if (parsedQuestion["otherDiseasesText"]) {
                      includedValues.push(parsedQuestion["otherDiseasesText"]);
                    }
                    updatedStudent[questionLabel] = includedValues.length > 0 ? includedValues.join(', ') : 'NONE';
                    
                  } else {
                    updatedStudent[questionLabel] =
                      trueValues.length > 0
                        ? trueValues.map((value) => specialCases[questionLabel][value] || value).join(', ')
                        : 'NONE';
                  }
                  
                }

              } else {
                // Default handling
                updatedStudent[questionLabel] = trueValues.length > 0 ? trueValues.join(', ') : 'NONE';
              }
        
              delete updatedStudent[questionKey]; // Remove the old attribute
            }
          }
        
          return updatedStudent;
        });
        
        const worksheet = XLSX.utils.json_to_sheet(modifiedStudents);

        autoSizeColumns(worksheet);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
      
        const excelFileName = `students_data_${activeLocation.name}.xlsx`;
        
        const excelFileUri = `${FileSystem.cacheDirectory}${excelFileName}`;
      
        await FileSystem.writeAsStringAsync(excelFileUri, XLSX.write(workbook, { type: 'base64' }), {
          encoding: FileSystem.EncodingType.Base64,
        });
      
        Sharing.shareAsync(excelFileUri, { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
        console.log('Excel file generated and shared:', excelFileName);

        const studentIdsToUpdate = students.map((student) => student.id);
        isExceledUpdate(studentIdsToUpdate);

        fetchStudentsForLocation(activeLocation.id);

      };

        const handleConfirmModal = () => {
            setIsConfirmationModalVisible(true);
        };

        const ConfirmationModal = () => {
            return (
                <Modal
                visible={isConfirmationModalVisible}
                transparent={true}
                animationType="fade"
                >
                    <BlurView intensity={20} style={styles.overlay}></BlurView>
                    {/* Modal content */}
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Are you sure you want to export this as excel file?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                            style={[styles.modalButton, styles.yesButton]}
                            onPress={() => {
                                generateExcelFile();
                                setIsConfirmationModalVisible(false);
                            }}
                            >
                            <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.modalButton, styles.noButton]}
                            onPress={() => {
                                setIsConfirmationModalVisible(false);
                            }}
                            >
                            <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </Modal>
            );
        };
  return ( 
    <SafeAreaView style={styles.container}>
        <ConfirmationModal/>
      <HeaderTab userInfo={user}/> 
      <View style={styles.tabsContainer}>
        <FlatList 
          data={locations}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.tab(activeLocation, item.id)}
              onPress={() => handleLocationPress(item)}
            >
              <Text style={styles.tabText(activeLocation, item.id)}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View> 

      {/* Recent */}
      <View style={styles.recentContainer}>
        <View style={styles.recentHeader}>
              <Text style={styles.recentHeaderTitle}>Excel Generation</Text>
              <TouchableOpacity style={{ backgroundColor: COLORS.primary, padding: 10, borderRadius: 100 }} onPress={handleConfirmModal} disabled={ students.length > 0 ? false : true}>
                <Feather
                    name="file-text"
                    size={22}
                    color={COLORS.lightWhite}
                />
              </TouchableOpacity>
        </View>

        {
            students.length > 0 ? (
                <ScrollView style={{width: "100%" }} contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.cardsContainer}>
                    {(
                    students?.map((student) => (
                        <View style={{ width: '100%', height: 70, backgroundColor: COLORS.lightWhite, borderRadius: 10, overflow: 'hidden', ...SHADOWS.medium }} key={student.id}>
                            <View style={{ width: '100%', height: '100%', paddingHorizontal: 15, paddingVertical: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                    <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium }}>{ student.lastname }, { student.firstname }</Text>
                                    <Ionicons
                                        name={ student.gender == 'male' ? 'male' : 'female'}
                                        size={16}
                                        color={COLORS.blue}
                                    />
                                    <Text style={{ marginLeft: 'auto', fontFamily: FONT.medium, fontSize: SIZES.small, backgroundColor: COLORS.blue, color: COLORS.lightWhite, paddingHorizontal: 5, borderRadius: 2, marginTop: -5 }}>{ student.LRN }</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                    <Feather
                                        name="map-pin"
                                        size={12}
                                        color={COLORS.blue}
                                    />
                                    <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.small }}>
                                        { student.address }
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                    <Feather
                                        name="briefcase"
                                        size={12}
                                        color={COLORS.blue}
                                    />
                                    <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.small }}>
                                        { student.school_name }
                                    </Text>
                                </View>
                            </View>
                            
                        </View>
                    ))
                    )}
                    </View>
                </ScrollView>
            ) : (
                <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.semi_small, alignSelf: 'center' , marginTop: 100 }}>No Data Found!</Text>
            )
        }
        
      </View>
    </SafeAreaView>
  )
}

export default ExcelScreen