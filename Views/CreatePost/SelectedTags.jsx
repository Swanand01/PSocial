import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Tags from "../PostScreen/Tags";

export default function SelectedTags({ selectedTags, setSelectedTags }) {
    return (
        <View style={style.wrapper}>
            <Text style={style.label}>Selected Tags</Text>
            <Tags
                tagsArray={selectedTags}
                onTagClick={(tag) => {
                    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag.name !== tag.name));
                }}
            />
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    label: {
        color: "white",
        fontFamily: "Metropolis",
        marginBottom: 10,
    }
})