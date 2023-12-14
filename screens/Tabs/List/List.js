import React, { useState, useEffect } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, ScrollView, Share, Modal, TextInput } from 'react-native';
import styles from './list.style';
import { Checkbox } from 'react-native-paper';
import { COLORS, FONT, SHADOWS, SIZES } from '../../../constants/theme';

import { BlurView } from 'expo-blur';

import HeaderTab from '../../../components/header/HeaderTab';


import { getLocations, getStudentsWithAnswers, getAllStudentsWithAnswers, changeColumnName } from '../../../utils/DatabaseHelper';

import { useUser } from '../../../UserContext';
import { tr } from 'date-fns/locale';

const List = ({ navigation }) => {
 
    const [locations, setLocations] = useState([]);
    const [activeLocation, setActiveLocation] = useState({
        id: null,
        name: null,
    });
    const [students, setStudents] = useState([]);
    const { user } = useUser();
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);


    useEffect(() => {
        // Fetch locations when the component mounts
        fetchLocations();
    }, []);
    
    const fetchLocations = () => { 
        // Initialize with the "All" tab
        const allTab = { id: 'All', name: 'All' };
        setLocations([allTab]);
     
        // Fetch locations from the database
        getLocations((locationsArray) => {
            // console.log('Locations Array:', locationsArray);
    
            // Append the locations from the database to the array
            const updatedLocationsArray = [...locationsArray];
            setLocations(prevLocations => [...prevLocations, ...updatedLocationsArray]);
    
            // Set the active location to "All"
            setActiveLocation({
                id: 'All',
                name: 'All',
            });
    
            // Fetch students for the "All" location
            fetchStudentsForLocation('All');
        });
    };
    
    const fetchStudentsForLocation = (locationId) => {
        if (locationId === 'All') {
            // Fetch all students without any condition
            getAllStudentsWithAnswers(
                (studentsArray) => {
                    setStudents(filterStudents(studentsArray));
                    // console.log(studentsArray); // Log students here
                },
                (error) => {
                    console.error('Error fetching students:', error);
                }
            );
        } else {
            // Fetch students based on locationId
            getStudentsWithAnswers(
                locationId,
                (studentsArray) => {
                    setStudents(filterStudents(studentsArray));
                    // console.log(studentsArray); // Log students here
                },
                (error) => {
                    console.error('Error fetching students:', error);
                }
            );
        }
    };

    // Inside handleSearch function
    const handleSearch = (query) => {
        console.log('Search query:', query);
        setSearchQuery(query);
        // Refetch students based on the updated search query
        fetchStudentsForLocation(activeLocation.id);
    };
    
    // Inside filterStudents function
    const filterStudents = (studentsArray) => {
        // Convert both LRN and search query to lowercase for case-insensitive comparison
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        const filteredStudents = studentsArray.filter(
            (student) => student.LRN.toLowerCase().includes(lowerCaseSearchQuery)
        );
        // console.log('Filtered Students:', filteredStudents);
        return filteredStudents;
    };
    
    const handleLocationPress = (location) => {
        setActiveLocation({
            id: location.id,
            name: location.name,
        });
        fetchStudentsForLocation(location.id);
    };

    const handleInformationModal = (selectedStudent) => {
        setSelectedStudent(selectedStudent);
        setIsDetailsModalVisible(true);
    };

    const DetailsModal = ({ isDetailsModalVisible, selectedStudent }) => {
        if (!isDetailsModalVisible || !selectedStudent) {
            return null;
        }

        const { 
            firstname, 
            lastname, 
            LRN, 
            address,
            date_answered,
            gender,
            grade,
            school_name,
            question_1,
            question_2,
            question_3,
            question_4,
            question_5,
            question_6,
            question_7,
            question_8,
            question_9,
            question_10,

         } = selectedStudent;
         
         const jsonObjectQuestion1 = JSON.parse(question_1);
         const jsonObjectQuestion2 = JSON.parse(question_2);
         const jsonObjectQuestion3 = JSON.parse(question_3);
         const jsonObjectQuestion4 = JSON.parse(question_4);
         const jsonObjectQuestion5 = JSON.parse(question_5);
         const jsonObjectQuestion6 = JSON.parse(question_6);
         const jsonObjectQuestion7 = JSON.parse(question_7);
         const jsonObjectQuestion8 = JSON.parse(question_8);
         const jsonObjectQuestion9 = JSON.parse(question_9);
         const jsonObjectQuestion10 = JSON.parse(question_10);

        return (
            <Modal
                visible={isDetailsModalVisible}
                transparent={true}
                animationType="fade"
            >
                <BlurView intensity={20} style={styles.overlay}></BlurView>
                {/* Modal content */}
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Student Name: {firstname} {lastname}
                        </Text>

                        <ScrollView style={{ height: 500}}>
                            <View style={{ width: '100%', borderTopColor: COLORS.gray4, borderTopWidth: 2, marginTop: 10, marginBottom: 10, borderBottomColor: COLORS.gray4, borderBottomWidth: 2 }}>
                                <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.semi_small }}>PAST MEDICAL HISTORY AND CONDITION</Text>
                            </View>
                            {/* QUESTION 1 */}
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>Does your child have allergies?</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center',  transform: [{scale: 0.90}] }}>
                                    <Checkbox
                                        
                                        status={jsonObjectQuestion1.none ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>NONE</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion1.medicine ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Medicine</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion1.food ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Food (e.g. egg, seafoods)</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion1.pollen ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Pollen</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion1.insectBites ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Insect Bites</Text>
                                </View>
                            </View>

                            {/* QUESTION 2 */}
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>Is your child has ongoing medical condition?</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center',  transform: [{scale: 0.90}] }}>
                                    <Checkbox
                                        
                                        status={jsonObjectQuestion2.none ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>NONE</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion2.heartCondition ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Heart Condition</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion2.hiccups ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Has Hiccups</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion2.eyeProblem ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Eye Problem</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion2.asthma ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Asthma</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion2.hernia ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Hernia</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion2.others ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Others</Text>
                                </View>
                            </View>

                            {/* QUESTION 3 */}
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>Has your child undergone surgery?</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center',  transform: [{scale: 0.90}] }}>
                                    <Checkbox
                                        
                                        status={jsonObjectQuestion3.yes ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Yes</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion3.no ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>No</Text>
                                </View>
                            </View>

                            {/* QUESTION 4 */}
                            <View style={{ width: '100%', borderTopColor: COLORS.gray4, borderTopWidth: 2, marginTop: 10, marginBottom: 10, borderBottomColor: COLORS.gray4, borderBottomWidth: 2 }}>
                                <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.semi_small }}>PRESENT HEALTH CONDITION</Text>
                            </View>
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>A. Skin at Scalp</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center',  transform: [{scale: 0.90}] }}>
                                    <Checkbox
                                        
                                        status={jsonObjectQuestion4.lice ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Lice in the hair and scalp</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion4.tineaVersicolor ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Tinea versicolored or common fungal skin infection</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion4.woundsOnFeetAndHands ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>There are wounds on the feet and hands (skin problem)</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion4.unhealedWound ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Unhealed wound in the skin</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion4.smallWounds ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Small wounds caused by cuts or burns</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion4.ringworm ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Ringworm</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion4.skinAllergy ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Have skin allergy</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion4.dandruff ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Have dandruff</Text>
                                </View>
                            </View>

                            {/* QUESTION 5 */}
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>B. Eyes and Ears</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center',  transform: [{scale: 0.90}] }}>
                                    <Checkbox
                                        
                                        status={jsonObjectQuestion5.excessiveSquinting ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>With excessive squinting</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion5.eyePainAndRedness ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Eye pain and redness</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion5.paleEyelids ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Pale eyelids</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion5.squintEye ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Squint eye or looking in two opposite directions</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion5.foulSmellingFluid ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Foul-smelling fluid coming out of the ear</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion5.blockageInEar ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>There is a blockage of circumcision or dirt inside the ear</Text>
                                </View>
                                
                            </View>

                            {/* QUESTION 6 */}
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>C. Nose and Mouth</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center',  transform: [{scale: 0.90}] }}>
                                    <Checkbox
                                        
                                        status={jsonObjectQuestion6.coughAndCold ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Have cough and cold</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion6.dirtyTeeth ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Has dirty teeth</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion6.brokenTeeth ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Broken teeth</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion6.mouthSores ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Has mouth sores</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion6.splitOrNotchInMouth ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>There is a split or notch in the mouth</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion6.toothache ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Have a toothache</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion6.swollenAndPainfulGums ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Have swollen and painful gums</Text>
                                </View>
                            </View>

                            {/* QUESTION 7 */}
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>D. Throat and Neck</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center',  transform: [{scale: 0.90}] }}>
                                    <Checkbox
                                        
                                        status={jsonObjectQuestion7.soreTonsils ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Sore tonsils</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion7.painfulSoreThroat ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Have painful sore throat</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion7.swollenLymphNodes ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Swollen lymph nodes on neck</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion7.growingNeckLump ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Growing neck lump</Text>
                                </View>
                            </View>

                            {/* QUESTION 8 */}
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>E. Heart and Lungs</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center',  transform: [{scale: 0.90}] }}>
                                    <Checkbox
                                        
                                        status={jsonObjectQuestion8.asthma ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Have asthma</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion8.heartCondition ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Heart Condition (Congenital)</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion8.lungDisease ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Have lung disease</Text>
                                </View>
                            </View>

                            {/* QUESTION 9 */}
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>F. Other Diseases</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center',  transform: [{scale: 0.90}] }}>
                                    <Checkbox
                                        
                                        status={jsonObjectQuestion9.epilepsy ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Has epilepsy</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion9.dysmenorrhea ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Have dysmenorrhea</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion9.irregularMenstruation ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Irregular menstruation</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion9.kidneyDisease ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Have kidney disease</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion9.otherDiseasesText ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Other diseases</Text>
                                </View>
                            </View>

                            <View style={{ width: '100%', borderTopColor: COLORS.gray4, borderTopWidth: 2, marginTop: 10, marginBottom: 10, borderBottomColor: COLORS.gray4, borderBottomWidth: 2 }}>
                                <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.semi_small }}>PAST MENTAL HEALTH</Text>
                            </View>

                             {/* QUESTION 10 */}
                             <View style={styles.questionContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center',  transform: [{scale: 0.90}] }}>
                                    <Checkbox
                                        
                                        status={jsonObjectQuestion10.excessiveStress ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Excessive stress</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion10.excessiveDreadOrFear ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Excessive dread or fear</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion10.anxiety ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Anxiety</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion10.experiencingDepression ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Experiencing depression</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion10.troubleSleeping ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Trouble sleeping</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion10.lackOfInterest ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Lack of interest in studies or work</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion10.lossOfAttention ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Loss of attention or focus on the task</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{scale: 0.90}], marginTop: -15 }}>
                                    <Checkbox
                                        status={jsonObjectQuestion10.thinkingAboutHurtingHimself ? 'checked' : 'unchecked'}
                                    />
                                    <Text style={styles.choicesText}>Thinking about hurting himself</Text>
                                </View>
                            </View>

                        </ScrollView>
                
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                            style={[styles.modalButton, styles.yesButton]}
                            onPress={() => {
                                setIsDetailsModalVisible(false);
                            }}
                            >
                                <Text style={styles.modalButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };
          
  return ( 
    <SafeAreaView style={styles.container}>
        <DetailsModal 
            isDetailsModalVisible={isDetailsModalVisible}
            onClose={() => setIsDetailsModalVisible(false)}
            selectedStudent={selectedStudent}
        />
      <HeaderTab userInfo={user}/> 
      <View style={[styles.searchInputContainer, SHADOWS.medium]}>
        <TouchableOpacity style={styles.searchBtn}>
          
        </TouchableOpacity>
        <View style={styles.searchInputWrapper}>
          <TextInput
              style={styles.searchInputText}
              placeholder='Search ...'
              value={searchQuery}
              onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons
              name="search"
              size={22}
              color={COLORS.gray4}
          />
        </TouchableOpacity>
      </View>
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
              <Text style={styles.recentHeaderTitle}>Student Lists</Text>
              
        </View>

        {
            students.length > 0 ? (
                <ScrollView style={{width: "100%" }} contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 420 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.cardsContainer}>
                    {(
                    students?.map((student) => (
                        <TouchableOpacity style={{ width: '100%', height: 70, backgroundColor: COLORS.lightWhite, borderRadius: 10, overflow: 'hidden', ...SHADOWS.medium }} key={student.id} onPress={() => handleInformationModal(student)}>
                            <View style={{ width: '100%', height: 70, backgroundColor: COLORS.lightWhite, borderRadius: 10, overflow: 'hidden', ...SHADOWS.medium }}>
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
                        </TouchableOpacity>
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

export default List