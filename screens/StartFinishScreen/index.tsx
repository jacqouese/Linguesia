import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {
    useIsFocused,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ProgressBar from '../../components/Flashcards/FlashcardsWhite/ProgressBar';
import Counter from '../../components/Flashcards/FlashcardsWhite/Counter';
import SubcategoryElement from '../../components/Subcategory/Main/SubcategoryElement';

import {
    numOfRemembered,
    prepareNewLevelProgress,
    resetLevelProgress,
} from '../../adapters/sql';
import baseURL from '../../api/baseURL';
import Colors, { isDark } from '../../constants/Colors';
import styles from './styles';
import List from '../../components/StartFinish/List';

export default function FlashcardsScreen() {
    const [toLearn, setToLearn] = useState(-1);
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
    };

    const db = SQLite.openDatabase('linguesia.db');

    const updateCounters = () => {
        return new Promise((resolve) => {
            numOfRemembered(db, 0, sub.id, main.id).then(
                (res) => {
                    const first = res;
                    setToLearn(res);

                    numOfRemembered(db, 1, sub.id, main.id).then(
                        (res) => {
                            const second = res;
                            setLearning(res);

                            numOfRemembered(db, 2, sub.id, main.id).then(
                                (res) => {
                                    const third = res;
                                    setLearnt(res);
                                    resolve({ first, second, third });
                                },
                                () => {
                                    // on error
                                }
                            );
                        },
                        () => {
                            // on error
                        }
                    );
                },
                () => {
                    alert('poziom nie istnieje');
                }
            );
        });
    };

    useEffect(() => {
        updateCounters().then(({ first, second, third }) => {
            if (first == 0 && second == 0 && third == 0) {
                // level launched first time
                console.log('level launched first time');

                prepareNewLevelProgress(db, '2022', sub.id, main.id);
                updateCounters();
            }
        });
    }, [isFocused]);

    useEffect(() => {
        setProgressValue(
            -320 +
                (learnt * 0.85 + learning * 0.3) *
                    (320 / (toLearn + learning + learnt - 1))
        );
    }, [learning, learnt]);

    const startLevel = (typeOfLevel: number) => {
        // check if there are any more flashcards to learn
        if (toLearn != 0 || learning != 0) {
            // navigate to flashcards
            navigation.navigate('Flashcards', {
                main: main,
                sub: sub,
                typeOfLevel: typeOfLevel,
            });
        } else {
            // ask user if they wanna reset their progress
            Alert.alert(
                'Wyzeruj postęp?',
                'Wszystkie słowa zostały już nauczone, czy chcesz wyzerować postęp dla tego poziomu?',
                [
                    // The "Yes" button
                    {
                        text: 'Tak',
                        onPress: () => {
                            resetLevelProgress(db);
                            updateCounters();
                        },
                    },
                    // The "No" button
                    {
                        text: 'Nie',
                    },
                ]
            );
        }
    };

    const onStart = () => {
        startLevel(main.id);
    };

    const background = isDark ? Colors.theme.background : main.color.main;
    const text = isDark ? main.color.main : Colors.dark.text;

    return (
        <View style={[styles.container, , { backgroundColor: background }]}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={{ marginLeft: 5 }}
            >
                <Ionicons name="chevron-back" size={40} color="white" />
            </TouchableOpacity>
            <View style={styles.main}>
                <SubcategoryElement
                    category={sub}
                    color={main}
                    animate={false}
                />

                <View style={styles.counterContainer}>
                    <View
                        style={[
                            styles.counterBackground,
                            { backgroundColor: main.color.accent },
                        ]}
                    >
                        <Counter title={'Do nauczenia'} counter={toLearn} />
                    </View>
                    <View
                        style={[
                            styles.counterBackground,
                            { backgroundColor: main.color.accent },
                        ]}
                    >
                        <Counter title={'Ćwiczone'} counter={learning} />
                    </View>
                    <View
                        style={[
                            styles.counterBackground,
                            { backgroundColor: main.color.accent },
                        ]}
                    >
                        <Counter title={'Nauczone'} counter={learnt} />
                    </View>
                </View>
                <ProgressBar
                    progressValue={progressValue}
                    color={main.color.main}
                />
                <List mainId={main.id} subId={sub.id} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={onStart}
                    >
                        <Text style={[styles.text, { color: main.color.main }]}>
                            {learning == 0 && learning == 0
                                ? 'Rozpocznij'
                                : 'Kontynuuj'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
