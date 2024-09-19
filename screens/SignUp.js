import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native"
import { LinearGradient } from 'expo-linear-gradient'

import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const SignUp = ({ navigation }) => {

    const [showPassword, setShowPassword] = React.useState(false)
    const [areas, setAreas] = React.useState([])
    const [filteredAreas, setFilteredAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [search, setSearch] = React.useState('')

    React.useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3,idd")
            .then(response => response.json())
            .then(data => {
                let areaData = data.map(item => {
                    return {
                        code: item.cca3,
                        name: item.name?.common,
                        flag: item.flags.png,
                        callingCode: item.idd?.root + item.idd?.suffixes[0],
                    }
                })
                setAreas(areaData)
                setFilteredAreas(areaData)

                if (areaData.length > 0) {
                    let defaultData = areaData.filter(a => a.code == "US")

                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0])
                    }
                }
            })
    }, [])

    const handleSearch = (text) => {
        setSearch(text)
        const filtered = areas.filter(area => 
            area.name.toLowerCase().includes(text.toLowerCase()) || 
            area.callingCode.includes(text)
        )
        setFilteredAreas(filtered)
    }

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2
                }}
                onPress={() => console.log("Sign Up")}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.secondary
                    }}
                />

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.secondary, ...FONTS.h4 }}>Sign Up</Text>
            </TouchableOpacity>
        )
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                />
            </View>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                {/* Full Name */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.secondary, ...FONTS.h2, fontWeight:'heavy' }}>Firstname</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.secondary,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.secondary,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Firstname"
                        placeholderTextColor={COLORS.secondary}
                        selectionColor={COLORS.secondary}
                    />
                </View>
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.secondary, ...FONTS.h2, fontWeight:'heavy' }}>Lastname</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.secondary,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.secondary,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Lastname"
                        placeholderTextColor={COLORS.secondary}
                        selectionColor={COLORS.secondary}
                    />
                </View>

                {/* Username */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.secondary, ...FONTS.h2, fontWeight:'heavy' }}>Username</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.secondary,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.secondary,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Username"
                        placeholderTextColor={COLORS.secondary}
                        selectionColor={COLORS.secondary}
                    />
                </View>

                {/* Email */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.secondary, ...FONTS.h2, fontWeight:'heavy' }}>Email</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.secondary,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.secondary,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Email"
                        placeholderTextColor={COLORS.secondary}
                        selectionColor={COLORS.secondary}
                    />
                </View>

                {/* Phone Number */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
    <Text style={{ color: COLORS.secondary, ...FONTS.h2, fontWeight: 'heavy' }}>Phone Number</Text>

    <View style={{ flexDirection: 'row',backgroundColor: COLORS.white
 }}>
        {/* Country Code */}
        <TouchableOpacity
            style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: COLORS.secondary,
                borderBottomWidth: 1,
                flexDirection: 'row',
                backgroundColor: 'white',  // Set background color to white
                ...FONTS.body2,
            }}
            onPress={() => setModalVisible(true)}
        >
            <View style={{ justifyContent: 'center' }}>
                <Image
                    source={icons.down}
                    style={{
                        width: 10,
                        height: 10,
                        tintColor: COLORS.secondary,
                    }}
                />
            </View>
            <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Image
                    source={{ uri: selectedArea?.flag }}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                />
            </View>

            <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Text style={{ color: COLORS.secondary, ...FONTS.body3, }}>{selectedArea?.callingCode}</Text>
            </View>
        </TouchableOpacity>

        {/* Phone Number */}
        <TextInput
            style={{
                flex: 1,
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.secondary,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.secondary,
                ...FONTS.body3
            }}
            placeholder="Enter Phone number"
            placeholderTextColor={COLORS.secondary}
            selectionColor={COLORS.secondary}
        />
    </View>
</View>


                {/* Password */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.secondary, ...FONTS.h2, fontWeight:'heavy' }}>Password</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.secondary,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.secondary,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.secondary}
                        selectionColor={COLORS.secondary}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.secondary
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.secondary,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("EmailOTP")}
                >
                    <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>Continue</Text>
                </TouchableOpacity>
                <Text style={{
                    color:COLORS.secondary,
                    padding:10,
                    textAlign: 'center',
                    ...FONTS.body4
                }} onPress={() => navigation.navigate("Login")}>Have an account?, Login</Text>
            </View>
        )
    }

    function renderAreaCodesModal() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectedArea(item)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.white,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <TextInput
                                style={{
                                    height: 40,
                                    borderColor: COLORS.secondary,
                                    borderWidth: 1,
                                    borderRadius: SIZES.radius / 2,
                                    margin: SIZES.padding,
                                    paddingHorizontal: SIZES.padding
                                }}
                                placeholder="Search by country name or code"
                                placeholderTextColor={COLORS.secondary}
                                value={search}
                                onChangeText={handleSearch}
                            />
                            <FlatList
                                data={filteredAreas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={[COLORS.primary, COLORS.primary]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    )
}

export default SignUp;
