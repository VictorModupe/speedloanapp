import {View, TouchableOpacity, Text, StatusBar} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import {svg} from "../svg";
import {theme} from "../constants";
import {components} from "../components";

const SignIn = ({navigation}) => {
  const [rememberMe, setRememberMe] = useState(false);
  const renderHeader = () => {
    return <components.Header title="Login Account" goBack={true} />;
  };

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}
      >
        <View style={{paddingTop: theme.SIZES.height * 0.05}}>
          <components.InputField
            placeholder="Username"
            containerStyle={{marginBottom: 14}}
            leftIcon={
              <TouchableOpacity className="mr-1">
                <svg.UserSvg />
              </TouchableOpacity>
            }
          />

          <components.InputField
            placeholder="Pin"
            secureTextEntry={true}
            containerStyle={{marginBottom: 14}}
            rightIcon={
              <TouchableOpacity>
                <svg.EyeOffSvg />
              </TouchableOpacity>
            }
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
            className="my-2 flex-row justify-between"
          >
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={{
                  width: 16,
                  height: 16,
                  borderWidth: 1,
                  borderColor: "#868698",
                  borderRadius: 4,
                  backgroundColor: theme.COLORS.white,
                  marginRight: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {rememberMe && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 20,
                      backgroundColor: "#3170F3",
                    }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: theme.COLORS.bodyTextColor,
                    ...theme.FONTS.Mulish_400Regular,
                    fontSize: 16,
                    lineHeight: 16 * 1.2,
                  }}
                >
                  Remember me
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text className="font-bold text-red-500">Forgot Password?</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#3170F3] px-8 rounded-full py-4 mt-4">
            <Text className="text-center font-bold text-white">Sign In</Text>
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
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text
                style={{
                  ...theme.FONTS.Mulish_400Regular,
                  color: theme.COLORS.linkColor,
                  lineHeight: 16 * 1.6,
                  fontSize: 16,
                }}
                className="font-bold"
              >
                Sign Up
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

export default SignIn;
