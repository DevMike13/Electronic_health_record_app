import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
        
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
