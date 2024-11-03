import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
} from "react-native";
import { Card } from "react-native-paper";
import { COLORS, SIZES, FONTS } from "../constants";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [verificationList] = useState([
    { id: 1, label: 'Verify Email', progress: 100, icon: 'mail-outline' },
    { id: 2, label: 'Link Phone Number', progress: 50, icon: 'phone-portrait-outline' },
    { id: 3, label: 'Add Bank Account', progress: 0, icon: 'card-outline' },
    { id: 4, label: 'Set up Security', progress: 0, icon: 'shield-outline' },
  ]);

  const featuresData = [
    { id: 1, icon: 'phone-portrait-outline', description: "Airtime", color: '#620C90' },
    { id: 2, icon: 'wifi-outline', description: "Mobile Data", color: '#620C90' },
    { id: 3, icon: 'game-controller-outline', description: "Betting", color: '#620C90' },
    { id: 4, icon: 'flash-outline', description: "Electricity", color: '#620C90' },
    { id: 5, icon: 'tv-outline', description: "Cable TV", color: '#620C90' },
    { id: 6, icon: 'wallet-outline', description: "Saving", color: '#620C90' },
  ];

  const messages = [
    "🎁 You've earned a $50 bonus!",
    "🏦 Link your bank account for 2% cashback",
    "🔒 Enable 2FA for account security",
    "📊 Your spending analysis is ready",
  ];

  function renderHeader() {
    return (
      <LinearGradient
        colors={['#620C90', '#3A42E1']}
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>Hightower</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceContainer}>
          <View>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>{showBalance ? "$5,200" : "****"}</Text>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                <Ionicons 
                  name={showBalance ? "eye-outline" : "eye-off-outline"} 
                  size={24} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.withdrawButton}>
            <Ionicons name="wallet-outline" size={20} color="white" />
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  function RenderOverlappingCard({ messages }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const opacity = useRef(new Animated.Value(0)).current;

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
        <Animated.View style={[styles.messageContainer, { opacity }]}>
          <Text style={styles.messageText}>{messages[currentIndex]}</Text>
          <View style={styles.dotContainer}>
            {messages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === currentIndex ? '#620C90' : '#D1D1D1' }
                ]}
              />
            ))}
          </View>
        </Animated.View>
      </Card>
    );
  }

  function renderFeatures() {
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.featureItem}>
        <View style={styles.featureIconContainer}>
          <Ionicons name={item.icon} size={24} color="white" />
        </View>
        <Text style={styles.featureText}>{item.description}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.featuresContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuresData}
          numColumns={3}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          columnWrapperStyle={styles.featureRow}
          scrollEnabled={false}
        />
      </View>
    );
  }

  function renderVerificationList() {
    return (
      <View style={styles.verificationContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Complete Your Profile</Text>
          <Text style={styles.progressText}>2/4</Text>
        </View>
        {verificationList.map((item) => (
          <TouchableOpacity key={item.id} style={styles.verificationItem}>
            <View style={styles.verificationLeft}>
              <View style={[styles.verificationIcon, { backgroundColor: item.progress === 100 ? '#E5FFE5' : '#FFE5E5' }]}>
                <Ionicons name={item.icon} size={20} color={item.progress === 100 ? '#00C853' : '#620C90'} />
              </View>
              <Text style={styles.verificationLabel}>{item.label}</Text>
            </View>
            {item.progress === 100 ? (
              <Ionicons name="checkmark-circle" size={24} color="#00C853" />
            ) : (
              <Ionicons name="chevron-forward" size={24} color="#620C90" />
            )}
          </TouchableOpacity>
        ))}
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
            {renderFeatures()}
            {renderVerificationList()}
          </>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    paddingTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding * 4,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: 'white',
    ...FONTS.body3,
  },
  nameText: {
    color: 'white',
    ...FONTS.h2,
    marginTop: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    color: 'white',
    ...FONTS.body4,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  amount: {
    color: 'white',
    ...FONTS.h1,
    marginRight: 10,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  withdrawText: {
    color: 'white',
    marginLeft: 8,
    ...FONTS.h4,
  },
  overlapCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    marginTop: -40,
    borderRadius: 15,
    elevation: 8,
  },
  messageContainer: {
    padding: SIZES.padding,
    alignItems: 'center',
  },
  messageText: {
    ...FONTS.h4,
    color: '#620C90',
    textAlign: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  featuresContainer: {
    padding: SIZES.padding,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: '#2D3436',
  },
  seeAll: {
    color: '#620C90',
    ...FONTS.body4,
  },
  featureRow: {
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '31%',
    alignItems: 'center',
    padding: SIZES.base,
    borderRadius: 15,
    marginBottom: 10,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#620C90',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    ...FONTS.body4,
    color: '#2D3436',
  },
  verificationContainer: {
    padding: SIZES.padding,
  },
  progressText: {
    color: '#620C90',
    ...FONTS.body4,
  },
  verificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  verificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  verificationLabel: {
    ...FONTS.body3,
    color: '#2D3436',
  },
});

export default Home;