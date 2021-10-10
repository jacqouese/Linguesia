import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { CategoryType } from '../../../types';
import styles from './styles';
import SubcategoryElement from './SubcategoryElement';

export type MainProps = {
    category: CategoryType,
}

const Main = ({ category }: MainProps) => {

    const H = Dimensions.get('window').height;

    return (
            <Animatable.View style={styles.container}
             animation='slideInUp'
             delay={100}
             useNativeDriver={true}
            >
                <Text style={styles.title}>Według kategorii</Text>
                <FlatList
                scrollEventThrottle={16}
                data={category.subcategory}
                renderItem={({item}) => <SubcategoryElement category={item} color={category} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                />
            </Animatable.View>
            
    )
}

export default Main;