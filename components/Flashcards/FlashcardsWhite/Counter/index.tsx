import React from 'react';
import { View, Text } from 'react-native';
import Colors, { isDark } from '../../../../constants/Colors';
import styles from './styles';


export type CounterProps = {
    title: string,
    counter: number,
    fontColor?: string
}

const Counter = ({ title, counter, fontColor = 'white' } :CounterProps) => {

    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: fontColor}]}>{title}</Text>
            <Text style={[styles.counter, , {color: fontColor}]}>{counter}</Text>
        </View>
    )
}

export default Counter;