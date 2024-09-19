import React, { useState, useEffect, useRef } from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const Homes = ({ navigation }) => {
    const [showBalance, setShowBalance] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef();

    const featuresData = [
        {
            id: 1,
            icon: icons.reload,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Top Up"
        },
        {
            id: 2,
            icon: icons.send,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Transfer"
        },
        {
            id: 3,
            icon: icons.wallet,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Wallet"
        },
        {
            id: 4,
            icon: icons.more,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "More"
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
            <View style={{ padding: SIZES.padding * 2, alignItems: 'flex-start', textAlign: 'left', top: '-7%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.black, ...FONTS.h1 }}>
                        {showBalance ? '$1234.56' : '****'}
                    </Text>
                    <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                        <Image
                            source={showBalance ? icons.eye : icons.disable_eye}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.black,
                                marginLeft: SIZES.padding
                            }}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.secondary,
                            paddingVertical: 5,
                            paddingHorizontal: 15,
                            borderRadius: 20,
                            marginLeft: SIZES.padding * 4
                        }}
                        onPress={() => navigation.navigate("SavingScreen")}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Background Card */}
                <View
                    style={{
                        position: 'absolute',
                        top: '5%',
                        width: '120%',
                        height: '120%',
                        backgroundColor: COLORS.primary,
                        borderRadius: 20,
                        zIndex: -1,
                        marginLeft: '-7%'
                    }}
                />
            </View>
        );
    }
    
    
    function renderBoxes() {
        const boxData = [
            {
                id: 1,
                icon: icons.pay,
                header: "Pay Someone",
                subtext: "To wallet, bank or mobile number",
                backgroundColor: '#e6d7ff',
                screen: 'TransferScreen' // Replace with the correct screen name
            },
            {
                id: 2,
                icon: icons.topUp,
                header: "Top Up Wallet",
                subtext: "Top up using card or bank transfer",
                backgroundColor: '#b2ffff',
                screen: 'RequestMoney' // Replace with the correct screen name
            },
            {
                id: 3,
                icon: icons.phones,
                header: "Buy airtime",
                subtext: "Explore more services",
                backgroundColor: '#fff0db',
                screen: 'BuyAirtime' // Replace with the correct screen name
            },
            {
                id: 4,
                icon: icons.sendMoney,
                header: "Pay bills",
                subtext: "Reload your account balance",
                backgroundColor: '#cccccc',
                screen: 'BillsScreen' // Replace with the correct screen name
            },
        ];

        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: SIZES.padding, marginTop: '-15%', margin: 20 }}>
                {boxData.map((box) => (
                    <TouchableOpacity
                        key={box.id}
                        style={{
                            width: '48%',
                            height: 170,
                            backgroundColor: box.backgroundColor,
                            borderRadius: 10,
                            marginBottom: SIZES.padding,
                            padding: SIZES.padding
                        }}
                        onPress={() => navigation.navigate(box.screen)}
                    >
                        <Image
                            source={box.icon}
                            resizeMode="contain"
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: COLORS.black
                            }}
                        />
                        <Text style={{ ...FONTS.body4, marginTop: SIZES.padding * 2, fontWeight: 'bold' }}>{box.header}</Text>
                        <Text style={{ ...FONTS.body5, marginTop: SIZES.base }}>{box.subtext}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
                        {renderBoxes()}
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

export default Homes;
