import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Appbar, Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants';

const transactions = [
  { id: '1', type: 'Deposit', amount: '500.00', date: '2024-08-01' },
  { id: '2', type: 'Withdraw', amount: '200.00', date: '2024-08-02' },
  { id: '3', type: 'Deposit', amount: '300.00', date: '2024-08-03' },
];

const TransactionItem = ({ transaction }) => (
  <View style={styles.transactionItem}>
    <Text style={styles.transactionType}>{transaction.type}</Text>
    <Text style={styles.transactionAmount}>${transaction.amount}</Text>
    <Text style={styles.transactionDate}>{transaction.date}</Text>
  </View>
);

const SavingScreen = ({ navigation }) => {
  const [balance] = useState('2,000.00');
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState(false);



  const openAccountModal = () => setAccountModalVisible(true);
  const closeAccountModal = () => setAccountModalVisible(false);

  const handleWithdraw = () => {
    setWithdrawModalVisible(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAccountModalVisible(true);
    }, 2000); // Simulate processing time
  };

  const handleConfirmAccount = () => {
    setAccountModalVisible(false);
    setSuccessModalVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessModalVisible(false);
    // Optionally refresh balance or navigate to another screen
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Savings" />
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.balanceText}>Account Balance</Text>
          <Text style={styles.balanceAmount}>${balance}</Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <TouchableOpacity mode="contained" style={styles.button} onPress={() => setWithdrawModalVisible(true)}>
            <Text>Withdrawal</Text>
          </TouchableOpacity>
          <TouchableOpacity mode="contained" style={styles.button}>
            <Text>Deposit</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>

      <Text style={styles.historyTitle}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={(item) => item.id}
      />

      {/* Withdraw Amount Modal */}
      <Modal
        visible={withdrawModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setWithdrawModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Amount to Withdraw</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Amount"
              keyboardType="numeric"
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
            />
            <Button style={styles.textInputs} mode="contained" onPress={handleWithdraw}>Withdraw</Button>
          </View>
        </View>
      </Modal>

      {/* Processing Loader */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loaderText}>Processing...</Text>
        </View>
      )}

      {/* Account Selection Modal */}
      <Modal
        visible={accountModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAccountModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select or Add Account</Text>
            <TouchableOpacity style={styles.inputs} >
            <Text style={styles.inputTexts}>First Bank</Text>
            <Text style={styles.inputTexts}>0345257261</Text>
            <Text style={styles.inputTexts}>KELECHI KELVIN IBEH</Text>
    
          </TouchableOpacity>
          <TouchableOpacity
                  onPress={() => {
                    closeAccountModal();
                    navigation.navigate('AddAccount');
                  }}
                  style={styles.modalItem}
                >
                  <Text>Add New Bank Account</Text>
                </TouchableOpacity>
            <Button style={styles.textInputs} mode="contained" onPress={handleConfirmAccount}>Confirm</Button>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseSuccess}
      >
        <View style={styles.successModalBackground}>
          <View style={styles.successModalContainer}>
            <MaterialCommunityIcons name="check-circle" size={100} color={COLORS.green} />
            <Text style={styles.successText}>Withdrawal Successful!</Text>
            <Button style={styles.textInputs} mode="contained" onPress={handleCloseSuccess}>OK</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding || 10, // Default to 10 if undefined
  },
  card: {
    marginVertical: SIZES.margin || 10, // Default to 10 if undefined
    borderRadius: SIZES.radius || 5, // Default to 5 if undefined
    elevation: 10,
    backgroundColor: COLORS.secondary,
    padding: 20,
  },
  balanceText: {
    ...FONTS.h5,
    color: COLORS.primary,
    marginBottom: 5,
  },
  balanceAmount: {
    ...FONTS.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.margin || 10, // Default to 10 if undefined
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 20,
  },
  historyTitle: {
    ...FONTS.h4,
    marginVertical: (SIZES.margin || 10) * 2, // Default to 20 if undefined
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding || 10, // Default to 10 if undefined
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  transactionType: {
    ...FONTS.body3,
    color: COLORS.black,
  },
  transactionAmount: {
    ...FONTS.body3,
    color: COLORS.primary,
  },
  transactionDate: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    ...FONTS.h5,
    marginBottom: SIZES.margin || 10, // Default to 10 if undefined
  },
  textInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: SIZES.radius || 5, // Default to 5 if undefined
    marginBottom: SIZES.margin || 10, // Default to 10 if undefined
  },
  textInputs: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: SIZES.radius || 5, // Default to 5 if undefined
    marginBottom: SIZES.margin || 10, // Default to 10 if undefined
    backgroundColor:COLORS.secondary
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderText: {
    ...FONTS.body3,
    color: COLORS.black,
    marginTop: SIZES.margin || 10, // Default to 10 if undefined
  },
  successModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModalContainer: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius || 5, // Default to 5 if undefined
    padding: SIZES.padding || 10, // Default to 10 if undefined
    alignItems: 'center',
  },
  successText: {
    ...FONTS.h5,
    color: COLORS.green,
    marginVertical: SIZES.margin || 10, // Default to 10 if undefined
  },
  inputs: {
    backgroundColor: 'white',
    color: COLORS.black,
    fontWeight: 'bold',
    ...FONTS.h5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 3,
    borderRadius: 5,
  },
  inputTexts: {
    fontWeight: 'bold',
    color: COLORS.secondary,
    ...FONTS.h4,
    marginVertical: 5,
  },
  modalTitle: {
    backgroundColor: 'white',
    color: COLORS.black,
    fontWeight: 'bold',
    ...FONTS.h5,
  },
  modalItem: {
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
});

export default SavingScreen;
