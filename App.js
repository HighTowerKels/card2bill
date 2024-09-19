/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import PreloaderScreen from './screens/PreloaderScreen';
import Onboarding from './screens/OnboardingScreen';
import Login from './screens/Login';
import EmailOTP from './screens/EmailOTP';
import GiftCardModalScreen from './screens/GiftCardModalScreen';
import UploadCardScreen from './screens/UploadCardScreen';
import UploadCardBackScreen from './screens/UploadCardBackScreen';
import EnterPinScreen from './screens/EnterPinScreen';
import AwaitVerificationScreen from './screens/AwaitVerificationScreen';
import TransferScreen from './screens/TranferScreen';
import SendMoneyScreen from './screens/SendMoneyScreen';
import ConfirmSendScreen from './screens/ConfirmSendScreen';
import SendMoneyPinScreen from './screens/SendMoneyPinScreen';
import RequestMoneyScreen from './screens/RequestMoneyScreen';
import TopUpScreen from './screens/TopUpScreen';
import BuyDataBundleScreen from './screens/BuyDataBundleScreen';
import NetworkSelectionModal from './screens/NetworkSelectionModal';
import DataBundleScreen from './screens/DataBundleScreen';
import SettingScreen from './screens/SettingScreen';
import AddAccountScreen from './screens/AddAccountScreen';
import AccountCheckScreen from './screens/AccountCheckScreen';
import BuyGiftCardDetailsScreen from './screens/BuyGiftCardDetailsScreen';

import { SignUp } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Tabs from "./navigation/tabs";
import BuyGiftCardScreen from './screens/BuyGiftCardScreen';
import CompanyAccountDetailsScreen from './screens/CompanyAccountDetailsScreen';
import UploadReceiptScreen from './screens/UploadReceiptScreen';
import CompanyWalletAddressScreen from './screens/CompanyWalletAddressScreen';
import GiftCardScreen from './screens/GiftCardScreen';
import CryptoCardScreen from './screens/CryptoCardScreen';
import SellCryptoScreen from './screens/SellCryptoScreen';
import WalletScreen from './screens/WalletScreen';
import CryptoUploadImageScreen from './screens/CryptoUploadImageScreen';
import BuyCryptoScreen from './screens/BuyCryptoScreen';
import SavingScreen from './screens/SavingScreen';
import BuyAirtimeScreen from './screens/BuyAirtimeScreen';
import ProfileScreen from './screens/ProfileScreen';
import AccountDetailsScreen from './screens/AccountCheckScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';
import SecurityScreen from './screens/SecurityScreen';
import NotificationScreen from './screens/NotificationScreen';



const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const Stack = createStackNavigator();

const App = () => {
    const [loaded] = useFonts({
        "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
        "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
    })
    
    if(!loaded){
    return null;
    }
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'PreloaderScreen'}
            >
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="PreloaderScreen" component={PreloaderScreen} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="EmailOTP" component={EmailOTP} />

                <Stack.Screen name="GiftCardModalScreen" component={GiftCardModalScreen} />
                <Stack.Screen name="UploadCardScreen" component={UploadCardScreen} />
                <Stack.Screen name="UploadCardBackScreen" component={UploadCardBackScreen} />
                <Stack.Screen name="EnterPin" component={EnterPinScreen} />
                <Stack.Screen name="AwaitingVerification" component={AwaitVerificationScreen} />
                <Stack.Screen name="TransferScreen" component={TransferScreen} />
                <Stack.Screen name="SendMoneyScreen" component={SendMoneyScreen} />
                <Stack.Screen name="Confirm" component={ConfirmSendScreen} />
                <Stack.Screen name="SendPin" component={SendMoneyPinScreen} />
                <Stack.Screen name="RequestMoney" component={RequestMoneyScreen} />
                <Stack.Screen name="TopUpScreen" component={TopUpScreen}  />
                <Stack.Screen name="BuyDataBundleScreen" component={BuyDataBundleScreen}  />
                <Stack.Screen name="Network" component={NetworkSelectionModal}  options={{ headerShown: false }} />
                <Stack.Screen name="DataBundle" component={DataBundleScreen}  options={{ headerShown: false }} />
                <Stack.Screen name="Setting" component={SettingScreen}   />
                <Stack.Screen name="AddAccount" component={AddAccountScreen}   />

                <Stack.Screen name="AccountCheck" component={AccountCheckScreen}  options={{ headerShown: false }} />
                <Stack.Screen name="BuyGift" component={BuyGiftCardScreen}  options={{ headerShown: false }} />
                <Stack.Screen name="BuyGiftDetails" component={BuyGiftCardDetailsScreen}  options={{ headerShown: false }} />
                <Stack.Screen name="CompanyAccountDetailsScreen" component={CompanyAccountDetailsScreen}  options={{ headerShown: false }} />
                <Stack.Screen name="UploadReciept" component={UploadReceiptScreen}  options={{ headerShown: false }} />
                <Stack.Screen name="CompanyWalletAddressScreen" component={CompanyWalletAddressScreen}  options={{ headerShown: false }} />




                {/* Tabs */}
                <Stack.Screen name="HomeTabs" component={Tabs} />
                <Stack.Screen name="Gift" component={GiftCardScreen} />
                <Stack.Screen name="CryptoModal" component={CryptoCardScreen} />
                <Stack.Screen name="SellCrypto" component={SellCryptoScreen} />
                <Stack.Screen name="WalletScreen" component={WalletScreen} />
                <Stack.Screen name="CryptoUpload" component={CryptoUploadImageScreen} />
                <Stack.Screen name="BuyCrypto" component={BuyCryptoScreen} />
                <Stack.Screen name="SavingScreen" component={SavingScreen} />
                <Stack.Screen name="BuyAirtime" component={BuyAirtimeScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="accountdetails" component={AccountDetailsScreen} />
                <Stack.Screen name="history" component={TransactionHistoryScreen} />
                <Stack.Screen name="Security" component={SecurityScreen} />
                <Stack.Screen name="Notification" component={NotificationScreen} />


                {/* <Stack.Screen name="Scan" component={Scan} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
