import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create ({
    button: {
        width: width-20,
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.theme.cardColor,
    },
    text: {
        fontSize: 20,
    },
})

export default styles;