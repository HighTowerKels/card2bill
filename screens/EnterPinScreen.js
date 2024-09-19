import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Modal,
    ActivityIndicator,
} from "react-native";
import { Appbar, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS } from "../constants";

const EnterPinScreen = ({ navigation }) => {
    const [pin, setPin] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handlePinChange = (value) => {
        setPin(value);
    };

    const handlePinSubmit = () => {
        // Implement your logic to verify the PIN
        console.log('Entered PIN:', pin);

        // Show the modal
        setIsModalVisible(true);

        // After a delay, navigate to the Await Verification screen
        setTimeout(() => {
            setIsModalVisible(false);
            navigation.navigate("AccountCheck");
        }, 3000); // 3-second delay
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={[COLORS.primary, COLORS.primary]}
                style={{ flex: 1 }}
            >
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Enter PIN" />
                </Appbar.Header>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Enter your 4-digit PIN</Text>
                    <TextInput
                        style={styles.pinInput}
                        keyboardType="numeric"
                        maxLength={4}
                        secureTextEntry={true}
                        value={pin}
                        onChangeText={handlePinChange}
                        placeholder="****"
                        placeholderTextColor={COLORS.secondary}
                        selectionColor={COLORS.secondary}
                    />
                    <Button
                        mode="contained"
                        onPress={handlePinSubmit}
                        style={styles.submitButton}
                        disabled={pin.length !== 4} // Disable button if PIN is not 4 digits
                    >
                        Submit
                    </Button>
                </ScrollView>
            </LinearGradient>

            {/* Modal */}
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color={COLORS.secondary} />
                        <Text style={styles.modalText}>Purchase of gift card is on the way. Please wait for verification...</Text>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding * 2,
    },
    title: {
        color: COLORS.secondary,
        ...FONTS.h2,
        marginBottom: SIZES.padding * 2,
    },
    pinInput: {
        borderBottomColor: COLORS.secondary,
        borderBottomWidth: 1,
        width: '80%',
        height: 50,
        color: COLORS.secondary,
        textAlign: 'center',
        ...FONTS.h1,
    },
    submitButton: {
        marginTop: SIZES.padding * 2,
        backgroundColor: COLORS.secondary,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        width: '80%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '100%',
        padding: 60,
        backgroundColor: 'white',
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    modalText: {
        marginTop: 20,
        textAlign: 'center',
        color: COLORS.secondary,
        ...FONTS.body4,
    },
});

export default EnterPinScreen;
