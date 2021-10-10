import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import categories from '../../data/categories';
import Colors, { isDark } from '../../constants/Colors';
import SubcategoryElement from '../Subcategory/Main/SubcategoryElement';
import ProgressBar from '../Flashcards/FlashcardsWhite/ProgressBar';
import Counter from '../Flashcards/FlashcardsWhite/Counter';
import { color } from 'react-native-reanimated';



const Subcategory = () => {

    const route = useRoute();

    const navigation = useNavigation();

    const onPress = () => {
        navigation.goBack();
    }

    const onStart = () => {
        if (main.id == 1) {
            navigation.navigate('Flashcards', {main: main, sub: sub});
        }
        else {
            alert('navigate to word genders')
        }
        
    }

    const db = SQLite.openDatabase('germanpolish.db');
    const [toLearn, setToLearn] = useState(0);
    const [learning, setLearning] = useState(0);
    const [learnt, setLearnt] = useState(0);

    useEffect(() => {
        const tableName = 'owoceiwarzywa';
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM "+tableName+" WHERE flashcard_remembered = 0", [], (tx, results) => {
                setToLearn(results.rows.length);
            });
            tx.executeSql("SELECT * FROM "+tableName+" WHERE flashcard_remembered = 1", [], (tx, results) => {
                setLearning(results.rows.length);
            });
            tx.executeSql("SELECT * FROM "+tableName+" WHERE flashcard_remembered = 2", [], (tx, results) => {
                setLearnt(results.rows.length);
            });
        });

      }, []);

    const main = route.params.main;
    const sub = route.params.sub;

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
            <SubcategoryElement category={sub} color={main} />
            
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
            <ProgressBar progressValue={-300+10} color={main.color.main}/>
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
                <Text style={[styles.text, {color: main.color.main}]}>Rozpocznij</Text>
            </TouchableOpacity>
            </View>
           </View> 
        </View>
    )
}

export default Subcategory;