import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Modal,
    ActivityIndicator,
    Animated,
    Keyboard,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const EmailOTP = ({ navigation }) => {
    // State management
    const [otp, setOtp] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [pin, setPin] = useState(["", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Refs
    const inputs = useRef([]);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    // Keyboard animation effects
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Handle verification status changes
    useEffect(() => {
        if (verificationStatus === 'success') {
            setErrorMessage("");
            setTimeout(() => {
                setModalVisible(false);
                setPinModalVisible(true);
            }, 1500);
        } else if (verificationStatus === 'failure') {
            setErrorMessage("Verification failed. Please try again.");
        }
    }, [verificationStatus]);

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            setErrorMessage("Please enter a valid 6-digit code");
            return;
        }

        try {
            setErrorMessage("");
            setIsLoading(true);
            setModalVisible(true);
            setVerificationStatus(null);

            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            const isSuccess = Math.random() > 0.5;
            setVerificationStatus(isSuccess ? 'success' : 'failure');
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            setVerificationStatus('failure');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePinChange = (value, index) => {
        const newPin = [...pin];
        newPin[index] = value;

        if (value.length === 1 && index < 3) {
            inputs.current[index + 1].focus();
        }

        setPin(newPin);
    };

    function renderHeader() {
        return (
            <TouchableOpacity
                style={styles.header}
                onPress={() => navigation.goBack()}
                disabled={isLoading}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={styles.backIcon}
                />
                <Text style={styles.headerText}>
                    Verify Email
                </Text>
            </TouchableOpacity>
        );
    }

    function renderLogo() {
        return (
            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </Animated.View>
        );
    }

    function renderForm() {
        return (
            <View style={styles.formContainer}>
                <Text style={styles.title}>
                    Enter Verification Code
                </Text>
                <Text style={styles.subtitle}>
                    We've sent a 6-digit code to your email
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.otpInput}
                        placeholder="000000"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        selectionColor={COLORS.white}
                        keyboardType="number-pad"
                        maxLength={6}
                        onChangeText={(value) => {
                            setOtp(value);
                            setErrorMessage("");
                        }}
                        value={otp}
                        editable={!isLoading}
                    />
                </View>
                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
            </View>
        );
    }

    function renderButton() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.verifyButton,
                        {
                            backgroundColor: otp.length === 6 ? COLORS.secondary : 'rgba(255,255,255,0.5)',
                        }
                    ]}
                    onPress={handleVerifyOTP}
                    disabled={otp.length !== 6 || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color={COLORS.white} />
                    ) : (
                        <Text style={styles.buttonText}>
                            Verify Code
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        );
    }

    function renderModal() {
        return (
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {verificationStatus === null && (
                            <>
                                <ActivityIndicator size="large" color={COLORS.primary} />
                                <Text style={styles.modalText}>Verifying code...</Text>
                            </>
                        )}
                        {verificationStatus === 'success' && (
                            <>
                                <Image
                                    source={icons.success}
                                    style={styles.modalIcon}
                                />
                                <Text style={styles.modalText}>Verification Successful!</Text>
                            </>
                        )}
                        {verificationStatus === 'failure' && (
                            <>
                                <Image
                                    source={icons.failed}
                                    style={styles.modalIcon}
                                />
                                <Text style={styles.modalText}>Verification Failed</Text>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        );
    }

    const styles = {
        header: {
            flexDirection: 'row',
            alignItems: "center",
            marginTop: Platform.OS === 'ios' ? SIZES.padding * 6 : SIZES.padding * 4,
            paddingHorizontal: SIZES.padding * 2
        },
        backIcon: {
            width: 20,
            height: 20,
            tintColor: COLORS.white
        },
        headerText: {
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.white,
            ...FONTS.h4,
            fontWeight: '600'
        },
        logoContainer: {
            marginTop: SIZES.padding * 5,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center'
        },
        logo: {
            width: "60%"
        },
        formContainer: {
            marginTop: SIZES.padding * 3,
            marginHorizontal: SIZES.padding * 3,
        },
        title: {
            color: COLORS.white,
            ...FONTS.h2,
            fontWeight: '600',
            marginBottom: SIZES.padding
        },
        subtitle: {
            color: COLORS.lightGray,
            ...FONTS.body4,
            marginBottom: SIZES.padding * 2
        },
        inputContainer: {
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: SIZES.radius,
            padding: SIZES.padding
        },
        otpInput: {
            height: 50,
            color: COLORS.white,
            ...FONTS.h3,
            textAlign: 'center',
            letterSpacing: 8
        },
        errorText: {
            color: '#FF6B6B',
            ...FONTS.body4,
            marginTop: SIZES.padding,
            textAlign: 'center'
        },
        buttonContainer: {
            margin: SIZES.padding * 3,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: Platform.OS === 'ios' ? SIZES.padding * 4 : SIZES.padding * 3
        },
        verifyButton: {
            height: 60,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: SIZES.padding * 3
        },
        buttonText: {
            color: COLORS.white,
            ...FONTS.h3,
            fontWeight: '600'
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalContent: {
            backgroundColor: COLORS.white,
            padding: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            width: '80%'
        },
        modalText: {
            ...FONTS.body3,
            color: COLORS.primary,
            marginTop: SIZES.padding,
            textAlign: 'center'
        },
        modalIcon: {
            width: 60,
            height: 60,
            marginBottom: SIZES.padding
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                </ScrollView>
                {renderButton()}
                {renderModal()}
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export default EmailOTP;