import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, Image, TextInput, FlatList, ScrollView } from 'react-native';
import styles from './home.style';
import { COLORS, SHADOWS, SIZES } from '../../../constants/theme';

import HeaderTab from '../../../components/header/HeaderTab';
import RecentRecordCard from '../../../components/common/cards/recent/RecentRecordCard';
import AllRecordCard from '../../../components/common/cards/all/AllRecordCard';

import { getAllStudents } from '../../../utils/DatabaseHelper';

import { useUser } from '../../../UserContext';

const jobTypes = ["All","Bundok Peninsula", "Agdangan", "Padre Burgos", "San Andres", "San Narciso"];
const data = [
  { patient_id: '1', firstname: 'John', lastname: 'Reyes', school_name: 'Agdangan Elementary School', grade: 5, age: 12, sex: 'Male', birthdate: 'July 22, 2006', address: 'Brgy. Malagatang, Agdangan', image: 'https://images.pexels.com/photos/1068209/pexels-photo-1068209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { patient_id: '2', firstname: 'Jan Renan', lastname: 'Villareal', school_name: 'Padre Burgos Elementary School', grade: 2, age: 8, sex: 'Male', birthdate: 'Jan. 06, 2010', address: 'Brgy. Tulo-tulo, Padre B.', image: 'https://images.pexels.com/photos/261895/pexels-photo-261895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { patient_id: '3', firstname: 'Mark Anthony', lastname: 'Glazier', school_name: 'Bundok P. Elementary School', grade: 3, age: 10, sex: 'Male', birthdate: 'April 01, 2009', address: 'Brgy. Hinimasan, Bundok P.', image: 'https://images.pexels.com/photos/936036/pexels-photo-936036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { patient_id: '4', firstname: 'Nora', lastname: 'Aquita', school_name: 'San A. Elementary School', grade: 6, age: 15, sex: 'Female', birthdate: 'Aug. 13, 2005', address: 'Brgy. Upper Town, San A.', image: 'https://images.pexels.com/photos/3755619/pexels-photo-3755619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { patient_id: '5', firstname: 'Jean Mae', lastname: 'Calumpit', school_name: 'San N. Elementary School', grade: 3, age: 9, sex: 'Female', birthdate: 'Feb. 14, 2009', address: 'Brgy. Lower T, San N.', image: 'https://images.pexels.com/photos/893924/pexels-photo-893924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
];

const Home = ({ navigation }) => {
 
  const [activeJobType, setActiveJobType] = useState('All');
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <HeaderTab userInfo={user}/>
      <SafeAreaView style={{ flex: 1,  alignItems: 'center'}}>
        <View style={[styles.searchInputContainer, SHADOWS.medium]}>
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
        </View>
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

        {/* Recent */}
        <View style={styles.recentContainer}>
          <View style={styles.recentHeader}>
                <Text style={styles.recentHeaderTitle}>Recently Added</Text>
                <TouchableOpacity>
                  <Text style={styles.recentHeaderBtn}>Show all</Text>
                </TouchableOpacity>
          </View>
          <View style={styles.cardsContainer}>
            <FlatList 
              data={data}
              renderItem={({ item }) => (
                <RecentRecordCard
                  item={item}
                />
              )}
              keyExtractor={item => item?.patient_id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          </View>
        </View>

        {/* All */}
        
          <View style={styles.allContainer}>
            <View style={styles.allHeader}>
                  <Text style={styles.allHeaderTitle}>All Records</Text>
                  <TouchableOpacity>
                    <Text style={styles.allHeaderBtn}>Show all</Text>
                  </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
              <View style={styles.cardsContainer}>
              {(
                data?.map((data) => (
                  <AllRecordCard
                    key={data.patient_id}
                    data={data}
                  />
                ))
              )}
              </View>
            </ScrollView>
          </View>
      </SafeAreaView>
    </View>
  )
}

export default Home