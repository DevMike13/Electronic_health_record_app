import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
    container:{
        width: 250,
        height: 100,
        marginVertical: 15,
        marginHorizontal: 5,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.bg,
        padding: 10,
        flexDirection: "row",
        ...SHADOWS.medium
    },
    imageContainer:{
        width: "40%",
        height: "100%",
        borderRadius: SIZES.medium,
        overflow: "hidden",
        backgroundColor: COLORS.gray4
    },
    image:{
        width: "100%",
        height: "100%",
    },
    infoContainer:{
        width: "100%",
        height: "100%",
        paddingLeft: 10,
    },
    studentName:{
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        width: 120
    },

    birthdateContainer:{
        flexDirection: "row",
        alignItems:"center",
    },
    birthdateText:{
        fontFamily: FONT.regular,
        fontSize: 11,
        width: 110
    },

    schoolNameContainer:{
        flexDirection: "row",
        alignItems:"center",
        // marginTop: "auto"
    },
    schoolNameText:{
        fontFamily: FONT.regular,
        fontSize: 11,
        width: 110
    },
    addressNameContainer:{
        flexDirection: "row",
        alignItems:"center",
        marginBottom: 5
        // marginTop: "auto"
    },
    addressNameText:{
        fontFamily: FONT.regular,
        fontSize: 11,
        width: 110
    }
});

export default styles;
