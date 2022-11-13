import React, { useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';

import SubcategoryElement from './SubcategoryElement';
import sql from '../../../services/sql/sql';
import styles from './styles';
import { CategoryType, FlashcardLevelType } from '../../../types';

export type MainProps = {
    category: CategoryType;
};

const Main = ({ category }: MainProps) => {
    const [subcategory, setSubcategory] = useState<Array<FlashcardLevelType>>([]);

    useEffect(() => {
        sql.getFlashcardLevels({ categoryId: parseInt(category.id) }, (res) => {
            setSubcategory(res);
        });
    }, []);

    return (
        <Animatable.View style={styles.container} animation="slideInUp" delay={100} useNativeDriver={true}>
            <Text style={styles.title}>Według kategorii</Text>
            <FlatList
                scrollEventThrottle={16}
                data={subcategory}
                renderItem={({ item }) => <SubcategoryElement category={item} color={category} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </Animatable.View>
    );
};

export default Main;
