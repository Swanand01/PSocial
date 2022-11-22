import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../../COLORS";
import CircleIcon from "../CircleIcon";
import { likeState } from "./constants";
import useFetch from "../../API/useFetch";
import API_ENDPOINTS from "../../API/endpoints";


export default function Footer({ postId, upvotes, downvotes, comments, initialLiked }) {
    const [like, setLike] = useState(initialLiked);
    const [votesCount, setVotesCount] = useState({ upvotes, downvotes });
    const [vote, apiData] = useFetch();


    useEffect(() => {
        setLike(initialLiked)
        setVotesCount({ upvotes, downvotes })
    }, [upvotes, downvotes, initialLiked])

    function onLikePress() {
        vote({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.UPVOTE_POST + `${postId}/`,
            method: "POST",
            headers: {},
            callback: () => { },
            includeAccessToken: true
        });

        if (like === likeState.LIKED) {
            // removed like
            setLike(likeState.NONE)
            votesCount.upvotes--;
            setVotesCount({ ...votesCount })
        }
        else if (like === likeState.DISLIKED) {
            // removed dislike and then liked
            setLike(likeState.LIKED)
            votesCount.downvotes--;
            votesCount.upvotes++;
            setVotesCount({ ...votesCount })
        }
        else {
            //liked
            setLike(likeState.LIKED)
            votesCount.upvotes++;
            setVotesCount({ ...votesCount })
        }
    }

    function onDislikePress() {
        vote({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.DOWNVOTE_POST + `${postId}/`,
            method: "POST",
            headers: {},
            callback: () => { },
            includeAccessToken: true
        });

        if (like === likeState.LIKED) {
            //removed liked and then disliked
            setLike(likeState.DISLIKED)
            votesCount.upvotes--;
            votesCount.downvotes++;
            setVotesCount({ ...votesCount })
        }
        else if (like === likeState.DISLIKED) {
            //removed dislike
            setLike(likeState.NONE)
            votesCount.downvotes--;
            setVotesCount({ ...votesCount })
        }
        else {
            //disliked
            setLike(likeState.DISLIKED)
            votesCount.downvotes++;
            setVotesCount({ ...votesCount })
        }
    }

    const isLiked = like === likeState.LIKED;
    const isDisliked = like === likeState.DISLIKED


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
                    {votesCount.upvotes}
                </Text>
            </View>
            <View style={style.footerItem}>
                <CircleIcon styles={style.footerItemIcon} onPress={onDislikePress}>
                    <FontAwesome name={dislikeIcon} size={22} color={isDisliked ? COLORS.purple : COLORS.white} />
                </CircleIcon>
                <Text style={style.footerItemText}>
                    {votesCount.downvotes}
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