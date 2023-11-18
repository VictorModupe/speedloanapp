import {Text, ScrollView} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";

import {theme} from "../constants";
import {components} from "../components";
import {svg} from "../svg";
import {View} from "react-native";

const ForgotPassword = ({navigation}) => {
  const renderHeader = () => {
    return <components.Header title="Forgot Password" goBack={true} />;
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            ...theme.FONTS.Mulish_400Regular,
            fontSize: 16,
            color: theme.COLORS.bodyTextColor,
            lineHeight: 16 * 1.7,
            marginBottom: 20,
            marginTop: 30,
          }}
        >
          Don’t worry! It happens. Please enter the email associated with your
          account.
        </Text>
        <components.InputField
          placeholder="Email"
          containerStyle={{
            marginBottom: 14,
            backgroundColor: theme.COLORS.bgColor,
          }}
          leftIcon={
            <View className="mr-1">
              <svg.EmailSvg />
            </View>
          }
        />
        <components.Button
          title="Send"
          onPress={() => navigation.navigate("VerifyOtp")}
        />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.COLORS.white}}>
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
};

export default ForgotPassword;
