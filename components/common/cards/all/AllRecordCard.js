import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles from './allrecordcard.style';
import { checkImageUrl } from '../../../../utils/utils';

import { COLORS } from '../../../../constants/theme';

const AllRecordCard = ({ data }) => {
  return (
    <TouchableOpacity style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: checkImageUrl(data.image) ? data.image : data.image }} resizeMode="cover" style={styles.image}/>
        </View>
      
        <View style={styles.infoContainer}>
            <Text style={styles.studentName} numberOfLines={1} ellipsizeMode="tail">
                { data.lastname }, { data.firstname }
            </Text>

           
            <View style={styles.addressNameContainer}>
                <Feather
                    name="map-pin"
                    size={12}
                    color={COLORS.blue}
                    style={{ marginRight: 5 }}
                />
                <Text style={styles.addressNameText} numberOfLines={1} ellipsizeMode="tail">
                    {data.address}
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
                        {data.school_name}
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
                        { data.birthdate }
                    </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default AllRecordCard