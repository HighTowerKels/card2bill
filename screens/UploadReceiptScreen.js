import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, Modal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONTS } from "../constants";

const UploadReceiptScreen = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Ensure useState is correctly used
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setFrontImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('An error occurred while picking the image. Please try again.');
    }
  };

  const handleSendReceipt = () => {
    if (frontImage) {
      setModalVisible(true);
      // Simulate upload delay
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('HomeTabs'); // Navigate to the dashboard after the modal
      }, 2000);
    } else {
      alert('Please select an image first.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Upload Receipt" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <MaterialIcons name="image" size={50} color="black" />
            <Text style={styles.title}>Upload Receipt Image</Text>
            {frontImage && (
              <FontAwesome name="check-circle" size={24} color="green" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
          {frontImage && (
            <View style={styles.previewContainer}>
              <Image source={{ uri: frontImage }} style={styles.previewImage} />
            </View>
          )}
        </View>
        {frontImage && (
          <Button
            icon="send"
            mode="contained"
            onPress={handleSendReceipt}
            style={styles.sendButton}
          >
            Send Receipt
          </Button>
        )}
      </ScrollView>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Purchase Processing...</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    color: COLORS.secondary,
  },
  imagePickerContainer: {
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: SIZES.radius,
  },
  sendButton: {
    marginTop: 20,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    ...FONTS.h4,
    marginBottom: 20,
  },
});

export default UploadReceiptScreen;
