import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StatusBar,
  Touchable,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useRef, useState} from "react";

import {theme, onboardingData} from "../constants";
import {svg} from "../svg";
import {components} from "../components";

const Onboarding = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef();

  function updateCurrentSlideIndex(e) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / theme.SIZES.width);
    setCurrentSlideIndex(currentIndex);
  }
  const handleNext = async () => {
    console.log("first:", currentSlideIndex);
    try {
      if (currentSlideIndex < onboardingData.length - 1) {
        // @ts-ignore
        slidesRef.current.scrollToIndex({index: currentSlideIndex + 1});
        setCurrentSlideIndex(currentSlideIndex + 1);
      } else {
        await AsyncStorage.setItem("@viewedOnboarding", "true");
        navigation.navigate("SignUp");
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <FlatList
        data={onboardingData}
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
        ref={slidesRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          const isFirstIndex = index === 0;
          return (
            <View
              style={{
                width: theme.SIZES.width,
                height: theme.SIZES.height,
                justifyContent: "flex-end",
              }}
            >
              {isFirstIndex ? (
                <View
                  style={{
                    width: theme.SIZES.width,
                    height: theme.SIZES.height,
                  }}
                  className="relative justify-end"
                >
                  <ImageBackground
                    source={require("../assets/bg/bg.jpg")}
                    resizeMode="cover"
                    className="absolute h-full w-full"
                  />
                  <View className="p-5 gap-4 z-30">
                    <TouchableOpacity
                      onPress={handleNext}
                      className="bg-white rounded-full py-3"
                    >
                      <Text className="text-center font-bold text-black">
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SignIn")}
                      className="bg-blue-700 rounded-full py-3"
                    >
                      <Text className="text-center font-bold text-white">
                        Sign In
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: "white",
                    paddingTop: theme.SIZES.height * 0.08,
                    paddingBottom: theme.SIZES.height * 0.07,
                    paddingHorizontal: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                >
                  {!isFirstIndex && (
                    <Image
                      style={{
                        width: 150,
                        height: 170,
                      }}
                      source={item.image}
                      className="bg-no-repeat object-cover m-auto mb-10"
                      resizeMode="cover"
                    />
                  )}
                  <Text
                    style={{
                      textAlign: "center",
                      ...theme.FONTS.H3,
                      color: theme.COLORS.mainDark,
                      marginBottom: 18,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      ...theme.FONTS.Mulish_400Regular,
                      fontSize: 16,
                      color: theme.COLORS.bodyTextColor,
                      lineHeight: 16 * 1.6,
                      marginBottom: 24,
                    }}
                  >
                    {item.description}
                  </Text>
                  {/* <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      marginBottom: 45,
                    }}
                  >
                    {onboardingData.map((_, index) => {
                      return (
                        <View
                          key={index}
                          style={[
                            {
                              width: 8,
                              height: 8,
                              marginHorizontal: 5,
                              borderRadius: 50,
                              borderWidth: 3,
                              borderColor: "#D1D2DB",
                            },
                            currentSlideIndex == index && {
                              borderColor: theme.COLORS.mainDark,
                            },
                          ]}
                        />
                      );
                    })}
                  </View> */}
                  {index < 3 && (
                    <View className="flex-row mt-10 justify-between items-center">
                      <Text
                        onPress={() => navigation.navigate("SignUp")}
                        className="text-center font-bold text-gray-900"
                      >
                        Skip
                      </Text>

                      <TouchableOpacity
                        onPress={handleNext}
                        className="bg-blue-700 px-8 rounded-full py-3"
                      >
                        <Text className="text-center font-bold text-white">
                          Next
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {index === 3 && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SignUp")}
                      className="bg-blue-700 px-8 rounded-full py-3"
                    >
                      <Text className="text-center font-bold text-white">
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
