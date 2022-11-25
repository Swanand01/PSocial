import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../../COLORS";
import CircleIcon from "../CircleIcon";
import { likeState } from "./constants";
import useFetch from "../../API/useFetch";
import API_ENDPOINTS from "../../API/endpoints";


const initialVotesState = {
    state: likeState.NONE,
    upvotes: 0,
    downvotes: 0
}


export default function Footer({ postId, upvotes, downvotes, comments, initialLiked }) {
    const [votes, setVotes] = useState(initialVotesState);
    const [vote, apiData] = useFetch();

    useEffect(() => {
        setVotes({ state: initialLiked, upvotes: upvotes, downvotes: downvotes })
    }, [upvotes, downvotes, initialLiked])

    function onLikePress() {
        vote({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.UPVOTE_POST + `${postId}/`,
            method: "POST",
            headers: {},
            callback: () => { },
            includeAccessToken: true
        });

        if (votes.state === likeState.LIKED) {
            // removed like
            votes.state = likeState.NONE;
            votes.upvotes--;
        }
        else if (votes.state === likeState.DISLIKED) {
            // removed dislike and then liked
            votes.state = likeState.LIKED
            votes.downvotes--;
            votes.upvotes++;
        }
        else {
            //liked
            votes.state = likeState.LIKED
            votes.upvotes++;
        }

        setVotes({ ...votes })
    }

    function onDislikePress() {
        vote({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.DOWNVOTE_POST + `${postId}/`,
            method: "POST",
            headers: {},
            callback: () => { },
            includeAccessToken: true
        });

        if (votes.state === likeState.LIKED) {
            //removed liked and then disliked
            votes.state = likeState.DISLIKED
            votes.upvotes--;
            votes.downvotes++;
        }
        else if (votes.state === likeState.DISLIKED) {
            //removed dislike
            votes.state = likeState.NONE
            votes.downvotes--;
        }
        else {
            //disliked
            votes.state = likeState.DISLIKED
            votes.downvotes++;
        }

        setVotes({ ...votes })
    }

    const isLiked = votes.state === likeState.LIKED;
    const isDisliked = votes.state === likeState.DISLIKED


    const likeIcon = isLiked ? "thumbs-up" : "thumbs-o-up";
    const dislikeIcon = isDisliked ? "thumbs-down" : "thumbs-o-down";


    return (
        <View style={style.footer}>
            <View style={style.footerItem}>
                <CircleIcon styles={style.footerItemIcon}>
                    <FontAwesome name="comments-o" size={22} color={COLORS.white} />
                </CircleIcon>
                <Text style={style.footerItemText}>
                    {comments}
                </Text>
            </View>
            <View style={style.footerItem}>
                <CircleIcon styles={style.footerItemIcon} onPress={onLikePress}>
                    <FontAwesome name={likeIcon} size={22} color={isLiked ? COLORS.purple : COLORS.white} />
                </CircleIcon>
                <Text style={style.footerItemText}>
                    {votes.upvotes}
                </Text>
            </View>
            <View style={style.footerItem}>
                <CircleIcon styles={style.footerItemIcon} onPress={onDislikePress}>
                    <FontAwesome name={dislikeIcon} size={22} color={isDisliked ? COLORS.purple : COLORS.white} />
                </CircleIcon>
                <Text style={style.footerItemText}>
                    {votes.downvotes}
                </Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingRight: 10
        // backgroundColor: "pink"
    },
    footerItem: {
        display: "flex",
        flexDirection: "row"
    },
    footerItemText: {
        color: COLORS.white,
        textAlignVertical: "center"
    },
    footerItemIcon: {
        width: 40,
        height: 40,
        color: COLORS.white
    }
})