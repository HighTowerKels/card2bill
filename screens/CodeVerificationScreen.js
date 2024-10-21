import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants'; // Assuming you have a constants file

const CodeVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']); // Array to store the 4 digits
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const handleInputChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleResendCode = () => {
    setIsResendDisabled(true);
    // Code to resend verification code here
    console.log('Resending code...');

    // Enable the resend after a short delay (e.g., 60 seconds)
    setTimeout(() => {
      setIsResendDisabled(false);
    }, 60000); // 1 minute delay
  };

  const renderHeader = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: SIZES.padding * 6 }}>
        <Text style={{ 
          fontFamily: 'Inter-Sans-Bold', 
          fontSize: 30, 
          color: COLORS.secondary,
          ...FONTS.h1
        }}>
          Code Verification
        </Text>
        <Text style={{
          color: COLORS.secondary, 
          marginTop: SIZES.padding,
          textAlign: 'center',
          ...FONTS.body3,
          padding: 20,
          width: 280
        }}>
          Please enter the 4-digit code we sent to your phone number to verify your account.
        </Text>
      </View>
    );
  };

  const renderCodeInput = () => {
    return (
      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            keyboardType="numeric"
            maxLength={1}
            style={styles.codeInput}
            onChangeText={(text) => handleInputChange(text, index)}
          />
        ))}
      </View>
    );
  };

  const renderResendCode = () => {
    return (
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn’t receive the code?</Text>
        <TouchableOpacity onPress={handleResendCode} disabled={isResendDisabled}>
          <Text style={[
            styles.resendButtonText, 
            { color: isResendDisabled ? COLORS.gray : COLORS.secondary }
          ]}>
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSubmitButton = () => {
    return (
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("AccountCreated")}

        >
          <Text style={styles.submitButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCodeInput()}
      {renderResendCode()}
      {renderSubmitButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding * 2,
    backgroundColor: COLORS.white,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding,
  },
  codeInput: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray,
    textAlign: 'center',
    fontSize: 24,
    width: 50,
    color: COLORS.secondary,
    ...FONTS.h2,
  },
  resendContainer: {
    marginTop: SIZES.padding*4,
    alignItems: 'center',
  },
  resendText: {
    ...FONTS.body3,
    color: COLORS.secondary,
  },
  resendButtonText: {
    marginTop: 5,
    ...FONTS.body3,
    fontWeight: 'bold',
  },
  submitContainer: {
    marginTop: SIZES.padding * 3,
    alignItems: 'center',
  },
  submitButton: {
    width: '100%',
    height: 45,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding*20,
  },
  submitButtonText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});

export default CodeVerificationScreen;
