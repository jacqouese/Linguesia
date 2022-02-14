import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import Colors, { isDark } from '../../constants/Colors';
import SubcategoryElement from '../Subcategory/Main/SubcategoryElement';
import ProgressBar from '../Flashcards/FlashcardsWhite/ProgressBar';
import Counter from '../Flashcards/FlashcardsWhite/Counter';
import { numOfRemembered, resetLevelProgress } from '../../adapters/sql';



const Subcategory = () => {

    
    const [toLearn, setToLearn] = useState(0);
    const [learning, setLearning] = useState(0);
    const [learnt, setLearnt] = useState(0);

    const [progressValue, setProgressValue] = useState(-320);

    const route = useRoute();
    const main = route.params.main;
    const sub = route.params.sub;

    // refresh screen on goBack()
    const isFocused = useIsFocused();

    const navigation = useNavigation();

    const onPress = () => {
        navigation.goBack();
    }

    const db = SQLite.openDatabase('linguesia.db');

    const updateCounters = () => {
        numOfRemembered(db, 0, sub.id, main.id).then((res) => {
            setToLearn(res);
            
        }, () => {
            alert('poziom nie istnieje');
        });

        numOfRemembered(db, 1, sub.id, main.id).then((res) => {
            setLearning(res);
            
        }, () => {
            // nothing
        });

        numOfRemembered(db, 2, sub.id, main.id).then((res) => {
            setLearnt(res);
        }, () => {
            // nothing
        });
        
    }
    
    useEffect(() => {
        updateCounters();
    }, [isFocused]);

    useEffect(() => {
        setProgressValue(-320 + (learnt * 0.85 + learning * 0.3) * (320/(toLearn+learning+learnt-1)));
        console.log(sub)
    }, [learning, learnt])

    const onStart = () => {
        if (main.id == 1) {
            // check if there are any more flashcards to learn
            if (toLearn != 0 || learning != 0) {
                // navigate to flashcards
                navigation.navigate('Flashcards', {main: main, sub: sub});
            }
            else {
                // ask user if they wanna reset their progress
                Alert.alert(
                    "Wyzeruj postęp?",
                    "Wszystkie słowa zostały już nauczone, czy chcesz wyzerować postęp dla tego poziomu?",
                    [
                      // The "Yes" button
                      {
                        text: "Tak",
                        onPress: () => {
                          resetLevelProgress(db, tableName);
                          updateCounters();
                        },
                      },
                      // The "No" button
                      {
                        text: "Nie",
                      },
                    ]
                  );
            }
            
        }
        else if (main.id == 2) {
            alert('navigate to word genders');
        }
        else if (main.id == 3) {
            alert('navigate to irregular');
        }
    
    }

    const background = isDark ? Colors.theme.background : main.color.main;
    const text = isDark ? main.color.main : Colors.dark.text;

    return (
        <View style={[styles.container, , {backgroundColor: background}]}>
            <TouchableOpacity
             onPress={onPress}
             activeOpacity={0.8}
             style={{marginLeft: 5}}
            >
                <Ionicons name="chevron-back" size={40} color="white" />
            </TouchableOpacity>
           <View style={styles.main}>
            <SubcategoryElement category={sub} color={main} animate={false} />
            
            <View style={styles.counterContainer}>
                <View style={[styles.counterBackground, {backgroundColor: main.color.accent}]}>
                    <Counter title={'Do nauczenia'} color={main.color.light} counter={toLearn}/>
                </View>
                <View style={[styles.counterBackground, {backgroundColor: main.color.accent}]}>
                    <Counter title={'Ćwiczone'} color={main.color.light} counter={learning}/>
                </View>
                <View style={[styles.counterBackground, {backgroundColor: main.color.accent}]}>
                    <Counter title={'Nauczone'} color={main.color.light} counter={learnt}/>
                </View>
            </View>
            <ProgressBar progressValue={progressValue} color={main.color.main}/>
            <View style={styles.adContainer}>
                <Image 
                    source={require('../../assets/images/ad.png')}
                    style={{
                    width: '100%', 
                    height: 270,
                    marginTop: 15,
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity 
             style={styles.button}
             activeOpacity={0.8}
             onPress={onStart}
            >
                <Text style={[styles.text, {color: main.color.main}]}>{learning == 0 && learning == 0 ? 'Rozpocznij' : 'Kontynuuj'}</Text>
            </TouchableOpacity>
            </View>
           </View> 
        </View>
    )
}

export default Subcategory;