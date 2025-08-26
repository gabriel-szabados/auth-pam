import React from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';

const Modal = () => {
  const teamMembers = [
    'Gabriel Ferreira',
    'Jose Renan', 
    'Matheu Kyioshi',
    'Murilo Caires',
    'Luis Antonio',
    'Victor Dalbom',
    'Vitor Pinho'
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Text style={styles.title}>Nossa Equipe</Text>
      <ScrollView style={styles.list}>
        {teamMembers.map((member, index) => (
          <View key={index} style={styles.memberCard}>
            <Text style={styles.memberName}>{member}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#e0e0e0',
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  list: {
    width: '90%',
  },
  memberCard: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#bb86fc',
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#e0e0e0',
  },
});

export default Modal;
