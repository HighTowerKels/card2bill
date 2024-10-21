import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const UploadCardScreen = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async (setImage) => {
    try {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Image Picker Result:', result);

      if (!result.cancelled) {
        console.log('Image URI:', result.assets[0].uri);
        setImage(result.assets[0].uri);
      } else {
        console.log('Image picking was cancelled.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('An error occurred while picking the image. Please try again.');
    }
  };

  

  const uploadImage = async () => {
    if (frontImage && backImage) {
      console.log('Uploading images:', frontImage, backImage);
      // Implement your logic to upload the images

      // Simulate upload delay
      setTimeout(() => {
        console.log('Images uploaded successfully');
        navigation.navigate('EnterPin'); // Navigate to the next screen
      }, 2000);
    } else {
      console.error('Images missing.');
      alert('Please select both front and back images.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://via.placeholder.com/600x800?text=Background+Image' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Upload GiftCard Image" />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(setFrontImage)}>
              <MaterialIcons name="image" size={50} color="black" />
              <Text style={styles.title}>Upload Front Image</Text>
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

          <View style={styles.imagePickerContainer}>
            <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(setBackImage)}>
              <MaterialIcons name="image" size={50} color="black" />
              <Text style={styles.title}>Upload Back Image</Text>
              {backImage && (
                <FontAwesome name="check-circle" size={24} color="green" style={styles.checkIcon} />
              )}
            </TouchableOpacity>
            {backImage && (
              <View style={styles.previewContainer}>
                <Image source={{ uri: backImage }} style={styles.previewImage} />
              </View>
            )}
          </View>

          <Button
            icon="upload"
            mode="contained"
            onPress={uploadImage}
            style={styles.uploadButton}
            disabled={!frontImage || !backImage} // Disable button if the images are not selected
          >
            Upload Images
          </Button>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire screen
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent overlay to ensure content is readable
  },
  container: {
    padding: 20,
    backgroundColor: 'transparent', // Ensure background is transparent
  },
  title: {
    fontSize: 18,
    marginTop: 10,
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
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  uploadButton: {
    marginTop: 20,
    height: 60,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UploadCardScreen;
