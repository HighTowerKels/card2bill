import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const Login = ({ navigation }) => {

    const [showPassword, setShowPassword] = React.useState(false);

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2
                }}
                onPress={() => console.log("Login")}
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
                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.secondary, ...FONTS.h4 }}>Login</Text>
            </TouchableOpacity>
        );
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
        );
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
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
        );
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <Text  style={{
                        color:COLORS.secondary,
                        paddingLeft:180,
                        textAlign: 'center',
                        padding:5
                    }}>Forget Password </Text>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.secondary,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("HomeTabs")}
                >
                    <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>Login</Text>
                </TouchableOpacity>
                <View >
                    <Text
                    style={{
                        color:COLORS.secondary,
                        padding:10,
                        textAlign: 'center',
                        ...FONTS.body4
                    }}  onPress={() => navigation.navigate("SignUp")}
                    >Don't have an account ?, Signup</Text>
                    
                </View>
            </View>
        );
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
        </KeyboardAvoidingView>
    );
}

export default Login;
