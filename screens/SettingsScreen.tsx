import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import axios from 'axios';
import { Text, View } from '../components/Themed';
import { showFlashcards, showTables, updateDataFlashcardLevels, updateDataFlashcards } from '../adapters/sql';

export default function SettingsScreen() {

  const timestampSql = () => {
    const d = new Date();
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`;
  }

  async function openDatabase(pathToDatabaseFile: string) {
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

  const onPress = () => {
    openDatabase('../data/db/germanpolish.db')
  }

  const onNewDb = () => {
    openDatabase('../data/db/linguesia.db')
  }

  const db = SQLite.openDatabase('germanpolish.db')

  const dbNew = SQLite.openDatabase('linguesia.db')

  const onQuery = () => {
    axios.get(`http://192.168.1.47:8000/api/flashcards`).then((res) => {
      updateDataFlashcards(dbNew, 'flashcards', '2021', res.data);

      axios.get(`http://192.168.1.47:8000/api/levels`).then((res) => {
        updateDataFlashcardLevels(dbNew, '2021', res.data);
      })
    }, (err) => {
      console.log(err)
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
