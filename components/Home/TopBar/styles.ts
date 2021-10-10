import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginVertical: 10,
        paddingLeft: 20,
        paddingRight: 12,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.theme.text,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 25,
        color: Colors.light.lightText,
    }
})

export default styles;