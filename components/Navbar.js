import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const Navbar = ({ title }) => {
  return (
    <View>
      <StatusBar backgroundColor="#007BFF" barStyle="light-content" />
      <View style={styles.statusBar} />
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#007BFF',
    // height: StatusBar.currentHeight,
  },
  navbar: {
    backgroundColor: '#007BFF',
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  navbarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
});

export default Navbar;
