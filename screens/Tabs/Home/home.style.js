import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fbfaff',
        alignItems: "center",
        // paddingVertical: 40,
        gap: 10
    },

    // SEARCH BAR
    searchBtn: {
        width: 20,
        height: "100%",
        borderRadius: SIZES.xxLarge,
        justifyContent: "center",
        alignItems: "center",
    },
    searchBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: "black",
    },
    searchInputContainer: {
        width: "90%",
        backgroundColor: COLORS.white,
        alignSelf: "center",
        paddingLeft: 12,
        alignItems:"center",
        flexDirection: "row",
        height: 70,
        borderRadius: 60,
        marginTop: 5
    },
    searchInputWrapper: {
        width: 245,
        marginRight: 5,
        justifyContent: "center",
        borderRadius: SIZES.xxLarge,
        height: "100%",
    },
    searchInputText: {
        fontFamily: FONT.regular
    },
    filterBtn: {
        width: 42,
        height: "60%",
        borderRadius: SIZES.xxLarge,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: 10,
        // borderWidth: 1,
        // borderColor: COLORS.gray2
    },
    filterBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: "black",
    },

    // TABS
    tabsContainer: {
        width: "100%",
        marginTop: SIZES.small,
        paddingHorizontal: 20

    },
    tab: (activeJobType, item) => ({
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1.5,
        borderColor: activeJobType === item ? COLORS.blue : COLORS.gray2,
    }),
        tabText: (activeJobType, item) => ({
        fontFamily: FONT.medium,
        color: activeJobType === item ? COLORS.blue : COLORS.gray2,
    }),

    cardsContainer:{
        alignItems: "center",
        width: "100%"
    },

    // RECENT
    recentContainer:{
        width: "100%",
        paddingHorizontal: 20,
        marginTop: SIZES.xLarge
    },
    recentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    recentHeaderTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
    },
    recentHeaderBtn: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    },

    // ALL
    allContainer:{
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        marginTop: SIZES.xLarge
    },
    allHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    allHeaderTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
    },
    allHeaderBtn: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    },
});

export default styles;
