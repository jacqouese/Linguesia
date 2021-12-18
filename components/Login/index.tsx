import React, { useState } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Button from '../_shared/Button';
import TextInputBox from '../_shared/TextInputBox';

import styles from './styles';

export type LoginProps = {

}

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{flexGrow: 1}}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Please log to start</Text>
                </View>
                <View style={{width: '100%'}}>
                    <TextInputBox 
                        value={name} 
                        onChangeValue={setName} 
                        placeholder="Twoj login"
                    />
                    <TextInputBox 
                        value={password} 
                        onChangeValue={setPassword} 
                        placeholder="Twoje hasło"
                        secureEntry={true}
                    />
                </View>
                <Button value="Zaloguj mnie"/>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login;
