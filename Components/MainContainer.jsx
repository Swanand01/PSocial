import React from "react";
import { Platform, StatusBar, SafeAreaView, StyleSheet, KeyboardAvoidingView, Keyboard } from "react-native";

function MainContainer({ children, hideKeyboard }) {
    return (Platform.OS === 'ios' ?
        <SafeAreaView>{children}</SafeAreaView>
        :
        <KeyboardAvoidingView
            style={style.androidSafeArea}
            behavior={'padding'}
        >
            {children}
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        backgroundColor: "#101010",
        paddingTop: StatusBar.currentHeight,
    }
})

export default MainContainer;