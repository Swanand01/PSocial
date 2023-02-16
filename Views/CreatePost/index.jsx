import React, { useEffect, useState } from "react";
import useFetch from "../../API/useFetch";
import useToast from "../../Components/Toast";

import { View, StyleSheet, TextInput } from "react-native";
import MainContainer from "../../Components/MainContainer";
import TopNavBar from "../../Components/TopNavBar";
import Buttons from "../../Components/Button";

import API_ENDPOINTS from "../../API/endpoints";
import { COLORS } from "../../COLORS";


export default function CreatePost({ navigation }) {
    const [postText, setPostText] = useState("");
    const [tagsText, setTagsText] = useState("");
    const [tags, setTags] = useState([]);
    const [sendCreatePostRequest, isLoading] = useFetch();
    const [Toast, showToast] = useToast();

    useEffect(() => {
        if (tagsText.trim() === '') return
        let tagsArray = tagsText.split(",");
        tagsArray = tagsArray.map((tag) => tag.trim())
        setTags(tagsArray);
    }, [tagsText])

    function createPost() {
        sendCreatePostRequest({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.CREATE_POST,
            method: "POST",
            body: generatePayload(),
            headers: {},
            callback: (data, status) => {
                if (status === 201) {
                    showToast(
                        "Post created successfully",
                        200,
                        () => {
                            navigation.navigate("Home");
                        }
                    )
                } else {
                    showToast("Something went wrong.", 500);
                }
            },
            includeAccessToken: true
        });
    }

    function generatePayload() {
        const tagsPayload = [];
        tags.forEach((tag) => {
            tagsPayload.push({
                name: tag
            })
        });
        console.log({ content: postText, tags: tagsPayload })
        return { content: postText, tags: tagsPayload };
    }

    return (
        <MainContainer>
            <View style={style.main}>
                <View style={{ flex: 1 }}>
                    <TopNavBar text={"Create Post"} onBackPress={() => { }} />
                </View>
                <TextInput
                    editable
                    maxLength={200}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => setPostText(text)}
                    value={postText}
                    placeholder={"What's on your mind?"}
                    placeholderTextColor={COLORS.gray}
                    style={style.contentInput}
                />
                <TextInput
                    editable
                    maxLength={200}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => setTagsText(text)}
                    value={tagsText}
                    placeholder={"Tags (comma separated)"}
                    placeholderTextColor={COLORS.gray}
                    style={style.tagsInput}
                />
                <Buttons.StandardButton
                    text={"Post"}
                    styles={{ marginBottom: 20 }}
                    disabled={!(postText.length > 0)}
                    onPress={() => { createPost(); }}
                />
            </View>
        </MainContainer>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 20
    },
    contentInput: {
        flex: 6,
        color: COLORS.white,
        textAlignVertical: "top",
        fontSize: 18,
        marginBottom: 10
    },
    tagsInput: {
        flex: 1,
        color: COLORS.white,
    }
})