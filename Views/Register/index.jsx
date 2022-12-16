import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useFetch from "../../API/useFetch";
import useToast from "../../Components/Toast";

import { View, StyleSheet, Text, Pressable } from "react-native";
import MainContainer from "../../Components/MainContainer";
import CustomInput from "../../Components/Input";
import Buttons from "../../Components/Button";
import inputTypes from '../../Components/Input/types'
import { Heading1 } from "../../Components/CustomText";
import { COLORS } from "../../COLORS";

import API_ENDPOINTS from "../../API/endpoints";


function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorText, setErrorText] = useState("");
    const [btnEnable, setBtnEnable] = useState(false);

    const [sendRegisterRequest, registerData, registerLoading] = useFetch();
    const [sendLoginRequest, loginData, loginLoading] = useFetch();
    const [cookies, setCookie] = useCookies("access_token", { path: "/" });
    const [Toast, showToast] = useToast();

    function register() {
        sendRegisterRequest(
            {
                url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.REGISTER,
                method: "POST",
                body: {
                    user_name: username.trim(),
                    password: password.trim(),
                    email: email.trim(),
                    password2: password2.trim()
                },
                headers: {},
                callback: (data, status) => {
                    if (status === 201 && data.user_name && data.email) {
                        sendLoginRequest(
                            {
                                url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.LOGIN,
                                method: "POST",
                                body: { user_name: username.trim(), password: password.trim() },
                                headers: {},
                                callback: (data, status) => {
                                    if (status === 200 && data.access) {
                                        setCookie("access_token", data.access);
                                        showToast("Registered successfully", 200, () => { navigation.navigate("Home") })
                                    } else if (status === 400) {
                                        showToast("Something went wrong.", 500)
                                        setBtnEnable(true);
                                    }
                                },
                                includeAccessToken: false
                            }
                        );
                    }
                },
                includeAccessToken: false
            }
        );
    }

    useEffect(() => {
        let passwordMatch = password.trim() === password2.trim();
        let allDataValid = username.trim().length > 0 && email.trim().length > 0 && passwordMatch;

        if (!passwordMatch) {
            setErrorText("Passwords do not match")
        }
        else {
            setErrorText("");
        }
        if (allDataValid) {
            setBtnEnable(true);
        }
    }, [username, email, password, password2])

    return (
        <MainContainer>
            <View style={style.wrapper}>
                <Heading1 text={"Sign Up"} />
                <View style={style.inputs}>
                    <CustomInput
                        label={"Username"}
                        placeholder={"Username"}
                        text={username}
                        setText={setUsername}
                        styles={{ marginBottom: 20 }}
                    />
                    <CustomInput
                        label={"Email"}
                        placeholder={"Email"}
                        text={email}
                        setText={setEmail}
                        styles={{ marginBottom: 20 }}
                    />
                    <CustomInput
                        label={"Password"}
                        placeholder={"Password"}
                        text={password}
                        setText={setPassword}
                        type={inputTypes.PASSWORD}
                        styles={{ marginBottom: 20 }}
                    />
                    <CustomInput
                        label={"Confirm Password"}
                        placeholder={"Confirm Password"}
                        text={password2}
                        setText={setPassword2}
                        type={inputTypes.PASSWORD}
                        styles={{ marginBottom: 40 }}
                    />
                    <Buttons.StandardButton
                        text={"Sign Up"}
                        disabled={!btnEnable}
                        onPress={() => {
                            register(username, password);
                        }} />
                    {errorText && <Text style={style.errorText}>{errorText}</Text>}
                    <View style={style.redirectText}>
                        <Text style={{ color: COLORS.white, fontFamily: "Metropolis" }}>
                            Already have an account?
                        </Text>
                        <Pressable onPress={() => { navigation.navigate("Login") }}>
                            <Text style={{ color: COLORS.purple, fontSize: 15, fontWeight: '700', fontFamily: "Metropolis" }}>
                                Log In
                            </Text>
                        </Pressable>
                    </View>
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
    },
    errorText: {
        color: COLORS.white,
        marginTop: 20,
        textAlign: "center",
        fontFamily: "Metropolis"
    },
    redirectText: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 20
    }
})


export default RegisterScreen;