import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { Appbar, Button, Provider, TextInput, Card } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from "../constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const BuyGiftCardDetailsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const items = [
    {
      title: 'Amazon US',
      content: '$ 1~2000',
      image: 'https://www.bootdey.com/image/280x280/8A2BE2/000000',
    },
    {
      title: 'Item 2',
      content: 'Item 2 Content',
      image: 'https://www.bootdey.com/image/280x280/FF7F50/000000',
    },
    {
      title: 'Item 3',
      content: 'Item 3 Content',
      image: 'https://www.bootdey.com/image/280x280/00FFFF/000000',
    },
  ];

  const handlePurchase = () => {
    console.log(`Purchasing ${amount} for ${email}`);
    setModalVisible(true);
  };

  const handleBankTransfer = () => {
    navigation.navigate('CompanyAccountDetailsScreen');
    setModalVisible(false);
  };

  const handleWalletTransfer = () => {
    navigation.navigate('CompanyWalletAddressScreen');
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Buy GiftCard" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const x = event.nativeEvent.contentOffset.x;
              const index = Math.floor(x / (width - 60));
              if (index !== activeIndex) {
                setActiveIndex(index);
              }
            }}
            scrollEventThrottle={16}
          >
            {items.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Input Amount</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
            />
            <Text style={styles.max}>$ 1~2000</Text>
            <TouchableOpacity
              style={styles.purchaseButton}
              onPress={handlePurchase}
            >
              <Text style={styles.purchaseButtonText}>Purchase</Text>
            </TouchableOpacity>
            <Text style={styles.terms}>I have read and agree to the T&C</Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal for Payment Options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Card style={styles.modalCard}>
            <Card.Title title="Select Payment Method" />
            <Card.Content>
              <TouchableOpacity style={styles.option} onPress={handleBankTransfer}>
                <Icon name="bank" size={24} color={COLORS.secondary} style={styles.icon} />
                <Text>Bank Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => { /* Handle Card Payment */ }}>
                <Icon name="credit-card" size={24} color={COLORS.secondary} style={styles.icon} />
                <Text>Card</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={handleWalletTransfer}>
                <Icon name="wallet" size={24} color={COLORS.secondary} style={styles.icon} />
                <Text>Wallet Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => { /* Handle Add Payment Method */ }}>
                <Icon name="plus-circle" size={24} color={COLORS.secondary} style={styles.icon} />
                <Text>Add Payment Method</Text>
              </TouchableOpacity>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setModalVisible(false)}>Cancel</Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
    top: '-8%',
  },
  itemContainer: {
    width: width - 60,
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  formContainer: {
    top: '0%',
    width: '90%',
    padding: 20,
  },
  label: {
    backgroundColor: 'white',
    color: COLORS.secondary,
    fontWeight: 'bold',
    ...FONTS.body2,
    marginVertical: 5,
  },
  input: {
    backgroundColor: 'white',
    color: COLORS.secondary,
    ...FONTS.h4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 3,
    marginBottom: 30,
    borderRadius: 5,
    width: 300,
  },
  max: {
    top: '-10%',
    fontSize: 18,
  },
  terms: {
    textAlign: 'center',
    top: 5,
  },
  purchaseButton: {
    height: 60,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  purchaseButtonText: {
    color: COLORS.primary,
    ...FONTS.h3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
});

export default BuyGiftCardDetailsScreen;
