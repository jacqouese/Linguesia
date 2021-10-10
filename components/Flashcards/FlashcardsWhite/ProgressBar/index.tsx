import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Button } from 'react-native';
import Colors from '../../../../constants/Colors';
import styles from './styles';

export type ProgressBarProps = {
    progressValue: number,
    color: string,
    absolute?: boolean,
}

const ProgressBar = ({progressValue, color, absolute}:ProgressBarProps) => {

    const progress = useState(new Animated.ValueXY({ x: progressValue, y: 0}))[0]

    useEffect(() => {
        Animated.spring(progress, {
            toValue: { x: progressValue, y: 0 },
            useNativeDriver: false
        }).start()
    })

    const position = absolute ? 'absolute' : 'relative';
    const bottom = absolute ? 100 : 0;

    return (
            <View style={[styles.container, {position: position, bottom: bottom}]}>
                <Animated.View style={[styles.progress, {backgroundColor: color}, progress.getLayout()]}/>
            </View>
    )
}

export default ProgressBar;