import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fbfaff',
        gap: 10
    },
    // TABS
    tabsContainer: {
        width: "100%",
        marginTop: SIZES.small,
        paddingHorizontal: 20

    },
    tab: (activeLocation, locationId) => ({
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1.5,
        borderColor: activeLocation.id === locationId ? COLORS.blue : COLORS.gray2,
    }),
        tabText: (activeLocation, locationId) => ({
        fontFamily: FONT.medium,
        color: activeLocation.id === locationId ? COLORS.blue : COLORS.gray2,
    }),

    cardsContainer:{
        alignItems: "center",
        width: "100%"
    },

    // RECENT
    recentContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        paddingHorizontal: 20,
        marginTop: SIZES.xLarge
    },
    recentHeader: {
        alignSelf: 'flex-start',
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
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        paddingHorizontal: 20,
        marginTop: SIZES.xLarge
    },
    allHeader: {
        alignSelf: 'flex-start',
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

    filterContainer:{
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    filterButton:{
        width: '90%',
        flexDirection: 'row',
        gap: 20,
        backgroundColor: COLORS.gray2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: SIZES.semi_small
    },
    filterText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.semi_small
    }
});

export default styles;
