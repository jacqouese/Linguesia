import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

import styles from './styles';
import Colors from '../../../../constants/Colors';
import {
    getFlashcards,
    updateFlashcardRemembered,
} from '../../../../adapters/sql';

import { FlashcardStateProps } from '../../../../types';
import baseURL from '../../../../api/baseURL';

type ArticleElementProps = {
    setProgressValue: Function;
    setLearning: Function;
    id: number;
    mainId: number;
};

const ArticleElement = ({
    setProgressValue,
    setLearning,
    id,
    mainId,
}: ArticleElementProps) => {
    const articlesArray = [
        { id: 0, name: 'die', color: Colors.theme.accent, pressed: false },
        { id: 1, name: 'der', color: Colors.theme.accent, pressed: false },
        { id: 2, name: 'das', color: Colors.theme.accent, pressed: false },
    ];

    const [index, setIndex] = useState(0);
    const [currentFlashcard, setCurrentFlashcard] = useState<
        FlashcardStateProps[]
    >([]);
    const [articles, setArticles] = useState(articlesArray);
    const [correctAnswer, setCorrentAnswer] = useState('');
    const [pressCount, setPressCount] = useState(0);

    const db = SQLite.openDatabase('linguesia.db');

    // query database and load into state
    useEffect(() => {
        // get flashcards from sqlite and add to state
        getFlashcards(db, id, mainId, (res: any) => {
            res.rows._array.map((item: any) => {
                setCurrentFlashcard((currentFlashcard) => [
                    ...currentFlashcard,
                    {
                        id: currentFlashcard.length,
                        remote_id: item.remote_id,
                        word: item.german,
                        article: item.german_article,
                        translation: item.polish,
                        remembered: item.remembered,
                        image: item.image,
                    },
                ]);
            });

            setLearning(res.rows.length);
        });
    }, []);

    const resetArticleButtons = () => {
        setArticles(articlesArray);
        setPressCount(0);
    };

    // set correct article answer
    useEffect(() => {
        if (currentFlashcard.length != 0) {
            setCorrentAnswer(currentFlashcard[index].article);
        }
    }, [currentFlashcard, index]);

    // handle article buttons
    const onPress = (articleId: number, articleName: string) => {
        setPressCount(pressCount + 1);
        let newArticlesArray = [...articles];

        if (correctAnswer == articleName) {
            // if pressed answer is correct
            newArticlesArray[articleId].color = Colors.theme.green;
            setArticles(newArticlesArray);

            // next card
            setTimeout(() => {
                setIndex(index + 1);
                resetArticleButtons();

                setProgressValue(
                    -280 + index * (280 / (currentFlashcard.length - 1))
                );

                updateFlashcardRemembered(
                    // update flashcard remebered value in the database
                    db,
                    currentFlashcard[index]['remote_id'],
                    mainId,
                    currentFlashcard[index]['remembered'] + 1
                );
            }, 1500);
        } else {
            newArticlesArray[articleId].color = Colors.theme.red;
            newArticlesArray[articleId].pressed = true;
            setArticles(newArticlesArray);
        }
    };

    // reset buttons if user pressed 2 times
    useEffect(() => {
        if (pressCount === 2) {
            setTimeout(() => {
                resetArticleButtons();
            }, 500);
        }
    }, [pressCount]);

    const renderArticleFlashcards = () => {
        return currentFlashcard.map((item, i) => {
            if (i < index) {
                return null;
            } else if (i == index) {
                return (
                    <View style={styles.articleCardContainer}>
                        <Image
                            source={{
                                uri: baseURL + 'images/' + item.image,
                            }}
                            style={{
                                width: 120,
                                height: 120,
                            }}
                        />
                        <Text style={styles.text}>{item.word}</Text>
                        <Text style={styles.secondaryText}>
                            {item.translation}
                        </Text>
                    </View>
                );
            }
        });
    };

    return (
        <View>
            <View style={styles.articleContainer}>
                {renderArticleFlashcards()}
            </View>
            <View style={styles.buttonContainer}>
                {articles.map((article) => (
                    <TouchableOpacity
                        activeOpacity={10}
                        onPress={() => {
                            article.pressed
                                ? null
                                : onPress(article.id, article.name);
                        }}
                        style={[
                            styles.button,
                            { backgroundColor: article.color },
                        ]}
                        key={article.id}
                    >
                        <Text style={styles.buttonText}>{article.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ArticleElement;
