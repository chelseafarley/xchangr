import * as React from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView, Platform, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Exchange, XchangrAppState } from '../types';
import { View } from '../components/Themed';
import BeaconContext from '../navigation/BeaconContext';

export default function AddExchangeScreen() {
  const [toCurrency, setToCurrency] = React.useState("");
  const [toCurrencyValue, setToCurrencyValue] = React.useState("");
  const [fromCurrency, setFromCurrency] = React.useState("");
  const [fromCurrencyValue, setFromCurrencyValue] = React.useState("");

  const addExchange = (context: XchangrAppState) => {
    const exchange : Exchange  = {
      ToCurrency: toCurrency,
      ToCurrencyValue: parseFloat(toCurrencyValue),
      FromCurrency: fromCurrency,
      FromCurrencyValue: parseFloat(fromCurrencyValue)
    };

    context.AddExchange(exchange);

    setToCurrency('');
    setToCurrencyValue('');
    setFromCurrency('');
    setFromCurrencyValue('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TextInput
            onChangeText={setToCurrency}
            value={toCurrency}
            placeholder="To Currency"
            style={styles.inputText} />
          <TextInput
            onChangeText={setToCurrencyValue}
            value={toCurrencyValue}
            placeholder="To Currency Value"
            keyboardType="numeric"
            style={styles.inputText} />
          <TextInput
            onChangeText={setFromCurrency}
            value={fromCurrency}
            placeholder="From Currency"
            style={styles.inputText} />
          <TextInput
            onChangeText={setFromCurrencyValue}
            value={fromCurrencyValue}
            placeholder="From Currency Value"
            keyboardType="numeric"
            style={styles.inputText} />

          <BeaconContext.Consumer>
            {context => <Button title="Add" onPress={() => addExchange(context)} />}
          </BeaconContext.Consumer>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24
  }
});
