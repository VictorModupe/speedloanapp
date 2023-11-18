import {View, TouchableOpacity, Text, StatusBar} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {svg} from "../svg";
import {theme} from "../constants";
import {components} from "../components";

import Icon from "react-native-vector-icons/dist/AntDesign";

const CreateUsername = ({navigation}) => {
  const renderHeader = () => {
    return <components.Header title="Create Username" goBack={true} />;
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

          <TouchableOpacity
            onPress={() => navigation.navigate("SecretPin")}
            className="bg-[#3170F3] px-8 rounded-full py-4 mt-4"
          >
            <Text className="text-center font-bold text-white">Continue</Text>
          </TouchableOpacity>
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

export default CreateUsername;
