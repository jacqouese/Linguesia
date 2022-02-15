import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite';

import styles from './styles';
import Colors from '../../../../constants/Colors';
import { getFlashcards } from '../../../../adapters/sql';

import { FlashcardStateProps } from '../../../../types';

type ArticleElementProps = {
    setProgressValue: Function,
    setLearning: Function,
    id: number,
    mainId: number
}


const ArticleElement = ({setProgressValue, setLearning, id, mainId}:ArticleElementProps) => {
    const articlesArray = [
        {id: 0, name: 'die', color: Colors.theme.accent, pressed: false},
        {id: 1, name: 'der', color: Colors.theme.accent, pressed: false},
        {id: 2, name: 'das', color: Colors.theme.accent, pressed: false}
    ];

    const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardStateProps[]>([])
    const [articles, setArticles] = useState(articlesArray);
    const [correctAnswer, setCorrentAnswer] = useState('die');
    const [pressCount, setPressCount] = useState(0);

    const db = SQLite.openDatabase('linguesia.db');

    // query database and load into state
    useEffect(() => {
        // get flashcards from sqlite and add to state
        getFlashcards(db, id, mainId, (res:any) => {
            res.rows._array.map((item:any) => {
                setCurrentFlashcard(currentFlashcard => [...currentFlashcard, {
                    id: currentFlashcard.length,
                    remote_id: item.remote_id,
                    word: `${item.german_article} ${item.german}`,
                    translation: item.polish,
                    remembered: item.remembered
                    }])
            })
        
            setLearning(res.rows.length);
        })
      }, []);
    

    const onPress = (articleId:number, articleName:string) => {
        setPressCount(pressCount+1);
        let newArticlesArray = [...articles];

        if (correctAnswer == articleName) { // if pressed answer is correct
            newArticlesArray[articleId].color = 'green';
            setArticles(newArticlesArray);
        }
        else {
            newArticlesArray[articleId].color = 'red';
            newArticlesArray[articleId].pressed = true;
            setArticles(newArticlesArray);
        }
    }

    useEffect(() => {
        if (pressCount === 2) {
            setTimeout(() => {
                setArticles(articlesArray);
                setPressCount(0)
            }, 500);
        }
    }, [pressCount]);

    
   

    return (
        <View>
            <View style={styles.articleContainer}>
                <Text>word</Text>
            </View>
            <View style={styles.buttonContainer}>
                {articles.map((article) => 
                    <TouchableOpacity activeOpacity={10} onPress={() => {article.pressed ? null : onPress(article.id, article.name)}} style={[styles.button, {backgroundColor: article.color}]} key={article.id}>
                        <Text style={styles.buttonText}>{article.name}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
    }

export default ArticleElement