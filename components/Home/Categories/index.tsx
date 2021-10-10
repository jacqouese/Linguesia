import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { CategoryType } from '../../../types';

import categories from '../../../data/categories';

import CategoryElement from './CategoryElement';

import styles from './styles';

export type CategoriesProps = {
    category: CategoryType,
}

const displayCategories = () => {
    return categories.map((item) => {
        return(
            <CategoryElement key={item.id} category={item} />
        )
    })
}

const windowHeight = Dimensions.get('window').height;

const Categories = ({ category }: CategoriesProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kategorie</Text>
            {displayCategories()}
        </View>
    )
}

export default Categories;