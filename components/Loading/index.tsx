import React, { useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './styles';

function index() {

    const time = new Animated.Value(1);
    const cardOpacity = new Animated.Value(1);  
    const scale = new Animated.Value(1);

    Animated.timing(time, {
        toValue: 0,
        delay: 1500,
        duration: 500,
        useNativeDriver: false,
    }).start();

    Animated.timing(cardOpacity, {
        toValue: 0,
        delay: 2000,
        duration: 500,
        useNativeDriver: false,
    }).start();

    Animated.spring(scale, {
        toValue: 15,
        delay: 1000,
        useNativeDriver: false,
    }).start();

    return (
        <>
        <Animated.View style={[styles.container, {opacity: time}]}>
            <Text style={styles.title}>Trwa ładowanie</Text>
        </Animated.View>
        <Animated.View style={[styles.card, {transform: [{scale: scale}], zIndex: 10, opacity: cardOpacity}]} />  
        </>
    );
}

export default index;