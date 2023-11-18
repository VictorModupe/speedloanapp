import {View, Text, TouchableOpacity, StatusBar} from "react-native";
import React, {createRef, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useNavigation} from "@react-navigation/native";

import {components} from "../components";
import {theme} from "../constants";
import Number from "../components/Number";

const VerifyOtp = () => {
  const navigation = useNavigation();
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);

  const inputRefs = Array.from({length: 5}, () => React.createRef());
  console.log({otpValues});
  const handleOtpInputChange = (index, value) => {
    const nextInputRef = inputRefs[index + 1]?.current;
    if (nextInputRef && index < otpValues.length - 1) {
      nextInputRef.focus();
    }
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (otpValues.length > 4) {
      // make your api call here.
      console.log("first");
    }
  };

  // Create an array of refs to keep references to all the input fields

  const renderStatusBar = () => {
    return (
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
    );
  };

  const renderHeader = () => {
    return <components.Header title={"Verify OTP"} goBack={true} />;
  };

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingTop: 30,
            paddingBottom: 50,
          }}
        >
          <Text
            style={{
              ...theme.FONTS.Mulish_400Regular,
              fontSize: 16,
              color: theme.COLORS.bodyTextColor,
              marginBottom: 30,
            }}
          >
            Enter your OTP code here.
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            {otpValues.map((value, index) => (
              <Number
                key={index}
                value={value}
                index={index}
                onInputChange={handleOtpInputChange}
                ref={inputRefs[index]}
              />
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...theme.FONTS.Mulish_400Regular,
                fontSize: 16,
                lineHeight: 16 * 1.7,
                color: theme.COLORS.bodyTextColor,
              }}
            >
              Didn’t receive the OTP?{" "}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  ...theme.FONTS.Mulish_400Regular,
                  fontSize: 16,
                  lineHeight: 16 * 1.7,
                  color: theme.COLORS.linkColor,
                }}
              >
                Resend.
              </Text>
            </TouchableOpacity>
          </View>
          <components.Button
            title="Change Password"
            containerStyle={{marginTop: 30}}
            onPress={() => navigation.navigate("NewPassword")}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: theme.COLORS.bgColor, flex: 1}}>
      {renderStatusBar()}
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
};

export default VerifyOtp;
