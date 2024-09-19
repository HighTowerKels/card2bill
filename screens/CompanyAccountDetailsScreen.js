import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from "../constants";

const CompanyAccountDetailsScreen = ({ navigation }) => {
  const handleUpload = () => {
    navigation.navigate('UploadReciept');
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Company Account Details" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.accountContainer}>
          <Text style={styles.label}>Bank Name:</Text>
          <Text style={styles.value}>XYZ Bank</Text>
          <Text style={styles.label}>Account Number:</Text>
          <Text style={styles.value}>123456789</Text>
          <Text style={styles.label}>Account Holder Name:</Text>
          <Text style={styles.value}>John Doe</Text>
          <Text style={styles.label}>IFSC Code:</Text>
          <Text style={styles.value}>XYZB0001234</Text>
          <Text style={styles.label}>Branch:</Text>
          <Text style={styles.value}>Main Branch</Text>
        </View>
        <Button mode="contained" style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload Bank Receipt</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  accountContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  value: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.primary,
    ...FONTS.h3,
  },
});

export default CompanyAccountDetailsScreen;
