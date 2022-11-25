import React, { useState, useRef, useEffect } from "react";
import { TextInput, StyleSheet, Text, View, Animated } from "react-native";
import inputTypes from "./types";
import { COLORS } from "../../COLORS";

function CustomInput({
  label,
  placeholder,
  text,
  setText,
  onChange,
  type,
  styles,
}) {
  const [isFocused, setIsFocused] = useState(false);

  function onChangeHandler(text) {
    setText(text);
    onChange?.(text);
  }

  const xPos = useRef(new Animated.Value(0)).current;
  let borderColor = isFocused ? COLORS.purple : "transparent";

  function errorAnim(onComplete) {
    const shake = [
      Animated.timing(xPos, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(xPos, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
    ];

    Animated.sequence([
      ...shake,
      ...shake,
      ...shake,
      Animated.timing(xPos, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(onComplete);
  }

  return (
    // wrap mainContainer with scrollView later
    <View>
      {label && <Text style={[style.label]}>{label}</Text>}
      <Animated.View style={{ transform: [{ translateX: xPos }] }}>
        <TextInput
          placeholder={placeholder}
          value={text}
          onChangeText={onChangeHandler}
          secureTextEntry={type === inputTypes.PASSWORD}
          style={[styles, style.input, { borderColor }]}
          cursorColor={"white"}
          placeholderTextColor={"#777777"}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </Animated.View>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#303030",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    color: "white",
    fontFamily: "Metropolis",
    borderWidth: 1,
  },
  label: {
    color: "white",
    fontFamily: "Metropolis",
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default CustomInput;
