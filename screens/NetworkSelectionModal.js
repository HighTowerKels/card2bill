import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONTS } from "../constants";

const NetworkSelectionModal = ({ visible, onDismiss }) => {
    const [selectedNetwork, setSelectedNetwork] = useState(null);
    const navigation = useNavigation(); // Hook into navigation

    const handleNetworkChange = (newValue) => {
        setSelectedNetwork(newValue);
        navigation.navigate('BuyDataBundleScreen', { network: newValue });
        onDismiss();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onDismiss}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Network</Text>
                    <RadioButton.Group
                        onValueChange={handleNetworkChange}
                        value={selectedNetwork}
                    >
                        {["MTN", "AIRTEL", "GLO", "ETISALAT"].map((network) => (
                            <View style={styles.radioItem} key={network}>
                                <RadioButton value={network} />
                                <Text style={styles.radioLabel}>{network}</Text>
                            </View>
                        ))}
                    </RadioButton.Group>

                    <View style={styles.modalActions}>
                        <Button onPress={onDismiss}>Cancel</Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        borderRadius: 10,
        width: '80%',
        maxHeight: '70%',
    },
    modalTitle: {
        ...FONTS.h3,
        marginBottom: SIZES.padding,
        textAlign: 'center',
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    radioLabel: {
        ...FONTS.body3,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: SIZES.padding,
    },
});

export default NetworkSelectionModal;
