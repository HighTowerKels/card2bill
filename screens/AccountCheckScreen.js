import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, Divider, Provider, RadioButton, TextInput } from 'react-native-paper';
import { COLORS, SIZES, FONTS, icons } from "../constants";

const AccountCheckScreen = ({ navigation }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleInputClick = () => {
    setIsClicked(true);
  };

  const handleNavigation = () => {
    navigation.navigate('AwaitingVerification'); // Replace 'NextScreen' with your actual screen name
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Account Information" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.input} onPress={handleInputClick}>
            <Text style={styles.inputText}>First Bank</Text>
            <Text style={styles.inputText}>0345257261</Text>
            <Text style={styles.inputText}>KELECHI KELVIN IBEH</Text>
            {isClicked && (
              <TouchableOpacity style={styles.tickIconContainer} onPress={handleNavigation}>
                <Text style={styles.tickIcon}>✓</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddAccount")}>
            <Text style={styles.addButtonText}>Add Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    height: 250
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  inputText: {
    fontWeight: 'bold',
    color: COLORS.secondary,
    ...FONTS.h4,
    marginVertical: 5,
  },
  tickIconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: 5,
    height: 30
  },
  tickIcon: {
    color: 'white',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  addButtonText: {
    color: COLORS.primary,
    ...FONTS.h3,
  },
});

export default AccountCheckScreen;
