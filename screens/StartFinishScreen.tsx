import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import StartFinish from '../components/Startfinish';

export default function FlashcardsScreen() {
    return (
        <View style={styles.container}>
            <StartFinish />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
