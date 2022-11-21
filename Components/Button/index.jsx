import React from "react";
import { Touchable, StyleSheet, TouchableOpacity, Text } from "react-native";

export default class Buttons {
    static StandardButton({ text, styles, onPress }) {
        return (
            <TouchableOpacity
                style={[style.standardButton, styles]}
                onPress={onPress}
            >
                <Text style={style.btnText}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    standardButton: {
        backgroundColor: "#bd1bd4",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Metropolis',
        textAlign: "center"
    }
})