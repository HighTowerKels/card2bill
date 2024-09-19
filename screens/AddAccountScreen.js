import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Appbar, Button, Provider, TextInput } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from "../constants";

const AddAccountScreen = ({ navigation }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountName, setConfirmAccountName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSaveBankDetails = () => {
    setModalVisible(true);
    setModalMessage('Saving bank details...');
    setTimeout(() => {
      setModalMessage('Bank details saved');
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    }, 2000);
    navigation.goBack()
  };

  const handleProcess = () => {
    // Add your process logic here
    navigation.navigate("AwaitingVerification");
  };

  return (
    <View style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Add Bank Account" titleStyle={styles.appbarTitle} />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.containers}>
      <Text style={styles.label}>Pick Bank Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter bank name"
        value={bankName}
        onChangeText={setBankName}
      />

      <Text style={styles.label}>Account Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter account number"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Confirm Account Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm account name"
        value={confirmAccountName}
        onChangeText={setConfirmAccountName}
      />

      <Button 
        mode="contained"
        onPress={handleSaveBankDetails}
        style={styles.button}
      >
        Save Bank Details
      </Button>
      <Button 
        mode="contained"
        onPress={handleProcess}
        style={styles.button}
      >
        Process
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.modalText}>{modalMessage}</Text>
        </View>
      </Modal>
    </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    backgroundColor:'white',
    color: COLORS.secondary,
    ...FONTS.h4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 3,
    marginBottom: 30,
    borderRadius: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
  },
  appbarTitle: {
    color: COLORS.black,
  },
  button: {
    marginTop: 20,
    height: 60,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default AddAccountScreen;
