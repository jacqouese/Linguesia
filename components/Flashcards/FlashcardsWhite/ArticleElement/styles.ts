import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create ({
    articleContainer: {
        width: width - (width/8),
        height: height/3,
        marginVertical: height/15,
        backgroundColor: Colors.theme.cardColor,
        borderRadius: 40
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: width/4,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        margin: 5,
        backgroundColor: Colors.theme.accent,
        borderRadius: 30
    },
    buttonText: {
        color: Colors.theme.text,
        fontWeight: 'bold'
    }
})

export default styles;