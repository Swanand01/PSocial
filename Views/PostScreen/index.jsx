import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import useFetch from "../../API/useFetch";

import Comment from "../../Components/Comment";
import { Heading3 } from "../../Components/CustomText";
import MainContainer from "../../Components/MainContainer";
import Post from "../../Components/Post";

import API_ENDPOINTS from "../../API/endpoints";

export default function PostScreen({ route, navigation }) {
    const { postId } = route.params;
    const [getPost, postData, isLoading] = useFetch();
    const [getComments, commentApiData, commentsLoading] = useFetch();
    const [comments, setComments] = useState([]);

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

    useEffect(() => {
        getPost({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.GET_POST + postId,
            method: "GET",
            headers: {},
            callback: () => { },
            includeAccessToken: true
        });

        getComments({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.GET_COMMENTS + postId,
            method: "GET",
            headers: {},
            callback: () => { },
            includeAccessToken: true
        });
    }, []);

    useEffect(() => {
        if (!commentApiData.comments) return;
        setComments(commentApiData.comments);
    }, [commentApiData])

    return (
        <MainContainer>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Post
                            postId={postData.id}
                            username={postData.user && postData.user.user_name}
                            content={postData.content}
                            upvoteCount={postData.upvote_count}
                            downvoteCount={postData.downvote_count}
                            isUpvoted={postData.is_upvoted}
                            isDownvoted={postData.is_downvoted}
                            navigation={navigation}
                            allowPostClick={false}
                            styles={{ marginBottom: 5 }}
                        />
                        {renderSeparator()}
                        <Heading3 text={"Comments"} styles={{ marginBottom: 15, marginTop: 10 }} />
                    </>
                }
                data={comments}
                renderItem={renderComment}
                style={style.wrapper}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={isLoading} //?????
                //         onRefresh={loadPosts}
                //     />
                // }
                ItemSeparatorComponent={renderSeparator}
            />
        </MainContainer>
    )
}

const style = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
        marginTop: 20,
        height: "100%"
    },
    comments: {
        marginTop: 10,
    },
    commentSeparator: {
        height: 1,
        width: "100%",
        backgroundColor: "gray",
        marginVertical: 10
    }
})