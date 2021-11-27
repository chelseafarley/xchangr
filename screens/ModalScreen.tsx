import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About xchangr</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text
        style={styles.infoText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        Hi there :) Welcome to xchangr. 
      </Text>

      <Text
        style={styles.infoText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        Here you can store the rate you exchanged money at so that you can calculate the real cost of an item to you when you travel abroad.
        Normal currency exchange apps don't factor in fees you paid to exchange so this is the easiest way to stick to your travel budget.
        And because it uses rates that you enter into the app and stores them locally, it doesn't require internet access!
      </Text>

      <Text
        style={styles.infoText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        Happy Travels &lt;3
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  infoText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24
  }
});
