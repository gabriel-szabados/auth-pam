import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '@/FirebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

export default function TabOneScreen() {
  const [userEmail, setUserEmail] = useState('');

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.replace('/');
        } else {
          setUserEmail(user.email || '');
        }
      });

      return unsubscribe;
    }, [])
  );

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/login')
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer logout');
    }
  };

  const confirmSignOut = () => {
    
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        { 
          text: 'Sair', 
          onPress: handleSignOut,
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Perfil</Text>
        
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        <TouchableOpacity 
          style={styles.signOutButton} 
          onPress={confirmSignOut}
        >
          <Text style={styles.signOutText}>Sair da Conta</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: 'transparent',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});