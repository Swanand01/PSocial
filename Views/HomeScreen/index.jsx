import React, { useState, useEffect } from "react";
import { RefreshControl, Text } from "react-native";
import useFetch from "../../API/useFetch";

import { View, StyleSheet, FlatList } from "react-native";
import MainContainer from "../../Components/MainContainer";
import { Heading1 } from "../../Components/CustomText";
import API_ENDPOINTS from "../../API/endpoints";
import Post from "../../Components/Post";


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
            <Post post={item} />
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
        marginVertical: 10
    }
})

export default HomeScreen;