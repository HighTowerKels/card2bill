import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import { COLORS, FONTS, images } from "../constants";

const Onboarding = ({ navigation }) => {
    const swiperRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (swiperRef.current) {
                swiperRef.current.scrollBy(1);
            }
        }, 10000); // Slide interval in milliseconds

        return () => clearInterval(interval);
    }, []);

    const slides = [
        {
            image: images.saving, // Replace with actual image
            head: "Welcome to Card2Pay!",
            text: "Discover, buy, and manage your gift cards effortlessly.",
        },
        {
            image: images.payment,
            head:"Wide Selection of Gift Cards", // Replace with actual image
            text: "Choose from a variety of popular brands and categories.",
        },
        {
            image: images.wallet, 
            head:"Easy to Purchase",// Replace with actual image
            text: "Buy gift cards with just a few taps. It's fast and secure.",
        },
        {
            image: images.join,
            head:"Get Started Now!", // Replace with actual image
            text: "Sign up and explore the world of gift cards with Card2Pay today"
        }
    ];

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary]}
            style={{ flex: 1 }}
        >
            <Swiper
                ref={swiperRef}
                loop
                autoplay
                dot={<View style={{
                    backgroundColor: 'rgba(255,255,255,.3)',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    margin: 3,
                }} />}
                activeDot={<View style={{
                    backgroundColor: '#fff',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    margin: 3,
                }} />}
            >
                {slides.map((slide, index) => (
                    <View
                        key={index}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Image
                            source={slide.image}
                            resizeMode="contain"
                            style={{ width: '80%', height: '50%' }}
                        />
                        <Text style={{ color: COLORS.secondary, ...FONTS.h1 , marginTop: 20, textAlign: 'center', fontWeight:'heavy' }}>{slide.head}</Text>
                        <Text style={{ color: COLORS.secondary, ...FONTS.h4, marginTop: 20, textAlign: 'center', fontWeight:'heavy', width: 250 }}>{slide.text}</Text>
                    </View>
                ))}
            </Swiper>

            <View style={{ alignItems: 'center', marginBottom: 50 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                    style={{
                        marginTop: 20,
                        padding: 20,
                        backgroundColor: COLORS.secondary,
                        borderRadius: 20,
                        width: 260,
                        
                    }}
                >
                    <Text style={{ color: COLORS.primary, ...FONTS.h3, textAlign: 'center' }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

export default Onboarding;
