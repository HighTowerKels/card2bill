import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { Appbar, Button, RadioButton, TextInput, Provider } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from "../constants";

const CurrencySelector = ({ selectedCurrency, onSelectCurrency, currencies, style }) => {
  const [modalVisible, setModalVisible] = useState(false);
  

  const handleNavigation = () => {
    navigation.navigate('AwaitingVerification'); // Replace 'NextScreen' with your actual screen name
  };


  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.currencyButton, style]}>
        <Text style={styles.currencyText}>{selectedCurrency || 'Select Currency'}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        transparent
        animationType="slide"
      >
        <View style={styles.bottomModalContainer}>
          <View style={styles.bottomModalContent}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            {currencies.map((currency) => (
              <TouchableOpacity
                key={currency}
                onPress={() => {
                  onSelectCurrency(currency);
                  setModalVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text>{currency}</Text>
              </TouchableOpacity>
            ))}
            <Button onPress={() => setModalVisible(false)} mode="text" style={styles.modalButton}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

const CurrencyInput = ({ value, onChangeText, selectedCurrency, onSelectCurrency, currencies, placeholder }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        placeholder={placeholder}
        style={styles.amountInput}
      />
      <CurrencySelector
        selectedCurrency={selectedCurrency}
        onSelectCurrency={onSelectCurrency}
        currencies={currencies}
        style={styles.currencySelector}
      />
    </View>
  );
};

const BuyCryptoScreen = ({ navigation }) => {
  const [asset, setAsset] = useState(null);
  const [network, setNetwork] = useState(null);
  const [youPay, setYouPay] = useState('');
  const [youGet, setYouGet] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [comment, setComment] = useState('');
  const [agreeTnC, setAgreeTnC] = useState(false);
  const [providedDetails, setProvidedDetails] = useState(false);
  const [assetModalVisible, setAssetModalVisible] = useState(false);
  const [networkModalVisible, setNetworkModalVisible] = useState(false);
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedPayCurrency, setSelectedPayCurrency] = useState(null);
  const [selectedGetCurrency, setSelectedGetCurrency] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [confirmWalletAddress, setConfirmWalletAddress] = useState('');
  const [existingAccounts, setExistingAccounts] = useState([
    'Bank Account 1',
    'Bank Account 2',
    'Bank Account 3',
  ]);

  const assets = [
    { value: 'btc', label: 'Bitcoin' },
    { value: 'eth', label: 'Ethereum' },
    { value: 'ltc', label: 'Litecoin' },
  ];

  const networks = [
    { value: 'mainnet', label: 'Mainnet' },
    { value: 'testnet', label: 'Testnet' },
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];

  const openAssetModal = () => setAssetModalVisible(true);
  const closeAssetModal = () => setAssetModalVisible(false);

  const openNetworkModal = () => setNetworkModalVisible(true);
  const closeNetworkModal = () => setNetworkModalVisible(false);

  const openAccountModal = () => setAccountModalVisible(true);
  const closeAccountModal = () => setAccountModalVisible(false);

  const handleSelectAccount = (account) => {
    setBankAccount(account);
    closeAccountModal();
  };

  const [isClicked, setIsClicked] = useState(false);

  const handleInputClick = () => {
    setIsClicked(true);
  };

  const handleSell = () => {
    if (agreeTnC && providedDetails) {
      setConfirmModalVisible(true); // Show confirmation modal
    } else {
      alert('Please agree to the T&C and confirm the provided details.');
    }
  };
  

 
  const handleConfirm = () => {
    setConfirmModalVisible(false);
    navigation.navigate('WalletScreen');
  };
  const [text, setText] = React.useState("");
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Buy Crypto" />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Asset</Text>
            <TouchableOpacity onPress={openAssetModal} style={styles.menuButton}>
              <Text style={{ color: COLORS.black, ...FONTS.h5, fontWeight: 'bold' }}>
                {asset ? asset.label : 'Select Asset'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Network</Text>
            <TouchableOpacity onPress={openNetworkModal} style={styles.menuButton}>
              <Text style={{ color: COLORS.black, ...FONTS.h5, fontWeight: 'bold' }}>
                {network ? network.label : 'Select Network'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>You Pay Amount</Text>
            <CurrencyInput
              value={youPay}
              onChangeText={setYouPay}
              selectedCurrency={selectedPayCurrency}
              onSelectCurrency={setSelectedPayCurrency}
              currencies={currencies}
              placeholder="Enter amount"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>You Get Amount</Text>
            <CurrencyInput
              value={youGet}
              onChangeText={setYouGet}
              selectedCurrency={selectedGetCurrency}
              onSelectCurrency={setSelectedGetCurrency}
              currencies={currencies}
              placeholder="Enter amount"
            />
          </View>

           <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Wallet Address</Text>
            <TextInput
              value={confirmWalletAddress}
              onChangeText={setConfirmWalletAddress}
              style={styles.inputa}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Wallet Address</Text>
            <TextInput
              value={confirmWalletAddress}
              onChangeText={setConfirmWalletAddress}
              style={styles.inputa}
            />
          </View>

        

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Comment</Text>
           
            <TextInput
              multiline
              value={comment}
              onChangeText={setComment}
              style={styles.inputa}
            />
          </View>

          <View style={styles.radioContainer}>
            <RadioButton.Item
              label="I agree to the T&C"
              status={agreeTnC ? 'checked' : 'unchecked'}
              onPress={() => setAgreeTnC(!agreeTnC)}
              style={styles.radioButton}
            />
            <RadioButton.Item
              label="I provided the right details"
              status={providedDetails ? 'checked' : 'unchecked'}
              onPress={() => setProvidedDetails(!providedDetails)}
              style={styles.radioButton}
            />
          </View>
          <Button mode="contained" onPress={handleSell} style={styles.sellButton}>
            <Text style={styles.buttonText}>Buy</Text>
          </Button>

          {/* Bottom modal for selecting asset */}
          <Modal
            visible={assetModalVisible}
            onDismiss={closeAssetModal}
            transparent
            animationType="slide"
          >
            <View style={styles.bottomModalContainer}>
              <View style={styles.bottomModalContent}>
               
                <Button onPress={closeAssetModal} mode="text" style={styles.modalButton}>
                  Close
                </Button>
              </View>
            </View>
          </Modal>

          {/* Bottom modal for selecting network */}
          <Modal
            visible={networkModalVisible}
            onDismiss={closeNetworkModal}
            transparent
            animationType="slide"
          >
            <View style={styles.bottomModalContainer}>
              <View style={styles.bottomModalContent}>
                <Text style={styles.modalTitle}>Select Network</Text>
                {networks.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => {
                      setNetwork(item);
                      closeNetworkModal();
                    }}
                    style={styles.modalItem}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                ))}
                <Button onPress={closeNetworkModal} mode="text" style={styles.modalButton}>
                  Close
                </Button>
              </View>
            </View>
          </Modal>

          {/* Bottom modal for selecting bank account */}
          <Modal
            visible={accountModalVisible}
            onDismiss={closeAccountModal}
            transparent
            animationType="slide"
          >
            <View style={styles.bottomModalContainer}>
              <View style={styles.bottomModalContent}>
                <Text style={styles.modalTitle}>Select Bank Account</Text>
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
                <Button onPress={closeAccountModal} mode="text" style={styles.modalButton}>
                  Close
                </Button>
              </View>
            </View>
          </Modal>

          {/* Confirmation Modal */}
          <Modal
            visible={confirmModalVisible}
            onDismiss={() => setConfirmModalVisible(false)}
            transparent
            animationType="slide"
          >
            <View style={styles.bottomModalContainer}>
              <View style={styles.bottomModalContent}>
                <Text style={styles.modalTitle}>Confirm Your Details</Text>
                <View style={styles.inputs}>
                <Text style={styles.inputTexts}>Asset: {asset ? asset.label : 'N/A'}</Text>
                <Text style={styles.inputTexts}>Network: {network ? network.label : 'N/A'}</Text>
                <Text style={styles.inputTexts}>You Pay: {youPay} {selectedPayCurrency}</Text>
                <Text style={styles.inputTexts}>You Get: {youGet} {selectedGetCurrency}</Text>
                <Text style={styles.inputTexts}>Bank Account: {bankAccount || 'N/A'}</Text>
                <Text style={styles.inputTexts}>Comment: {comment || 'N/A'}</Text>
                </View>
               
                <Button onPress={handleConfirm} mode="contained" style={styles.sellButton}>
                  Confirm
                </Button>
                <Button onPress={() => setConfirmModalVisible(false)} mode="text" style={styles.modalButton}>
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  menuButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  currencyButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor:COLORS.secondary,
  
  },
  currencyText: {
    color: COLORS.primary,
    ...FONTS.h5,
    fontWeight: 'bold',
  },
  currencySelector: {
right: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    backgroundColor: 'white',
    color: COLORS.black,
    fontWeight: 'bold',
    ...FONTS.h5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    paddingRight: 120, // Adjust padding to make space for the currency button
    position: 'relative',
  },
  inputContainer: {
    marginBottom: 10,
    position: 'relative',
  },
  inputa: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: 10,
  },
  label: {
    backgroundColor: 'white',
    color: COLORS.black,
    fontWeight: 'bold',
    ...FONTS.h5,
    marginBottom: 5,
  },
  radioContainer: {
    marginVertical: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sellButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.primary,
    ...FONTS.h3,
  },
  bottomModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: 'center',
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
  modalButton: {
    marginTop: 10,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  inputTexts: {
    fontWeight: 'bold',
    color: COLORS.secondary,
    ...FONTS.h4,
    marginVertical: 5,
  },
  tickIconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: 5,
    height: 30
  },
  tickIcon: {
    color: 'white',
    fontSize: 18,
  },
});

export default BuyCryptoScreen;
