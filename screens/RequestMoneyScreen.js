import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar, TextInput, Button, Card } from 'react-native-paper';
import { COLORS, FONTS } from '../constants';

const RequestMoneyScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');

    const user = {
        name: 'John Doe',
        profileImage: 'https://via.placeholder.com/150',
        walletAddress: '0x1234...abcd',
        qrCodeImage: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x1234...abcd',
    };

    const handleRequest = () => {
        console.log(`Requesting ${amount}`);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Request Money" />
            </Appbar.Header>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                    <Card style={styles.card}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text style={styles.walletAddress}>{user.walletAddress}</Text>
                        <Image source={{ uri: user.qrCodeImage }} style={styles.qrCode} />
                        <TextInput
                            label="Amount"
                            value={amount}
                            onChangeText={setAmount}
                            style={styles.amountInput}
                            keyboardType="numeric"
                        />
                        <Button mode="contained" onPress={handleRequest} style={styles.requestButton}>
                            Request
                        </Button>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
    },
    scrollViewContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    card: {
        width: '100%',
        padding: 30,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    walletAddress: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 16,
        textAlign: 'center',
    },
    qrCode: {
        width: 150,
        height: 150,
        marginVertical: 20,
        alignItems: "center",
        left: 80,
    },
    amountInput: {
        backgroundColor: 'white',
        color: COLORS.black,
        fontWeight: 'bold',
        ...FONTS.h5,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 1,
        borderRadius: 5,
        marginBottom: 10,
        width: 300,
    },
    requestButton: {
        marginTop: 20,
        width: 200,
        backgroundColor: COLORS.secondary,
        padding: 10,
        left: 50,
    },
});

export default RequestMoneyScreen;
