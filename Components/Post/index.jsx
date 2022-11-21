import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Post({ username, postText }) {
    return (
        <TouchableOpacity style={style.post}>
            <View style={style.profilePic} />
            <View style={style.postContent}>
                <Text style={style.username}>{username}</Text>
                <Text style={style.postText}>{postText}</Text>
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    post: {
        display: "flex",
        marginBottom: 10
    },
    profilePic: {

    },
    postContent: {
        display: "flex",
        flexDirection: "column"
    },
    username: {
        color: "white",
        fontSize: 18,
        fontFamily: "Metropolis-Bold",
        marginBottom: 5
    },
    postText: {
        color: "white",
        fontSize: 16,
        fontFamily: "Metropolis"
    }
})