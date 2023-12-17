import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, Image, TextInput, FlatList, ScrollView } from 'react-native';
import styles from './home.style';
import { COLORS, SHADOWS, SIZES } from '../../../constants/theme';

import HeaderTab from '../../../components/header/HeaderTab';
import { useUser } from '../../../UserContext';

import { LineChart } from "react-native-chart-kit";

const jobTypes = ["All","Bundok Peninsula", "Agdangan", "Padre Burgos", "San Andres", "San Narciso"];

const Home = ({ navigation }) => {
 
  const [activeJobType, setActiveJobType] = useState('All');
  const { user } = useUser();

  const data = {
    labels: ["None", "Medicine", "Food", "Pollen", "Insect Bites"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ], 
    // legend: ["Rainy Days"] // optional
  };

  const data2 = {
    labels: ["None", "Heart Condition", "Has hiccups", "Eye Problem", "Asthma", "Hernia", "Others"],
    datasets: [
      {
        data: [5, 0, 4, 13, 2, 10, 0],
        color: (opacity = 1) => `rgba(200, 100, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ], 
    // legend: ["Rainy Days"] // optional
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    strokeWidth: 2, // optional, default 3
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(230, 0, 0, ${opacity})`,
  };

  return ( 
    <View style={styles.container}>
      <HeaderTab userInfo={user}/>
      <SafeAreaView style={{ flex: 1,  alignItems: 'center'}}>
        {/* <View style={[styles.searchInputContainer, SHADOWS.medium]}>
          <TouchableOpacity style={styles.searchBtn}>
            
          </TouchableOpacity>
          <View style={styles.searchInputWrapper}>
            <TextInput
                style={styles.searchInputText}
                placeholder='Search ...'
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons
                name="search"
                size={22}
                color={COLORS.gray4}
            />
          </TouchableOpacity>
        </View> */}
        <View style={styles.tabsContainer}>
          <FlatList 
            data={jobTypes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeJobType, item)}
                onPress={() => {
                  setActiveJobType(item);
                }}
              >
                <Text style={styles.tabText(activeJobType, item)}>{ item }</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
          {/* Recent */}
          <View style={styles.recentContainer}>
            <View style={styles.recentHeader}>
                  <Text style={styles.recentHeaderTitle}>Does your child have allergies?</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
              <LineChart
                data={data}
                width={data.labels.length*100}
                height={256}
                chartConfig={chartConfig}
                bezier
              />
            </ScrollView>
          </View>

          {/* All */}
          
          <View style={styles.allContainer}>
            <View style={styles.allHeader}>
              <Text style={styles.allHeaderTitle}>Is your child has ongoing medical condition?</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 12, paddingTop: 20 }} showsVerticalScrollIndicator={false}>
              <LineChart
                data={data2}
                width={data2.labels.length*100}
                height={256}
                chartConfig={chartConfig}
                bezier
              />
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Home