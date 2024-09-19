import React from "react";
import {
    View,
    Text,
    Image,
    ActivityIndicator
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, images } from "../constants";

const PreloaderScreen  = ({ navigation }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("Onboarding");
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary]}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Image
                source={images.wallieLogo}
                resizeMode="contain"
                style={{ width: "60%" }}
            />
            <ActivityIndicator size="large" color={COLORS.white} style={{ marginTop: SIZES.padding * 2 }} />
            <Text style={{ color: COLORS.white, ...FONTS.h3, marginTop: SIZES.padding * 2 }}>
                Loading...
            </Text>
        </LinearGradient>
    );
}

export default PreloaderScreen;
