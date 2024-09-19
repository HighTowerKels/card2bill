import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Appbar, Button, Menu, Divider, Provider, RadioButton, TextInput } from 'react-native-paper';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
const GiftCardModalScreen = ({ navigation }) => {
  const [cards, setCards] = useState([
    { id: 1, number: '**** **** **** 1234', holder: 'John Doe', expiration: '12/24', logo: 'https://img.icons8.com/color/70/000000/visa.png' },
    { id: 2, number: '**** **** **** 5678', holder: 'John Doe', expiration: '12/24', logo: 'https://img.icons8.com/color/70/000000/mastercard.png' },
    { id: 3, number: 'Apple Pay', holder: 'John Doe', expiration: '', logo: 'https://img.icons8.com/color/70/000000/apple-pay.png' },
  ]);

  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [countryMenuVisible, setCountryMenuVisible] = useState(false);
  const [productMenuVisible, setProductMenuVisible] = useState(false); // State for product menu visibility
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [product, setProduct] = useState('');
  const [rate, setRate] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('physical'); // Default to physical
  const [units, setUnits] = useState(1); // Default to 1
  const [comment, setComment] = useState('');

  const categories = [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Category 3', value: 'category3' },
  ];

  const countries = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
  ];

  const products = [
    { label: 'Product 1', value: 'product1' },
    { label: 'Product 2', value: 'product2' },
    { label: 'Product 3', value: 'product3' },
  ];

  const openCategoryMenu = () => setCategoryMenuVisible(true);
  const closeCategoryMenu = () => setCategoryMenuVisible(false);
  const openCountryMenu = () => setCountryMenuVisible(true);
  const closeCountryMenu = () => setCountryMenuVisible(false);

  const openProductMenu = () => setProductMenuVisible(true); // Function to open product menu
  const closeProductMenu = () => setProductMenuVisible(false); // Function to close product menu

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Sell GiftCard" />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.container}>
        
          <ScrollView
            horizontal
            contentContainerStyle={styles.carouselContainer}
            showsHorizontalScrollIndicator={false}
          >
            {cards.map((card) => (
              <View key={card.id} style={styles.cardContainer}>
                <Image source={{ uri: card.logo }} style={styles.logo} />
                <Text style={styles.cardNumber}>{card.number}</Text>
                <View style={styles.cardInfoContainer}>
                  <View style={styles.cardInfoItem}>
                    <Text style={styles.cardInfoLabel}>Card Holder</Text>
                    <Text style={styles.cardInfoValue}>{card.holder}</Text>
                  </View>
                  <View style={styles.cardInfoItem}>
                    <Text style={styles.cardInfoLabel}>Expiration</Text>
                    <Text style={styles.cardInfoValue}>{card.expiration}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <Menu
            visible={categoryMenuVisible}
            onDismiss={closeCategoryMenu}
            anchor={
              <TouchableOpacity onPress={openCategoryMenu} style={styles.menuButton}>
                <Text style={{ color: COLORS.secondary, ...FONTS.h4, fontWeight:'heavy' }}>{category ? category.label : 'Select Category'}</Text>
              </TouchableOpacity>
            }
          >
            {categories.map((item) => (
              <Menu.Item
                key={item.value}
                onPress={() => {
                  setCategory(item);
                  closeCategoryMenu();
                }}
                title={item.label}
                style={styles.menuItem}
              />
            ))}
          </Menu>
          <Menu
            visible={countryMenuVisible}
            onDismiss={closeCountryMenu}
            anchor={
              <TouchableOpacity onPress={openCountryMenu} style={styles.menuButton}>
                <Text style={{ color: COLORS.secondary, ...FONTS.h4, fontWeight:'heavy' }}>{country ? country.label : 'Select Country'}</Text>
              </TouchableOpacity>
            }
          >
            {countries.map((item) => (
              <Menu.Item
                key={item.value}
                onPress={() => {
                  setCountry(item);
                  closeCountryMenu();
                }}
                title={item.label}
                style={styles.menuItem}
              />
            ))}
          </Menu>
          <Menu
            visible={productMenuVisible}
            onDismiss={closeProductMenu}
            anchor={
              <TouchableOpacity onPress={openProductMenu} style={styles.menuButton}>
                <Text  style={{ color: COLORS.secondary, ...FONTS.h4, fontWeight:'heavy' }}>{product ? product.label : 'Select Product'}</Text>
              </TouchableOpacity>
            }
          >
            {products.map((item) => (
              <Menu.Item
                key={item.value}
                onPress={() => {
                  setProduct(item);
                  closeProductMenu();
                }}
                title={item.label}
                style={styles.menuItem}
              />
            ))}
          </Menu>
          <View style={styles.inputContainer}>
          <TextInput
      label={<Text style={styles.label}>Amount</Text>}
     
    
      style={styles.inputs}
    />
            <View style={styles.inputGroup}>
              <TextInput
               label={<Text style={styles.label}>Min</Text>}
     
    
               style={styles.inputs}
                value={min}
                onChangeText={setMin}
                keyboardType="numeric"
                style={styles.inputGroupItem}
              />
              <TextInput
               label={<Text style={styles.label}>Max</Text>}
     
    
               style={styles.inputs}
                value={max}
                onChangeText={setMax}
                keyboardType="numeric"
                style={styles.inputGroupItem}
              />
            </View>
            <TextInput
              label={<Text style={styles.label}>Amount</Text>}
     
    
              style={styles.inputs}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.inputs}
            />
            <Text style={styles.label}>Type:</Text>

            <View style={styles.row}>
              <View style={styles.radioContainer}>
                <RadioButton.Group onValueChange={newValue => setType(newValue)} value={type}>
                  <View style={styles.radioButton}>
                    <Text style={styles.labels}>Physical</Text>
                    <RadioButton value="physical" />
                  </View>
                  <View style={styles.radioButton}>
                    <Text style={styles.labels}>Virtual</Text>
                    <RadioButton value="virtual" />
                  </View>
                </RadioButton.Group>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Units:</Text>
              <Button onPress={() => setUnits(units + 1)}>+</Button>
              <Text style={styles.units}>{units}</Text>
              <Button style={styles.btnshd} onPress={() => setUnits(Math.max(1, units - 1))}>-</Button>
            </View>
            <TextInput
              label={<Text style={styles.label}>Comment</Text>}
     
    
              style={styles.inputs}
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              style={styles.inputs}
            />
            
            <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.secondary,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("UploadCardScreen")}
                >
                    <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>Upload Gift Card Image</Text>
                </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00008B',
    textAlign: 'center',
  },
  cardContainer: {
    marginHorizontal: 8,
    width: 300,
    height: 180,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 6,
    borderBottomColor: '#ccc',
    bottom: 5
  },
  cardNumber: {
    fontSize: 18,
    letterSpacing: 4,
    marginBottom: 10,
  },
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoItem: {
    flex: 1,
  },
  cardInfoLabel: {
    fontSize: 12,
    color: 'gray',
  },
  cardInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  carouselContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 30,
  },
  menuButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    marginBottom: 30,
    borderRadius: 5,
    top:20
  },
  inputContainer: {
    marginVertical: 20,
  },
  inputs: {
    backgroundColor:'white',
  color: COLORS.secondary, fontWeight:'heavy',
  ...FONTS.h4,
  borderWidth: 1,
    borderColor: '#ddd',
    padding: 3,
    marginBottom: 30,
    borderRadius: 5,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,

    
  },
  inputGroupItem: {
    flex: 1,
    marginRight: 5,
    backgroundColor:'white'

  },
  row: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  label: {
    marginRight: 10,
  },
  radioContainer: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    justifyContent: 'space-between',
  },
  units: {
    marginHorizontal: 10,
    fontSize: 18,
    border: 1,
    borderColor: 'black',
    borderWidth: 2,
    width: 100,
    textAlign:'center'
  },
  menuItem: {
    width: 400,
    backgroundColor: COLORS.primary,
    color:COLORS.secondary,

  },
  label: {
    backgroundColor: 'white',
    color: COLORS.secondary,
    fontWeight: 'bold', // Use 'bold' since 'heavy' is not valid in React Native
    ...FONTS.h4,
  },
  labels: {
    backgroundColor: 'white',
    color: COLORS.secondary,
    fontWeight: 'bold', // Use 'bold' since 'heavy' is not valid in React Native
    ...FONTS.body4,
  },
});

export default GiftCardModalScreen;
