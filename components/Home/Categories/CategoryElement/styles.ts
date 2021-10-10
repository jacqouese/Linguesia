import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        justifyContent: 'center',
        paddingLeft: 45,
        height: 120,
        marginVertical: 5,
        borderRadius: 40,
        overflow: 'hidden',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 10,
        lineHeight: 15,
    }
})

export default styles;