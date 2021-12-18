import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';

export type ButtonTypes = {
    value?: string,
    textColor?: string
}

const Button = ({value = 'ok', textColor = 'white'}:ButtonTypes) => {
    return (
        <TouchableOpacity
             style={styles.button}
             activeOpacity={0.8}
             onPress={() => null}
            >
                <Text style={[styles.text, {color: textColor}]}>{value}</Text>
        </TouchableOpacity>
    )
}

export default Button
