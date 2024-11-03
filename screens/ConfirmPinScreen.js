import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  Vibration,
  Animated,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from '../constants';

const { width } = Dimensions.get('window');

const ConfirmPinScreen = ({ navigation }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const inputRefs = useRef([]);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handlePinChange = async (value, index) => {
    if (error) setError('');
    
    const newPin = [...pin];
    if (value.length <= 1) {
      newPin[index] = value;
      setPin(newPin);

      // Simple vibration feedback
      Vibration.vibrate(10);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      } else if (!value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const validatePin = () => {
    if (!pin.every((digit) => digit !== '')) {
      setError('PIN must be 4 digits');
      shakeInputs();
      return false;
    }
    return true;
  };

  const shakeInputs = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Error vibration pattern
    Vibration.vibrate([0, 50, 50, 50]);
  };

  const handleSetPin = async () => {
    if (!validatePin()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setModalVisible(true);
      // Success vibration
      Vibration.vibrate(100);
    } catch (err) {
      setError('Failed to confirm PIN. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.navigate('HomeTabs');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="" />
      </Appbar.Header>

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Confirm your PIN</Text>
          <Text style={styles.subtitle}>
            You will use this to make transactions on Card2Pay
          </Text>
        </View>

        <Animated.View 
          style={[
            styles.pinContainer,
            { transform: [{ translateX: shakeAnimation }] }
          ]}
        >
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChangeText={(value) => handlePinChange(value, index)}
              style={[
                styles.pinInput,
                digit && styles.pinInputFilled,
                error && styles.pinInputError
              ]}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry={true}
              editable={!isLoading}
              accessibilityLabel={`PIN digit ${index + 1}`}
              accessibilityHint={`Enter digit ${index + 1} of your PIN`}
            />
          ))}
        </Animated.View>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSetPin}
            disabled={isLoading || pin.includes('')}
            style={[
              styles.setPinButton,
              (isLoading || pin.includes('')) && styles.setPinButtonDisabled
            ]}
            accessibilityRole="button"
            accessibilityLabel="Confirm PIN"
            accessibilityHint="Double-tap to confirm your PIN"
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.submitButtonText}>Confirm PIN</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>PIN Confirmed Successfully!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding * 3,
  },
  title: {
    fontFamily: 'Inter-Sans-Bold',
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
    maxWidth: width * 0.8,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: SIZES.padding * 2,
    width: '100%',
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
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
  },
  pinInputFilled: {
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.primary,
  },
  pinInputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    ...FONTS.body4,
    marginTop: SIZES.padding,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: SIZES.padding * 3,
  },
  setPinButton: {
    width: '80%',
    height: 50,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setPinButtonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.7,
  },
  submitButtonText: {
    color: COLORS.white,
    ...FONTS.h4,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding * 2,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: COLORS.white,
    ...FONTS.h4,
    fontWeight: 'bold',
  },
});

export default ConfirmPinScreen;