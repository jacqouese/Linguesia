import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

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
    wordListContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    wordListFlatList: {
        height: height/3,
        width: width-50,
    },
    wordListElement: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        marginBottom: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
        backgroundColor: Colors.theme.accent
    },
    wordListElementText: {
        color: Colors.theme.text,
        fontSize: 20
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