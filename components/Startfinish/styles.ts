import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 50,
    },
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.theme.light,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 25,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: height/7.5,
        width: '100%',
        height: 65,
        borderRadius: 30,
    },
    counterContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    counterBackground: {
        justifyContent: "center",
        alignItems: 'center',
        width: '30%',
        height: 95,
        borderRadius: 30,
    },
    adContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    button: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.theme.accent,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default styles;