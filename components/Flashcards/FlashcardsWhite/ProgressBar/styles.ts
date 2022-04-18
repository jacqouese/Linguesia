import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';


const styles = StyleSheet.create ({
    container: {
        width: '100%',
        height: 30,
        backgroundColor: Colors.theme.accent,
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