import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create ({
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 60,
        marginBottom: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
        backgroundColor: Colors.theme.accent
    },
    wordListElementText: {
        color: Colors.theme.text,
        fontSize: 18,
        width: '45%'
    },
})

export default styles;

