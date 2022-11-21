import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useFetch from "../../API/useFetch";
import API_ENDPOINTS from "../../API/endpoints";

import { View, StyleSheet } from "react-native";

import MainContainer from "../../Components/MainContainer";
import { Heading1 } from "../../Components/CustomText"
import CustomInput from "../../Components/Input";
import inputTypes from "../../Components/Input/types"
import Buttons from "../../Components/Button";

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [sendLoginRequest, apiData, isLoading] = useFetch();
    const [cookies, setCookie] = useCookies("access_token", { path: "/" });


    function login(username, password) {
        if (password.trim() === "" || username.trim() === "") return;
        sendLoginRequest(
            {
                url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.LOGIN,
                method: "POST",
                body: { user_name: username.trim(), password: password.trim() },
                headers: {},
                callback: (data, status) => {
                    if (status === 200 && data.access) {
                        console.log("SUCCESS", data);
                        setCookie("access_token", data.access);
                        navigation.navigate("Home")
                    }
                },
                includeAccessToken: false
            }
        );
    }


    return (
        <MainContainer>
            <View style={style.wrapper}>
                <Heading1 text={"Log in"} />
                <View style={style.inputs}>
                    <CustomInput
                        label={"Username"}
                        placeholder={"Username"}
                        text={username}
                        setText={setUsername}
                        styles={{ marginBottom: 20 }}
                    />
                    <CustomInput
                        label={"Password"}
                        placeholder={"Password"}
                        text={password}
                        setText={setPassword}
                        type={inputTypes.PASSWORD}
                        styles={{ marginBottom: 40 }}
                    />
                    <Buttons.StandardButton text={"Log in"} onPress={() => {
                        login(username, password);
                    }} />
                </View>
            </View>
        </MainContainer>
    )
}

const style = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputs: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})


export default LoginScreen;