import {View, TouchableOpacity, Text, StatusBar} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Divider} from "@rneui/themed";
import {svg} from "../svg";
import {theme} from "../constants";
import {components} from "../components";

import Icon from "react-native-vector-icons/dist/AntDesign";

const SignUp = ({navigation}) => {
  const [agree, setAgree] = useState(false);
  const renderHeader = () => {
    return <components.Header title="Create Account" goBack={true} />;
  };

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}
      >
        <View style={{paddingTop: theme.SIZES.height * 0.05}}>
          <components.InputField
            placeholder="First Name"
            containerStyle={{marginBottom: 14}}
            leftIcon={
              <TouchableOpacity className="mr-1">
                <svg.UserSvg />
              </TouchableOpacity>
            }
          />
          <components.InputField
            placeholder="Enter your email"
            containerStyle={{marginBottom: 14}}
            leftIcon={
              <TouchableOpacity className="mr-1">
                <svg.UserSvg />
              </TouchableOpacity>
            }
          />
          <components.InputField
            placeholder="Phone Number"
            containerStyle={{marginBottom: 14}}
            leftIcon={
              <TouchableOpacity className="mr-1">
                <svg.PhoneSvg />
              </TouchableOpacity>
            }
          />
          <components.InputField
            placeholder="Email"
            containerStyle={{marginBottom: 14}}
            leftIcon={
              <TouchableOpacity className="mr-1">
                <svg.EmailSvg />
              </TouchableOpacity>
            }
          />
          <components.InputField
            placeholder="Enter your password"
            secureTextEntry={true}
            containerStyle={{marginBottom: 14}}
            leftIcon={
              <TouchableOpacity className="mr-1">
                <svg.SecuritySvg />
              </TouchableOpacity>
            }
          />
          <components.InputField
            placeholder="Confirm your password"
            secureTextEntry={true}
            containerStyle={{marginBottom: 14}}
            leftIcon={
              <TouchableOpacity className="mr-1">
                <svg.SecuritySvg />
              </TouchableOpacity>
            }
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => setAgree(!agree)}
            className="my-2"
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                // borderColor: agree ? "#3170F3" : "#868698",
                borderRadius: 4,
                // backgroundColor: theme.COLORS.white,
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              className={`rounded-full ${
                agree ? "border-white bg-[#3170F3]" : "border-gray-300 bg-white"
              }`}
            >
              {agree && (
                <Icon
                  name="check"
                  size={14}
                  color={agree ? "#FFFFFF" : "#3170F3"}
                />
              )}
            </View>
            <Text
              style={{
                color: theme.COLORS.bodyTextColor,
                ...theme.FONTS.Mulish_400Regular,
                fontSize: 16,
                lineHeight: 16 * 1.2,
              }}
            >
              I accept the terms and privacy policy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("CreateUsername")}
            className="bg-[#3170F3] px-8 rounded-full py-4 mt-4"
          >
            <Text className="text-center font-bold text-white">Continue</Text>
          </TouchableOpacity>
          <View className="flex-row justify-between items-center gap-7 mt-1">
            <View className="border-b flex-1 h-1 border-gray-300"></View>
            <Text className="text-center text-lg text-black">Or With</Text>
            <View className="border-b flex-1 h-1 border-gray-300"></View>
          </View>
          <View className="flex-row justify-between space-x-8 mt-7">
            <TouchableOpacity className="bg-[#ffffff] flex-row justify-center items-center space-x-2 border flex-1 border-gray-300 px-8 rounded-full py-3">
              <svg.GoogleSvg />
              <Text className="text-center font-bold text-black">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#ffffff] flex-row justify-center items-center space-x-2 border flex-1 border-gray-300 px-8 rounded-full py-3">
              <svg.AppleSvg />
              <Text className="text-center font-bold text-black">Apple</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 50,
            }}
            className="my-2 mb-4"
          >
            <Text
              style={{
                ...theme.FONTS.Mulish_400Regular,
                lineHeight: 16 * 1.6,
                fontSize: 16,
              }}
              className="text-black font-semibold"
            >
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text
                style={{
                  ...theme.FONTS.Mulish_400Regular,
                  color: theme.COLORS.linkColor,
                  lineHeight: 16 * 1.6,
                  fontSize: 16,
                }}
                className="font-bold"
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  const renderStatusBar = () => {
    return (
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
      {renderStatusBar()}
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
};

export default SignUp;
