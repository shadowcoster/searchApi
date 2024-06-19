import { Text, View, TextInput} from 'react-native';
import React from 'react';
import {ProductsScreen} from './src/screens';
Text.defaultProps = TextInput.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
const App = () => {
  
  return <ProductsScreen />;
};

export default App;
