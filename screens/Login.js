import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    ActivityIndicator,
    Alert
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const Login = ({ navigation }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isResettingPassword, setIsResettingPassword] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            navigation.navigate("HomeTabs");
        } catch (error) {
            setError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email");
            return;
        }

        setIsResettingPassword(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            Alert.alert(
                "Password Reset",
                "If an account exists with this email, you will receive password reset instructions."
            );
        } catch (error) {
            setError("Password reset failed. Please try again.");
        } finally {
            setIsResettingPassword(false);
        }
    };

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2
                }}
                onPress={() => navigation.goBack()}
                disabled={isLoading || isResettingPassword}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.secondary,
                        opacity: (isLoading || isResettingPassword) ? 0.5 : 1
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
                {error ? (
                    <Text style={{
                        color: 'red',
                        marginBottom: SIZES.padding,
                        ...FONTS.body4
                    }}>
                        {error}
                    </Text>
                ) : null}

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
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setError("");
                        }}
                        editable={!isLoading && !isResettingPassword}
                        keyboardType="email-address"
                        autoCapitalize="none"
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
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setError("");
                        }}
                        editable={!isLoading && !isResettingPassword}
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
                        disabled={isLoading || isResettingPassword}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.secondary,
                                opacity: (isLoading || isResettingPassword) ? 0.5 : 1
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
                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-end',
                        marginBottom: SIZES.padding
                    }}
                    onPress={handleForgotPassword}
                    disabled={isLoading || isResettingPassword}
                >
                    <Text style={{
                        color: COLORS.secondary,
                        opacity: (isLoading || isResettingPassword) ? 0.5 : 1,
                        ...FONTS.body4
                    }}>
                        {isResettingPassword ? "Sending reset link..." : "Forgot Password?"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.secondary,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isLoading ? 0.7 : 1
                    }}
                    onPress={handleLogin}
                    disabled={isLoading || isResettingPassword}
                >
                    {isLoading ? (
                        <ActivityIndicator color={COLORS.primary} />
                    ) : (
                        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>Login</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={isLoading || isResettingPassword}
                    onPress={() => navigation.navigate("SignUp")}
                >
                    <Text
                        style={{
                            color: COLORS.secondary,
                            padding: 10,
                            textAlign: 'center',
                            opacity: (isLoading || isResettingPassword) ? 0.5 : 1,
                            ...FONTS.body4
                        }}
                    >
                        Don't have an account? Sign up
                    </Text>
                </TouchableOpacity>
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
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
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