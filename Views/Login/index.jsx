import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useFetch from "../../API/useFetch";
import useToast from "../../Components/Toast";

import { View, StyleSheet, Text, Pressable, Keyboard } from "react-native";
import MainContainer from "../../Components/MainContainer";
import { Heading1 } from "../../Components/CustomText"
import CustomInput from "../../Components/Input";
import inputTypes from "../../Components/Input/types"
import Buttons from "../../Components/Button";

import { COLORS } from "../../COLORS";
import API_ENDPOINTS from "../../API/endpoints";

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btnEnable, setBtnEnable] = useState(false);

    const [sendLoginRequest, apiData, isLoading] = useFetch();
    const [cookies, setCookie] = useCookies("access_token", { path: "/" });
    const [Toast, showToast] = useToast();


    function login(username, password) {
        if (password.trim() === "" || username.trim() === "") return;
        setBtnEnable(false);
        sendLoginRequest(
            {
                url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.LOGIN,
                method: "POST",
                body: { user_name: username.trim(), password: password.trim() },
                headers: {},
                callback: (data, status) => {
                    if (status === 200 && data.access) {
                        setCookie("access_token", data.access);
                        showToast("Logged in successfully", 200, () => { navigation.navigate("Home") })
                    } else if (status === 401) {
                        showToast("Wrong username or password.", 500)
                        setBtnEnable(true);
                    }
                },
                includeAccessToken: false
            }
        );
    }

    useEffect(() => {
        if (username.trim().length > 0 && password.trim().length > 0) {
            setBtnEnable(true);
        }
        else {
            setBtnEnable(false);
        }
    }, [username, password])


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
                    <Buttons.StandardButton
                        text={"Log in"}
                        disabled={!btnEnable}
                        onPress={() => {
                            Keyboard.dismiss();
                            login(username, password);
                        }}
                    />
                    <View style={style.redirectText}>
                        <Text style={{ color: COLORS.white, fontFamily: "Metropolis" }}>Don't have an account?  </Text>
                        <Pressable onPress={() => { navigation.navigate("Register") }}>
                            <Text style={{ color: COLORS.purple, fontSize: 15, fontWeight: '700', fontFamily: "Metropolis" }}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <Toast />
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
    },
    redirectText: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 20
    }
})


export default LoginScreen;