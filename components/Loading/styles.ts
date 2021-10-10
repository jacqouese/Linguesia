import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create ({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '110%',
        paddingBottom: '15%',
        backgroundColor: Colors.theme.background,
        zIndex: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    card: {
        position: 'absolute',
        top: '60%',
        right: width/2-(width-20)/34,
        height: (height/2)/16,
        width: (width-20)/17,
        borderRadius: 2,
        backgroundColor: Colors.theme.cardColor,
    },
})

export default styles;