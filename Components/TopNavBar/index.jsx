import React from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Heading2 } from "../CustomText";
import { COLORS } from "../../COLORS";
import Constants from 'expo-constants';

export default function TopNavBar({ text, onBackPress }) {
    return (
        <View style={style.wrapper}>
            <TouchableOpacity style={style.backButton} onPress={() => { onBackPress() }}>
                <FontAwesome5 name="arrow-left" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Heading2 text={text} />
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        paddingTop: 10,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        marginRight: 20
    }
})