import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function Comment({
    commentId,
    username,
    content
}) {
    return (
        <View style={style.wrapper}>
            <View style={style.comment}>
                <TouchableOpacity style={{
                    alignSelf: "flex-start",
                }}>
                    <Text style={style.username}>{username}</Text>
                </TouchableOpacity>
                <View>
                    <Text style={style.commentText}>{content}</Text>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        // paddingHorizontal: 20
    },
    comment: {
        display: "flex",
        flexDirection: "column",
        // marginTop: 10
    },
    username: {
        color: "white",
        fontSize: 18,
        fontFamily: "Metropolis-Bold",
        marginBottom: 5
    },
    commentText: {
        color: "white",
        fontSize: 16,
        fontFamily: "Metropolis"
    }
})