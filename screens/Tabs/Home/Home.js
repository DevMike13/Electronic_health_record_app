import React, { useState, useEffect, useRef } from 'react'
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, Image, TextInput, FlatList, ScrollView } from 'react-native';
import styles from './home.style';
import { COLORS, SHADOWS, SIZES, FONT } from '../../../constants/theme';

import HeaderTab from '../../../components/header/HeaderTab';
import { useUser } from '../../../UserContext';

import { LineChart } from "react-native-chart-kit";

import { getLocations, getStudentsWithAnswers, getAllStudentsWithAnswers } from '../../../utils/DatabaseHelper';
import { createLocationsTable } from '../../../utils/TableCreationHelper';

const Home = ({ navigation }) => {
 
  const [locations, setLocations] = useState([]);
  const [activeLocation, setActiveLocation] = useState({
      id: null,
      name: null,
  });
  const [students, setStudents] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const chartRef = useRef(null);
  const { user } = useUser();
 
  useEffect(() =>{
    setSelectedOption(filterData[0].question);
    setSelectedItemId(0);
  },[])

  useEffect(() => {
    // Fetch locations when the component mounts
    fetchLocations();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleItemSelected = (itemId) => {
    setSelectedItemId(itemId);
  };
  const handleQuestionSelected = (itemQuestion) => {
    setSelectedOption(itemQuestion);
  };
  

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
                setStudents(studentsArray);
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
                setStudents(studentsArray);
                // console.log(studentsArray); // Log students here
            },
            (error) => {
                console.error('Error fetching students:', error);
            }
        );
    }
  };

  const handleLocationPress = (location) => {
    setActiveLocation({
        id: location.id,
        name: location.name,
    });
    fetchStudentsForLocation(location.id);
  };


  // GRAPH
  // Extract data for question_1
  const labels = ["none", "medicine", "food", "pollen", "insectBites"];
  const formattedLabelsQuestion1 = labels.map(label => {
    const words = label.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });

  // Check if students is defined before mapping
  const question1Data = students
    ? labels.map((label, index) => {
        // Count the number of true responses for each label
        const count = students.reduce((acc, student) => {
          const question1Response = JSON.parse(student.question_1);
          return acc + (question1Response[label] ? 1 : 0);
        }, 0);
        return count;
      })
    : [];

    const data1 = {
      labels: formattedLabelsQuestion1, // Use the formatted labels for display
      datasets: [
        {
          data: question1Data,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };

  const labelsQuestion2 = ["none", "heartCondition", "hiccups", "eyeProblem", "asthma", "hernia", "others"];
  const formattedLabelsQuestion2 = labelsQuestion2.map(label => {
    const words = label.split(/(?=[A-Z])/);
    const formattedLabel = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return formattedLabel;
  });

  // Check if students is defined before mapping
  const question2Data = students
    ? labelsQuestion2.map((label, index) => {
        // Count the number of true responses for each label
        const count = students.reduce((acc, student) => {
          const question2Response = JSON.parse(student.question_2);
          // Assuming the label exists in the response, and it's a boolean value
          return acc + (question2Response[label] === true ? 1 : 0);
        }, 0);
        return count;
      })
    : [];

  const data2 = {
    labels: formattedLabelsQuestion2,
    datasets: [
      {
        data: question2Data,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Extract data for question_3
  const labelsQuestion3 = ["yes", "no"];
  const capitalizedLabelsQuestion3 = labelsQuestion3.map(label => {
    const firstLetter = label.charAt(0).toUpperCase();
    const restOfString = label.slice(1);
    return firstLetter + restOfString.replace(/([A-Z])/g, ' $1');
  });

  // Check if students is defined before mapping
  const question3Data = students
    ? capitalizedLabelsQuestion3.map(label => {
        // Count the number of true responses for each label
        const count = students.reduce((acc, student) => {
          const question3Response = JSON.parse(student.question_3);
          return acc + (question3Response[label.toLowerCase()] ? 1 : 0);
        }, 0);
        return count;
      })
    : [];

  const data3 = {
    labels: capitalizedLabelsQuestion3,
    datasets: [
      {
        data: question3Data,
        color: (opacity = 1) => `rgba(0, 150, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };


  // Extract data for question_4
  const attributeNames = ["lice", "tineaVersicolor", "woundsOnFeetAndHands", "unhealedWound", "smallWounds", "ringworm", "skinAllergy", "dandruff"];

  // Formatted labels for display
  const formattedLabelsQuestion4 = attributeNames.map(label => {
    const words = label.split(/(?=[A-Z])/);
    const formattedLabel = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return formattedLabel;
  });

  // Check if students is defined before mapping
  const question4Data = students
    ? attributeNames.map((label, index) => {
        // Count the number of true responses for each label
        const count = students.reduce((acc, student) => {
          const question4Response = JSON.parse(student.question_4);
          // Assuming the label exists in the response, and it's a boolean value
          return acc + (question4Response[label] === true ? 1 : 0);
        }, 0);
        return count;
      })
    : [];

  const data4 = {
    labels: formattedLabelsQuestion4,
    datasets: [
      {
        data: question4Data,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const labelsQuestion5 = ["excessiveSquinting", "eyePainAndRedness", "paleEyelids", "squintEye", "foulSmellingFluid", "blockageInEar"];
  // Convert camelCase labels to user-friendly format
  const formattedLabelsQuestion5 = labelsQuestion5.map(label => {
    const words = label.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });

  // Check if students is defined before mapping
  const question5Data = students
    ? labelsQuestion5.map((label, index) => {
        // Count the number of true responses for each label
        const count = students.reduce((acc, student) => {
          const question5Response = JSON.parse(student.question_5);
          return acc + (question5Response[label] ? 1 : 0);
        }, 0);
        return count;
      })
    : [];

  const data5 = {
    labels: formattedLabelsQuestion5, // Use the formatted labels for display
    datasets: [
      {
        data: question5Data,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  

  // Extract data for question_6
  const labelsQuestion6 = ["coughAndCold", "dirtyTeeth", "brokenTeeth", "mouthSores", "splitOrNotchInMouth", "splitOrNotchInLips", "toothache", "swollenAndPainfulGums"];
  const formattedLabelsQuestion6 = labelsQuestion6.map(label => {
    const words = label.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });

   // Check if students is defined before mapping
   const question6Data = students
   ? labelsQuestion6.map((label, index) => {
       // Count the number of true responses for each label
       const count = students.reduce((acc, student) => {
         const question6Response = JSON.parse(student.question_6);
         return acc + (question6Response[label] ? 1 : 0);
       }, 0);
       return count;
     })
   : [];

   const data6 = {
    labels: formattedLabelsQuestion6, // Use the formatted labels for display
    datasets: [
      {
        data: question6Data,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Extract data for question_7
  const labelsQuestion7 = ["soreTonsils", "painfulSoreThroat", "swollenLymphNodes", "growingNeckLump"];
  const formattedLabelsQuestion7 = labelsQuestion7.map(label => {
    const words = label.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });

  // Check if students is defined before mapping
  const question7Data = students
  ? labelsQuestion7.map((label, index) => {
      // Count the number of true responses for each label
      const count = students.reduce((acc, student) => {
        const question7Response = JSON.parse(student.question_7);
        return acc + (question7Response[label] ? 1 : 0);
      }, 0);
      return count;
    })
  : [];

  const data7 = {
    labels: formattedLabelsQuestion7, // Use the formatted labels for display
    datasets: [
      {
        data: question7Data,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Extract data for question_8
  const labelsQuestion8 = ["asthma", "heartCondition", "lungDisease"];
  const formattedLabelsQuestion8 = labelsQuestion8.map(label => {
    const words = label.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });

  // Check if students is defined before mapping
  const question8Data = students
  ? labelsQuestion8.map((label, index) => {
      // Count the number of true responses for each label
      const count = students.reduce((acc, student) => {
        const question8Response = JSON.parse(student.question_8);
        return acc + (question8Response[label] ? 1 : 0);
      }, 0);
      return count;
    })
  : [];

  const data8 = {
    labels: formattedLabelsQuestion8, // Use the formatted labels for display
    datasets: [
      {
        data: question8Data,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };


  // Extract data for question_9
  const labelsQuestion9 = ["epilepsy", "dysmenorrhea", "irregularMenstruation", "kidneyDisease", "others"];
  const formattedLabelsQuestion9 = labelsQuestion9.map(label => {
    const words = label.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });

  // Check if students is defined before mapping
  const question9Data = students
  ? labelsQuestion9.map((label, index) => {
      // Count the number of true responses for each label
      const count = students.reduce((acc, student) => {
        const question9Response = JSON.parse(student.question_9);
        return acc + (question9Response[label] ? 1 : 0);
      }, 0);
      return count;
    })
  : [];

  const data9 = {
    labels: formattedLabelsQuestion9, // Use the formatted labels for display
    datasets: [
      {
        data: question9Data,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };


  // Extract data for question_10
  const labelsQuestion10 = [
    "excessiveStress",
    "excessiveDreadOrFear",
    "anxiety",
    "experiencingDepression",
    "troubleSleeping",
    "lackOfInterest",
    "lossOfAttention",
    "thinkingAboutHurtingHimself"
  ];
  const formattedLabelsQuestion10 = labelsQuestion10.map(label => {
    const words = label.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });

  // Check if students is defined before mapping
  const question10Data = students
  ? labelsQuestion10.map((label, index) => {
      // Count the number of true responses for each label
      const count = students.reduce((acc, student) => {
        const question10Response = JSON.parse(student.question_10);
        return acc + (question10Response[label] ? 1 : 0);
      }, 0);
      return count;
    })
  : [];

  const data10 = {
    labels: formattedLabelsQuestion10, // Use the formatted labels for display
    datasets: [
      {
        data: question10Data,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    strokeWidth: 2, // optional, default 3
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(230, 0, 0, ${opacity})`,
  };

  const filterData = [
    {
      id: 0,
      question: "Does your child have allergies?"
    },
    {
      id: 1,
      question: "Is your child has ongoing medical condition?"
    },
    {
      id: 2,
      question: "Has you child undergone surgery?"
    },
    {
      id: 3,
      question: "A. Skin and Scalp"
    },
    {
      id: 4,
      question: "B. Eyes and Ears"
    },
    {
      id: 5,
      question: "C. Nose and Mouth"
    },
    {
      id: 6,
      question: "D. Throat and Neck"
    },
    {
      id: 7,
      question: "E. Heart and Lungs"
    },
    {
      id: 8,
      question: "F. Other Diseases"
    },
    {
      id: 9,
      question: "Mental Health"
    }
  ]

  const handleChartDataPointClick = ({ dataset, index, value, x, y }, dataIndex) => {
    // Check if the tooltip is already open for this data point
    if (tooltipData && tooltipData.index === index) {
      // If the tooltip is already open for this data point, close it
      setTooltipData(null);
      setTooltipVisible(false);
    } else {
      // If the tooltip is not open or is open for a different data point, open it
      const label = dataIndex.labels[index];  // Assuming labels are available in the corresponding data
      setTooltipData({ dataset, index, value, label, x, y });
      setTooltipVisible(true);
    }
  };
  
  
  return ( 
    <View style={styles.container}>
      <HeaderTab userInfo={user} navigation={navigation}/>
      <SafeAreaView style={{ flex: 1,  alignItems: 'center'}}>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={toggleDropdown}>
            <Text style={styles.filterText}>{selectedOption}</Text>
            <Feather
              name={ isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          {isDropdownOpen && (
            <View style={{ position: "absolute", top: 35, left: 50, backgroundColor: COLORS.lightWhite, ...SHADOWS.medium, borderRadius: SIZES.small, zIndex: 1, marginTop: 10, elevation: 2, paddingVertical: 20, width: 'auto', paddingHorizontal: 10 }}>
              {filterData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    handleItemSelected(item.id);
                    handleQuestionSelected(item.question);
                    toggleDropdown();
                  }}
                  style={{ fontFamily: FONT.medium, alignItems: "center", paddingVertical: 10 }}
                >
                  <Text style={{ fontFamily: FONT.medium }}>{item.question}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
          {/* QUESTION 1 */}
          { selectedItemId == 0 && data1.length != 0 ? (
            <View style={styles.recentContainer}>
              <View style={styles.recentHeader}>
                    <Text style={styles.recentHeaderTitle}>Does your child have allergies?</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  data={data1}
                  width={data1.labels.length*100}
                  height={450}
                  chartConfig={chartConfig}
                  onDataPointClick={(data) => handleChartDataPointClick(data, data1)}
                  bezier
                />
              {tooltipData && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS.lightWhite,
                      alignItems: "center",
                      top: tooltipData.y,
                      left: tooltipData.x,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomEndRadius: SIZES.small,
                      borderBottomLeftRadius: SIZES.small,
                      borderTopRightRadius: SIZES.small,
                      ...SHADOWS.medium,
                      zIndex: 1000,
                    }}
                  > 
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Count: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.value}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Title: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.label}</Text>
                    </View>
                    
                  </View>
                )}
              </ScrollView>
            </View>
            ) : (
              <></>
            )
          }

          {/* QUESTION 2 */}
          { selectedItemId == 1 ? (
            <View style={styles.allContainer}>
              <View style={styles.allHeader}>
                <Text style={styles.allHeaderTitle}>Is your child has ongoing medical condition?</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  data={data2}
                  width={data2.labels.length*100}
                  height={450}
                  chartConfig={chartConfig}
                  onDataPointClick={(data) => handleChartDataPointClick(data, data2)}
                  bezier
                />
              {tooltipData && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS.lightWhite,
                      alignItems: "center",
                      top: tooltipData.y,
                      left: tooltipData.x,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomEndRadius: SIZES.small,
                      borderBottomLeftRadius: SIZES.small,
                      borderTopRightRadius: SIZES.small,
                      ...SHADOWS.medium,
                      zIndex: 1000,
                    }}
                  > 
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Count: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.value}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Title: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.label}</Text>
                    </View>
                    
                  </View>
                )}
              </ScrollView>
            </View>
            ) : (
              <></>
            )
          }

          {/* QUESTION 3 */}
          { selectedItemId == 2 ? (
            <View style={styles.allContainer}>
              <View style={styles.allHeader}>
                <Text style={styles.allHeaderTitle}>Has you child undergone surgery?</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  data={data3}
                  width={data3.labels.length*180}
                  height={450}
                  chartConfig={chartConfig}
                  onDataPointClick={(data) => handleChartDataPointClick(data, data3)}
                  bezier
                />
              {tooltipData && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS.lightWhite,
                      alignItems: "center",
                      top: tooltipData.y,
                      left: tooltipData.x,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomEndRadius: SIZES.small,
                      borderBottomLeftRadius: SIZES.small,
                      borderTopRightRadius: SIZES.small,
                      ...SHADOWS.medium,
                      zIndex: 1000,
                    }}
                  > 
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Count: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.value}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Title: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.label}</Text>
                    </View>
                    
                  </View>
                )}
              </ScrollView>
            </View>
            ) : (
              <></>
            )
          }


          {/* QUESTION 4 */}
          { selectedItemId == 3 ? (
            <View style={styles.allContainer}>
              <View style={styles.allHeader}>
                <Text style={styles.allHeaderTitle}>A. Skin and Scalp</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  data={data4}
                  width={data4.labels.length*160}
                  height={450}
                  chartConfig={chartConfig}
                  onDataPointClick={(data) => handleChartDataPointClick(data, data4)}
                  bezier
                />
              {tooltipData && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS.lightWhite,
                      alignItems: "center",
                      top: tooltipData.y,
                      left: tooltipData.x,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomEndRadius: SIZES.small,
                      borderBottomLeftRadius: SIZES.small,
                      borderTopRightRadius: SIZES.small,
                      ...SHADOWS.medium,
                      zIndex: 1000,
                    }}
                  > 
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Count: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.value}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Title: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.label}</Text>
                    </View>
                    
                  </View>
                )}
              </ScrollView>
            </View>
            ) : (
              <></>
            )
          }
          

          {/* QUESTION 5 */}
          { selectedItemId == 4 ? (
            <View style={styles.allContainer}>
              <View style={styles.allHeader}>
                <Text style={styles.allHeaderTitle}>B. Eyes and Ears</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  data={data5}
                  width={data5.labels.length*150}
                  height={450}
                  chartConfig={chartConfig}
                  onDataPointClick={(data) => handleChartDataPointClick(data, data5)}
                  bezier
                />
              {tooltipData && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS.lightWhite,
                      alignItems: "center",
                      top: tooltipData.y,
                      left: tooltipData.x,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomEndRadius: SIZES.small,
                      borderBottomLeftRadius: SIZES.small,
                      borderTopRightRadius: SIZES.small,
                      ...SHADOWS.medium,
                      zIndex: 1000,
                    }}
                  > 
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Count: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.value}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Title: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.label}</Text>
                    </View>
                    
                  </View>
                )}
              </ScrollView>
            </View>
            ) : (
              <></>
            )
          }
         

          {/* QUESTION 6 */}
          { selectedItemId == 5 ? (
            <View style={styles.allContainer}>
              <View style={styles.allHeader}>
                <Text style={styles.allHeaderTitle}>C. Nose and Mouth</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  data={data6}
                  width={data6.labels.length*150}
                  height={450}
                  chartConfig={chartConfig}
                  onDataPointClick={(data) => handleChartDataPointClick(data, data6)}
                  bezier
                />
              {tooltipData && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS.lightWhite,
                      alignItems: "center",
                      top: tooltipData.y,
                      left: tooltipData.x,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomEndRadius: SIZES.small,
                      borderBottomLeftRadius: SIZES.small,
                      borderTopRightRadius: SIZES.small,
                      ...SHADOWS.medium,
                      zIndex: 1000,
                    }}
                  > 
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Count: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.value}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Title: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.label}</Text>
                    </View>
                    
                  </View>
                )}
              </ScrollView>
            </View>
            ) : (
              <></>
            )
          }
          

          {/* QUESTION 7 */}
          { selectedItemId == 6 ? (
            <View style={styles.allContainer}>
              <View style={styles.allHeader}>
                <Text style={styles.allHeaderTitle}>D. Throat and Neck</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  data={data7}
                  width={data7.labels.length*150}
                  height={450}
                  chartConfig={chartConfig}
                  onDataPointClick={(data) => handleChartDataPointClick(data, data7)}
                  bezier
                />
              {tooltipData && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS.lightWhite,
                      alignItems: "center",
                      top: tooltipData.y,
                      left: tooltipData.x,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomEndRadius: SIZES.small,
                      borderBottomLeftRadius: SIZES.small,
                      borderTopRightRadius: SIZES.small,
                      ...SHADOWS.medium,
                      zIndex: 1000,
                    }}
                  > 
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Count: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.value}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Title: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.label}</Text>
                    </View>
                    
                  </View>
                )}
              </ScrollView>
            </View>
          ) : (
            <></>
          )

          }
          

          {/* QUESTION 8 */}
          { selectedItemId == 7 ? (
            <View style={styles.allContainer}>
              <View style={styles.allHeader}>
                <Text style={styles.allHeaderTitle}>E. Heart and Lungs</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  data={data8}
                  width={data8.labels.length*110}
                  height={450}
                  chartConfig={chartConfig}
                  onDataPointClick={(data) => handleChartDataPointClick(data, data8)}
                  bezier
                />
              {tooltipData && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS.lightWhite,
                      alignItems: "center",
                      top: tooltipData.y,
                      left: tooltipData.x,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomEndRadius: SIZES.small,
                      borderBottomLeftRadius: SIZES.small,
                      borderTopRightRadius: SIZES.small,
                      ...SHADOWS.medium,
                      zIndex: 1000,
                    }}
                  > 
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Count: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.value}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Title: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.label}</Text>
                    </View>
                    
                  </View>
                )}
              </ScrollView>
            </View>
          ) : (
            <></>
          )
          }
          

          {/* QUESTION 9 */}
          { selectedItemId == 8 ? (
            <View style={styles.allContainer}>
              <View style={styles.allHeader}>
                <Text style={styles.allHeaderTitle}>F. Other Diseases</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  data={data9}
                  width={data9.labels.length*150}
                  height={450}
                  chartConfig={chartConfig}
                  onDataPointClick={(data) => handleChartDataPointClick(data, data9)}
                  bezier
                />
              {tooltipData && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS.lightWhite,
                      alignItems: "center",
                      top: tooltipData.y,
                      left: tooltipData.x,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomEndRadius: SIZES.small,
                      borderBottomLeftRadius: SIZES.small,
                      borderTopRightRadius: SIZES.small,
                      ...SHADOWS.medium,
                      zIndex: 1000,
                    }}
                  > 
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Count: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.value}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Title: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.label}</Text>
                    </View>
                    
                  </View>
                )}
              </ScrollView>
            </View>
          ) : (
            <></>
          )
          }
          
          {/* QUESTION 10 */}
          { selectedItemId == 9 ? (
            <View style={styles.allContainer}>
              <View style={styles.allHeader}>
                <Text style={styles.allHeaderTitle}>Mental Health</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  data={data10}
                  width={data10.labels.length*150}
                  height={450}
                  chartConfig={chartConfig}
                  onDataPointClick={(data) => handleChartDataPointClick(data, data10)}
                  bezier
                />
              {tooltipData && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS.lightWhite,
                      alignItems: "center",
                      top: tooltipData.y,
                      left: tooltipData.x,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomEndRadius: SIZES.small,
                      borderBottomLeftRadius: SIZES.small,
                      borderTopRightRadius: SIZES.small,
                      ...SHADOWS.medium,
                      zIndex: 1000,
                    }}
                  > 
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Count: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.value}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                      <Text style={{ fontFamily: FONT.medium }}>Title: </Text>
                      <Text style={{ fontFamily: FONT.regular }}>{tooltipData.label}</Text>
                    </View>
                    
                  </View>
                )}
              </ScrollView>
            </View>
          ) : (
            <></>
          )
          }
          
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Home