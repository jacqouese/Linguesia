import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create ({
    articleContainer: {
        width: width - (width/8),
        height: height/3,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: height/15,
        backgroundColor: Colors.theme.cardColor,
        borderRadius: 40
    },
    articleCardContainer: {
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    text: {
        marginVertical: 7,
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.dark.text,
    },
    secondaryText: {
        fontSize: 15,
        color: Colors.dark.text,
    }
})

export default styles;