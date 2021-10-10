import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../constants/Colors';
import Counter from './Counter';
import FlashcardElement from './FlashcardElement';
import ProgressBar from './ProgressBar';
import styles from './styles';

export type FlashcardWhiteProps = {
    name: string
}

const FlashcardWhite = ({name}:FlashcardWhiteProps) => {
    const [progressValue, setProgressValue] = useState(-320);
    const [learning, setLearning] = useState(0)

    return (
        <View style={styles.container}>
            <View style={styles.counterContainer}>
                <View style={styles.counterBackground}>
                    <Counter title={'Do nauczenia'} color={Colors.theme.cardTextColor} counter={1}/>
                </View>
                <View style={styles.counterBackground}>
                    <Counter title={'Ćwiczone'} color={Colors.theme.cardTextColor} counter={1+2}/>
                </View>
                <View style={styles.counterBackground}>
                    <Counter title={'Nauczone'} color={Colors.theme.cardTextColor} counter={1+10}/>
                </View>
            </View>
            <FlashcardElement setProgressValue={setProgressValue} setLearning={setLearning} name={name}/>
            <ProgressBar progressValue={progressValue} color={Colors.theme.cardColor} absolute={true}/>
        </View>
    )
}

export default FlashcardWhite;