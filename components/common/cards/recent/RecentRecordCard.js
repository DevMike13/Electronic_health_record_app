import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles from './recentrecordcard.style';
import { checkImageUrl } from '../../../../utils/utils';

import { COLORS } from '../../../../constants/theme';

const RecentRecordCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: checkImageUrl(item.image) ? item.image : item.image }} resizeMode="cover" style={styles.image}/>
        </View>
      
        <View style={styles.infoContainer}>
            <Text style={styles.studentName} numberOfLines={1} ellipsizeMode="tail">
                { item.lastname }, { item.firstname }
            </Text>

           
            <View style={styles.addressNameContainer}>
                <Feather
                    name="map-pin"
                    size={12}
                    color={COLORS.blue}
                    style={{ marginRight: 5 }}
                />
                <Text style={styles.addressNameText} numberOfLines={1} ellipsizeMode="tail">
                    {item.address}
                </Text>
            </View>

            <View style={{ marginTop: "auto" }}>
                <View style={styles.schoolNameContainer}>
                    <Feather
                        name="pen-tool"
                        size={12}
                        color={COLORS.gray4}
                        style={{ marginRight: 5 }}
                    />
                    <Text style={styles.schoolNameText} numberOfLines={1} ellipsizeMode="tail">
                        {item.school_name}
                    </Text>
                </View>
                <View style={styles.birthdateContainer}>
                    <Feather
                        name="calendar"
                        size={12}
                        color={COLORS.gray4}
                        style={{ marginRight: 5 }}
                    />
                    <Text style={styles.birthdateText} numberOfLines={1} ellipsizeMode="tail">
                        { item.birthdate }
                    </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default RecentRecordCard