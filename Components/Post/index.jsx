import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight, Pressable } from "react-native";
import Footer from "./Footer";
import { likeState } from "./constants";
import getTimeAgo from "../../utils";
import { COLORS } from "../../COLORS";
import CircleIcon from "../CircleIcon";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';


function getInitialLiked(isUpvoted, isDownvoted) {
    if (isUpvoted) return likeState.LIKED;
    else if (isDownvoted) return likeState.DISLIKED;
    else return likeState.NONE;
}

export default function Post({
    postId,
    username,
    content,
    pubDate,
    upvoteCount,
    downvoteCount,
    commentCount,
    isUpvoted,
    isDownvoted,
    isOwner,
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
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Profile", { username: username });
                    }}
                    style={{
                        alignSelf: "flex-start",
                    }}
                >
                    <View>
                        <Text style={style.username}>
                            {username}
                            <Text style={style.pubDate}>  {getTimeAgo(new Date(pubDate))}</Text>
                        </Text>
                    </View>
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
                    allowPostClick={allowPostClick}
                    navigation={navigation}
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
    pubDate: {
        fontSize: 14,
        color: COLORS.gray,
        fontFamily: "Metropolis"
    },
    postText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: "Metropolis"
    },
    editBtn: {
        position: "absolute",
        right: 0
    }
})