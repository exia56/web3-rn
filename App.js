/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import bip39 from 'react-native-bip39';
import Web3 from 'web3';
import HDProvider from 'truffle-hdwallet-provider';

// window.randomBytes = asyncRandomBytes;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
let web3 = new Web3();
type Props = {};
type State = {
  mnemonic: String,
  accounts: String
}
export default class App extends Component<Props, State> {
  state = {
    mnemonic: "generating mnemonic...",
    accounts: "getting accounts..."
  }

  componentDidMount() {
    bip39.generateMnemonic(128).then(result => {
      this.setState({ mnemonic: result })
      web3 = new Web3(new HDProvider(result, << rpc url here >>));
      web3.eth.getAccounts().then((accounts) => {
        this.setState({ accounts: JSON.stringify(accounts) })
      })
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.mnemonic}</Text>
        <Text style={styles.welcome}>{this.state.accounts}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
