import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View } from './Themed';
import Calculator from './Calculator';
import { ExchangeListItemProps } from '../types';

export default function ExchangeListItem(props: ExchangeListItemProps) {
  const [isCalculating, setIsCalculating] = React.useState(false);

  const getCalculator = () => {
    if (isCalculating) {
      return <Calculator Exchange={props.Exchange} />
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.bodyText}>{props.Exchange.FromCurrencyValue / props.Exchange.ToCurrencyValue} {props.Exchange.FromCurrency} for 1 {props.Exchange.ToCurrency}</Text>
        {getCalculator()}
      </View>
      <TouchableOpacity onPress={() => props.DeleteExchange(props.Exchange)}>
        <FontAwesome style={styles.action} size={30} name="trash" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsCalculating(!isCalculating)}>
        <FontAwesome style={styles.action} size={30} name="calculator" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  left: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    margin: 8
  },
  bodyText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center'
  },
  action: {
    margin: 8
  }
});
