import React from 'react';
import { View, Text } from 'react-native';
import TopBar from './TopBar';
import Suggested from './Suggested';
import Categories from './Categories';

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {
    return (
        <View style={styles.container}>
                <TopBar />
            <ScrollView 
             style={{width: '100%'}}
             showsVerticalScrollIndicator={false}
            >
                <Suggested />
                <Categories />
            </ScrollView>
        </View>
    )
}

export default Home;