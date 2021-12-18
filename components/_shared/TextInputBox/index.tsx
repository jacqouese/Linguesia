import React from 'react';
import { TextInput, Text, View } from 'react-native';

import styles from './styles';


export type TextInputProps = {
    value: string,
    onChangeValue: any,
    placeholder?: string,
    secureEntry?: boolean
}

const TextInputBox = ({value, onChangeValue, placeholder = '', secureEntry = false}:TextInputProps) => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>{placeholder}</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeValue}
            value={value}
            secureTextEntry={secureEntry}
        />
        </View>
    )
}

export default TextInputBox;
