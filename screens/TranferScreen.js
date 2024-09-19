import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Clipboard, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants';

const TransferScreen = ({ navigation }) => {
    const [walletAddress] = useState('0x1234...abcd');
    const [recentActivities, setRecentActivities] = useState([
        { id: '1', type: 'send', amount: '$50', address: '0x5678...efgh', date: '2024-07-01' },
        { id: '2', type: 'receive', amount: '$30', address: '0x9101...ijkl', date: '2024-07-02' },
        // Add more activities as needed
    ]);

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        alert('Wallet address copied to clipboard');
    };

    const renderRecentActivity = ({ item }) => (
        <View style={styles.activityItem}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name={item.type === 'send' ? 'send' : 'arrow-down'}
                    size={24}
                    color={item.type === 'send' ? COLORS.red : COLORS.green}
                />
            </View>
            <View style={styles.activityDetails}>
                <Text style={styles.activityText}>
                    {item.type === 'send' ? 'Sent' : 'Received'} {item.amount}
                </Text>
                <Text style={styles.activityAddress}>{item.address}</Text>
            </View>
            <Text style={styles.activityDate}>{item.date}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Transfer Money" />
            </Appbar.Header>
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.balanceText}>$500.00</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>John Doe</Text>
                    <View style={styles.walletAddress}>
                        <Text style={styles.walletText}>{walletAddress}</Text>
                        <IconButton
                            icon="content-copy"
                            size={20}
                            onPress={() => copyToClipboard(walletAddress)}
                        />
                    </View>
                </View>
            </Card>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    icon="send"
                    onPress={() => navigation.navigate("SendMoneyScreen")}
                    style={styles.button}
                >
                    Send
                </Button>
                <Button
                    mode="contained"
                    icon="arrow-down"
                    onPress={() => navigation.navigate("RequestMoney")}
                    style={styles.button}
                >
                    Request
                </Button>
            </View>
            <View style={styles.recentActivityContainer}>
                <View style={styles.recentActivityHeader}>
                    <Text style={styles.recentActivityTitle}>Recent Activity</Text>
                    <TouchableOpacity onPress={() => console.log('View all pressed')}>
                        <Text style={styles.viewAllText}>View all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={recentActivities}
                    renderItem={renderRecentActivity}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding || 10, // Default to 10 if undefined
      },
    card: {
        marginVertical: SIZES.margin || 10, // Default to 10 if undefined
        borderRadius: SIZES.radius || 5, // Default to 5 if undefined
        elevation: 10,
        backgroundColor: COLORS.secondary,
        padding: 20,
      },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    balanceText: {
        ...FONTS.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    },
    userInfo: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userName: {
       ...FONTS.h5,
    color: COLORS.primary,
    marginBottom: 5,

    },
    walletAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        color:COLORS.primary
    },
    walletText: {
        ...FONTS.h5,
        color: COLORS.primary,
        marginRight: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 16,
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
        color:COLORS.primary,
        backgroundColor:COLORS.secondary
    },
    recentActivityContainer: {
        margin: 16,
    },
    recentActivityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    recentActivityTitle: {
        fontSize: 18,
    },
    viewAllText: {
        fontSize: 14,
        color: '#007bff',
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightgrey,
        marginRight: 12,
    },
    activityDetails: {
        flex: 1,
    },
    activityText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    activityAddress: {
        fontSize: 12,
        color: COLORS.darkgrey,
    },
    activityDate: {
        fontSize: 12,
        color: COLORS.darkgrey,
    },
});

export default TransferScreen;
