import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { COLORS } from "../../COLORS"

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
        backgroundColor: COLORS.purple,
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