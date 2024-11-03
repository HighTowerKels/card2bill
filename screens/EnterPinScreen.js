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
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handlePinChange = (value) => {
        // Only allow numeric input
        if (/^\d{0,4}$/.test(value)) {
            setPin(value);
        }
    };

    const handlePinSubmit = async () => {
        try {
            setIsLoading(true);
            // Show the modal
            setIsModalVisible(true);

            // Simulate API call or verification process
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Navigate to next screen
            navigation.navigate("AccountCheck");
        } catch (error) {
            console.error('Error submitting PIN:', error);
            // Handle error case here
        } finally {
            setIsLoading(false);
            setIsModalVisible(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.mainContainer}
        >
            <LinearGradient
                colors={[COLORS.primary, COLORS.primary]}
                style={styles.gradient}
            >
                <Appbar.Header>
                    <Appbar.BackAction 
                        onPress={() => navigation.goBack()} 
                        disabled={isLoading}
                    />
                    <Appbar.Content title="Enter PIN" />
                </Appbar.Header>
                
                <ScrollView 
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.contentContainer}>
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
                            editable={!isLoading}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                mode="contained"
                                onPress={handlePinSubmit}
                                style={styles.submitButton}
                                disabled={pin.length !== 4 || isLoading}
                                loading={isLoading}
                            >
                                {isLoading ? 'Processing...' : 'Submit'}
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>

            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => {
                    if (!isLoading) setIsModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color={COLORS.secondary} />
                        <Text style={styles.modalText}>
                            Purchase of gift card is on the way. Please wait for verification...
                        </Text>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding * 2,
    },
    title: {
        color: COLORS.secondary,
        ...FONTS.h2,
        marginBottom: SIZES.padding * 2,
        textAlign: 'center',
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
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: SIZES.padding * 2,
    },
    submitButton: {
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
        width: '80%',
        padding: SIZES.padding * 3,
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