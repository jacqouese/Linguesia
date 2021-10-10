import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';
import Colors from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const TopBar = () => {
    const color = Colors.theme.text;

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Settings');
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Witaj ponownie!</Text>
                <Text style={styles.subtitle}>Czego się dziś nauczysz?</Text>
            </View>
            <TouchableOpacity
             onPress={onPress}
             activeOpacity={0.8}
             style={{marginLeft: 5}}
            >
                <Ionicons name="md-menu" size={40} color={color} />
            </TouchableOpacity>
        </View>
    )
}

export default TopBar;