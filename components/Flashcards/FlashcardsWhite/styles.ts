import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingTop: height/15,
        paddingHorizontal: 20,
        backgroundColor: Colors.theme.light,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    counterBackground: {
        width: '30%',
        height: 60,
        justifyContent: "center",
        alignItems: 'center',
    },
    counterContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
})

export default styles;