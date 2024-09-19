import React, { useState } from "react";
import { TextInput, SafeAreaView, View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Modal, Pressable } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import emailIcon from "../assets/icons/email.png";
import bankIcon from "../assets/icons/bank.png";
import deleteIcon from "../assets/icons/delete.png";
import addIcon from "../assets/icons/add.png";
import pinIcon from "../assets/icons/lock.png";
import passwordIcon from "../assets/icons/password.png";
import backIcon from "../assets/icons/back.png";

const SecurityScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const securityOptions = [
        { id: 1, label: "Change Email", icon: emailIcon, details: "Change your email address" },
        { id: 2, label: "See Bank Accounts", icon: bankIcon, details: "View all linked bank accounts" },
        { id: 3, label: "Delete Bank Account", icon: deleteIcon, details: "Remove a linked bank account" },
        { id: 4, label: "Add Bank Account", icon: addIcon, details: "Add a new bank account" },
        { id: 5, label: "Change PIN", icon: pinIcon, details: "Update your security PIN" },
        { id: 6, label: "Change Password", icon: passwordIcon, details: "Change your account password" },
    ];

    const handleOptionPress = (option) => {
        if (option.label === "See Bank Accounts") {
            navigation.navigate("AccountCheck"); // Replace with the actual screen name
        } else if (option.label === "Add Bank Account") {
            navigation.navigate("AddAccount"); // Replace with the actual screen name
        } else {
            setSelectedOption(option);
            setModalVisible(true);
        }
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image
                    source={backIcon}
                    style={styles.backIcon}
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>Security Settings</Text>
        </View>
    );

    const renderSecurityOption = ({ item }) => (
        <TouchableOpacity 
            onPress={() => handleOptionPress(item)}
            style={styles.optionContainer}
        >
            <Image
                source={item.icon}
                style={styles.optionIcon}
                resizeMode="contain"
            />
            <Text style={styles.optionLabel}>{item.label}</Text>
            <Image
                style={styles.arrowIcon}
            />
        </TouchableOpacity>
    );

    const renderModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{selectedOption?.label}</Text>
                    <Text style={styles.modalDetails}>{selectedOption?.details}</Text>
                    <TextInput
        style={styles.input}
       
      ></TextInput>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <FlatList
                data={securityOptions}
                keyExtractor={item => item.id.toString()}
                renderItem={renderSecurityOption}
                contentContainerStyle={styles.listContainer}
            />
            {renderModal()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.lightGray,
        top:15
    },
    backButton: {
        paddingRight: SIZES.padding,
    },
    backIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.black,
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        ...FONTS.h2,
        color: COLORS.black,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        marginVertical: SIZES.padding / 2,
        top:15
    },
    optionIcon: {
        width: 30,
        height: 30,
        marginRight: SIZES.padding,
    },
    optionLabel: {
        flex: 1,
        ...FONTS.h3,
        color: COLORS.black,
    },
    arrowIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.gray,
    },
    listContainer: {
        padding: SIZES.padding,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        borderTopLeftRadius: SIZES.radius,
        borderTopRightRadius: SIZES.radius,
        alignItems: 'center',
    },
    modalTitle: {
        ...FONTS.h2,
        marginBottom: SIZES.padding,
    },
    modalDetails: {
        ...FONTS.body3,
        color: COLORS.gray,
        marginBottom: SIZES.padding * 2,
    },
    closeButton: {
        backgroundColor: COLORS.secondary,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        width: 150,
    },
    closeButtonText: {
        color: COLORS.white,
        ...FONTS.h3,
        textAlign: 'center',
    },
    input: {
        backgroundColor:'white',
        color: COLORS.secondary,
        ...FONTS.h4,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 3,
        marginBottom: 30,
        borderRadius: 5,
        width: 300,
        height:50
      },
});

export default SecurityScreen;
