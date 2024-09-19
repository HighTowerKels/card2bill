import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Image , ScrollView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
const WalletScreen = ({ navigation }) => {
  const cryptoAmount = 5.25; // Example crypto amount, replace with actual data
  const companyWalletAddress = '0xABCDEF123456789'; // Example company wallet address, replace with actual address
  const qrCodeImageUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0xABCDEF123456789'; // Replace with actual QR code URL

  const handleCopyAddress = () => {
    Clipboard.setString(companyWalletAddress);
    alert('Wallet address copied to clipboard!');
  };

  const handleProceed = () => {
    // Add navigation logic to proceed to the next screen or perform an action
    navigation.navigate('CryptoUpload');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Wallet Details" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.containers}>
        
      <View style={styles.content}>
        <Text>TRANSFER</Text>
        <Text style={styles.label}>Crypto Amount:</Text>
        <Text style={styles.value}>{cryptoAmount} BTC</Text>

        <Text style={styles.label}>Wallet Address:</Text>
        <Text style={styles.pop}>or scan the code below</Text>
        <View style={styles.qrContainer}>
          <Image source={{ uri: qrCodeImageUrl }} style={styles.qrCode} />
        </View>
        <Text style={styles.walletAddress}>{companyWalletAddress}</Text>

        <TouchableOpacity onPress={handleCopyAddress} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Address</Text>
        </TouchableOpacity>

        <Button mode="contained" onPress={handleProceed} style={styles.proceedButton}>
          Proceed
        </Button>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containers: {
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    ...FONTS.h3,
    fontWeight: 'bold',
    marginTop: 20,
  },
  pop: {
    ...FONTS.h5,

    marginTop: 20,
  },
  value: {
    ...FONTS.h1,
    marginTop: 10,
  },
  qrContainer: {
    marginVertical: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
  },
  walletAddress: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  copyButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  copyButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  proceedButton: {
    marginTop: 30,
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary
  },
});

export default WalletScreen;
