import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Player from './components/Player';
import Navbar from './components/Navbar';
import LongPressMenu from './components/LongPressMenu';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    savePlayers();
  }, [players]);

  const savePlayers = async () => {
    try {
      await AsyncStorage.setItem('players', JSON.stringify(players));
    } catch (error) {
      console.error('Failed to save players:', error);
    }
  };

  const loadPlayers = async () => {
    try {
      const savedPlayers = await AsyncStorage.getItem('players');
      if (savedPlayers) {
        setPlayers(JSON.parse(savedPlayers));
      }
    } catch (error) {
      console.error('Failed to load players:', error);
    }
  };

  const addPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Player name cannot be blank');
      return;
    }

    const newPlayer = { id: Math.random().toString(), name: playerName, points: 0 };
    setPlayers([...players, newPlayer]);
    setPlayerName('');
  };

  const incrementPoints = (id) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, points: player.points + 1 } : player
    ));
  };

  const decrementPoints = (id) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, points: player.points - 1 } : player
    ));
  };

  const resetPoints = () => {
    setPlayers(players.map(player => ({ ...player, points: 0 })));
  };

  const handleLongPress = (id) => {
    setCurrentPlayerId(id);
    setIsMenuVisible(true);
  };

  const editPlayer = () => {
    const player = players.find(player => player.id === currentPlayerId);
    if (player) {
      setEditedName(player.name);
      setIsEditing(true);
    }
    setIsMenuVisible(false);
  };

  const confirmEdit = () => {
    setPlayers(players.map(player =>
      player.id === currentPlayerId ? { ...player, name: editedName } : player
    ));
    setIsEditing(false);
    setCurrentPlayerId(null);
    setEditedName('');
  };

  const deletePlayer = () => {
    setPlayers(players.filter(player => player.id !== currentPlayerId));
    setIsMenuVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter player name"
            value={playerName}
            onChangeText={setPlayerName}
          />
          <TouchableOpacity style={styles.button} onPress={addPlayer}>
            <Text style={styles.buttonText}>Add Player</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={players}
          renderItem={({ item }) => (
            <TouchableOpacity onLongPress={() => handleLongPress(item.id)}>
              <Player 
                name={item.name} 
                points={item.points} 
                onIncrement={() => incrementPoints(item.id)}
                onDecrement={() => decrementPoints(item.id)} 
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: '#DC3545' }]} onPress={resetPoints}>
          <Text style={styles.buttonText}>Reset Points</Text>
        </TouchableOpacity>

        <LongPressMenu 
          isVisible={isMenuVisible} 
          onClose={() => setIsMenuVisible(false)} 
          onEdit={editPlayer} 
          onDelete={deletePlayer} 
        />
        
        <Modal
          visible={isEditing}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Edit player name"
                value={editedName}
                onChangeText={setEditedName}
              />
              <TouchableOpacity style={styles.button} onPress={confirmEdit}>
                <Text style={styles.buttonText}>Confirm Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#6C757D' }]} onPress={() => setIsEditing(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default App;
