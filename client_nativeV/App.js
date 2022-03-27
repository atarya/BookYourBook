
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Routes from './src/Navigation/Routes';


const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  );
};


export default App;


// 1.10.3 version of gesture handler