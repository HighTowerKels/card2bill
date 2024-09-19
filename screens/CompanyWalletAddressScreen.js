import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Clipboard, Alert } from 'react-native';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from "../constants";

const CompanyWalletAddressScreen = ({ navigation }) => {
  const [walletAddress, setWalletAddress] = useState('0x1234567890abcdef1234567890abcdef12345678'); // Sample address
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString(walletAddress);
    setCopied(true);
    Alert.alert('Copied', 'Wallet address copied to clipboard!');
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  const handleTransfer = () => {
    // Add functionality to handle transfer
    Alert.alert('Transfer Initiated', 'Transaction processing...');
    navigation.navigate('TransferScreen'); // Navigate to the transfer screen or relevant screen
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Company Wallet Address" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.walletContainer}>
          <Text style={styles.label}>Wallet Address:</Text>
          <TextInput
            style={styles.addressInput}
            value={walletAddress}
            editable={false}
            mode="outlined"
            multiline
          />
          <Button
            style={styles.copyButton}
            onPress={copyToClipboard}
            mode="contained"
            disabled={copied}
          >
            {copied ? 'Copied!' : 'Copy Address'}
          </Button>
          <Button
            style={styles.transferButton}
            onPress={handleTransfer}
            mode="contained"
          >
            Transfer
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  walletContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 10,
  },
  addressInput: {
    backgroundColor: 'white',
    borderRadius: SIZES.radius,
    marginBottom: 20,
    height: 100,
  },
  copyButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    marginBottom: 20,
    alignItems: 'center',
  },
  transferButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
});

export default CompanyWalletAddressScreen;
