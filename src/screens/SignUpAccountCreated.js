import {View, ScrollView, Image, Text} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";

import {theme} from "../constants";
import {components} from "../components";

const SignUpAccountCreated = ({navigation}) => {
  const renderContent = () => {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            paddingTop: theme.SIZES.height * 0.2,
            paddingHorizontal: 40,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              ...theme.FONTS.H4,
              marginTop: 50,
            }}
            className="text-blue-500 font-bold"
          >
            To Speed Loan
          </Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.COLORS.bgColor}}>
      {renderContent()}
    </SafeAreaView>
  );
};

export default SignUpAccountCreated;
