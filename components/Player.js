import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Player = ({ name, points, onIncrement, onDecrement }) => {
  return (
    <View style={styles.playerContainer}>
      <Text style={styles.playerName}>{name}</Text>
      <Text style={styles.playerPoints}>Points: {points}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.decrementButton]} onPress={onDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.incrementButton]} onPress={onIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerPoints: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  decrementButton: {
    backgroundColor: 'red',
  },
  incrementButton: {
    backgroundColor: 'green',
  },
});

export default Player;
