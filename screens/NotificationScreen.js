import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";

const NotificationScreen = ({ navigation }) => {
    // Sample data for notifications
    const notifications = [
        { id: '1', title: 'New Feature Available!', description: 'Check out the latest updates in the app.', date: '2024-08-12' },
        { id: '2', title: 'Account Security Alert', description: 'Your account password has been changed successfully.', date: '2024-08-10' },
        { id: '3', title: 'Weekly Summary', description: 'Your weekly summary is available for review.', date: '2024-08-08' },
    ];

    function renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.back}
                        style={styles.headerIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Notifications</Text>
            </View>
        );
    }

    function renderNotificationItem({ item }) {
        return (
            <View style={styles.notificationContainer}>
                <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationDescription}>{item.description}</Text>
                    <Text style={styles.notificationDate}>{item.date}</Text>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <FlatList
                data={notifications}
                keyExtractor={item => item.id}
                renderItem={renderNotificationItem}
                contentContainerStyle={styles.listContainer}
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding * 2,
        backgroundColor: COLORS.lightGray,
    },
    headerIcon: {
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
    notificationContainer: {
        borderBottomColor: COLORS.lightGray,
        borderBottomWidth: 1,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
    },
    notificationContent: {
        marginBottom: SIZES.padding,
    },
    notificationTitle: {
        ...FONTS.h3,
        color: COLORS.black,
    },
    notificationDescription: {
        ...FONTS.body3,
        color: COLORS.gray,
    },
    notificationDate: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginTop: SIZES.padding / 2,
    },
    listContainer: {
        paddingHorizontal: SIZES.padding,
    },
});

export default NotificationScreen;
