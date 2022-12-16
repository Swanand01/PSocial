import React from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Heading2 } from "../CustomText";
import { COLORS } from "../../COLORS";

export default function TopNavBar() {
    return (
        <View style={style.wrapper}>
            <TouchableOpacity style={style.backButton}>
                <FontAwesome5 name="arrow-left" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Heading2 text={"Create Post"} />
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        position: "absolute",
        top: StatusBar.currentHeight,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    backButton: {
        marginRight: 20
    }
})