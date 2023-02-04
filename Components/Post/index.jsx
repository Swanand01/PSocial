import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight, Pressable } from "react-native";
import { SvgUri } from 'react-native-svg';
import Footer from "./Footer";
import { likeState } from "./constants";


function getInitialLiked(isUpvoted, isDownvoted) {
    if (isUpvoted) return likeState.LIKED;
    else if (isDownvoted) return likeState.DISLIKED;
    else return likeState.NONE;
}

export default function Post({
    postId,
    username,
    content,
    upvoteCount,
    downvoteCount,
    commentCount,
    isUpvoted,
    isDownvoted,
    navigation,
    allowPostClick,
    styles
}) {

    return (
        <Pressable
            style={[styles, style.post]}
            onPress={() => {
                if (!allowPostClick) return;
                navigation.navigate("Post", { postId: postId });
            }
            }>
            <View style={style.profile} >
                {/* <SvgUri
                    style={style.profilePicImage}
                    uri={`https://avatars.dicebear.com/api/adventurer-neutral/${post.user.user_name}.svg?r=15`}
                /> */}
                <TouchableOpacity style={{
                    alignSelf: "flex-start",
                }}>
                    <Text style={style.username}>{username}</Text>
                </TouchableOpacity>
            </View>

            <View>
                <View>
                    <Text style={style.postText}>{content}</Text>
                </View>
                <Footer
                    postId={postId}
                    upvotes={upvoteCount}
                    downvotes={downvoteCount}
                    comments={commentCount}
                    initialLiked={getInitialLiked(isUpvoted, isDownvoted)}
                />
            </View>
        </Pressable>
    );
}

const style = StyleSheet.create({
    post: {
        display: "flex",
        flexDirection: "column",
        marginTop: 5
    },
    profile: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-start",
        marginBottom: 5
    },
    profilePicImage: {
        width: 50,
        height: 50
    },
    username: {
        color: "white",
        fontSize: 18,
        fontFamily: "Metropolis-Bold",
        marginBottom: 5
    },
    postText: {
        color: "white",
        fontSize: 16,
        fontFamily: "Metropolis"
    }
})