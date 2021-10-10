import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        paddingHorizontal: 14,
        paddingTop: 30,
    },
    title: {
        color: Colors.theme.text,
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 10,
        marginBottom: 10,
    },
})

export default styles;