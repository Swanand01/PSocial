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

export default function Post({ post }) {

    return (
        <View style={style.post}>

            <Pressable style={style.profilePic} onPress={() => { console.log("PFP"); }}>
                <SvgUri
                    style={style.profilePicImage}
                    uri={`https://avatars.dicebear.com/api/adventurer-neutral/${post.user.user_name}.svg?r=15`}
                />
            </Pressable>

            <View style={style.postContent}>
                <TouchableOpacity style={{
                    alignSelf: "flex-start",
                }}>
                    <Text style={style.username}>{post.user.user_name}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={style.postText}>{post.content}</Text>
                </TouchableOpacity>
                <Footer
                    postId={post.id}
                    upvotes={post.upvote_count}
                    downvotes={post.downvote_count}
                    comments={post.comment_count}
                    initialLiked={getInitialLiked(post.is_upvoted, post.is_downvoted)}
                />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    post: {
        display: "flex",
        flexDirection: "row",
    },
    profilePic: {
        flex: 1,
        marginRight: 10,
        borderRadius: 10
    },
    profilePicImage: {
        width: 50,
        height: 50
    },
    postContent: {
        flex: 5,
        display: "flex",
        flexDirection: "column"
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