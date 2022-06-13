import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import axios from 'axios';
import { Text, View } from '../components/Themed';
import {
    initializeTables,
    logFlashcardsRemeberedJoin,
    prepareNewLevelProgress,
    showFlashcards,
    showProgress,
    showTables,
    updateDataFlashcardCategory,
    updateDataFlashcardLevels,
    updateDataFlashcardsNew,
} from '../adapters/sql';
import baseURL from '../api/baseURL';

export default function SettingsScreen() {
    const timestampSql = () => {
        const d = new Date();
        const date = d.toISOString().split('T')[0];
        const time = d.toTimeString().split(' ')[0];
        return `${date} ${time}`;
    };

    const dbNew = SQLite.openDatabase('linguesia.db');

    const onNewDb = () => {
        initializeTables();
    };
    // query server and populate SQLite with data
    const onQuery = () => {
        axios.get(baseURL + `api/flashcards`).then(
            (res) => {
                updateDataFlashcardsNew(dbNew, 'flashcards', '2021', res.data);

                axios.get(baseURL + `api/levels`).then((res) => {
                    updateDataFlashcardLevels(dbNew, '2021', res.data);

                    axios.get(baseURL + `api/category`).then((res) => {
                        updateDataFlashcardCategory(dbNew, '2021', res.data);
                    });
                });
            },
            (err) => {
                console.log(err);
            }
        );
    };

    const updateFlashcardCategory = () => {
        axios.get(baseURL + `api/category`).then((res) => {
            updateDataFlashcardCategory(dbNew, '2021', res.data);
        });
    };

    return (
        <View style={styles.container}>
            <Button onPress={onNewDb} title="Load DB to storage" color="#FFF" />
            <Text>------------</Text>
            <Button
                onPress={onQuery}
                title="query server and insert new data"
                color="#FFF"
            />
            <Text>------------</Text>
            <Button
                onPress={() => showTables(dbNew)}
                title="console.log flashcards"
                color="#FFF"
            />
            <Text>------------</Text>
            <Button
                onPress={() => showFlashcards(dbNew)}
                title="console.log flashcard_levels"
                color="#FFF"
            />
            <Text>------------</Text>
            <Button
                onPress={() => showProgress(dbNew)}
                title="console.log flashcard_progress"
                color="#FFF"
            />
            <Text>------------</Text>
            <Button
                onPress={() => prepareNewLevelProgress(dbNew, '2021', 1, 1)}
                title="prepare flashcard_progress"
                color="#FFF"
            />
            <Text>------------</Text>
            <Button
                onPress={() => updateFlashcardCategory(dbNew)}
                title="update flashcardCategory"
                color="#FFF"
            />
            <Text>------------</Text>
            <Button
                onPress={() => logFlashcardsRemeberedJoin(dbNew, 1, 2)}
                title="log joined flashcards"
                color="#FFF"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
