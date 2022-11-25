import { useState } from "react";
import CustomInput from "../../Components/Input";
import { View, StyleSheet, Text, Pressable } from "react-native";
import MainContainer from "../../Components/MainContainer";
import Buttons from "../../Components/Button";
import inputTypes from '../../Components/Input/types'
import { Heading1 } from "../../Components/CustomText";
import { COLORS } from "../../COLORS";
import API_ENDPOINTS from "../../API/endpoints";
import useFetch from "../../API/useFetch";

function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [sendRegisterRequest, apiData, isLoading] = useFetch()

    function register() {
        if (password.trim() === "" || username.trim() === "" || password2.trim() === "" || email.trim() === "") return;

        if (password.trim() !== password2.trim()) return;

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
                    if (status === 200 && data.access) {
                        console.log("SUCCESS", data);
                        // setCookie("access_token", data.access);
                        navigation.navigate("Login")
                    }
                },
                includeAccessToken: false
            }
        );
    }

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
                    <Buttons.StandardButton text={"Sign Up"} onPress={() => {
                        login(username, password);
                    }} />
                    <View style={style.redirectText}>
                        <Text style={{ color: COLORS.white, fontFamily: "Metropolis" }}>
                            Already have an account?  </Text>
                        <Pressable onPress={() => { navigation.navigate("Login") }}>
                            <Text style={{ color: COLORS.purple, fontSize: 15, fontWeight: '700', fontFamily: "Metropolis" }}>Log In</Text>
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
    redirectText: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    }
})


export default RegisterScreen;