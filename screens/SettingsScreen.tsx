import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import axios from 'axios';
import { Text, View } from '../components/Themed';
import { logFlashcardsRemeberedJoin, prepareNewLevelProgress, showFlashcards, showProgress, showTables, updateDataFlashcardCategory, updateDataFlashcardLevels, updateDataFlashcardsNew } from '../adapters/sql';
import baseURL from '../api/baseURL';

export default function SettingsScreen() {

  const timestampSql = () => {
    const d = new Date();
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`;
  }

  async function createDatabase(pathToDatabaseFile: string) { // create SQLite database on user device
    // check if sqlite directory exits
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
 
    // copy database to files
    if (pathToDatabaseFile != null) {
        
        await FileSystem.downloadAsync(
            Asset.fromModule(require('../data/db/linguesia.db')).uri,
            FileSystem.documentDirectory + 'SQLite/linguesia.db'
        ).then((res) => {
          console.log(res)
          alert('success')
        }, (err) => {
          console.log(err)
        });
    }
    
  }

  const onNewDb = () => {
    createDatabase('../data/db/linguesia.db')
  }

  const db = SQLite.openDatabase('germanpolish.db')

  const dbNew = SQLite.openDatabase('linguesia.db')

  // query server and populate SQLite with data
  const onQuery = () => {
    axios.get(baseURL+`api/flashcards`).then((res) => {
      updateDataFlashcardsNew(dbNew, 'flashcards', '2021', res.data);

      axios.get(baseURL+`api/levels`).then((res) => {
        updateDataFlashcardLevels(dbNew, '2021', res.data);

        axios.get(baseURL+`api/category`).then((res) => {
          updateDataFlashcardCategory(dbNew, '2021', res.data);
        });

      });
    }, (err) => {
      console.log(err);
    })
  }

  const updateFlashcardCategory = () => {
    axios.get(baseURL+`api/category`).then((res) => {
          updateDataFlashcardCategory(dbNew, '2021', res.data);
      })
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={onNewDb}
        title="Load DB to storage"
        color="#FFF"
      />
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
