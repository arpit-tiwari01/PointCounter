import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const Navbar = ({ title }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007BFF" barStyle="light-content" />
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007BFF',
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  navbar: {
    // Removed background color to prevent hiding text
  },
  navbarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Navbar;
