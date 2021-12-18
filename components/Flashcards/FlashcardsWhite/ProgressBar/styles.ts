import { Dimensions, StyleSheet } from 'react-native';
import Colors, { isDark } from '../../../../constants/Colors';

const height = Dimensions.get('window').height;

const color = isDark ? Colors.theme.accent : Colors.orange.light;

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        height: 30,
        backgroundColor: color,
        borderRadius: 40,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        width: '105%',
        borderRadius: 40,
    },
})

export default styles;