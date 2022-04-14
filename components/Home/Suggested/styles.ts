import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        width: '100%',
        height: 180,
        marginTop: 20,
    },
    colorBox: {
        justifyContent: 'center',
        width: '98%',
        height: '100%',
        borderRadius: 30,
        backgroundColor: Colors.light.tint,
    },
    suggested: {
        marginLeft: 30,
    },
    title: {
        color: Colors.dark.text,
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        color: Colors.dark.text,
        marginTop: 15,
        fontSize: 15,
        lineHeight: 20
    }
})

export default styles;