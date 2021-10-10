import React from 'react';
import { Image, Text } from 'react-native';
import { CategoryType } from '../../../../types';
import styles from './styles';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Colors, { isDark } from '../../../../constants/Colors';


export type CategoryElementProps = {
    category: CategoryType,
}

const Categories = ({ category }: CategoryElementProps) => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Subcategory', {id: category.id});
    }

    const background = isDark ? Colors.theme.light : category.color.main;
    const text = isDark ? category.color.main : Colors.dark.text;
    
    return (
        <TouchableOpacity
         style={[styles.container, {backgroundColor: background}]}
         activeOpacity={0.8}
         onPress={onPress}
        >
        <Text style={[styles.title, {color: text}]}>{category.title}</Text>
        <Text style={[styles.subtitle, {color: text}]}>{category.subtitle}</Text>
        <Image 
            source={category.images}
            style={{
            position: 'absolute',
            right: -15,
            width: 110, 
            height: 110,
            transform: [{rotate: '-15deg'}],
            }}
        />
        </TouchableOpacity>
    )
}

export default Categories;