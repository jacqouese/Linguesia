import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { CategoryType } from '../../../../types';
import { SubcategoryType } from '../../../../types';

import styles from './styles';
import baseURL from '../../../../api/baseURL';

export type SubcategoryElementProps = {
    category: SubcategoryType,
    color: CategoryType,
    animate?: boolean,
}

const SubcategoryElement = ({ category, color, animate = true }: SubcategoryElementProps ) => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('StartFinish', {main: color, sub: category});
    }

    const image = baseURL+`images/${category.image}`;
    
    var id = parseInt(category.id, 10);

    const animationType = animate ? 'fadeInUp' : 'fadeIn';

    return (
        <Animatable.View
         animation= {animationType}
         delay={100 + id * 50}
         useNativeDriver={true}
        >
        <TouchableOpacity
         style={styles.container}
         activeOpacity={0.8}
         onPress={onPress}
        >
            <View style={[styles.left, {backgroundColor: color.color.accent}]}>
            <Image 
                source={{
                    uri: image,
                  }}
                style={{
                position: 'absolute',
                right: 15,
                top: 15,
                width: 80, 
                height: 80,
                transform: [{rotate: '-5deg'}],
                }}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{category.title_polish}</Text>
                <Text style={styles.subtitle}>{category.subtitle_polish}</Text>
            </View>
            <View style={{position: 'absolute', right: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: color.color.accent}} />
        </TouchableOpacity>
        </Animatable.View>
    )
}

export default SubcategoryElement;