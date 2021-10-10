import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import FlashcardWhite from './FlashcardsWhite';
import Loading from '../Loading'
import { Ionicons } from '@expo/vector-icons';
import { isDark } from '../../constants/Colors';

const height = Dimensions.get('window').height;

const Flashcards = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const onPress = () => {
        navigation.goBack();
    }

    const [ready, setReady] = useState(false);
    
    setTimeout(()=>{
        setReady(true)
    }, 2500)

    const color = isDark ? 'white' : 'black';

    const main = route.params.main;
    const sub = route.params.sub;
    const title = sub.title.replace(/\s/g, '').toLowerCase();
    
    return (
        <View style={styles.container}>
            {ready ? null : <Loading />}
            <TouchableOpacity
             onPress={onPress}
             activeOpacity={0.8}
             style={{marginLeft: 5, marginBottom: height/40, width: 40}}
            >
                <Ionicons name="close-outline" size={40} color={color} />
            </TouchableOpacity>
            <FlashcardWhite name={title}/>
        </View>
    )
}

export default Flashcards;