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
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, FONTS, icons } from "../constants";

const THEME_COLORS = {
  primary: '#620C90',
  secondary: '#3A42E1',
  background: '#FFFFFF',
  text: '#333333',
  success: '#4CAF50',
  warning: '#FFC107',
  pending: '#FF9800',
};

const Home = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [verificationList, setVerificationList] = useState([
    { 
      id: 1, 
      label: 'Verify Email', 
      progress: 100, 
      status: 'Completed',
      icon: 'checkmark-circle-outline',
      color: THEME_COLORS.success 
    },
    { 
      id: 2, 
      label: 'Link Phone Number', 
      progress: 50, 
      status: 'In Progress',
      icon: 'time-outline',
      color: THEME_COLORS.warning 
    },
    { 
      id: 3, 
      label: 'Add Bank Account', 
      progress: 0, 
      status: 'Pending',
      icon: 'alert-circle-outline',
      color: THEME_COLORS.pending 
    },
    { 
      id: 4, 
      label: 'Set up Security Questions', 
      progress: 0, 
      status: 'Pending',
      icon: 'alert-circle-outline',
      color: THEME_COLORS.pending 
    },
  ]);

  const featuresData = [
    { id: 1, icon: icons.reload, description: "Airtime" },
    { id: 2, icon: icons.send, description: "Mobile Data" },
    { id: 3, icon: icons.game, description: "Betting" },
    { id: 4, icon: icons.buy, description: "Electricity" },
    { id: 5, icon: icons.phones, description: "Cable TV" },
    { id: 6, icon: icons.sell, description: "Saving" },
  ];

  const messages = [
    "You've earned a bonus!",
    "Link your bank account for rewards.",
    "Secure your account with 2FA.",
    "Track your spending easily!",
  ];

  function renderHeader() {
    return (
      <View>
        <LinearGradient
          colors={[THEME_COLORS.primary, THEME_COLORS.secondary]}
          style={styles.headerContainer}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>Good Morning</Text>
                <Text style={styles.username}>Hightower</Text>
              </View>
              <Image
                source={{ uri: "https://via.placeholder.com/100" }}
                style={styles.profileImage}
              />
            </View>

            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <View style={styles.amountRow}>
                  <Text style={styles.amount}>
                    {showBalance ? "$5,200.00" : "****"}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setShowBalance(!showBalance)}
                    style={styles.eyeButton}
                  >
                    <Ionicons 
                      name={showBalance ? "eye-outline" : "eye-off-outline"} 
                      size={24} 
                      color={THEME_COLORS.background}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.withdrawButton}
                onPress={() => console.log("Withdraw")}
              >
                <Text style={styles.withdrawText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <RenderOverlappingCard messages={messages} />
      </View>
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
        <Animated.View style={[styles.messageContainer, { opacity }]}>
          <View style={styles.iconTextContainer}>
            <Ionicons
              name={messageIcons[currentIndex]}
              size={24}
              color={THEME_COLORS.primary}
              style={styles.messageIcon}
            />
            <Text style={styles.messageText}>
              {messages[currentIndex]}
            </Text>
          </View>
        </Animated.View>
      </Card>
    );
  }

  function renderFeatures() {
    const renderItem = ({ item }) => (
      <TouchableOpacity 
        style={styles.featureItem}
        onPress={() => console.log(item.description)}
      >
        <View style={styles.featureIconContainer}>
          <Image 
            source={item.icon} 
            style={[styles.featureIcon, { tintColor: THEME_COLORS.primary }]} 
          />
        </View>
        <Text style={styles.featureText}>{item.description}</Text>
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
          scrollEnabled={false}
        />
      </View>
    );
  }

  function renderVerificationList() {
    const renderVerificationItem = ({ item }) => (
      <Card style={styles.verificationItem}>
        <Card.Content style={styles.verificationContent}>
          <View style={styles.verificationLeft}>
            <Ionicons
              name={item.icon}
              size={24}
              color={item.color}
              style={styles.verificationIcon}
            />
            <View style={styles.verificationTextContainer}>
              <Text style={styles.verificationLabel}>{item.label}</Text>
              <Text style={[styles.verificationStatus, { color: item.color }]}>
                {item.status}
              </Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${item.progress}%`,
                    backgroundColor: item.color
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: item.color }]}>
              {item.progress}%
            </Text>
          </View>
        </Card.Content>
      </Card>
    );

    return (
      <View style={styles.verificationListContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Verification Checklist</Text>
          <TouchableOpacity onPress={() => console.log("View all")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={verificationList}
          renderItem={renderVerificationItem}
          keyExtractor={(item) => `${item.id}`}
          scrollEnabled={false}
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
            <Text style={styles.sectionTitle}>Quick Actions</Text>
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
    backgroundColor: THEME_COLORS.background,
  },
  headerContainer: {
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 4,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    paddingHorizontal: SIZES.padding,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    color: THEME_COLORS.background,
    ...FONTS.body3,
    opacity: 0.8,
  },
  username: {
    color: THEME_COLORS.background,
    ...FONTS.h2,
    marginTop: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: THEME_COLORS.background,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: SIZES.padding,
  },
  balanceLabel: {
    color: THEME_COLORS.background,
    ...FONTS.body3,
    opacity: 0.8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  amount: {
    color: THEME_COLORS.background,
    ...FONTS.h1,
    fontSize: 36,
  },
  eyeButton: {
    marginLeft: SIZES.base,
    padding: SIZES.base,
  },
  withdrawButton: {
    backgroundColor: THEME_COLORS.background,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
    elevation: 3,
  },
  withdrawText: {
    color: THEME_COLORS.primary,
    ...FONTS.h4,
  },
  overlapCard: {
    marginTop: -30,
    marginHorizontal: SIZES.padding,
    borderRadius: 15,
    elevation: 5,
  },
  messageContainer: {
    padding: SIZES.padding,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageIcon: {
    marginRight: SIZES.base,
  },
  messageText: {
    color: THEME_COLORS.primary,
    ...FONTS.body3,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h2,
    color: THEME_COLORS.text,
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  viewAllText: {
    color: THEME_COLORS.primary,
    ...FONTS.body3,
  },
  featuresContainer: {
    paddingHorizontal: SIZES.padding,
  },
  featureRow: {
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  featureItem: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.background,
    borderRadius: 15,
    padding: SIZES.padding,
    elevation: 2,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${THEME_COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  featureIcon: {
    width: 24,
    height: 24,
  },
  featureText: {
    color: THEME_COLORS.text,
    ...FONTS.body4,
    marginTop: SIZES.base,
    textAlign: 'center',
  },
  verificationListContainer: {
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
  },
  verificationItem: {
    marginBottom: SIZES.base,
    borderRadius: 12,
    elevation: 2,
  },
  verificationContent: {
    flexDirection: 'column',
    gap: SIZES.base,
  },
  verificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationIcon: {
    marginRight: SIZES.base,
  },
  verificationTextContainer: {
    flex: 1,
  },
  verificationLabel: {
    color: THEME_COLORS.text,
    ...FONTS.body3,
    fontWeight: '500',
  },
  verificationStatus: {
    ...FONTS.body4,
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.base,
    marginTop: SIZES.base,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    ...FONTS.body4,
    minWidth: 35,
  },
});

export default Home;