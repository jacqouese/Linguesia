import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { getFlashcards } from '../../../adapters/sql';
import baseURL from '../../../api/baseURL';
import styles from './styles';

export type wordListElementProps = {
    german: string;
    polish: string;
    german_article: string;
    img?: string;
};

export type ListElementProps = {
    mainId: number;
    subId: number;
};

function List({ mainId, subId }: ListElementProps) {
    const [data, setData] = useState([]);
    const image = baseURL + `images/fruits.png`;

    useEffect(() => {
        getFlashcards(null, subId, mainId, (res: any) => {
            setData(res.rows._array);
        });
    }, []);

    const wordListElement: any = (data: wordListElementProps) => {
        return (
            <View style={styles.wordListElement}>
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 35,
                        height: 35,
                    }}
                />
                <Text style={styles.wordListElementText}>
                    {data.german_article} {data.german}
                </Text>
                <Text style={styles.wordListElementText}>{data.polish}</Text>
            </View>
        );
    };

    return (
        <View style={styles.wordListContainer}>
            <FlatList
                style={styles.wordListFlatList}
                scrollEventThrottle={16}
                data={data}
                renderItem={({ item }) => wordListElement(item)}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default List;
