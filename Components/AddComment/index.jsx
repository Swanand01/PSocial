import { useState } from "react";
import useFetch from "../../API/useFetch";
import useToast from "../Toast";

import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import CustomInput from "../Input";
import Button from "../Button";

import { COLORS } from "../../COLORS";
import API_ENDPOINTS from "../../API/endpoints";

export default function AddComment({ postId, onSuccessfulAdd, showToast }) {
    const [comment, setComment] = useState("");
    const [postAddCommentRequest] = useFetch();

    function addComment() {
        postAddCommentRequest({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.ADD_COMMENT + postId + "/",
            method: "POST",
            body: { content: comment },
            headers: {},
            callback: (data, status) => {
                console.log(data, status);
                if (status === 200) {
                    console.log("Comment added successfully.");
                    showToast("Comment added successfully.", 200, () => { });
                    onSuccessfulAdd(data);
                } else if (status === 400) {
                    showToast("Something went wrong.", 500)
                }
            },
            includeAccessToken: true
        })
    }

    return (
        <View style={style.addComment}>
            <View style={style.commentInput}>
                <CustomInput
                    text={comment}
                    setText={setComment}
                />
            </View>
            <Button.IconButton
                Icon={<FontAwesome name="paper-plane" size={18} color={COLORS.white} />}
                styles={style.addCommentBtn}
                disabled={comment === ""}
                onPress={() => {
                    console.log("CLICKED");
                    addComment();
                }}
            />
        </View>
    );
}

const style = StyleSheet.create({
    addComment: {
        flex: 1,
        flexDirection: "row",
    },
    commentInput: {
        flex: 15,
        marginBottom: 15,
        marginRight: 15
    },
    addCommentBtn: {
        flex: 1,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    }
})