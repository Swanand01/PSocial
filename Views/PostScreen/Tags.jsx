import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../COLORS";

export default function Tags({ tagsArray, onTagClick, styles }) {

    return (
        <View style={{ ...style.tags, ...styles }}>
            {tagsArray && (
                tagsArray.map((tag, i) => {
                    return (
                        <TouchableOpacity style={style.tag} onPress={() => { onTagClick(tag); }} key={i}>
                            <Text style={style.tagText}>{tag.name}</Text>
                        </TouchableOpacity>
                    )
                })
            )}
        </View>
    )
}

const style = StyleSheet.create({
    tags: {
        display: "flex",
        flexDirection: "row"
    },
    tag: {
        alignSelf: "flex-start",
        padding: 6,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: COLORS.gray,
        marginRight: 5,
        marginBottom: 5
    },
    tagText: {
        color: COLORS.white
    }
})