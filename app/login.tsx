import { Text, View, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { router } from 'expo-router'
import { auth } from '@/FirebaseConfig'
const Index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signin = async () => {
        try{
            const user = await signInWithEmailAndPassword(auth, email, password)
            if (user) router.replace('/(tabs)');
        }catch (error:any) {
            console.log(error)
            alert('Erro ao entrar: ' + error.message) ;
            
        }
    }
    
    const signup = async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password)
            if (user) router.replace('/(tabs)');
        }catch (error:any) {
            console.log(error)
            alert('Erro ao se registrar: ' + error.message) ;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Bem-vindo</Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                
                <TextInput 
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                
                <TouchableOpacity style={styles.signinButton} onPress={signin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.signupButton} onPress={signup}>
                    <Text style={styles.signupButtonText}>Criar uma contas</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
    },
    content: {
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
    },
    signinButton: {
        backgroundColor: '#007AFF',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    signupButton: {
        backgroundColor: 'transparent',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    signupButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
})

export default Index