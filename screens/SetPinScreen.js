import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from '../constants';

const SetPinScreen = ({ navigation }) => {
    const [pin, setPin] = useState(['', '', '', '']);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
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

    const handleSetPin = async () => {
        if (pin.every((digit) => digit !== '')) {
            try {
                setIsLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setModalVisible(true);
            } finally {
                setIsLoading(false);
            }
        } else {
            alert('PIN must be 4 digits');
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        navigation.navigate('ConfirmPin', { pin });
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Appbar.Header>
                <Appbar.BackAction 
                    onPress={() => navigation.goBack()} 
                    disabled={isLoading}
                />
                <Appbar.Content title="" />
            </Appbar.Header>

            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
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
                            style={[
                                styles.pinInput,
                                digit ? styles.pinInputFilled : null
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            editable={!isLoading}
                            secureTextEntry={true}
                        />
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={handleSetPin} 
                        style={[
                            styles.setPinButton,
                            pin.every((digit) => digit !== '') 
                                ? styles.setPinButtonActive 
                                : styles.setPinButtonInactive
                        ]}
                        disabled={!pin.every((digit) => digit !== '') || isLoading}
                    >
                        <Text style={styles.submitButtonText}>
                            {isLoading ? 'Setting PIN...' : 'Set PIN'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Success Modal */}
            <Modal 
                visible={isModalVisible} 
                animationType="fade" 
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>PIN Set Successfully!</Text>
                        <Button 
                            mode="contained" 
                            onPress={handleModalClose} 
                            style={styles.modalButton}
                            labelStyle={styles.modalButtonText}
                        >
                            Continue
                        </Button>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: SIZES.padding * 2,
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: SIZES.padding * 2,
    },
    title: {
        fontSize: 30,
        color: COLORS.secondary,
        ...FONTS.h2,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: COLORS.secondary,
        marginTop: SIZES.padding,
        textAlign: 'center',
        ...FONTS.body4,
        paddingHorizontal: SIZES.padding * 2,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: SIZES.padding * 4,
        gap: SIZES.padding * 2,
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
        backgroundColor: 'white',
    },
    pinInputFilled: {
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: SIZES.padding * 3,
    },
    setPinButton: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    setPinButtonActive: {
        backgroundColor: COLORS.secondary,
    },
    setPinButtonInactive: {
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    submitButtonText: {
        color: COLORS.white,
        ...FONTS.h3,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: SIZES.padding * 2,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        ...FONTS.h3,
        color: COLORS.secondary,
        fontWeight: 'bold',
        marginBottom: SIZES.padding * 2,
        textAlign: 'center',
    },
    modalButton: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.secondary,
    },
    modalButtonText: {
        ...FONTS.h3,
        color: COLORS.white,
    },
});

export default SetPinScreen;