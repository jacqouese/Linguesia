import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const width = Dimensions.get('window').width;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        width: width,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.theme.accent
    },
    textContainer: {
        alignItems: 'center'
    },
    title: {
        color: Colors.theme.text,
        fontSize: 50,
        fontWeight: '500'
    },
    subtitle: {
        color: Colors.theme.textLight,
        fontSize: 15
    }
});

export default styles;