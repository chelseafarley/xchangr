import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { CalculatorProps } from '../types';

export default function Calculator(props: CalculatorProps) {
  const [cost, setCost] = React.useState("");
  const rate = props.Exchange.FromCurrencyValue / props.Exchange.ToCurrencyValue;

  const calculate = (cost: number) => {
    return cost * rate;
  }

  const getConversion = () => {
    if (cost != "") {
      return <Text style={styles.bodyText}>{props.Exchange.ToCurrency} * {rate} = {calculate(parseFloat(cost))} {props.Exchange.FromCurrency}</Text>;
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setCost}
        value={cost}
        placeholder="Amount to Convert"
        keyboardType="numeric"
        style={styles.bodyText} />
      {getConversion()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#aaa",
    borderTopWidth: 2,
    flexDirection: "row",
    marginTop: 8,
    paddingTop: 8,
    marginBottom: 8,
    alignSelf: "stretch"
  },
  bodyText: {
    fontSize: 17,
    textAlign: 'center',
    paddingRight: 4
  }
});
