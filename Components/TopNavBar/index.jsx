import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Heading2 } from "../CustomText";
import { COLORS } from "../../COLORS";

export default function TopNavBar({ navigation, text, onBackPress, rightBtn }) {
    return (
        <View style={style.wrapper}>
            <TouchableOpacity
                style={style.backButton}
                onPress={() => { onBackPress ? onBackPress : navigation.goBack() }}
            >
                <FontAwesome5 name="arrow-left" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Heading2 text={text} />
            <View style={style.rightBtn}>
                {rightBtn}
            </View>
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
        minHeight: 44,
        backgroundColor: COLORS.black
    },
    backButton: {
        marginRight: 20
    },
    rightBtn: {
        position: "absolute",
        right: 0
    }
})