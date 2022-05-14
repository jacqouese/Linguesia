import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Animated, PanResponder, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Image } from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import { getFlashcards, updateFlashcardRemembered } from '../../../../adapters/sql'
import { FlashcardStateProps } from '../../../../types';
import baseURL from '../../../../api/baseURL';

export type FlashcardElementProps = {
    setProgressValue: Function,
    setLearning: Function,
    id: number,
    mainId: number
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const FlashcardElement = ({setProgressValue, setLearning, id, mainId}:FlashcardElementProps) => {
    const [index, setIndex] = useState(0);
    const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardStateProps[]>([]);
    
    const db = SQLite.openDatabase('linguesia.db');

    // query database and load into state
    const route = useRoute();
    useEffect(() => {
        // get flashcards from sqlite and add to state
        getFlashcards(db, id, mainId, (res:any) => {
            res.rows._array.map((item:any) => {
                console.log(item)
                setCurrentFlashcard(currentFlashcard => [...currentFlashcard, {
                    id: currentFlashcard.length,
                    remote_id: item.remote_id,
                    word: `${item.german_article} ${item.german}`,
                    article: item.german_article,
                    translation: item.polish,
                    remembered: item.remembered,
                    image: item.image
                    }])
            })
        
            setLearning(res.rows.length);
        })
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
                            source={{
                                uri: baseURL+'images/'+item.image,
                              }}
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


    // handle press (touch)
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

    // when cards run out
    const onEnd = () => {
        navigation.navigate('StartFinish');
    }

    // handle gestures
    const panResponder = useMemo(
        () =>
        PanResponder.create({
            onStartShouldSetPanResponderCapture: () => true, // needed for press to work
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
                if (args[1].vx > 1) { // swipe to right side
                    // remembered ++ for the current card
                    currentFlashcard[index]['remembered'] = currentFlashcard[index]['remembered'] + 1;
                    updateFlashcardRemembered( // update flashcard remebered value in the database
                        db,
                        currentFlashcard[index]['remote_id'], 
                        mainId,
                        currentFlashcard[index]['remembered']
                    );
                    Animated.spring(pan, {
                        toValue: { x: width+100, y: 0 },
                        useNativeDriver: false,
                        restSpeedThreshold: 100,
                        restDisplacementThreshold: 40
                    }).start(() => {
                        setIndex(index+1)
                        pan.x.setValue(0)
                        pan.y.setValue(0)
                        // handle progress bar
                        setProgressValue(-280 + index * (280/(currentFlashcard.length-1)));
                        
                        if (index >= currentFlashcard.length-1) { // if no cards left
                            onEnd();
                        }
                    })
                }
                else if (args[1].vx < -1) {
                    // swipe to left side
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
                else if (args[1].dx == 0 && args[1].dy == 0) { // user pressed
                    onPress();
                }
                else {
                    // return to original positon
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false
                    }).start()
                }
                pan.flattenOffset();
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