import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Appbar, Button, Modal, Portal, TextInput, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const CryptoUploadImageScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [pin, setPin] = useState(['', '', '', '']);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const inputRefs = useRef([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Camera permissions are required to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUploadImage = () => {
    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: takePhoto,
        },
        {
          text: 'Gallery',
          onPress: pickImage,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleProceed = () => {
    setModalVisible(true);
  };

  const handleSubmitPIN = () => {
    const fullPin = pin.join('');
    if (fullPin.length === 4) {
      setModalVisible(false);
      setSuccessModalVisible(true);
      // Perform success action here (e.g., navigate to next screen, etc.)
    } else {
      Alert.alert('Please enter a valid 4-digit PIN.');
    }
  };

  const handlePinChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Focus next input box if the current one is filled
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleConfirm = () => {
   
    navigation.navigate('HomeTabs');
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Upload Image" />
        </Appbar.Header>

        <View style={styles.content}>
          <TouchableOpacity style={styles.uploadBox} onPress={handleUploadImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.uploadText}>Tap to upload an image</Text>
            )}
          </TouchableOpacity>

          <Button mode="contained" onPress={handleProceed} style={styles.proceedButton}>
            I have transferred asset
          </Button>
        </View>

        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter PIN</Text>
              <View style={styles.pinContainer}>
                {pin.map((p, index) => (
                  <TextInput
                    key={index}
                    mode="outlined"
                    label=""
                    keyboardType="numeric"
                    secureTextEntry
                    value={p}
                    onChangeText={(value) => handlePinChange(value, index)}
                    style={styles.pinInput}
                    maxLength={1}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                  />
                ))}
              </View>
              <Button mode="contained" onPress={handleSubmitPIN} style={styles.modalButton}>
                Submit
              </Button>
            </View>
          </Modal>
          
          <Modal visible={successModalVisible} onDismiss={() => setSuccessModalVisible(false)} contentContainerStyle={styles.successModal}>
            <View style={styles.successModalContent}>
              <Image source={require('../assets/tick.png')} style={styles.successImage} />
              <Text style={styles.successTitle}>Success</Text>
              <Text style={styles.successMessage}>Your trade is being processed, and you will be credited once it has been approved by the admin.</Text>
              <Button mode="contained" onPress={handleConfirm} style={styles.doneButton}>
                Done
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  uploadBox: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  uploadText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  proceedButton: {
    marginTop: 30,
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  pinInput: {
    width: 50,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 20,
    width: '80%',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  successModal: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successModalContent: {
    alignItems: 'center',
  },
  successImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  successTitle: {
    ...FONTS.h1,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  successMessage: {
    ...FONTS.body3,
    marginBottom: 20,
    textAlign: 'center',
  },
  doneButton: {
    width: 150,
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    padding: 10
  },
});

export default CryptoUploadImageScreen;
