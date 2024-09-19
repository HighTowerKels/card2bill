import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Appbar } from 'react-native-paper';

const CryptoCardScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Crypto" />
      </Appbar.Header>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SellCrypto')}
        >
          <ImageBackground
            source={{ uri: 'https://via.placeholder.com/300x150?text=Sell+Gift+Card' }}
            style={styles.buttonBackground}
            imageStyle={styles.buttonImage}
          >
            <Text style={styles.buttonText}>Sell Crypto</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BuyCrypto')}
        >
          <ImageBackground
            source={{ uri: 'https://via.placeholder.com/300x150?text=Buy+Gift+Card' }}
            style={styles.buttonBackground}
            imageStyle={styles.buttonImage}
          >
            <Text style={styles.buttonText}>Buy Crypto</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionHistoryContainer}>
        <Text style={styles.historyTitle}>Transaction History</Text>
        {/* Add your transaction history list here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150, // Increased height for larger buttons
  },
  buttonImage: {
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionHistoryContainer: {
    margin: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CryptoCardScreen;
