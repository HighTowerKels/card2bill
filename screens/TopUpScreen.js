import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Appbar, Card, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const TopUpScreen = ({ navigation }) => {
    const [showBalance, setShowBalance] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef();

    const recentTransactions = [
        { id: '1', description: 'Internet', amount: '-$50.00' },
        { id: '2', description: 'Airtime', amount: '-$20.00' },
        { id: '3', description: 'Crypto', amount: '-$300.00' },
    ];

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Top Up" />
                <Appbar.Action icon="dots-vertical" onPress={() => { /* handle more actions */ }} />
            </Appbar.Header>
            <View style={styles.body}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Account Balance</Text>
                    <View style={styles.balanceValueContainer}>
                        <Text style={styles.balanceValue}>
                            {showBalance ? '$1234.56' : '****'}
                        </Text>
                        <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                            <Image
                                source={showBalance ? icons.eye : icons.disable_eye}
                                resizeMode="contain"
                                style={styles.balanceToggle}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.actionCard}>
                    <View style={styles.actionIconsContainer}>
                        <TouchableOpacity style={styles.actionIcon} onPress={() => navigation.navigate("Network")} >
                            <IconButton icon="wifi" size={36} onPress={() => navigation.navigate("Network")} />
                            <Text style={styles.actionLabel}>Internet</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionIcon}>
                            <IconButton icon="cellphone" size={36} onPress={() => console.log('Airtime icon pressed')} />
                            <Text style={styles.actionLabel}>Airtime</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionIcon} onPress={() => navigation.navigate("TransferScreen")}>
                            <IconButton icon="ticket" size={36} onPress={() => console.log('Ticket icon pressed')} />
                            <Text style={styles.actionLabel}>Betting</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionIcon} onPress={() => navigation.navigate("RequestMoney")}>
                            <IconButton icon="bitcoin" size={36} onPress={() => console.log('Crypto icon pressed')} />
                            <Text style={styles.actionLabel}>Crypto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionIcon} onPress={() => navigation.navigate("Electricity")}>
                            <IconButton icon="flash" size={36} onPress={() => console.log('Electricity icon pressed')} />
                            <Text style={styles.actionLabel}>Electricity</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionIcon} onPress={() => navigation.navigate("Water")}>
                            <IconButton icon="water" size={36} onPress={() => console.log('Water icon pressed')} />
                            <Text style={styles.actionLabel}>Water</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionIcon} onPress={() => navigation.navigate("Transport")}>
                            <IconButton icon="bus" size={36} onPress={() => console.log('Transport icon pressed')} />
                            <Text style={styles.actionLabel}>Transport</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.recentTransactionsContainer}>
                    <Text style={styles.recentTransactionsTitle}>Recent Transactions</Text>
                    <FlatList
                        data={recentTransactions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.transactionItem}>
                                <Text style={styles.transactionDescription}>{item.description}</Text>
                                <Text style={styles.transactionAmount}>{item.amount}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        padding: SIZES.padding,
    },
    balanceContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 60, // Increased margin to make space for overlap
        backgroundColor: COLORS.secondary,
        height: 200,
        padding: SIZES.padding,
        borderRadius: 20,
    },
    balanceLabel: {
        color: COLORS.primary,
        ...FONTS.h2,
        marginBottom: 5,
    },
    balanceValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    balanceValue: {
        color: COLORS.primary,
        ...FONTS.h3,
    },
    balanceToggle: {
        width: 20,
        height: 20,
        tintColor: COLORS.primary,
        marginLeft: SIZES.padding,
    },
    actionCard: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        width: '90%',
        padding: SIZES.padding,
        marginBottom: 20,
        position: 'absolute',
        top: 140, // Positioning to overlap with balance container
        zIndex: 1,
    },
    actionIconsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    actionIcon: {
        alignItems: 'center',
        marginBottom: 10,
    },
    actionLabel: {
        color: COLORS.black,
        ...FONTS.body4,
        marginTop: 5,
    },
    recentTransactionsContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 240, // Adjusted to make space for the action card
    },
    recentTransactionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    transactionDescription: {
        fontSize: 16,
        color: COLORS.black,
    },
    transactionAmount: {
        fontSize: 16,
        color: COLORS.black,
    },
});

export default TopUpScreen;
