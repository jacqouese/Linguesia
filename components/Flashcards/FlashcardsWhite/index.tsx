import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { numOfRemembered } from '../../../adapters/sql';
import Colors from '../../../constants/Colors';
import Counter from './Counter';
import FlashcardElement from './FlashcardElement';
import ProgressBar from './ProgressBar';
import styles from './styles';

export type FlashcardWhiteProps = {
    name: string
    id: number
}

const FlashcardWhite = ({name, id}:FlashcardWhiteProps) => {
    const [progressValue, setProgressValue] = useState(-280);
    const [toLearn, setToLearn] = useState(0);
    const [learning, setLearning] = useState(0);
    const [learnt, setLearnt] = useState(0);

    const db = SQLite.openDatabase('linguesia.db');

    const tableName = name;

    useEffect(() => {
        numOfRemembered(db, tableName, 0, id).then((res) => {
            setToLearn(res);
        });

        numOfRemembered(db, tableName, 1, id).then((res) => {
            setLearning(res);
        });

        numOfRemembered(db, tableName, 2, id).then((res) => {
            setLearnt(res);
        });
    });

    return (
        <View style={styles.container}>
            <View style={styles.counterContainer}>
                <View style={styles.counterBackground}>
                    <Counter title={'Do nauczenia'} color={Colors.theme.text} counter={toLearn}/>
                </View>
                <View style={styles.counterBackground}>
                    <Counter title={'Ćwiczone'} color={Colors.theme.text} counter={learning}/>
                </View>
                <View style={styles.counterBackground}>
                    <Counter title={'Nauczone'} color={Colors.theme.text} counter={learnt}/>
                </View>
            </View>
            <FlashcardElement setProgressValue={setProgressValue} setLearning={setLearning} name={name} id={id}/>
            <ProgressBar progressValue={progressValue} color={Colors.theme.cardColor} absolute={true}/>
        </View>
    )
}

export default FlashcardWhite;