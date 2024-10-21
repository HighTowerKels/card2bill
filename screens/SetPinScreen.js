import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from '../constants';

const SetPinScreen = ({ navigation }) => {
    const [pin, setPin] = useState(['', '', '', '']);
    const [isModalVisible, setModalVisible] = useState(false);
    
    // Refs to focus on the next input
    const inputRefs = useRef([]);

    const handlePinChange = (value, index) => {
        const newPin = [...pin];
        if (value.length <= 1) {
            newPin[index] = value;
            setPin(newPin);

            // Move to next input box if a number is entered
            if (value && index < 3) {
                inputRefs.current[index + 1].focus();
            }
            // Move back if backspace
            if (!value && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleSetPin = () => {
        if (pin.every((digit) => digit !== '')) {
            setModalVisible(false);
            navigation.navigate('ConfirmPin', { pin });
        } else {
            alert('PIN must be 4 digits');
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        navigation.navigate('Home'); // Navigate to the next screen
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="" />
            </Appbar.Header>

            <View style={{ alignItems: 'center', marginTop: SIZES.padding * 2 }}>
                <Text style={styles.title}>Set your PIN</Text>
                <Text style={styles.subtitle}>
                    You will use this to make transactions on Card2Pay
                </Text>
            </View>

            <View style={styles.pinContainer}>
                {pin.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={digit}
                        onChangeText={(value) => handlePinChange(value, index)}
                        style={styles.pinInput}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>

            <TouchableOpacity mode="contained" onPress={handleSetPin} style={styles.setPinButton}>
                <Text style={styles.submitButtonText}>Set Pin</Text>
             </TouchableOpacity>

            {/* Success Modal */}
            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>PIN Set Successfully!</Text>
                        <Button mode="contained" onPress={handleModalClose} style={styles.modalButton}>
                            Continue
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontFamily: 'Inter-Sans-Bold',
        fontSize: 30,
        color: COLORS.secondary,
        ...FONTS.h2,
        fontWeight: 'bold',
    },
    subtitle: {
        color: COLORS.secondary,
        marginTop: SIZES.padding,
        textAlign: 'center',
        ...FONTS.body4,
        padding: 10,
        width: 400,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: SIZES.padding * 2,
    },
    pinInput: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: COLORS.secondary,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
        color: COLORS.black,
        fontWeight: 'bold',
    },
    setPinButton: {
        width: 300,
        height: 45,
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.padding * 2,
        marginLeft: 30,
        marginBottom: 20,
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
        marginBottom: 20,
    },
    modalButton: {
        width: '100%',
        backgroundColor: COLORS.secondary,
    },
    submitButtonText: {
        color: COLORS.white,
       
      },
});

export default SetPinScreen;
