import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 10,
        height: 55,
        marginTop: 20,
      },
      inputWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        height: "100%",
      },
      inInput: {
        fontFamily: FONT.regular,
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.medium,
      },
      dateContainer:{
        width: "100%",
        marginVertical: 20,
        paddingHorizontal: 20,
      },
      genderContainer:{
        width: "90%",
        backgroundColor: COLORS.white,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderRadius: 50,
        paddingVertical: 5,
        alignSelf: 'center'
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
