import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants'; // Assuming you have a constants file

const AccountCreatedScreen = ({ navigation }) => {

  const handleContinue = () => {
    // Handle navigation to the next screen (e.g., home screen)
    navigation.navigate('Home'); // Navigate to your app's home screen or next flow
  };

  const renderThumbsUp = () => {
    return (
      <View style={styles.thumbsUpContainer}>
        {/* Thumbs Up Image */}
        <Image
          source={{ uri: 'https://img.icons8.com/hands/100/thumb-up.png' }} // URL to a thumbs up image
          style={styles.thumbsUpImage}
        />
      </View>
    );
  };

  const renderMessage = () => {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.titleText}>Account Created!</Text>
        <Text style={styles.subtitleText}>
          Your account has been created successfully. Press continue to start using the app.
        </Text>
      </View>
    );
  };

  const renderContinueButton = () => {
    return (
        <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("SetPin")}

        >
          <Text style={styles.submitButtonText}>Continue</Text>
        </TouchableOpacity>
        <Text style={styles.submitText}>By clicking continue, you agree to our Privacy Policy our Terms and Conditions</Text>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderThumbsUp()}
      {renderMessage()}
      {renderContinueButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.padding * 2,
  },
  thumbsUpContainer: {
    marginBottom: SIZES.padding * 8,
  },
  thumbsUpImage: {
    width: 120,
    height: 100,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 15,
  },
  titleText: {
    fontSize: 30,
    color: COLORS.secondary,
    ...FONTS.h1,
    marginBottom: SIZES.padding,
  },
  subtitleText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    ...FONTS.body3,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: SIZES.padding * 3,
    alignItems: 'center',
  },
  continueButton: {
    height: 45,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    ...FONTS.h4,
  },
  submitContainer: {
    marginTop: SIZES.padding * 3,
    alignItems: 'center',
  },
  submitButton: {
    width: 300,
    height: 45,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding*2,
  },
  submitButtonText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  submitText: {
    color: COLORS.secondary,
    ...FONTS.h5,
    textAlign:'center',
    padding:15
  },
});

export default AccountCreatedScreen;
