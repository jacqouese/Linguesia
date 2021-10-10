import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

const Suggested = () => {
    return (
        <View style={styles.container}>
            <View style={styles.colorBox}>
                <View style={styles.suggested}>
                    <Text style={styles.title}>Sugesja {"\n"}dla ciebie</Text>
                    <Text style={styles.subtitle}>Lorem ipsum dolore</Text>
                </View>
                <Image 
                source={require('../../../assets/images/chat.png')}
                style={{
                position: 'absolute',
                right: 10,
                top: -10,
                width: 160, 
                height: 160,
                transform: [{rotate: '20deg'}],
                }}
                />
            </View>
        </View>
    )
}

export default Suggested;