import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        width: '100%',
        borderRadius: 30,
        marginBottom: 12,
        backgroundColor: Colors.theme.light,
        borderWidth: 2,
        borderColor: Colors.theme.accent,
    },
    left: {
        height: '90%',
        width: 90,
        marginLeft: 5,
        borderRadius: 25,
        overflow: 'hidden',
    },
    textContainer: {
        marginLeft: 20,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 22,
        color: Colors.theme.text,
    },
    subtitle: {
        fontSize: 10,
        color: Colors.light.lightText,
    },
})

export default styles;