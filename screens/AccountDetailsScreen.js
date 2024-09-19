import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";

const AccountDetailsScreen = ({ navigation }) => {
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 2, alignItems: 'center', paddingHorizontal: SIZES.padding }}>
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
                <Text style={{ flex: 1, textAlign: 'center', ...FONTS.h2 }}>Account Details</Text>
            </View>
        );
    }

    function renderAccountInfo() {
        return (
            <View style={{ margin: SIZES.padding }}>
                <View style={{ flexDirection: 'row', marginBottom: SIZES.padding }}>
                    <Text style={{ flex: 1, color: COLORS.gray, ...FONTS.body4 }}>Account Number</Text>
                    <Text style={{ ...FONTS.h3 }}>1234567890</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: SIZES.padding }}>
                    <Text style={{ flex: 1, color: COLORS.gray, ...FONTS.body4 }}>Bank Name</Text>
                    <Text style={{ ...FONTS.h3 }}>XYZ Bank</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: SIZES.padding }}>
                    <Text style={{ flex: 1, color: COLORS.gray, ...FONTS.body4 }}>Account Balance</Text>
                    <Text style={{ ...FONTS.h3 }}>$12,345.67</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: SIZES.padding }}>
                    <Text style={{ flex: 1, color: COLORS.gray, ...FONTS.body4 }}>Account Type</Text>
                    <Text style={{ ...FONTS.h3 }}>Savings</Text>
                </View>
            </View>
        );
    }

    function renderActions() {
        return (
            <View style={{ margin: SIZES.padding }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        padding: SIZES.padding,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        marginBottom: SIZES.padding
                    }}
                    onPress={() => console.log("Edit Account Details")}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Edit Account Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.red,
                        padding: SIZES.padding,
                        borderRadius: SIZES.radius,
                        alignItems: 'center'
                    }}
                    onPress={() => console.log("Delete Account")}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView>
                {renderHeader()}
                {renderAccountInfo()}
                {renderActions()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountDetailsScreen;
