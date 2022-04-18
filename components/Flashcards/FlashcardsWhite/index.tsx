import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { numOfRemembered } from '../../../adapters/sql';
import Colors from '../../../constants/Colors';
import Counter from './Counter';
import FlashcardElement from './FlashcardElement';
import ProgressBar from './ProgressBar';
import styles from './styles';
import ArticleElement from './ArticleElement';

export type FlashcardWhiteProps = {
    id: number
    mainId: number
    isArticleCard?: boolean
}

const FlashcardWhite = ({id, mainId, isArticleCard = false}:FlashcardWhiteProps) => {
    const [progressValue, setProgressValue] = useState(-280);
    const [toLearn, setToLearn] = useState(0);
    const [learning, setLearning] = useState(0);
    const [learnt, setLearnt] = useState(0);

    const db = SQLite.openDatabase('linguesia.db');
    
    useEffect(() => {
        numOfRemembered(db, 0, id, mainId).then((res) => {
            setToLearn(res);
        });

        numOfRemembered(db, 1, id, mainId).then((res) => {
            setLearning(res);
        });

        numOfRemembered(db, 2, id, mainId).then((res) => {
            setLearnt(res);
        });
    });

    return (
        <View style={styles.container}>
            <View style={styles.counterContainer}>
                <View style={styles.counterBackground}>
                    <Counter title={'Do nauczenia'} fontColor={Colors.theme.text} counter={toLearn}/>
                </View>
                <View style={styles.counterBackground}>
                    <Counter title={'Ćwiczone'} fontColor={Colors.theme.text} counter={learning}/>
                </View>
                <View style={styles.counterBackground}>
                    <Counter title={'Nauczone'} fontColor={Colors.theme.text} counter={learnt}/>
                </View>
            </View>
            {isArticleCard ? 
                (
                    <ArticleElement setProgressValue={setProgressValue} setLearning={setLearning} id={id} mainId={mainId} />
                ) : (
                    <FlashcardElement setProgressValue={setProgressValue} setLearning={setLearning} id={id} mainId={mainId} />
                )}
            
            <ProgressBar progressValue={progressValue} color={Colors.theme.cardColor} absolute={true}/>
        </View>
    )
}

export default FlashcardWhite;