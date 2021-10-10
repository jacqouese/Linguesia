import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create ({
    container: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height/15,
        backgroundColor: Colors.theme.cardColor,
        borderRadius: 40,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.dark.text,
    },
    translation: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.theme.cardColor,
        borderRadius: 40,
    }
})

export default styles;