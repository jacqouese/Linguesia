import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';
import Main from './Main'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'

import categories from '../../data/categories';
import Colors, { isDark } from '../../constants/Colors';



const Subcategory = () => {

    const route = useRoute();

    const navigation = useNavigation();

    const onPress = () => {
        navigation.goBack();
    }

    const id = route.params.id;

    const item = categories.find(x => x.id === id);

    const background = isDark ? Colors.theme.background : item.color.main;
    const text = isDark ? item.color.main : Colors.dark.text;

    return (
        <View style={[styles.container, , {backgroundColor: background}]}>
            <TouchableOpacity
             onPress={onPress}
             activeOpacity={0.8}
             style={{marginLeft: 5}}
            >
                <Ionicons name="chevron-back" size={40} color="white" />
            </TouchableOpacity>
            <Animatable.View 
             style={styles.top}
             animation='fadeIn'
             delay={100}
             useNativeDriver={true}
            >
                <Text style={[styles.title, {color: text}]}>{item.title}</Text>
                <Text style={[styles.subtitle, {color: text}]}>{item.subtitle}</Text>
            </Animatable.View>
            <Image 
            source={item.images}
            style={{
            position: 'absolute',
            right: -15,
            top: 60,
            width: 180, 
            height: 180,
            transform: [{rotate: '-20deg'}],
            }}
            />
            <Main category={item}/>
        </View>
    )
}

export default Subcategory;