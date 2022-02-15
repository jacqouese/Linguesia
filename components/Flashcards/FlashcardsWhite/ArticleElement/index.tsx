import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from './styles';
import Colors from '../../../../constants/Colors';


const ArticleElement = () => {
    const articlesArray = [
        {id: 0, name: 'die', color: Colors.theme.accent, pressed: false},
        {id: 1, name: 'der', color: Colors.theme.accent, pressed: false},
        {id: 2, name: 'das', color: Colors.theme.accent, pressed: false}
    ];

    const [articles, setArticles] = useState(articlesArray);
    const [correctAnswer, setCorrentAnswer] = useState('die');
    const [pressCount, setPressCount] = useState(0);
    

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

            </View>
            <View style={styles.buttonContainer}>
                {articles.map((article) => 
                    <TouchableOpacity activeOpacity={10} onPress={() => {article.pressed ? null : onPress(article.id, article.name)}} style={[styles.button, {backgroundColor: article.color}]} key={article.id}>
                        <Text style={styles.buttonText}>{article.name}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {/* buttons */}
        </View>
    )
    }

export default ArticleElement