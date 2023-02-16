const API_ENDPOINTS = {
    // BASE_URL: "https://psocial-api.onrender.com/",
    BASE_URL: "http://192.168.1.10:8000/",
    LOGIN: "accounts/auth/token/",
    REGISTER: "accounts/register/",
    GET_ALL_POSTS: "posts/get-all-posts/",
    GET_POST: "posts/get-post/",
    UPVOTE_POST: "posts/upvote-post/",
    DOWNVOTE_POST: "posts/downvote-post/",
    CREATE_POST: "posts/create-post/",
    GET_COMMENTS: "posts/get-post-comments/",
    ADD_COMMENT: "posts/add-comment/",
    GET_USER_PROFILE: "accounts/get-user-profile/",
    GET_USER_POSTS: "accounts/get-user-posts/",
    SEARCH_TAGS: "tags/search-tags"
}

export default API_ENDPOINTS