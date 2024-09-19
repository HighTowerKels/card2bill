import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { COLORS } from '../constants';

const ConfirmSendScreen = ({ navigation, route }) => {
    const { amount, walletAddress } = route.params;

    // Placeholder data for recipient information (replace with actual data)
    const recipient = {
        name: 'Kelvin Ibeh',
        profileImage: 'https://via.placeholder.com/150', // Example placeholder image URL
        walletAddress: '0x9101...ijkl', // Example wallet address
    };

    const handleConfirmSend = () => {
        navigation.navigate('SendPin');
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Confirm Wallet Address" />
            </Appbar.Header>
            <View style={styles.content}>
            <Image source={{ uri: recipient.profileImage }} style={styles.profileImage} />

                <View style={styles.recipientInfo}>
                    <View style={styles.recipientDetails}>
                        <Text style={styles.recipientName}>{recipient.name}</Text>
                        <Text style={styles.walletAddress}>{recipient.walletAddress}</Text>
                    </View>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>Amount: ${amount}</Text>
                </View>
                <Button mode="contained" onPress={handleConfirmSend} style={styles.confirmButton}>
                    Confirm
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    recipientInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 170,
        height: 180,
        borderRadius: 150,
        marginRight: 20,
        bottom:70
    },
    recipientDetails: {
        flex: 1,
    },
    recipientName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign:'center',
        bottom:20
    },
    walletAddress: {
        fontSize: 18,
        color: COLORS.black,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign:'center',
        bottom:20
    },
    amountContainer: {
        marginBottom: 20,
    },
    amountText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    confirmButton: {
        marginTop: 20,
        width: '100%',
        backgroundColor: COLORS.secondary,
    },
});

export default ConfirmSendScreen;
