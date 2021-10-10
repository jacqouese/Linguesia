import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Animated, PanResponder, Dimensions, Button } from 'react-native';
import flashcards from '../../../../data/flashcards/flashcards';
import * as SQLite from 'expo-sqlite';
import styles from './styles';
import { Image } from 'react-native-animatable';
import FlashcardWhite from '..';
import { useNavigation } from '@react-navigation/native';

export type FlashcardElementProps = {
    setProgressValue: any,
    setLearning: any,
    name: string,
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const FlashcardElement = ({setProgressValue, setLearning, name}:FlashcardElementProps) => {
    const [index, setIndex] = useState(0);
    const [currentFlashcard, setCurrentFlashcard] = useState([])
    const [finishFlashcard, setFinishFlashcard] = useState([])
    
    const db = SQLite.openDatabase('germanpolish.db');

    //On first load create a new table if doesn't exist
    useEffect(() => {
        const tableName = name;
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM "+tableName+" LIMIT 20", [], (tx, results) => {
                results.rows._array.map((item) => {
                    setCurrentFlashcard(currentFlashcard => [...currentFlashcard, {
                        id: currentFlashcard.length,
                        word: item.flashcard_word,
                        translation: item.flashcard_translation,
                        remembered: item.flashcard_remembered,
                        }])
                })
            
                setLearning(results.rows.length);
            });
        });
      }, []);

    const renderFlashcards = () => {
        return currentFlashcard.map((item, i) => {
            if (i < index) {
                return null
            }
            else if (i == index) {
                return (
                    <Animated.View key={item.id} style={[styles.container, {height: height/2.1, zIndex:100,transform:[{rotate:rotate}, {rotateY: flip}, {translateY: valueY}]}, pan.getLayout()]} {...panResponder.panHandlers}>
                         <Animated.View style={{position: "absolute"}}>
                            <Animated.Text style={[styles.text, {opacity: cardTextOpacity}]}>{item.word}</Animated.Text>
                        </Animated.View>
                        <Animated.View style={[styles.translation, {width: '100%', height: '100%', opacity: cardTextOpacityTranslation, zIndex: 1, transform:[{scaleX: -1}]}]}>
                        <Image 
                            source={require('../../../../assets/images/lamp.png')}
                            style={{
                            width: 120, 
                            height: 120,
                            transform: [{translateY: 10}],
                            }}
                            />
                            <Text style={[styles.text, {marginTop: 30}]}>{item.translation}</Text>
                        </Animated.View>
                    </Animated.View>
                )
            }
            else if (i > index + 1) {
                return null
            }
            else {
                return (
                <Animated.View key={item.id} style={[styles.container, {height: height/2.1, opacity: opacity, transform: [{scale: scale}, {translateY: Y}]}]}>
                    <Animated.Text style={[styles.text, {opacity: textOpacity}]}>{item.word}</Animated.Text>
                </Animated.View>
                )
            }
        }).reverse()
    }

    const pan = useState(new Animated.ValueXY({ x:0, y:0 }))[0];

    const valueY = pan.x.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: [30,  0, 30],
        extrapolate: 'clamp'
    })

    const rotate = pan.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    })

    const opacity = pan.x.interpolate({
        inputRange: [-500, 0, 500],
        outputRange: [1, 0.4, 1]
    })

    const textOpacity = pan.x.interpolate({
        inputRange: [-500, 0, 500],
        outputRange: [1, 0, 1]
    })

    const scale = pan.x.interpolate({
        inputRange: [-500, 0, 500],
        outputRange: [1, 0.95, 1]
    })

    const Y = pan.x.interpolate({
        inputRange: [-500, 0, 500],
        outputRange: [0, 20, 0]
    })

    const flipValue = new Animated.Value(0)

    const flip = flipValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    const cardTextOpacity = flipValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    })

    const cardTextOpacityTranslation = flipValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1]
    }) 

    const onPress = () => {
        if (flipValue._value == 0) {
            Animated.timing(flipValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start() 
        }
        else {
            Animated.timing(flipValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start() 
        }
    }

    const navigation = useNavigation();

    const onEnd = () => {
        
        navigation.navigate('NotFound')
    }


    const panResponder = useMemo(
        () =>
        PanResponder.create({
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value,
                })
            },
            onPanResponderMove: Animated.event([null, {
                dx: pan.x }],
                {useNativeDriver: false}
                ),
                onPanResponderRelease: (...args) => {
                    if (args[1].vx > 1) {
                        Animated.spring(pan, {
                            toValue: { x: width+100, y: 0 },
                            useNativeDriver: false,
                            restSpeedThreshold: 100,
                            restDisplacementThreshold: 40
                        }).start(() => {
                            setFinishFlashcard(finishFlashcard => [...finishFlashcard, {
                                id: finishFlashcard.length,
                                word: currentFlashcard[index].word,
                                translation: currentFlashcard[index].translation,
                                remembered: currentFlashcard[index].remembered+1,
                            }])
                            setIndex(index+1)
                            pan.x.setValue(0)
                            pan.y.setValue(0)
                            setProgressValue(-320 + index * (320/(currentFlashcard.length-1)))
                            if (index >= currentFlashcard.length-1) {
                                onEnd()
                            }
                        })
                    }
                    else if (args[1].vx < -1) {
                        Animated.spring(pan, {
                            toValue: { x: -width-100, y: 0 },
                            useNativeDriver: false,
                            restSpeedThreshold: 100,
                            restDisplacementThreshold: 40
                        }).start(() => {
                            setIndex(index+1)
                            pan.x.setValue(0)
                            pan.y.setValue(0)
                            if (index >= currentFlashcard.length-1) {
                                onEnd()
                            }
                        })
                    }
                    else if (args[1].dx == 0 && args[1].dy == 0) {
                        onPress()
                    }
                    else {
                        Animated.spring(pan, {
                            toValue: { x: 0, y: 0 },
                            useNativeDriver: false
                        }).start()
                    }
                    pan.flattenOffset()
                }
        }),
        [index, flipValue]
    )

    return (
        <View style={{width: '100%'}}>
            
            {renderFlashcards()}
            
        </View>
    )
}

export default FlashcardElement;