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
        width: "100%",
        gap: 20,
        paddingVertical: 20,

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
    
    // MODAL
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent black
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
      },
      modalText: {
        fontFamily: FONT.medium,
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      modalButton: {
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 5,
      },
      yesButton: {
        backgroundColor: COLORS.primary,
      },
      noButton: {
        backgroundColor: COLORS.tertiary,
      },
      modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: FONT.regular,
      },
});

export default styles;
