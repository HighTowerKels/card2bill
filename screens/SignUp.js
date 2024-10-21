import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons } from "../constants";

const CustomCheckbox = ({ isChecked, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      {isChecked && (
        <Image
          source={icons.checkmark}
          style={{
            width: 16,
            height: 16,
            tintColor: COLORS.secondary,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const SignUp = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  function renderHeader() {
    return (
      <View style={{ alignItems: 'center', marginTop: SIZES.padding * 6 }}>
        <Text style={{ 
          fontFamily: 'Inter-Sans-Bold', 
          fontSize: 30, 
          color: COLORS.secondary,
          ...FONTS.h1
        }}>Welcome!</Text>

        <Text style={{
          color: COLORS.secondary, 
          marginTop: SIZES.padding,
          textAlign: 'center',
          ...FONTS.body3,
          padding: 20,
          width:280
        }}>
          Please provide the following details for your new account.
        </Text>
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
        {/* Full Name */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderColor: COLORS.gray,
              borderWidth: 1,
              height: 40,
              color: COLORS.black,
              ...FONTS.body3,
              padding: 10
            }}
            placeholder="Full Name"
            placeholderTextColor={COLORS.secondary}
            selectionColor={COLORS.secondary}
          />
        </View>

        {/* Email */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <TextInput
            style={{
                marginVertical: SIZES.padding,
                borderColor: COLORS.gray,
                borderWidth: 1,
                height: 40,
                color: COLORS.black,
                ...FONTS.body3,
                padding: 10
            }}
            placeholder="Email Address"
            placeholderTextColor={COLORS.secondary}
            selectionColor={COLORS.secondary}
          />
        </View>

        {/* Password */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <TextInput
            style={{
                marginVertical: SIZES.padding,
                borderColor: COLORS.gray,
                borderWidth: 1,
                height: 40,
                color: COLORS.black,
                ...FONTS.body3,
                padding: 10
            }}
            placeholder="Password"
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

        {/* Custom Checkbox */}
        <View style={{ flexDirection: 'row', marginTop: SIZES.padding * 2, alignItems: 'center' }}>
          <CustomCheckbox isChecked={isChecked} onPress={() => setIsChecked(!isChecked)} />
          <Text style={{ marginLeft: SIZES.base, color: COLORS.secondary, ...FONTS.body4 }}>
        By creating your account you have to aggree with our Terms and Conditions
          </Text>
        </View>
      </View>
    );
  }

  function renderButtons() {
    return (
      <View style={{ marginTop: SIZES.padding * 3, marginHorizontal: SIZES.padding * 3 }}>
        {/* Sign Up My Account Button */}
        <TouchableOpacity
          style={{
            height: 45,
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: SIZES.padding
          }}
          onPress={() => navigation.navigate("PhoneNumber")}
        >
          <Text style={{ color: COLORS.primary, ...FONTS.h5 }}>Sign Up My Account</Text>
        </TouchableOpacity>

        {/* Sign Up with Google Button */}
        <TouchableOpacity
          style={{
            height: 45,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.primary, ...FONTS.h5 }}>Sign Up with Google</Text>
        </TouchableOpacity>

        <Text style={{ color: COLORS.secondary, ...FONTS.h5, textAlign: 'center',marginTop:10 }}>Already have an account? ... Login</Text>

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
          {renderForm()}
          {renderButtons()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
