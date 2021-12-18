import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    input: {
        height: 50,
        width: '90%',
        margin: 12,
        backgroundColor: Colors.theme.light,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'white'
    },
    text: {
        color: Colors.theme.textLight,
        paddingHorizontal: 20,
        alignSelf: 'flex-start'
    }
})

export default styles;