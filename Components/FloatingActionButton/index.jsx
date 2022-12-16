import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../COLORS";

export default function FloatingActionButton({ onPress }) {
    return (
        <TouchableOpacity
            style={style.floatingActionButton}
            onPress={onPress}
        >
            <FontAwesome name="plus" size={24} color={COLORS.purple} />
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    floatingActionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: COLORS.white,
        borderRadius: 100,
    }
})