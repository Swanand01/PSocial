import React, { useEffect, useState } from "react";
import { View } from "react-native";
import API_ENDPOINTS from "../../API/endpoints";
import useFetch from "../../API/useFetch";
import useCustomInput from "../../Components/Input/useCustomInput";
import Tags from "../PostScreen/Tags";

export default function SearchTags({ selectedTags, setSelectedTags }) {
    const [SearchTagsInput] = useCustomInput();
    const [searchTagsInputText, setSearchTagsInputText] = useState("");
    const [makeGetTagsRequest, apiData] = useFetch();
    const [searchResultTags, setSearchResultTags] = useState([]);

    function fetchTags() {
        makeGetTagsRequest({
            url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.SEARCH_TAGS + `/?query=${searchTagsInputText}`,
            method: "GET",
            headers: {},
            callback: () => { },
            includeAccessToken: true
        })
    }

    function onSearchResultTagClick(searchResultTag) {
        if (selectedTags.includes(searchResultTag)) return;
        setSelectedTags([...selectedTags, searchResultTag]);
    }

    useEffect(() => {
        if (!apiData.tags) return;
        setSearchResultTags(apiData.tags);
    }, [apiData])

    useEffect(() => {
        if (searchTagsInputText === "") {
            setSearchResultTags([]);
        }
        else {
            fetchTags(searchTagsInputText);
        }
    }, [searchTagsInputText])

    return (
        <View>
            <SearchTagsInput
                placeholder={"Search Tags"}
                text={searchTagsInputText}
                setText={setSearchTagsInputText}
                styles={{ marginBottom: 15 }}
                onChange={(value) => { setSearchTagsInputText(value) }}
            />
            {searchResultTags.length > 0 && (
                <Tags
                    tagsArray={searchResultTags}
                    styles={{ marginBottom: 10 }}
                    onTagClick={onSearchResultTagClick}
                />
            )}
        </View>
    )
}