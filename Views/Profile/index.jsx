import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../../API/useFetch";

import { View, StyleSheet, FlatList, RefreshControl } from "react-native";

import MainContainer from "../../Components/MainContainer";
import ProfileHero from "../../Components/ProfileHero";
import TopNavBar from "../../Components/TopNavBar";

import API_ENDPOINTS from "../../API/endpoints";
import Post from "../../Components/Post";

export default function Profile({ route, navigation }) {
    const { username } = route.params;
    const [fetchUserProfile, userProfileData, profileLoading] = useFetch();
    const [fetchUserPosts, userPostsData, postsLoading] = useFetch();
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(5);


    useEffect(() => {
        loadUserProfile();
    }, [])

    useEffect(() => {
        setUserId(userProfileData.id)
    }, [userProfileData])

    useEffect(() => {
        loadPosts();
    }, [userId])

    useEffect(() => {
        if (!userPostsData.posts) return;
        setPosts(userPostsData.posts);
    }, [userPostsData])

    function loadUserProfile() {
        fetchUserProfile({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.GET_USER_PROFILE + username,
            method: "GET",
            headers: {},
            callback: () => { }
        });
    }

    function loadPosts() {
        fetchUserPosts({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.GET_USER_POSTS + userId + "/",
            method: "GET",
            headers: {},
            callback: () => { }
        });
    }

    function renderPost({ item }) {
        return (
            <Post
                postId={item.id}
                username={item.user && item.user.user_name}
                content={item.content}
                pubDate={item.pub_date}
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

    return (
        <MainContainer>
            <View style={style.wrapper}>
                <TopNavBar text={"Profile"} navigation={navigation} />
                <ProfileHero
                    username={username}
                    postsCount={userProfileData.posts_count}
                    followersCount={userProfileData.follower_count}
                    followingCount={userProfileData.following_count}
                />
                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    // style={style.posts}
                    refreshControl={
                        <RefreshControl
                            refreshing={postsLoading} //?????
                            onRefresh={loadPosts}
                        />
                    }
                    ItemSeparatorComponent={renderSeparator}
                />
            </View>
        </MainContainer>
    );
}

const style = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20
    },
    postSeparator: {
        height: 1,
        width: "100%",
        backgroundColor: "white",
        marginVertical: 5
    }
})