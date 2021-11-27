import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps, XchangrAppState } from '../types';
import ExchangeListItem from '../components/ExchangeListItem';
import BeaconContext from '../navigation/BeaconContext';

export default function ExchangesScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const renderExchanges = (context: XchangrAppState) => {
    if (context.IsLoading) {
      return <Text style={styles.bodyText}>Loading...</Text>;
    } else if (context.Exchanges.length === 0) {
      return <Text style={styles.bodyText}>No exchange rates added.</Text>;
    } else {
      return context.Exchanges.map((exchange, index) => {
        return <ExchangeListItem key={index} Exchange={exchange} DeleteExchange={context.DeleteExchange} />
      });
    }
  }

  return (
    <View style={styles.container}>
      <BeaconContext.Consumer>
        {context => renderExchanges(context)}
      </BeaconContext.Consumer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24
  }
});
