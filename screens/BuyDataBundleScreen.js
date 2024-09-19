import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Appbar, Button, RadioButton } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useRoute and useNavigation hooks
import { COLORS, SIZES, FONTS } from "../constants";

const BuyDataBundleScreen = () => {
    const route = useRoute(); // Hook into route
    const navigation = useNavigation(); // Hook into navigation
    const { network } = route.params || {}; // Destructure network from params

    const [selectedBundle, setSelectedBundle] = useState('daily');
    const [amount, setAmount] = useState('');

    const handleBuy = () => {
        console.log(`Buying ${selectedBundle} bundle for $${amount} on ${network}`);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={`Buy Data Bundle (${network})`} />
            </Appbar.Header>
            <View style={styles.body}>
                <Text style={styles.label}>Select Data Bundle</Text>
                <RadioButton.Group
                    onValueChange={newValue => setSelectedBundle(newValue)}
                    value={selectedBundle}
                >
                    <View style={styles.radioItem}>
                        <RadioButton value="daily" />
                        <Text style={styles.radioLabel}>Daily</Text>
                    </View>
                    <View style={styles.radioItem}>
                        <RadioButton value="weekly" />
                        <Text style={styles.radioLabel}>Weekly</Text>
                    </View>
                    <View style={styles.radioItem}>
                        <RadioButton value="monthly" />
                        <Text style={styles.radioLabel}>Monthly</Text>
                    </View>
                </RadioButton.Group>

                <TextInput
                    label="Amount"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                    keyboardType="numeric"
                    style={styles.input}
                />

                <Button mode="contained" onPress={handleBuy} style={styles.button}>
                    Buy Now
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
    body: {
        flex: 1,
        padding: SIZES.padding,
    },
    label: {
        ...FONTS.h3,
        marginBottom: SIZES.padding,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    radioLabel: {
        ...FONTS.body3,
    },
    input: {
        marginBottom: SIZES.padding,
    },
    button: {
        marginTop: SIZES.padding,
    },
});

export default BuyDataBundleScreen;
