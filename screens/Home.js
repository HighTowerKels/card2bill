import React, { useState, useEffect, useRef } from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import { Appbar, Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Home = ({ navigation }) => {

    const [showBalance, setShowBalance] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef();

    const featuresData = [
        {
            id: 1,
            icon: icons.reload,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Airtime"
        },
        {
            id: 2,
            icon: icons.send,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Mobile Data"
        },
        {
            id: 3,
            icon: icons.game,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Betting"
        },
        {
            id: 4,
            icon: icons.buy,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Electricity"
        },
        {
            id: 5,
            icon: icons.phones,
            color: COLORS.red,
            backgroundColor: COLORS.lightpurple,
            description: "Cable TV"
        },
        {
            id: 6,
            icon: icons.sell,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Saving"
        },
        {
            id: 7,
            icon: icons.pay,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightpurple,
            description: "Refferal"
        },
        {
            id: 8,
            icon: icons.wallet,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Financial Overview"
        },
    ];

    const placeholderPromoData = [
        {
            id: 1,
            img: images.promoBanner,
        },
        {
            id: 2,
            img: images.promoBanner,
        },
        {
            id: 3,
            img: images.promoBanner,
        },
        {
            id: 4,
            img: images.promoBanner,
        },
    ];

    const [features, setFeatures] = useState(featuresData);
    const [placeholderPromos, setPlaceholderPromos] = useState(placeholderPromoData);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1 >= placeholderPromos.length ? 0 : prevIndex + 1;
                flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 3000); // Change the interval time as needed

        return () => clearInterval(interval);
    }, []);

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 7, alignItems: 'center', margin: '5%' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h2 }}>Hello Kelvin</Text>
                </View>
    
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.lightGray,
                            marginRight: SIZES.padding
                        }}
                    >
                        <Image
                            source={icons.bell}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.secondary
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                height: 10,
                                width: 10,
                                backgroundColor: COLORS.red,
                                borderRadius: 5
                            }}
                        />
                    </TouchableOpacity>
    
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            overflow: 'hidden',
                            backgroundColor: COLORS.lightGray
                        }}
                        onPress={() => navigation.navigate("Profile")}

                    >
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={{
                                width: 40,
                                height: 40
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    
    function renderBanner() {
        return (
            <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.balanceText}>Account Balance</Text>
              <Text style={styles.balanceAmount}>$2000</Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <TouchableOpacity mode="contained" style={styles.button} onPress={() => setWithdrawModalVisible(true)}>
                <Text>Withdrawal</Text>
              </TouchableOpacity>
              <TouchableOpacity mode="contained" style={styles.button}>
                <Text>Request</Text>
              </TouchableOpacity>
              <TouchableOpacity mode="contained" style={styles.button}>
                <Text>Send</Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        );
    }
    
    function renderFeatures() {
        const Header = () => (
          <View style={styles.featuresHeader}>
            <Text style={FONTS.h3}>Features</Text>
          </View>
        );
    
        const renderItem = ({ item }) => (
          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => navigateToScreen(item.id)}
          >
            <View
              style={{
                ...styles.featureIconContainer,
                backgroundColor: item.backgroundColor,
              }}
            >
              <Image
                source={item.icon}
                resizeMode="contain"
                style={{
                  ...styles.featureIcon,
                  tintColor: item.color,
                }}
              />
            </View>
            <Text style={styles.featureDescription}>{item.description}</Text>
          </TouchableOpacity>
        );
    
        const navigateToScreen = (itemId) => {
          switch (itemId) {
            case 1:
              navigation.navigate('CourseScreen');
              break;
            case 2:
              navigation.navigate('TakeTest');
              break;
            case 3:
              navigation.navigate('AnalyticsScreen');
              break;
            case 4:
              navigation.navigate('BookmarkScreen');
              break;
            case 5:
              navigation.navigate('BlogScreen');
              break;
            case 6:
              navigation.navigate('TakeTest');
              break;
            case 7:
              navigation.navigate('TutorsScreen');
              break;
            case 8:
              navigation.navigate('SettingsScreen');
              break;
            default:
              break;
          }
        };
    
        return (
          <FlatList
            ListHeaderComponent={Header}
            data={features}
            numColumns={4}
            columnWrapperStyle={styles.featuresColumnWrapper}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            style={styles.featuresList}
          />
        );
      }
    
    


    function renderPromoSlider() {
        return (
            <View style={{ marginTop: SIZES.padding * 2, paddingBottom: 80,  margin: 20  }}>
                <Text style={{ ...FONTS.h3, marginBottom: SIZES.padding,}}>Promo for You</Text>
                <FlatList
                    ref={flatListRef}
                    data={placeholderPromos}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                marginRight: SIZES.padding,
                                width: SIZES.width / 1.5,
                            }}
                            onPress={() => console.log(item.title)}
                        >
                            <View
                                style={{
                                    height: 150,
                                    borderRadius: 20,
                                    backgroundColor: COLORS.primary
                                }}
                            >
                                <Image
                                    source={item.img}
                                    resizeMode="cover"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 20
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }

    function renderTransactionHistory() {
        return (
            <View style={{ paddingHorizontal: SIZES.padding }}>
                <View
                    style={{
                        backgroundColor: COLORS.primary,
                        borderRadius: 20,
                        padding: SIZES.padding,
                        marginBottom: SIZES.padding,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        width: '100%'
                    }}
                >
                    <Text style={{ ...FONTS.h2, marginBottom: SIZES.base }}>Transaction History</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZES.base }}>
                        <Text style={{ ...FONTS.body4 }}>Transfer to Bank</Text>
                        <Text style={{ ...FONTS.body4 }}>$1000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZES.base }}>
                        <Text style={{ ...FONTS.body4 }}>Top Up</Text>
                        <Text style={{ ...FONTS.body4 }}>$500</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZES.base }}>
                        <Text style={{ ...FONTS.body4 }}>Wallet to Wallet</Text>
                        <Text style={{ ...FONTS.body4 }}>$200</Text>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <FlatList
                ListHeaderComponent={
                    <>
                        {renderHeader()}
                        {renderBanner()}
                        {renderFeatures()}
                        {renderPromoSlider()}
                        {renderTransactionHistory()}
                    </>
                }
                contentContainerStyle={{ paddingBottom: SIZES.padding * 2 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      padding: SIZES.padding || 5, // Default to 10 if undefined
    },
    card: {
      marginVertical: SIZES.margin || 10, // Default to 10 if undefined
      borderRadius: SIZES.radius || 5, // Default to 5 if undefined
      elevation: 10,
      backgroundColor: COLORS.secondary,
      padding: 10,
      bottom: 50,
      margin: 10
    },
    balanceText: {
      ...FONTS.h5,
      color: COLORS.primary,
      marginBottom: 5,
    },
    balanceAmount: {
      ...FONTS.h3,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    cardActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: SIZES.margin || 10, // Default to 10 if undefined
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      backgroundColor: COLORS.primary,
      borderRadius: SIZES.radius,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      marginTop: 20,
    },
    historyTitle: {
      ...FONTS.h4,
      marginVertical: (SIZES.margin || 10) * 2, // Default to 20 if undefined
      fontWeight: 'bold',
    },
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: SIZES.padding || 10, // Default to 10 if undefined
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    transactionType: {
      ...FONTS.body3,
      color: COLORS.black,
    },
    transactionAmount: {
      ...FONTS.body3,
      color: COLORS.primary,
    },
    transactionDate: {
      ...FONTS.body3,
      color: COLORS.gray,
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      backgroundColor: 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      ...FONTS.h5,
      marginBottom: SIZES.margin || 10, // Default to 10 if undefined
    },
    textInput: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: COLORS.black,
      borderRadius: SIZES.radius || 5, // Default to 5 if undefined
      marginBottom: SIZES.margin || 10, // Default to 10 if undefined
    },
    textInputs: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: COLORS.black,
      borderRadius: SIZES.radius || 5, // Default to 5 if undefined
      marginBottom: SIZES.margin || 10, // Default to 10 if undefined
      backgroundColor:COLORS.secondary
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loaderText: {
      ...FONTS.body3,
      color: COLORS.black,
      marginTop: SIZES.margin || 10, // Default to 10 if undefined
    },
    successModalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    successModalContainer: {
      width: '80%',
      backgroundColor: COLORS.white,
      borderRadius: SIZES.radius || 5, // Default to 5 if undefined
      padding: SIZES.padding || 10, // Default to 10 if undefined
      alignItems: 'center',
    },
    successText: {
      ...FONTS.h5,
      color: COLORS.green,
      marginVertical: SIZES.margin || 10, // Default to 10 if undefined
    },
    inputs: {
      backgroundColor: 'white',
      color: COLORS.black,
      fontWeight: 'bold',
      ...FONTS.h5,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 3,
      borderRadius: 5,
    },
    inputTexts: {
      fontWeight: 'bold',
      color: COLORS.secondary,
      ...FONTS.h4,
      marginVertical: 5,
    },
    modalTitle: {
      backgroundColor: 'white',
      color: COLORS.black,
      fontWeight: 'bold',
      ...FONTS.h5,
    },
    modalItem: {
      padding: 10,
      marginBottom: 10,
      width: '100%',
      alignItems: 'center',
    },
    featuresHeader: {
        marginVertical: SIZES.padding,
        padding: 5,
        bottom: 45
      },
      featuresColumnWrapper: {
        justifyContent: 'space-between',
      },
      featureItem: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: SIZES.padding / 4,
      },
      featureIconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: SIZES.padding /1,
        bottom: 40
      },
      featureIcon: {
        width: 30,
        height: 30,
        padding: 2
      },
      featureDescription: {
        ...FONTS.body4,
        textAlign: 'center',
        bottom: 40
      },
      featuresList: {
        marginVertical: SIZES.padding,
      },
  });
  
export default Home;
