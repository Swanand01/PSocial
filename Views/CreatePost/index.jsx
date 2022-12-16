import React, { useState } from "react";
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
    const [sendCreatePostRequest, isLoading] = useFetch();
    const [Toast, showToast] = useToast();


    function createPost() {
        sendCreatePostRequest({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.CREATE_POST,
            method: "POST",
            body: { content: postText },
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

    return (
        <MainContainer>
            <TopNavBar />
            <View style={style.main}>
                <TextInput
                    editable
                    maxLength={200}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => setPostText(text)}
                    value={postText}
                    placeholder={"What's on your mind?"}
                    placeholderTextColor={COLORS.gray}
                    style={style.textInput}
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
        marginTop: 60,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 20
    },
    textInput: {
        flex: 1,
        color: COLORS.white,
        textAlignVertical: "top",
        fontSize: 18,
        marginBottom: 10
    }
})