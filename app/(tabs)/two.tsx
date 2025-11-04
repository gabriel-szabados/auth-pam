import { StyleSheet, TextInput, FlatList, TouchableOpacity, Text, SafeAreaView, View, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../FirebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function TabTwoScreen() {
  const [aluno, setAluno] = useState('');
  const [alunos, setAlunos] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const alunosCollection = collection(db, 'alunos');

  useEffect(() => {
    fetchAlunos();
  }, [user]);

  const fetchAlunos = async () => {
    if (!user) {
      console.log("Nenhum usuário logado");
      return;
    }
    
    setLoading(true);
    try {
      const q = query(alunosCollection, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const alunosData = querySnapshot.docs.map((doc) => ({ 
        ...doc.data(), 
        id: doc.id 
      }));
      setAlunos(alunosData);
    } catch (error) {
      console.error("Erro ao buscar alunos: ", error);
      Alert.alert("Erro", "Falha ao carregar alunos");
    } finally {
      setLoading(false);
    }
  };

  const addAluno = async () => {
    if (aluno.trim() === '') {
      Alert.alert("Erro", "Por favor, digite o nome do aluno");
      return;
    }
    
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para adicionar alunos");
      return;
    }

    setAdding(true);
    try {
      await addDoc(alunosCollection, { 
        nome: aluno.trim(), 
        presente: false, 
        userId: user.uid,
        createdAt: new Date() 
      });
      setAluno('');
      fetchAlunos();
    } catch (error) {
      console.error("Erro ao adicionar aluno: ", error);
      Alert.alert("Erro", "Falha ao adicionar aluno");
    } finally {
      setAdding(false);
    }
  };

  const updateAluno = async (id: string, presente: boolean) => {
    try {
      const alunoDoc = doc(db, 'alunos', id);
      await updateDoc(alunoDoc, { presente: !presente });
      fetchAlunos();
    } catch (error) {
      console.error("Erro ao atualizar aluno: ", error);
      Alert.alert("Erro", "Falha ao atualizar aluno");
    }
  };

  const deleteAluno = async (id: string) => {
    try {
      const alunoDoc = doc(db, 'alunos', id);
      await deleteDoc(alunoDoc);
      fetchAlunos();
    } catch (error) {
      console.error("Erro ao deletar aluno: ", error);
      Alert.alert("Erro", "Falha ao deletar aluno");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Lista de Alunos</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nome do Aluno"
            placeholderTextColor="#888"
            value={aluno}
            onChangeText={(text) => setAluno(text)}
            style={styles.input}
            onSubmitEditing={addAluno}
            editable={!adding}
          />
          <TouchableOpacity 
            style={[styles.addButton, adding && styles.disabledButton]} 
            onPress={addAluno}
            disabled={adding}
          >
            {adding ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Adicionar</Text>
            )}
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Carregando alunos...</Text>
          </View>
        ) : (
          <FlatList
            data={alunos}
            renderItem={({ item }) => (
              <View style={[styles.alunoContainer, item.presente && styles.completedAluno]}>
                <Text style={[
                  styles.alunoText, 
                  item.presente && styles.completedText
                ]}>
                  {item.nome}
                </Text>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.presenteButton]} 
                    onPress={() => updateAluno(item.id, item.presente)}
                  >
                    <Text style={styles.actionButtonText}>
                      {item.presente ? "Falta" : "Presente"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]} 
                    onPress={() => deleteAluno(item.id)}
                  >
                    <Text style={styles.actionButtonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum aluno cadastrado ainda. Adicione um novo aluno</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    minWidth: 80,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  alunoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  completedAluno: {
    opacity: 0.7,
    borderLeftColor: '#ff0000ff',
  },
  alunoText: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    marginRight: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  presenteButton: {
    backgroundColor: '#4cd964',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#888',
    marginTop: 10,
    fontSize: 16,
  },
});