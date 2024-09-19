import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";


const UploadCardBackScreen = () => {
  const [frontImage, setFrontImage] = useState(null);
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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Image Picker Result:', result);

      if (!result.cancelled) {
        console.log('Image URI:', result.assets[0].uri);
        setFrontImage(result.assets[0].uri);
      } else {
        console.log('Image picking was cancelled.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('An error occurred while picking the image. Please try again.');
    }
  };

  const uploadImage = async () => {
    if (frontImage) {
      console.log('Uploading image:', frontImage);
      // Implement your logic to upload the image

      // Simulate upload delay
      setTimeout(() => {
        console.log('Image uploaded successfully');
        navigation.navigate('EnterPin'); // Navigate to the next screen
      }, 2000);
    } else {
      console.error('No image to upload.');
      alert('Please select an image first.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Upload GiftCard Image" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <MaterialIcons name="image" size={50} color="black" />
            <Text style={styles.title}>Upload Black Image</Text>
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

        <Button
          icon="upload"
          mode="contained"
          onPress={uploadImage}
          style={{ marginTop: 20,  height: 60,
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          color:COLORS.primary }}
          disabled={!frontImage} // Disable button if the image is not selected
        >
          Upload Image
        </Button>
      </ScrollView>
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
});

export default UploadCardBackScreen;
