import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Flashcards from '../components/Flashcards';

export default function FlashcardsScreen() {
  return (
    <View style={styles.container}>
      <Flashcards />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
