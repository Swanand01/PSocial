import { useState } from "react";
import CustomInput from "../../Components/Input";
import { View, StyleSheet, Text, Pressable } from "react-native";
import MainContainer from "../../Components/MainContainer";
import Buttons from "../../Components/Button";
import inputTypes from "../../Components/Input/types";
import { Heading1 } from "../../Components/CustomText";
import { COLORS } from "../../COLORS";
import API_ENDPOINTS from "../../API/endpoints";
import useFetch from "../../API/useFetch";
import useCustomInput from "../../Components/Input/useCustomInput";
import useToast from "../../Components/Toast";

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [sendRegisterRequest, apiData, isLoading] = useFetch();

  const [UsernameInput, playUsernameError] = useCustomInput();
  const [EmailInput, playEmailError] = useCustomInput();
  const [PasswordInput, playPasswordError] = useCustomInput();
  const [Password2Input, playPassword2Error] = useCustomInput();

  const [Toast, showToast] = useToast();

  function register() {
    if (username.trim() === "") {
      playUsernameError();
      return;
    }
    if (email.trim() === "") {
      playEmailError();
      return;
    }
    if (password.trim() === "") {
      playPasswordError();
      return;
    }
    if (password2.trim() === "") {
      playPassword2Error();
      return;
    }

    if (password.trim() !== password2.trim()) {
      playPassword2Error();
      playPasswordError();
      showToast("passwords do not match", 500);
      return;
    }

    sendRegisterRequest({
      url: API_ENDPOINTS.BASE_URL + API_ENDPOINTS.REGISTER,
      method: "POST",
      body: {
        user_name: username.trim(),
        password: password.trim(),
        email: email.trim(),
        password2: password2.trim(),
      },
      headers: {},
      callback: (data, status) => {
        if (status === 200 && data.access) {
          console.log("SUCCESS", data);
          // setCookie("access_token", data.access);
          navigation.navigate("Login");
        }
      },
      includeAccessToken: false,
    });
  }

  return (
    <MainContainer>
      <View style={style.wrapper}>
        <Heading1 text={"Sign Up"} />
        <View style={style.inputs}>
          <UsernameInput
            label={"Username"}
            placeholder={"Username"}
            text={username}
            setText={setUsername}
            styles={{ marginBottom: 20 }}
          />
          <EmailInput
            label={"Email"}
            placeholder={"Email"}
            text={email}
            setText={setEmail}
            styles={{ marginBottom: 20 }}
          />
          <PasswordInput
            label={"Password"}
            placeholder={"Password"}
            text={password}
            setText={setPassword}
            type={inputTypes.PASSWORD}
            styles={{ marginBottom: 20 }}
          />
          <Password2Input
            label={"Confirm Password"}
            placeholder={"Confirm Password"}
            text={password2}
            setText={setPassword2}
            type={inputTypes.PASSWORD}
            styles={{ marginBottom: 40 }}
          />
          <Buttons.StandardButton
            text={"Sign Up"}
            onPress={() => {
              register();
            }}
          />
          <View style={style.redirectText}>
            <Text style={{ color: COLORS.white, fontFamily: "Metropolis" }}>
              Already have an account?{" "}
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                  color: COLORS.purple,
                  fontSize: 15,
                  fontWeight: "700",
                  fontFamily: "Metropolis",
                }}
              >
                Log In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Toast />
    </MainContainer>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputs: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  redirectText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default RegisterScreen;
