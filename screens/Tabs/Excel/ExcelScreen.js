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

      const generateExcelFile = async () => {
        if (students.length === 0) {
          console.warn('No student data to export.');
          return;
        }
      
        const worksheet = XLSX.utils.json_to_sheet(students);
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