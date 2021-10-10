import { Dimensions, StyleSheet } from 'react-native';
import Colors, {isDark} from '../../constants/Colors';

const height = Dimensions.get('window').height;

const background = isDark ? Colors.theme.background : Colors.orange.main;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: height/18,
        backgroundColor: background,
    },
})

export default styles;