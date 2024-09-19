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
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const EmailOTP = ({ navigation }) => {
    const [otp, setOtp] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [pin, setPin] = useState(["", "", "", ""]);
    const inputs = useRef([]);

    useEffect(() => {
        if (verificationStatus === 'success') {
            setTimeout(() => {
                setPinModalVisible(true);
            }, 1000);
        }
    }, [verificationStatus]);

    const handleVerifyOTP = () => {
        setModalVisible(true);
        setVerificationStatus(null); // Reset the status
        // Simulating verification process
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5; // Simulate success or failure
            setVerificationStatus(isSuccess ? 'success' : 'failure');
        }, 2000);
    };

    const handlePinChange = (value, index) => {
        const newPin = [...pin];
        newPin[index] = value;

        // Automatically move focus to the next input
        if (value.length === 1 && index < 3) {
            const nextInput = index + 1;
            inputs.current[nextInput].focus();
        }

        setPin(newPin);
    };

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2
                }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}
                />
                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4 }}>Email OTP</Text>
            </TouchableOpacity>
        );
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                />
            </View>
        );
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                {/* OTP */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.secondary, ...FONTS.h2, fontWeight: 'heavy' }}>Enter OTP</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.secondary,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.secondary,
                            ...FONTS.body3
                        }}
                        placeholder="Enter OTP"
                        placeholderTextColor={COLORS.secondary}
                        selectionColor={COLORS.secondary}
                        keyboardType="number-pad"
                        onChangeText={(value) => setOtp(value)}
                        value={otp}
                    />
                </View>
            </View>
        );
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.secondary,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={handleVerifyOTP}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Verify OTP</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function renderModal() {
        return (
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{
                        width: '80%',
                        padding: SIZES.padding * 4,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                    }}>
                        {verificationStatus === null ? (
                            <>
                                <ActivityIndicator size="large" color={COLORS.secondary} />
                                <Text style={{ ...FONTS.h4, color: COLORS.secondary, marginTop: SIZES.padding }}>Processing Verification...</Text>
                            </>
                        ) : verificationStatus === 'success' ? (
                            <Text style={{ ...FONTS.h4, color: COLORS.secondary }}>Verification Successful!</Text>
                        ) : (
                            <>
                                <Text style={{ ...FONTS.h3, color: COLORS.error, width: 250, textAlign: "center" }}>Verification Unsuccessful. </Text>
                                <TouchableOpacity
                                    style={{
                                        marginTop: SIZES.padding,
                                        borderBottomWidth: 2,
                                        borderBottomColor: COLORS.secondary,
                                        padding: SIZES.padding,
                                        alignItems: 'center',
                                        color: COLORS.secondary,
                                    }}
                                    onPress={() => {
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={{ color: COLORS.secondary, ...FONTS.h3 }}>Request OTP</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        );
    }

    function renderPinModal() {
        return (
            <Modal
                transparent={true}
                animationType="slide"
                visible={pinModalVisible}
                onRequestClose={() => setPinModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{
                        width: '100%',
                        padding: SIZES.padding * 4,
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: SIZES.radius,
                        borderTopRightRadius: SIZES.radius,
                        alignItems: 'center',
                    }}>
                        <Text style={{ ...FONTS.h4, color: COLORS.secondary }}>Enter 4-Digit PIN</Text>
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: SIZES.padding,
                            justifyContent: 'space-between',
                            width: '80%',
                        }}>
                            {pin.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => inputs.current[index] = ref}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderColor: COLORS.secondary,
                                        borderWidth: 1,
                                        borderRadius: SIZES.radius,
                                        textAlign: 'center',
                                        fontSize: SIZES.h2,
                                        color: COLORS.secondary,
                                        marginHorizontal: 5
                                    }}
                                    placeholder="–"
                                    placeholderTextColor={COLORS.secondary}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    onChangeText={(value) => handlePinChange(value, index)}
                                    value={digit}
                                />
                            ))}
                        </View>
                        <TouchableOpacity
                            style={{
                                marginTop: SIZES.padding,
                                height: 60,
                                backgroundColor: COLORS.secondary,
                                borderRadius: SIZES.radius / 1.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '80%'
                            }}
                            onPress={() => {
                                // Handle PIN submission
                                console.log("PIN entered:", pin.join(""));
                                setPinModalVisible(false);
                                navigation.navigate("Login");
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Submit PIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={[COLORS.primary, COLORS.primary]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>
                {renderModal()}
                {renderPinModal()}
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export default EmailOTP;
