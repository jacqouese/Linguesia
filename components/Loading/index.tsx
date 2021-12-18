import React, { useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './styles';

function index() {

    const time = new Animated.Value(1);
    const cardOpacity = new Animated.Value(1);  
    const scale = new Animated.Value(1);

    // background animation
    Animated.timing(time, {
        toValue: 0,
        delay: 600,
        duration: 500,
        useNativeDriver: false,
    }).start();

    Animated.timing(cardOpacity, {
        toValue: 0,
        delay: 900,
        duration: 700,
        useNativeDriver: false,
    }).start();

    // increase card scale
    Animated.spring(scale, {
        toValue: 15,
        delay: 500,
        useNativeDriver: false,
    }).start(() => {
        Animated.spring(scale, {
            toValue: 14,
            useNativeDriver: false,
        }).start()
    });

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