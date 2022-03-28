
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabRoutes from './src/Navigation/TabRoutes';
import Routes from './src/Navigation/Routes';


const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <TabRoutes />
      {/* <Routes /> */}
    </View>
  );
};


export default App;

