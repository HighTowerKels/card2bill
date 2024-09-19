import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";

const ProfileScreen = ({ navigation }) => {
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
                <Text style={{ flex: 1, textAlign: 'center', ...FONTS.h2 }}>Profile</Text>
            </View>
        );
    }

    function renderProfileInfo() {
        return (
            <View style={{ alignItems: 'center', marginVertical: SIZES.padding * 2 }}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        marginBottom: SIZES.padding,
                        backgroundColor: COLORS.lightGray
                    }}
                />
                <Text style={{ ...FONTS.h2 }}>Kelvin Johnson</Text>
                <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>kelvin.johnson@example.com</Text>
            </View>
        );
    }

    function renderAccountOptions() {
        return (
            <View style={{ marginHorizontal: SIZES.padding, marginTop: SIZES.padding }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        paddingVertical: SIZES.padding,
                        borderBottomColor: COLORS.lightGray,
                        borderBottomWidth: 1
                    }}
                    onPress={() => navigation.navigate('accountdetails')}
                >
                    <Image
                        source={icons.wallet}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black,
                            marginRight: SIZES.padding
                        }}
                    />
                    <Text style={{ flex: 1, ...FONTS.body3 }}>Account Details</Text>
                    <Image
                        source={icons.rightArrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        paddingVertical: SIZES.padding,
                        borderBottomColor: COLORS.lightGray,
                        borderBottomWidth: 1
                    }}
                    onPress={() => navigation.navigate('history')}
                >
                    <Image
                        source={icons.history}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black,
                            marginRight: SIZES.padding
                        }}
                    />
                    <Text style={{ flex: 1, ...FONTS.body3 }}>Transaction History</Text>
                    <Image
                        source={icons.rightArrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        paddingVertical: SIZES.padding,
                        borderBottomColor: COLORS.lightGray,
                        borderBottomWidth: 1
                    }}
                    onPress={() => navigation.navigate('Security')}
                >
                    <Image
                        source={icons.security}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black,
                            marginRight: SIZES.padding
                        }}
                    />
                    <Text style={{ flex: 1, ...FONTS.body3 }}>Security</Text>
                    <Image
                        source={icons.rightArrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        paddingVertical: SIZES.padding,
                        borderBottomColor: COLORS.lightGray,
                        borderBottomWidth: 1
                    }}
                    onPress={() => navigation.navigate('Notification')}
                >
                    <Image
                        source={icons.bell}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black,
                            marginRight: SIZES.padding
                        }}
                    />
                    <Text style={{ flex: 1, ...FONTS.body3 }}>Notifications</Text>
                    <Image
                        source={icons.rightArrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function renderSettingsOptions() {
        return (
            <View style={{ marginHorizontal: SIZES.padding, marginTop: SIZES.padding }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        paddingVertical: SIZES.padding,
                        borderBottomColor: COLORS.lightGray,
                        borderBottomWidth: 1
                    }}
                    onPress={() => navigation.navigate('Help')}
                >
                    <Image
                        source={icons.about}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black,
                            marginRight: SIZES.padding
                        }}
                    />
                    <Text style={{ flex: 1, ...FONTS.body3 }}>Help</Text>
                    <Image
                        source={icons.rightArrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        paddingVertical: SIZES.padding,
                        borderBottomColor: COLORS.lightGray,
                        borderBottomWidth: 1
                    }}
                    onPress={() => navigation.navigate('About')}
                >
                    <Image
                        source={icons.info}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black,
                            marginRight: SIZES.padding
                        }}
                    />
                    <Text style={{ flex: 1, ...FONTS.body3 }}>About</Text>
                    <Image
                        source={icons.rightArrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        paddingVertical: SIZES.padding,
                    }}
                    onPress={() => console.log("Log Out")}
                >
                    <Image
                        source={icons.logout}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.red,
                            marginRight: SIZES.padding
                        }}
                    />
                    <Text style={{ flex: 1, ...FONTS.body3, color: COLORS.red }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView>
                {renderHeader()}
                {renderProfileInfo()}
                {renderAccountOptions()}
                {renderSettingsOptions()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
