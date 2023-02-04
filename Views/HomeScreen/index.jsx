import React, { useState, useEffect } from "react";
import useFetch from "../../API/useFetch";

import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import MainContainer from "../../Components/MainContainer";
import Post from "../../Components/Post";
import { Heading1 } from "../../Components/CustomText";

import API_ENDPOINTS from "../../API/endpoints";
import FloatingActionButton from "../../Components/FloatingActionButton";


function HomeScreen({ navigation }) {
    const [fetchPosts, apiData, isLoading] = useFetch();
    const [posts, setPosts] = useState([]);

    function loadPosts() {
        fetchPosts({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.GET_ALL_POSTS,
            method: "GET",
            headers: {},
            callback: () => { },
            includeAccessToken: true
        });
    }

    function renderPost({ item }) {
        return (
            <Post
                postId={item.id}
                username={item.user && item.user.user_name}
                content={item.content}
                upvoteCount={item.upvote_count}
                downvoteCount={item.downvote_count}
                isUpvoted={item.is_upvoted}
                isDownvoted={item.is_downvoted}
                navigation={navigation}
                allowPostClick={true}
            />
        )
    }

    function renderSeparator() {
        return (
            <View
                style={style.postSeparator}
            />
        );
    };


    useEffect(() => {
        loadPosts();
    }, []);

    useEffect(() => {
        if (!apiData.posts) return;
        setPosts(apiData.posts);
    }, [apiData])


    return (
        <MainContainer>
            <View style={style.wrapper}>
                <Heading1 text={"Home"} />
                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    style={style.posts}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading} //?????
                            onRefresh={loadPosts}
                        />
                    }
                    ItemSeparatorComponent={renderSeparator}
                />
                <FloatingActionButton onPress={
                    () => { navigation.navigate("CreatePost") }
                } />
            </View>
        </MainContainer>
    )
}

const style = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
    posts: {
        marginTop: 20
    },
    postSeparator: {
        height: 1,
        width: "100%",
        backgroundColor: "white",
        marginVertical: 5
    }
})

export default HomeScreen;