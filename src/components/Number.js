import React, {useRef, useState} from "react";
import {View, TextInput} from "react-native";

const Number = React.forwardRef(({value, index, onInputChange}, ref) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = text => {
    onInputChange(index, text);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: isFocused ? "#4C4C60" : "transparent",
        marginHorizontal: 5, // Adjust the spacing between input fields
      }}
    >
      <TextInput
        ref={textInputRef => {
          inputRef.current = textInputRef;
          if (ref) {
            ref.current = textInputRef;
          }
        }}
        style={{
          textAlign: "center",
          flex: 1,
        }}
        keyboardType="number-pad"
        maxLength={1}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        value={value}
      />
    </View>
  );
});

export default Number;
