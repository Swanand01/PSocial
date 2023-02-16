import React, { useEffect, useState } from "react";
import useFetch from "../../API/useFetch";
import useToast from "../../Components/Toast";

import { View, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import MainContainer from "../../Components/MainContainer";
import TopNavBar from "../../Components/TopNavBar";
import Buttons from "../../Components/Button";

import API_ENDPOINTS from "../../API/endpoints";
import { COLORS } from "../../COLORS";
import Tags from "../PostScreen/Tags";
import SearchTags from "./SearchTags";
import SelectedTags from "./SelectedTags";


export default function CreatePost({ route, navigation }) {
    const [postText, setPostText] = useState("");
    const [tagsText, setTagsText] = useState("");
    const [tags, setTags] = useState([]);
    const [sendCreatePostRequest, isLoading] = useFetch();
    const [btnEnable, setBtnEnable] = useState(false);
    const [Toast, showToast] = useToast();

    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        if (!route.params) return;
        const { initialPostText, initialTags } = route.params;

        if (initialPostText) setPostText(initialPostText);
        if (initialTags) setTags(initialTags);
    }, [])

    useEffect(() => {
        if (tagsText.trim() === '') return
        let tagsArray = tagsText.split(",");
        tagsArray = tagsArray.map((tag) => tag.trim())
        setTags(tagsArray);
    }, [tagsText])

    useEffect(() => {
        if (postText.length > 0) {
            setBtnEnable(true);
        }
        else {
            setBtnEnable(false);
        }
    }, [postText])

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
                    setBtnEnable(true);
                }
            }
        });
    }

    function generatePayload() {
        const tagsPayload = [];
        tags.forEach((tag) => {
            tagsPayload.push({
                name: tag
            })
        });
        return { content: postText, tags: tagsPayload };
    }

    return (
        <MainContainer>
            <View style={style.main}>
                <TopNavBar text={"Create Post"} navigation={navigation} />
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
                <View>
                    {selectedTags.length > 0 && (
                        <SelectedTags
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                        />
                    )}
                    <SearchTags
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
                    <Buttons.StandardButton
                        text={"Post"}
                        styles={{ marginBottom: 20 }}
                        disabled={!btnEnable}
                        onPress={() => {
                            setBtnEnable(false);
                            createPost();
                        }}
                    />
                </View>
            </View>
        </MainContainer>
    )
}

const style = StyleSheet.create({
    main: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 20,
    },
    contentInput: {
        flex: 1,
        color: COLORS.white,
        textAlignVertical: "top",
        fontSize: 18,
        marginBottom: 10
    },
})