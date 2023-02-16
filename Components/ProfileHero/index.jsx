import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../COLORS";
import { Heading3, Heading4 } from "../CustomText";

export default function ProfileHero({ username, postsCount, followersCount, followingCount }) {
    return (
        <View style={style.wrapper}>
            <View style={style.profileItem}>
                <Heading3 style={style.username} text={username} />
            </View>
            <View style={style.profileItems}>
                <View style={style.profileItem}>
                    <Heading3 text={postsCount} />
                    <Heading4 text={"Posts"} />
                </View>
                <View style={style.profileItem}>
                    <Heading3 text={followersCount} />
                    <Heading4 text={"Followers"} />
                </View>
                <View style={style.profileItem}>
                    <Heading3 text={followingCount} />
                    <Heading4 text={"Following"} />
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        paddingVertical: 30
    },
    profileItems: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20
    },
    profileItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    username: {
        color: COLORS.white
    }
})