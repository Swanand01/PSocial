import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import useFetch from "../../API/useFetch";
import useToast from "../../Components/Toast";

import { Heading3 } from "../../Components/CustomText";
import MainContainer from "../../Components/MainContainer";
import Post from "../../Components/Post";
import Comment from "../../Components/Comment";
import AddComment from "../../Components/AddComment";
import TopNavBar from "../../Components/TopNavBar";

import API_ENDPOINTS from "../../API/endpoints";
import { COLORS } from "../../COLORS";
import Tags from "./Tags";
import CircleIcon from "../../Components/CircleIcon";
import { Foundation } from "@expo/vector-icons";

export default function PostScreen({ route, navigation }) {
    const { postId } = route.params;
    const [getPost, postData, isLoading] = useFetch();
    const [getComments, commentApiData, commentsLoading] = useFetch();
    const [comments, setComments] = useState([]);

    const [Toast, showToast] = useToast();

    function renderComment({ item }) {
        return (
            <Comment
                username={item.user && item.user.user_name}
                content={item.content}
            // key={idx}
            />
        )
    }

    function renderSeparator() {
        return (
            <View
                style={style.commentSeparator}
            />
        );
    };

    function fetchPostAndComments() {
        getPost({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.GET_POST + postId + "/",
            method: "GET",
            headers: {},
            callback: () => { },
            includeAccessToken: true
        });

        getComments({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.GET_COMMENTS + postId + "/",
            method: "GET",
            headers: {},
            callback: () => { },
            includeAccessToken: true
        });
    }

    useEffect(() => {
        fetchPostAndComments();
    }, []);

    useEffect(() => {
        if (!commentApiData.comments) return;
        setComments(commentApiData.comments);
    }, [commentApiData])

    return (
        <MainContainer>
            <View style={style.wrapper}>
                <TopNavBar
                    text={"Post"}
                    navigation={navigation}
                    rightBtn={
                        postData.is_owner && (
                            <CircleIcon
                                styles={style.editBtn}
                                onPress={() => {
                                    navigation.navigate("CreatePost",
                                        { editMode: true, initialPostText: postData.content, initialTags: postData.tags }
                                    );
                                }}
                            >
                                <Foundation name="pencil" size={22} color={COLORS.white} />
                            </CircleIcon>
                        )
                    }
                />
                <FlatList
                    ListHeaderComponent={
                        <>
                            <Post
                                postId={postData.id}
                                username={postData.user && postData.user.user_name}
                                content={postData.content}
                                pubDate={postData.pub_date}
                                upvoteCount={postData.upvote_count}
                                downvoteCount={postData.downvote_count}
                                isUpvoted={postData.is_upvoted}
                                isDownvoted={postData.is_downvoted}
                                isOwner={postData.is_owner}
                                navigation={navigation}
                                allowPostClick={false}
                                styles={{ marginBottom: 5, marginTop: 10 }}
                            />
                            {renderSeparator()}
                            <Heading3
                                text={"Tags"}
                                styles={style.commentHeading}
                            />
                            <Tags tagsArray={postData.tags} />
                            {renderSeparator()}
                            <Heading3
                                text={"Comments"}
                                styles={style.commentHeading}
                            />
                            <AddComment
                                postId={postId}
                                onSuccessfulAdd={(commentResp) => {
                                    setComments([...comments, commentResp]);
                                }}
                                showToast={showToast}
                            />
                        </>
                    }
                    data={comments}
                    renderItem={renderComment}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading} //?????
                            onRefresh={fetchPostAndComments}
                        />
                    }
                    ItemSeparatorComponent={renderSeparator}
                />
                {/* <Toast /> */}
            </View>

        </MainContainer>
    )
}

const style = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
    commentHeading: {
        marginBottom: 15,
        marginTop: 10
    },
    comments: {
        marginTop: 10,
    },
    commentSeparator: {
        height: 1,
        width: "100%",
        backgroundColor: COLORS.gray,
        marginVertical: 10
    },
})