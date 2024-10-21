import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList, // Use FlatList to handle scrolling
  StyleSheet,
  Animated,
  ProgressBarAndroid, // For showing progress on Android
} from "react-native";
import { Card } from "react-native-paper"; // Removed Checkbox
import { COLORS, SIZES, FONTS, icons } from "../constants";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [verificationList, setVerificationList] = useState([
    { id: 1, label: 'Verify Email', progress: 100 },
    { id: 2, label: 'Link Phone Number', progress: 50 },
    { id: 3, label: 'Add Bank Account', progress: 0 },
    { id: 4, label: 'Set up Security Questions', progress: 0 },
  ]);

  const featuresData = [
    { id: 1, icon: icons.reload, description: "Airtime" },
    { id: 2, icon: icons.send, description: "Mobile Data" },
    { id: 3, icon: icons.game, description: "Betting" },
    { id: 4, icon: icons.buy, description: "Electricity" },
    { id: 5, icon: icons.phones, description: "Cable TV" },
    { id: 6, icon: icons.sell, description: "Saving" },
  ];

  // Define your messages here
  const messages = [
    "You’ve earned a bonus!",
    "Link your bank account for rewards.",
    "Secure your account with 2FA.",
    "Track your spending easily!",
  ];

  function renderHeader() {
    return (
      <LinearGradient
        colors={['#620C90', '#3A42E1']}
        style={styles.headerContainer}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.amount}>$5,200</Text>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.profileContainer}>
          <Text style={styles.balance}>Available Balance</Text>
          <Text style={styles.balance}>Hightower</Text>
        </View>

        <TouchableOpacity
          style={styles.withdrawButton}
          onPress={() => console.log("Withdraw")}
        >
          <Text>Withdraw</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  function RenderOverlappingCard({ messages }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const opacity = useRef(new Animated.Value(0)).current;

    const messageIcons = [
      'gift-outline',
      'card-outline',
      'wallet-outline',
      'pricetag-outline',
    ];

    useEffect(() => {
      const animateMessages = () => {
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            delay: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        });
      };

      animateMessages();
      const interval = setInterval(animateMessages, 4000);

      return () => clearInterval(interval);
    }, [messages]);

    return (
      <Card style={styles.overlapCard}>
        <Card.Content>
          <View style={styles.messageContainer}>
            <Animated.View style={{ opacity }}>
              <View style={styles.iconTextContainer}>
                <Ionicons
                  name={messageIcons[currentIndex]}
                  size={24}
                  color="#620C90"
                  style={styles.icon}
                />
                <Text style={styles.messageText}>
                  {messages[currentIndex]}
                </Text>
              </View>
            </Animated.View>
          </View>
        </Card.Content>
      </Card>
    );
  }

  function renderFeatures() {
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.featureItem}>
        <Image source={item.icon} style={styles.featureIcon} />
        <Text style={FONTS.body4}>{item.description}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.featuresContainer}>
        <FlatList
          data={featuresData}
          numColumns={3}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          columnWrapperStyle={styles.featureRow}
        />
      </View>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            {renderHeader()}
            <RenderOverlappingCard messages={messages} />
            <Text style={styles.activity}>Activity</Text>
            {renderFeatures()}
            <Text style={styles.activity}>Verification Checklist</Text>
          </>
        )}
       
      />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    height: "25%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: SIZES.padding,
    justifyContent: "center",
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginRight: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  withdrawButton: {
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
  },
  overlapCard: {
    backgroundColor: COLORS.lightGray,
    marginHorizontal: SIZES.padding,
    marginTop: -30,
    padding: SIZES.padding,
    borderRadius: 15,
    height: 120,
    marginBottom: 40,
    margin: 16,
  },
  messageContainer: {
    height: 60,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3A42E1',
  },
  featuresContainer: {
    padding: SIZES.padding,
  },
  featureRow: {
    justifyContent: "space-between",
    marginVertical: SIZES.base,
  },
  featureItem: {
    width: "28%",
    alignItems: "center",
    padding: SIZES.base,
    backgroundColor: COLORS.white,
    elevation: 5,
    height: 100,
    margin: 2,
    borderRadius: 15,
  },
  featureIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  balance: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '400',
    marginBottom: 20,
    paddingLeft: 25,
  },
  amount: {
    fontSize: 36,
    color: COLORS.primary,
    fontWeight: '700',
    paddingLeft: 25,
  },
  verificationCard: {
    marginBottom: 0,
    elevation: 10,
  },
  verificationTitle: {
    ...FONTS.h5,
    marginBottom: 10,
  },
  verificationList: {
    padding: 10,
  },
  activity: {
    ...FONTS.h3,
    marginLeft: 16,
    marginTop: 16,
  },
});

export default Home;