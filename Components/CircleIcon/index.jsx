import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

export default function CircleIcon({ children, styles, onPress }) {
    // Pass width, height and color as style
    return (
        <TouchableOpacity style={[styles, style.background]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    background: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    }
})