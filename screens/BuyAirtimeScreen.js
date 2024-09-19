import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, TouchableRipple, SegmentedButtons } from 'react-native-paper';

const BuyAirtimeScreen = ({ navigation }) => {
  const [serviceType, setServiceType] = useState('Airtime');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [dataPrice, setDataPrice] = useState('');

  const networks = [
    { name: 'MTN', value: 'mtn' },
    { name: 'Airtel', value: 'airtel' },
    { name: 'Glo', value: 'glo' },
    { name: '9mobile', value: '9mobile' }
  ];

  const dataPrices = [
    { label: '1GB - ₦500', value: '1gb' },
    { label: '2GB - ₦1000', value: '2gb' },
    { label: '5GB - ₦2000', value: '5gb' }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Buy Airtime or Data" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Service Type Toggle */}
        <SegmentedButtons
          value={serviceType}
          onValueChange={setServiceType}
          buttons={[
            { value: 'Airtime', label: 'Airtime' },
            { value: 'Data', label: 'Data' },
          ]}
          style={styles.segmentedButton}
        />

        {/* Network Selection */}
        {serviceType && (
          <View style={styles.networkContainer}>
            {networks.map((network) => (
              <TouchableRipple
                key={network.value}
                onPress={() => setSelectedNetwork(network.value)}
                style={[
                  styles.networkCard,
                  selectedNetwork === network.value && styles.selectedNetwork
                ]}
              >
                <View style={styles.networkCardContent}>
                  <Text style={[
                    styles.networkText,
                    selectedNetwork === network.value && styles.selectedNetworkText
                  ]}>
                    {network.name}
                  </Text>
                </View>
              </TouchableRipple>
            ))}
          </View>
        )}

        {/* Airtime Fields */}
        {serviceType === 'Airtime' && selectedNetwork && (
          <>
            <TextInput
              label="Enter Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              label="Enter Amount"
              value={amount}
              onChangeText={setAmount}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
            />
            <Button mode="contained" onPress={() => {}} style={styles.buyButton}>
              Buy Airtime
            </Button>
          </>
        )}

        {/* Data Fields */}
        {serviceType === 'Data' && selectedNetwork && (
          <>
            <TouchableRipple
              onPress={() => setDataPrice(dataPrices[0].label)} // Just as an example
              style={styles.dropdown}
            >
              <Text style={styles.dropdownText}>{dataPrice || 'Select Data Price'}</Text>
            </TouchableRipple>
            <TextInput
              label="Enter Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <Button mode="contained" onPress={() => {}} style={styles.buyButton}>
              Buy Data
            </Button>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    elevation: 0,
  },
  content: {
    padding: 20,
  },
  segmentedButton: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  networkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  networkCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  selectedNetwork: {
    backgroundColor: '#6200ee',
  },
  networkCardContent: {
    alignItems: 'center',
  },
  networkText: {
    color: '#6200ee',
  },
  selectedNetworkText: {
    color: 'white',
  },
  buyButton: {
    paddingVertical: 10,
  },
  dropdown: {
    padding: 15,
    borderRadius: 5,
    borderColor: '#6200ee',
    borderWidth: 1,
    marginBottom: 20,
  },
  dropdownText: {
    color: '#6200ee',
  },
});

export default BuyAirtimeScreen;
