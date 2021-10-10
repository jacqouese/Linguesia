import * as React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

import { Text, View } from '../components/Themed';
import Subcategory from '../components/Subcategory';

export default function SubcategoryScreen() {
  return (
    <View style={styles.container}>
      <Subcategory />
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
