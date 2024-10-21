import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { COLORS, FONTS, SIZES } from '../constants'; // Assuming you have a constants file

const PhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

  function renderHeader() {
    return (
        <View style={{ alignItems: 'center', marginTop: SIZES.padding * 6 }}>
        <Text style={{ 
          fontFamily: 'Inter-Sans-Bold', 
          fontSize: 30, 
          color: COLORS.secondary,
          ...FONTS.h1
        }}>Mobile Number</Text>

        <Text style={{
          color: COLORS.secondary, 
          marginTop: SIZES.padding,
          textAlign: 'center',
          ...FONTS.body3,
          padding: 20,
          width:280
        }}>
          Please enter your phone number. We will send you 4-digit code to verify your account.
        </Text>
      </View>
    );
  }

  function renderPhoneNumberInput() {
    return (
      <View style={styles.phoneInputContainer}>
        <PhoneInput
          defaultValue={phoneNumber}
          defaultCode="US" // You can change this to the default country code you'd like
          layout="first"
          onChangeText={(text) => setPhoneNumber(text)}
          onChangeFormattedText={(text) => setFormattedPhoneNumber(text)}
          withShadow
          autoFocus
          containerStyle={styles.phoneInput}
          textContainerStyle={styles.phoneInputText}
          textInputStyle={styles.textInput}
          codeTextStyle={styles.codeText}
          flagButtonStyle={styles.flagButton}
        />
      </View>
    );
  }

  function renderSubmitButton() {
    return (
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("CodeVerification")}

        >
          <Text style={styles.submitButtonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderPhoneNumberInput()}
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
  header: {
    marginTop: SIZES.padding * 2,
    alignItems: 'center',
  },
  headerText: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  phoneInputContainer: {
    marginTop: SIZES.padding * 3,
    alignItems: 'center',
  },
  phoneInput: {
    width: '90%',
    height: 50,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  phoneInputText: {
    backgroundColor: COLORS.white,
  },
  textInput: {
    color: COLORS.secondary,
    ...FONTS.body3,
  },
  codeText: {
    color: COLORS.secondary,
    ...FONTS.body3,
  },
  flagButton: {
    borderRightColor: COLORS.secondary,
    borderRightWidth: 1,
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
  },
  submitButtonText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});

export default PhoneNumberScreen;
