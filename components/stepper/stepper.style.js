import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
    },
    stepContainer:{
        width: '100%',
        height: '75%',
    },
    buttonContainer:{
        width: '100%',
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button:{
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 50,
        backgroundColor: COLORS.primary
    }

});

export default styles;
