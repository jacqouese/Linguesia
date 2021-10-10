import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create ({
    container: {
        position: 'absolute',
        width: '100%',
        height: '80%',
        bottom: 0,
        paddingTop: 30,
        paddingHorizontal: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: Colors.theme.accent,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 25,
        color: Colors.theme.text
    },
})

export default styles;