import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";

const TransactionHistoryScreen = ({ navigation }) => {
    const transactions = [
        { id: '1', type: 'Deposit', amount: '$100.00', date: '2024-08-01', icon: icons.deposit },
        { id: '2', type: 'Withdrawal', amount: '$50.00', date: '2024-08-03', icon: icons.withdrawal },
        { id: '3', type: 'Transfer', amount: '$200.00', date: '2024-08-05', icon: icons.transfer },
        { id: '4', type: 'Payment', amount: '$75.00', date: '2024-08-07', icon: icons.payment },
    ];

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 4, alignItems: 'center', paddingHorizontal: SIZES.padding }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.back}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', ...FONTS.h2 }}>Transaction History</Text>
            </View>
        );
    }

    function renderTransactionItem({ item }) {
        return (
            <View style={{ flexDirection: 'row', marginVertical: 10, paddingHorizontal: SIZES.padding, alignItems: 'center', left:'-35%' }}>
                <Image
                    source={item.icon}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: SIZES.padding,
                        tintColor: COLORS.secondary
                    }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3 }}>{item.type}</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{item.date}</Text>
                </View>
                <Text style={{ ...FONTS.h3 }}>{item.amount}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <FlatList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={renderTransactionItem}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={{ paddingBottom: SIZES.padding * 2 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default TransactionHistoryScreen;
