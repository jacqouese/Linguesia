import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { View, Text } from '../components/Themed';

export default function SettingsScreen() {


  async function openDatabase(pathToDatabaseFile: string) {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    // if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/owoceiwarzywa.db')).exists) {
    //     console.warn('fileexists')
        
    // }
    if (pathToDatabaseFile != null) {
        
        await FileSystem.downloadAsync(
            Asset.fromModule(require('../data/db/germanpolish.db')).uri,
            FileSystem.documentDirectory + 'SQLite/germanpolish.db'
        );
        alert('done')
    }
    
  }

  const onPress = () => {
    openDatabase('../data/db/germanpolish.db')
  
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={onPress}
        title="update DBs"
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
