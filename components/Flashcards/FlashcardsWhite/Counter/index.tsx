import React from 'react';
import { View, Text } from 'react-native';
import Colors, { isDark } from '../../../../constants/Colors';
import styles from './styles';


export type CounterProps = {
    title: string,
    color: string,
    counter: number,
}

const Counter = ({ title, counter, color } :CounterProps) => {
    const text = isDark ? color : Colors.light.text;

    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: text}]}>{title}</Text>
            <Text style={[styles.counter, , {color: text}]}>{counter}</Text>
        </View>
    )
}

export default Counter;