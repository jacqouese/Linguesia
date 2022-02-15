import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable'
import * as SQLite from 'expo-sqlite';
import SubcategoryElement from './SubcategoryElement';

import styles from './styles';
import { getFlashcardLevels } from '../../../adapters/sql';
import { CategoryType } from '../../../types';

export type MainProps = {
    category: CategoryType,
}

const Main = ({ category }:MainProps) => {
    const [subcategory, setSubcategory] = useState([])

    const db = SQLite.openDatabase('linguesia.db');

    useEffect(() => {
        getFlashcardLevels(db, parseInt(category.id), (res) => {
            setSubcategory(res.rows._array);
        })
    }, [])

    return (
            <Animatable.View style={styles.container}
             animation='slideInUp'
             delay={100}
             useNativeDriver={true}
            >
                <Text style={styles.title}>Według kategorii</Text>
                <FlatList
                scrollEventThrottle={16}
                data={subcategory}
                renderItem={({item}) => <SubcategoryElement category={item} color={category} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                />
            </Animatable.View>
            
    )
}

export default Main;