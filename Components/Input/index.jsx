import React, { useState } from "react";
import { TextInput, StyleSheet, ScrollView, Text, View } from "react-native";
import inputTypes from "./types"


function CustomInput({ label, placeholder, text, setText, initialValue, onChange, type, styles }) {
    const [isFocused, setIsFocused] = useState(false)

    function onChangeHandler(text) {
        setText(text);
        onChange?.(text);
    }

    return (
        // wrap mainContainer with scrollView later
        <View>
            {label && <Text style={style.label}>{label}</Text>}
            <TextInput
                placeholder={placeholder}
                value={text}
                onChangeText={onChangeHandler}
                secureTextEntry={type === inputTypes.PASSWORD}
                style={[styles, style.input, { borderColor: isFocused ? "#bd1bd4" : "transparent" }]}
                cursorColor={"white"}
                placeholderTextColor={"#777777"}
                onFocus={() => { setIsFocused(true) }}
                onBlur={() => { setIsFocused(false) }}
            />
        </View>
    )
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
        color: 'white',
        fontFamily: 'Metropolis',
        borderWidth: 1,
    },
    label: {
        color: "white",
        fontFamily: 'Metropolis',
        marginBottom: 5,
        marginLeft: 5
    }
})

export default CustomInput;