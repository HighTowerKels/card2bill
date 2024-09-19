import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { COLORS } from '../constants';

const SendMoneyScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('0');
    const [isModalVisible, setModalVisible] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    const maxAmount = 1000; // Example max amount

    const handleNumberPress = (num) => {
        setAmount((prevAmount) => {
            if (prevAmount === '0') return num;
            return prevAmount + num;
        });
    };

    const handleBackspace = () => {
        setAmount((prevAmount) => {
            if (prevAmount.length === 1) return '0';
            return prevAmount.slice(0, -1);
        });
    };

    const handleSend = () => {
        // Display modal for wallet address input
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setWalletAddress('');
    };

    const handleConfirmSend = () => {
        // Navigate to confirm screen with wallet address
        navigation.navigate('Confirm', { amount, walletAddress });
        // Optionally, you can add logic to send the money here
        // console.log(`Sending ${amount} to ${walletAddress}`);
        // Handle send money logic
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Send Money" />
            </Appbar.Header>
            <View style={styles.amountContainer}>
                <Text style={styles.amountText}>${amount}</Text>
            </View>
            <Text style={styles.maxAmountText}>Max you can send: ${maxAmount}</Text>
            <View style={styles.keypadContainer}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
                    <TouchableOpacity key={num} style={styles.key} onPress={() => handleNumberPress(num)}>
                        <Text style={styles.keyText}>{num}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.key} onPress={handleBackspace}>
                    <Text style={styles.keyText}>←</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={handleSend} style={styles.sendButton}>
                Send
            </Button>
            {/* Modal for entering wallet address */}
            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter Wallet Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Wallet Address"
                            value={walletAddress}
                            onChangeText={setWalletAddress}
                        />
                        <View style={styles.modalButtons}>
                            <Button mode="contained" onPress={handleModalClose} style={styles.modalButton}>
                                Cancel
                            </Button>
                            <Button mode="contained" onPress={handleConfirmSend} style={styles.modalButton}>
                                Send
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    amountContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    maxAmountText: {
        textAlign: 'center',
        fontSize: 16,
        color: COLORS.gray,
        marginBottom: 16,
    },
    keypadContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 16,
    },
    key: {
        width: '30%',
        padding: 16,
        margin: 4,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    keyText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    sendButton: {
        margin: 20,
        backgroundColor: COLORS.secondary,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    modalButton: {
        width: '40%',
        backgroundColor: COLORS.secondary,
    },
});

export default SendMoneyScreen;
