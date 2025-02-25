import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%'
    },
    headerContainer:{
        width: '100%',
        paddingVertical: 10,
    },
    headerText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.medium
    },
    questionContainer:{
        width: '100%',
        marginVertical: 20,
    },
    questionText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.semi_small
    },
    button:{
        marginVertical: 30,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 50,
        backgroundColor: COLORS.primary
      },
      buttonText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.semi_small,
        color: COLORS.lightWhite
      }

});

export default styles;
