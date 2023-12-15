import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants/theme";
import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
    container:{
        width: "100%",
        paddingTop: 40,
        paddingBottom: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.blue
    },
    profileImageContainer:{
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
        backgroundColor: "#fbfaff"
    },
    headerText:{
        fontFamily: FONT.regular,
        color: "#fbfaff"
    },
    headerTextName:{
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: "#fbfaff"
    },
    menuContainer:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.gray2,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto"
    }
});

export default styles;
